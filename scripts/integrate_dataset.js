const fs = require('fs');
const path = require('path');

const datasetPath = path.join(__dirname, '../datasetbase /health_dataset.json');
const medicinesPath = path.join(__dirname, '../data/medicines.json');
const symptomsPath = path.join(__dirname, '../data/symptoms.json');

const rawData = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));

// 1. Process Medicines
const processedMedicines = rawData.medicines.map((med, index) => {
    // Parse Name and Generic Name
    let name = med.name;
    let genericName = med.name;
    
    if (name.includes('(')) {
        const parts = name.split('(');
        name = parts[0].trim();
        genericName = parts[1].replace(')', '').trim();
    } else if (name.includes('/')) {
        const parts = name.split('/');
        name = parts[0].trim();
        genericName = parts[1].trim();
    }

    // Parse Precautions and Warnings
    const rawPrecautions = (med.precautions || '').split(/;|(?<=\.) /).map(p => p.trim()).filter(p => p);
    const precautions = [];
    const warnings = [];
    
    rawPrecautions.forEach(p => {
        const lower = p.toLowerCase();
        if (lower.includes('do not') || lower.includes('avoid') || lower.includes('fatal') || lower.includes('caution')) {
            warnings.push(p);
        } else {
            precautions.push(p);
        }
    });

    if (precautions.length === 0 && warnings.length > 0) {
        precautions.push(...warnings);
    }

    // Parse Alternatives
    const alternatives = [];
    let brandNames = [];
    if (med.alternative) {
        const alts = med.alternative.split(',').map(a => a.trim()).filter(a => a);
        brandNames = [...alts];
        alts.forEach(a => {
            alternatives.push({
                name: a,
                note: "Alternative brand/generic"
            });
        });
    }

    return {
        id: index + 1,
        name: name,
        genericName: genericName,
        brandNames: brandNames,
        category: med.category || 'General',
        purpose: med.use || 'Not specified',
        dosage: med.dosage_guidance || 'Consult physician',
        sideEffects: ["Refer to precautions or consult a doctor"],
        precautions: precautions.length ? precautions : ["Use with caution"],
        foodInteraction: "Follow standard medical advice; avoid alcohol if unsure.",
        alternatives: alternatives,
        warnings: warnings,
        priceTier: "medium" // Default
    };
});

fs.writeFileSync(medicinesPath, JSON.stringify({ medicines: processedMedicines }, null, 2));
console.log(`Processed ${processedMedicines.length} medicines and saved to data/medicines.json`);

// 2. Process Symptoms
const processedSymptoms = rawData.guidance_mapping.map((mapping, index) => {
    const id = mapping.symptom.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const followUp = (mapping.follow_up_questions || []).map((q, i) => {
        let options = ["Yes", "No", "Not sure"];
        const lowerQ = q.toLowerCase();
        
        if (lowerQ.includes('how long')) {
            options = ["Less than 2 days", "2-5 days", "More than a week"];
        } else if (lowerQ.includes('temperature')) {
            options = ["Normal", "99-100°F (Mild)", "Above 101°F (High)"];
        } else if (lowerQ.includes('how severe') || lowerQ.includes('intensity')) {
            options = ["Mild", "Moderate", "Severe"];
        }

        return {
            id: `q${i}`,
            question: q,
            options: options
        };
    });

    const causes = mapping.possible_conditions || ["Undiagnosed condition"];
    const homeRemedies = mapping.general_advice || [];
    const advice = homeRemedies.join('. ');
    const doctorReason = mapping.when_to_consult_doctor || "If symptoms persist or worsen.";

    const baseResult = {
        causes: causes,
        advice: advice || "Monitor your symptoms closely.",
        homeRemedies: homeRemedies,
        medicines: ["Consult a doctor or pharmacist"]
    };

    return {
        id: id,
        name: mapping.symptom,
        keywords: [mapping.symptom.toLowerCase()],
        followUp: followUp,
        results: {
            mild: {
                ...baseResult,
                seeDoctor: false
            },
            moderate: {
                ...baseResult,
                seeDoctor: true,
                doctorReason: doctorReason
            },
            high: {
                ...baseResult,
                advice: "Seek immediate medical attention. " + advice,
                seeDoctor: true,
                doctorReason: doctorReason
            }
        }
    };
});

fs.writeFileSync(symptomsPath, JSON.stringify({ symptomSets: processedSymptoms }, null, 2));
console.log(`Processed ${processedSymptoms.length} symptoms and saved to data/symptoms.json`);
