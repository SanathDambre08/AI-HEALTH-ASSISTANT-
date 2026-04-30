/**
 * MediPulse Pulse Sensor Module
 */
const PulseSensorModule = (() => {
    // Pulse Monitor State
    let pulsePort;
    let pulseReader;
    let readableStreamClosedPromise;
    let pulseChartInstance;
    let isPulseRunning = false;
    let pulseDataPoints = [];
    const MAX_DATA_POINTS = 600; // Show 6 seconds of data at 100Hz for a slower moving graph
    
    // Simple BPM Calculation State
    let lastBeatTime = 0;
    let bpmValues = [];
    let pulseThreshold = 560; // Slightly higher threshold
    let isBeat = false;
    let updateCounter = 0;
    let smoothedVal = 512; // Low-pass filter value

    function render() {
        return `
        <div class="page-header">
            <h1 class="page-title">
                <span class="page-title-icon stat-icon coral"><i data-lucide="heart-pulse"></i></span>
                Pulse Sensor
            </h1>
            <p class="page-description">Real-time heart rate visualization from Arduino Pulse Sensor.</p>
        </div>

        <!-- Live Pulse Monitor (Web Serial) -->
        <div class="glass-card-static mt-lg">
            <div class="pulse-monitor-header">
                <div>
                    <h2 class="section-title">Live Pulse Monitor</h2>
                    <p class="section-subtitle">Connect your Arduino pulse sensor via USB</p>
                </div>
                <div class="pulse-status">
                    <div class="pulse-status-dot" id="pulseStatusDot"></div>
                    <span id="pulseStatusText">Disconnected</span>
                    <button class="btn btn-primary btn-sm" id="connectPulseBtn" style="margin-left: 12px;">
                        <i data-lucide="usb"></i> Connect Sensor
                    </button>
                </div>
            </div>
            
            <div class="pulse-value-display">
                <div class="pulse-bpm" id="pulseBpmDisplay">--</div>
                <div class="pulse-bpm-label">Heart Rate (BPM)</div>
            </div>

            <div class="pulse-chart-container">
                <canvas id="pulseChart"></canvas>
            </div>
        </div>
        `;
    }

    function afterRender() {
        initPulseMonitor();
    }

    function destroy() {
        if (isPulseRunning) {
            disconnectPulseSensor();
        }
    }

    function initPulseMonitor() {
        const connectBtn = document.getElementById('connectPulseBtn');
        const statusDot = document.getElementById('pulseStatusDot');
        const statusText = document.getElementById('pulseStatusText');
        const canvas = document.getElementById('pulseChart');
        
        if (!connectBtn || !canvas) return;

        // Initialize empty chart
        const ctx = canvas.getContext('2d');
        pulseDataPoints = Array(MAX_DATA_POINTS).fill(0);
        
        pulseChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(MAX_DATA_POINTS).fill(''),
                datasets: [{
                    label: 'Pulse Signal',
                    data: pulseDataPoints,
                    borderColor: 'rgba(255, 107, 107, 1)',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 0,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0 // Disable animation for real-time performance
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        min: 0,
                        max: 1023, // Arduino 10-bit ADC max
                        grid: {
                            color: 'rgba(255,255,255,0.05)'
                        },
                        ticks: {
                            color: '#5c6bc0'
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });

        connectBtn.addEventListener('click', async () => {
            // Check for Web Serial API support
            if (!('serial' in navigator)) {
                alert("Web Serial API not supported in this browser. Please use Chrome or Edge.");
                return;
            }

            if (isPulseRunning) {
                try {
                    await disconnectPulseSensor();
                } catch(e) { console.error(e); }
                
                connectBtn.innerHTML = '<i data-lucide="usb"></i> Connect Sensor';
                statusDot.classList.remove('active');
                statusText.textContent = 'Disconnected';
                document.getElementById('pulseBpmDisplay').textContent = '--';
            } else {
                const success = await connectPulseSensor();
                if (success) {
                    connectBtn.innerHTML = '<i data-lucide="x"></i> Disconnect';
                    statusDot.classList.add('active');
                    statusText.textContent = 'Connected';
                }
            }
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    }

    async function connectPulseSensor() {
        try {
            pulsePort = await navigator.serial.requestPort();
            await pulsePort.open({ baudRate: 115200 });
            isPulseRunning = true;
            readPulseLoop();
            return true;
        } catch (err) {
            console.error('Error connecting to serial port:', err);
            const toastContainer = document.getElementById('toastContainer');
            if (toastContainer) {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.innerHTML = `<i data-lucide="alert-circle" style="color:var(--danger)"></i><span>Failed to connect to sensor. Make sure the Arduino Serial Monitor is closed.</span>`;
                toastContainer.appendChild(toast);
                setTimeout(() => toast.remove(), 4000);
            }
            return false;
        }
    }

    async function disconnectPulseSensor() {
        isPulseRunning = false;
        
        try {
            if (pulseReader) {
                await pulseReader.cancel();
                pulseReader = null;
            }
            if (readableStreamClosedPromise) {
                await readableStreamClosedPromise.catch(() => {});
                readableStreamClosedPromise = null;
            }
            if (pulsePort) {
                await pulsePort.close();
                pulsePort = null;
            }
        } catch (err) {
            console.error("Error during disconnect:", err);
        }
    }

    async function readPulseLoop() {
        const textDecoder = new TextDecoderStream();
        readableStreamClosedPromise = pulsePort.readable.pipeTo(textDecoder.writable);
        pulseReader = textDecoder.readable.getReader();

        let partialLine = '';

        try {
            while (isPulseRunning) {
                const { value, done } = await pulseReader.read();
                if (done) break;

                partialLine += value;
                const lines = partialLine.split('\n');
                
                for (let i = 0; i < lines.length - 1; i++) {
                    const line = lines[i].trim();
                    if (line) {
                        const val = parseInt(line, 10);
                        if (!isNaN(val)) {
                            processPulseValue(val);
                        }
                    }
                }
                partialLine = lines[lines.length - 1];
            }
        } catch (err) {
            console.error('Serial read error:', err);
        } finally {
            if (pulseReader) {
                pulseReader.releaseLock();
            }
        }
    }

    function processPulseValue(val) {
        pulseDataPoints.push(val);
        pulseDataPoints.shift();
        
        // Only update the chart every 3rd point (approx 33 fps) to save CPU
        updateCounter++;
        if (updateCounter % 3 === 0 && pulseChartInstance) {
            pulseChartInstance.update('none'); 
        }

        // Auto-calibrate the threshold every 2 seconds (200 points) to avoid double-counting
        if (updateCounter % 200 === 0) {
            let recentData = pulseDataPoints.slice(-200);
            let localMax = Math.max(...recentData);
            let localMin = Math.min(...recentData);
            
            // Set threshold at 75% of the wave height. This is crucial because heartbeats 
            // have a secondary "echo" bump (dicrotic notch). A 75% threshold ensures 
            // we only count the absolute peak of the true beat!
            if (localMax - localMin > 15) {
                pulseThreshold = localMin + (localMax - localMin) * 0.75;
            }
        }

        const now = Date.now();
        
        // Auto-reset to 0 if no heartbeat is detected for 15 seconds
        if (lastBeatTime > 0 && (now - lastBeatTime > 15000)) {
            bpmValues = [];
            const display = document.getElementById('pulseBpmDisplay');
            if (display && display.textContent !== '0') {
                display.textContent = '0';
            }
        }
        
        // Apply a simple low-pass filter to smooth out high-frequency noise spikes
        smoothedVal = 0.8 * smoothedVal + 0.2 * val;
        
        // Use the smoothed value for thresholding
        if (smoothedVal > pulseThreshold && !isBeat) {
            isBeat = true; // Mark that we are inside a heartbeat peak
            
            // Require at least 350ms between beats (max 171 BPM)
            if (now - lastBeatTime > 350) { 
                const bpm = Math.round(60000 / (now - lastBeatTime));
                // Extra safety: only count if it's between 40 and 150 BPM
                if (bpm > 40 && bpm <= 150) {
                    bpmValues.push(bpm);
                    // Keep a moving average of the last 8 beats to smooth the reading
                    if (bpmValues.length > 8) bpmValues.shift();
                    
                    const avgBpm = Math.round(bpmValues.reduce((a,b) => a + b, 0) / bpmValues.length);
                    const display = document.getElementById('pulseBpmDisplay');
                    if (display) display.textContent = avgBpm;
                }
                lastBeatTime = now;
            }
        } else if (smoothedVal < pulseThreshold - 15) {
            // Signal dropped enough below threshold, reset for next beat
            isBeat = false;
        }
    }

    return { render, afterRender, destroy };
})();
