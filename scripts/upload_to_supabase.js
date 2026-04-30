const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://wwbidirqjnbgxlffwhot.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3YmlkaXJxam5iZ3hsZmZ3aG90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MDQ5MDksImV4cCI6MjA5Mjk4MDkwOX0.NBcQKzSlZb1SgZ3YZtj4Ac8SDcBaCNYlu-sXF1s8mS8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function uploadData() {
    console.log('Uploading Medicines...');
    const medicinesData = JSON.parse(fs.readFileSync('./data/medicines.json', 'utf8'));
    
    // Convert alternatives to store as stringified JSON or standard array since Supabase JSONB expects array/object
    const formattedMedicines = medicinesData.medicines.map(m => ({
        id: m.id,
        name: m.name,
        generic_name: m.genericName,
        brand_names: m.brandNames || [],
        category: m.category,
        purpose: m.purpose,
        dosage: m.dosage,
        food_interaction: m.foodInteraction || m.foodInteractions || '',
        side_effects: m.sideEffects || [],
        precautions: m.precautions || [],
        warnings: m.warnings || [],
        alternatives: m.alternatives || [],
        price_tier: m.priceTier || 'medium'
    }));

    const { error: medError } = await supabase.from('medicines').upsert(formattedMedicines);
    if (medError) {
        console.error('Error uploading medicines:', medError);
    } else {
        console.log(`Successfully uploaded ${formattedMedicines.length} medicines.`);
    }

    console.log('Uploading Symptoms...');
    const symptomsData = JSON.parse(fs.readFileSync('./data/symptoms.json', 'utf8'));
    
    const formattedSymptoms = symptomsData.symptomSets.map(s => ({
        id: s.id,
        name: s.name,
        keywords: s.keywords || [],
        follow_up: s.followUp || [],
        results: s.results || {}
    }));

    const { error: symError } = await supabase.from('symptoms_dictionary').upsert(formattedSymptoms);
    if (symError) {
        console.error('Error uploading symptoms:', symError);
    } else {
        console.log(`Successfully uploaded ${formattedSymptoms.length} symptoms.`);
    }
}

uploadData().catch(console.error);
