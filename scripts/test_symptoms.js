const fs = require('fs');

function determineUrgency(answersDict) {
    const answers = Object.values(answersDict);
    const joinedAnswers = answers.join(' ').toLowerCase();

    // High urgency keywords
    if (joinedAnswers.includes('severe') || joinedAnswers.includes('blood') ||
        joinedAnswers.includes('more than a week') || joinedAnswers.includes('above 102') ||
        joinedAnswers.includes('very severe') || joinedAnswers.includes('can barely') ||
        joinedAnswers.includes('turning blue')) {
        return 'high';
    }

    // Moderate urgency keywords
    if (joinedAnswers.includes('moderate') || joinedAnswers.includes('more than 3 days') ||
        joinedAnswers.includes('several days') || joinedAnswers.includes('disturbing') ||
        joinedAnswers.includes('2-3 days') || joinedAnswers.includes('100-102')) {
        return 'moderate';
    }

    return 'mild';
}

function testSymptomEdgeCases() {
    console.log('--- Starting Symptom Checker Edge Cases Test ---');
    const data = JSON.parse(fs.readFileSync('./data/symptoms.json', 'utf8'));
    const symptoms = data.symptomSets;

    let passedCount = 0;
    let failedCount = 0;

    symptoms.forEach(symptom => {
        // Test Case 1: Max Severity Answers (Should yield 'high' or 'moderate')
        const maxSeverityAnswers = {};
        symptom.followUp.forEach(q => {
            // usually the worst answer is the last option or contains "severe", "more than", "blood"
            maxSeverityAnswers[q.id] = q.options.find(opt => 
                opt.toLowerCase().includes('severe') || 
                opt.toLowerCase().includes('blood') || 
                opt.toLowerCase().includes('more than') ||
                opt.toLowerCase().includes('yes')
            ) || q.options[q.options.length - 1]; 
        });

        const maxUrgency = determineUrgency(maxSeverityAnswers);

        // Test Case 2: Minimal Severity Answers (Should yield 'mild')
        const minSeverityAnswers = {};
        symptom.followUp.forEach(q => {
            minSeverityAnswers[q.id] = q.options.find(opt => 
                opt.toLowerCase().includes('mild') || 
                opt.toLowerCase().includes('no') || 
                opt.toLowerCase().includes('less than') ||
                opt.toLowerCase().includes('just started')
            ) || q.options[0]; 
        });

        const minUrgency = determineUrgency(minSeverityAnswers);

        // Verify that resolutions exist for the determined urgencies
        const hasMaxResult = !!symptom.results[maxUrgency];
        const hasMinResult = !!symptom.results[minUrgency];

        if (hasMaxResult && hasMinResult) {
            passedCount++;
        } else {
            console.error(`❌ FAILED: ${symptom.name} missing results mapping for calculated urgencies (${minUrgency}, ${maxUrgency})`);
            failedCount++;
        }
    });

    console.log(`\nResults: ${passedCount} passed, ${failedCount} failed.`);
    if (failedCount === 0) {
        console.log('✅ All symptom edge cases verified successfully.');
    }
}

testSymptomEdgeCases();
