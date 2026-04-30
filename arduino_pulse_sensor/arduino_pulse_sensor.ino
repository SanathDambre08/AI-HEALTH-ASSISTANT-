// Minimal Pulse Sensor Sketch for Web Serial API Integration
// Sends raw analog data to the serial port at 115200 baud.

const int PULSE_PIN = A0; // Pulse Sensor connected to analog pin A0

void setup() {
  // Initialize serial communication at 115200 baud rate.
  // Make sure your browser's Web Serial connection uses this same baud rate!
  Serial.begin(115200);
}

void loop() {
  // Read the analog value from the sensor
  int pulseValue = analogRead(PULSE_PIN);
  
  // Print the value to the Serial Monitor followed by a newline
  Serial.println(pulseValue);
  
  // Small delay to stabilize the readings. 
  // 10ms gives roughly 100 samples per second, good for heartbeat visualization.
  delay(10);
}
