import json

new_medicines = [
    {
        "name": "Amoxicillin/Clavulanate (Augmentin)",
        "use": "Treats bacterial infections such as pneumonia, ear infections, and sinusitis",
        "dosage_guidance": "500mg-875mg every 12 hours",
        "precautions": "Take with food to minimize GI upset; risk of severe diarrhea",
        "category": "Antibiotic (Penicillin/Beta-lactamase inhibitor)",
        "alternative": "Cefdinir"
    },
    {
        "name": "Azithromycin (Zithromax)",
        "use": "Treats respiratory infections, skin infections, and certain STIs",
        "dosage_guidance": "Z-Pak: 500mg day 1, then 250mg days 2-5",
        "precautions": "Can cause QT prolongation (heart rhythm changes); avoid antacids with aluminum/magnesium",
        "category": "Antibiotic (Macrolide)",
        "alternative": "Clarithromycin"
    },
    {
        "name": "Doxycycline (Vibramycin)",
        "use": "Treats acne, Lyme disease, malaria prevention, and respiratory infections",
        "dosage_guidance": "100mg twice daily",
        "precautions": "Causes severe sun sensitivity; do not lie down for 30 mins after taking; avoid in children under 8 (teeth staining)",
        "category": "Antibiotic (Tetracycline)",
        "alternative": "Minocycline"
    },
    {
        "name": "Ciprofloxacin (Cipro)",
        "use": "Treats UTIs, bone infections, and infectious diarrhea",
        "dosage_guidance": "250mg-500mg twice daily",
        "precautions": "Black box warning for tendon rupture and neuropathy; avoid dairy/calcium supplements around dose time",
        "category": "Antibiotic (Fluoroquinolone)",
        "alternative": "Levofloxacin"
    },
    {
        "name": "Fluconazole (Diflucan)",
        "use": "Treats vaginal, oral, and systemic yeast/fungal infections",
        "dosage_guidance": "150mg single dose for vaginal yeast infection",
        "precautions": "Many drug interactions; may cause liver enzyme elevation",
        "category": "Antifungal",
        "alternative": "Ketoconazole"
    },
    {
        "name": "Valacyclovir (Valtrex)",
        "use": "Treats cold sores, genital herpes, and shingles",
        "dosage_guidance": "500mg-1g once or twice daily depending on condition",
        "precautions": "Maintain adequate hydration to prevent kidney damage",
        "category": "Antiviral",
        "alternative": "Acyclovir"
    },
    {
        "name": "Oseltamivir (Tamiflu)",
        "use": "Treats and prevents influenza A and B",
        "dosage_guidance": "75mg twice daily for 5 days",
        "precautions": "Must start within 48 hours of symptom onset; may cause nausea and neuropsychiatric effects",
        "category": "Antiviral",
        "alternative": "Zanamivir"
    },
    {
        "name": "Bictegravir/Emtricitabine/Tenofovir alafenamide (Biktarvy)",
        "use": "Complete regimen for HIV-1 treatment",
        "dosage_guidance": "1 tablet daily",
        "precautions": "Monitor kidney and bone density; risk of lactic acidosis",
        "category": "Antiretroviral",
        "alternative": "Triumeq"
    },
    {
        "name": "Amlodipine (Norvasc)",
        "use": "Treats high blood pressure and chest pain (angina)",
        "dosage_guidance": "5mg-10mg once daily",
        "precautions": "Commonly causes swelling in the ankles/feet (edema) and flushing",
        "category": "Calcium Channel Blocker",
        "alternative": "Nifedipine"
    },
    {
        "name": "Lisinopril (Zestril)",
        "use": "Treats high blood pressure, heart failure, and protects kidneys in diabetes",
        "dosage_guidance": "10mg-40mg once daily",
        "precautions": "Can cause a persistent dry cough and elevated potassium levels; avoid in pregnancy",
        "category": "ACE Inhibitor",
        "alternative": "Losartan"
    },
    {
        "name": "Losartan (Cozaar)",
        "use": "Treats high blood pressure and protects kidneys in diabetics",
        "dosage_guidance": "50mg-100mg once daily",
        "precautions": "Does not cause the cough associated with ACE inhibitors; avoid in pregnancy",
        "category": "Angiotensin II Receptor Blocker (ARB)",
        "alternative": "Valsartan"
    },
    {
        "name": "Metoprolol (Lopressor, Toprol XL)",
        "use": "Treats high blood pressure, angina, and heart failure",
        "dosage_guidance": "25mg-100mg daily",
        "precautions": "Can cause fatigue and slow heart rate; do not stop abruptly or it may cause a heart attack",
        "category": "Beta Blocker",
        "alternative": "Atenolol"
    },
    {
        "name": "Atorvastatin (Lipitor)",
        "use": "Lowers cholesterol and triglycerides, prevents heart attacks",
        "dosage_guidance": "10mg-80mg daily",
        "precautions": "Can cause muscle pain or weakness (myopathy); avoid grapefruit juice",
        "category": "Statin",
        "alternative": "Rosuvastatin"
    },
    {
        "name": "Rosuvastatin (Crestor)",
        "use": "Lowers cholesterol and prevents cardiovascular disease",
        "dosage_guidance": "5mg-40mg daily",
        "precautions": "More potent than atorvastatin; take at the same time each day",
        "category": "Statin",
        "alternative": "Simvastatin"
    },
    {
        "name": "Clopidogrel (Plavix)",
        "use": "Prevents blood clots after a heart attack or stroke",
        "dosage_guidance": "75mg once daily",
        "precautions": "Increases risk of bleeding; stop taking before certain surgeries",
        "category": "Antiplatelet",
        "alternative": "Ticagrelor"
    },
    {
        "name": "Apixaban (Eliquis)",
        "use": "Prevents strokes and blood clots (DVT/PE)",
        "dosage_guidance": "2.5mg-5mg twice daily",
        "precautions": "No routine blood monitoring needed, but increases bleeding risk significantly",
        "category": "Anticoagulant (DOAC)",
        "alternative": "Rivaroxaban"
    },
    {
        "name": "Spironolactone (Aldactone)",
        "use": "Treats heart failure, fluid retention, and acne (off-label)",
        "dosage_guidance": "25mg-100mg daily",
        "precautions": "Can cause high potassium levels; may cause breast enlargement in men (gynecomastia)",
        "category": "Potassium-sparing Diuretic",
        "alternative": "Eplerenone"
    },
    {
        "name": "Furosemide (Lasix)",
        "use": "Treats fluid retention (edema) and heart failure",
        "dosage_guidance": "20mg-80mg daily",
        "precautions": "Causes frequent urination; depletes potassium, requiring supplements",
        "category": "Loop Diuretic",
        "alternative": "Torsemide"
    },
    {
        "name": "Albuterol (ProAir, Ventolin)",
        "use": "Relieves acute bronchospasm in asthma and COPD",
        "dosage_guidance": "1-2 puffs every 4-6 hours as needed",
        "precautions": "Can cause tremors, rapid heart rate, and nervousness",
        "category": "Short-acting Beta Agonist (SABA)",
        "alternative": "Levalbuterol"
    },
    {
        "name": "Fluticasone (Flonase)",
        "use": "Treats nasal congestion, sneezing, and allergy symptoms",
        "dosage_guidance": "1-2 sprays per nostril daily",
        "precautions": "May cause nosebleeds; takes a few days to reach full effect",
        "category": "Nasal Corticosteroid",
        "alternative": "Budesonide"
    },
    {
        "name": "Montelukast (Singulair)",
        "use": "Prevents asthma attacks and treats allergies",
        "dosage_guidance": "10mg once daily in the evening",
        "precautions": "Can cause mood changes or nightmares",
        "category": "Leukotriene Receptor Antagonist",
        "alternative": "Zafirlukast"
    },
    {
        "name": "Cetirizine (Zyrtec)",
        "use": "Treats seasonal allergies and hives",
        "dosage_guidance": "10mg once daily",
        "precautions": "May cause more drowsiness than other 2nd-generation antihistamines",
        "category": "Antihistamine",
        "alternative": "Loratadine"
    },
    {
        "name": "Loratadine (Claritin)",
        "use": "Treats seasonal allergies without causing significant drowsiness",
        "dosage_guidance": "10mg once daily",
        "precautions": "Generally well-tolerated and non-drowsy",
        "category": "Antihistamine",
        "alternative": "Fexofenadine"
    },
    {
        "name": "Diphenhydramine (Benadryl)",
        "use": "Treats severe allergic reactions, insomnia, and motion sickness",
        "dosage_guidance": "25mg-50mg every 4-6 hours",
        "precautions": "Highly sedating; causes dry mouth and confusion in elderly patients",
        "category": "First-generation Antihistamine",
        "alternative": "Chlorpheniramine"
    },
    {
        "name": "Omeprazole (Prilosec)",
        "use": "Treats GERD, stomach ulcers, and acid reflux",
        "dosage_guidance": "20mg-40mg daily before meals",
        "precautions": "Long-term use may lower magnesium and B12 levels",
        "category": "Proton Pump Inhibitor",
        "alternative": "Pantoprazole"
    },
    {
        "name": "Famotidine (Pepcid)",
        "use": "Treats heartburn and acid indigestion",
        "dosage_guidance": "20mg twice daily",
        "precautions": "Faster onset than PPIs but shorter duration of action",
        "category": "H2 Blocker",
        "alternative": "Ranitidine"
    },
    {
        "name": "Ondansetron (Zofran)",
        "use": "Prevents nausea and vomiting",
        "dosage_guidance": "4mg-8mg every 8 hours",
        "precautions": "Can cause headache, constipation, and QT prolongation",
        "category": "Antiemetic",
        "alternative": "Promethazine"
    },
    {
        "name": "Metformin (Glucophage)",
        "use": "First-line treatment for Type 2 diabetes",
        "dosage_guidance": "500mg-1000mg twice daily with meals",
        "precautions": "Causes GI upset/diarrhea initially; rare risk of lactic acidosis",
        "category": "Biguanide",
        "alternative": "Glipizide"
    },
    {
        "name": "Glipizide (Glucotrol)",
        "use": "Lowers blood sugar in Type 2 diabetes",
        "dosage_guidance": "5mg-10mg daily",
        "precautions": "Can cause severe low blood sugar (hypoglycemia) and weight gain",
        "category": "Sulfonylurea",
        "alternative": "Glimepiride"
    },
    {
        "name": "Insulin Glargine (Lantus)",
        "use": "Long-acting insulin for Type 1 and Type 2 diabetes",
        "dosage_guidance": "Injected once daily",
        "precautions": "Monitor for hypoglycemia; must be refrigerated before first use",
        "category": "Long-acting Insulin",
        "alternative": "Insulin Detemir"
    },
    {
        "name": "Levothyroxine (Synthroid)",
        "use": "Treats an underactive thyroid (hypothyroidism)",
        "dosage_guidance": "Varies by patient weight and lab results",
        "precautions": "Must be taken on an empty stomach 30-60 mins before breakfast",
        "category": "Thyroid Hormone Replacement",
        "alternative": "Liothyronine"
    },
    {
        "name": "Sertraline (Zoloft)",
        "use": "Treats depression, anxiety, panic disorder, and OCD",
        "dosage_guidance": "50mg-200mg daily",
        "precautions": "May increase suicidal thoughts in young adults initially; takes 4-6 weeks to work",
        "category": "SSRI Antidepressant",
        "alternative": "Escitalopram"
    },
    {
        "name": "Escitalopram (Lexapro)",
        "use": "Treats depression and generalized anxiety disorder",
        "dosage_guidance": "10mg-20mg daily",
        "precautions": "Well-tolerated but can cause sexual dysfunction or weight gain",
        "category": "SSRI Antidepressant",
        "alternative": "Citalopram"
    },
    {
        "name": "Bupropion (Wellbutrin)",
        "use": "Treats depression and helps quit smoking",
        "dosage_guidance": "150mg-300mg daily",
        "precautions": "Lowers the seizure threshold; do not use in patients with eating disorders",
        "category": "Atypical Antidepressant",
        "alternative": "Venlafaxine"
    },
    {
        "name": "Duloxetine (Cymbalta)",
        "use": "Treats depression, anxiety, and nerve pain (neuropathy)",
        "dosage_guidance": "30mg-60mg daily",
        "precautions": "Can cause severe withdrawal symptoms if stopped abruptly",
        "category": "SNRI Antidepressant",
        "alternative": "Venlafaxine"
    },
    {
        "name": "Alprazolam (Xanax)",
        "use": "Treats severe anxiety and panic attacks",
        "dosage_guidance": "0.25mg-0.5mg as needed",
        "precautions": "Highly addictive; do not mix with alcohol; causes drowsiness",
        "category": "Benzodiazepine",
        "alternative": "Clonazepam"
    },
    {
        "name": "Zolpidem (Ambien)",
        "use": "Treats insomnia",
        "dosage_guidance": "5mg-10mg right before bedtime",
        "precautions": "Can cause complex sleep behaviors (e.g., sleepwalking, sleep-eating)",
        "category": "Sedative/Hypnotic",
        "alternative": "Eszopiclone"
    },
    {
        "name": "Gabapentin (Neurontin)",
        "use": "Treats nerve pain, shingles pain, and seizures",
        "dosage_guidance": "300mg-600mg three times daily",
        "precautions": "Causes drowsiness and dizziness; dose must be tapered to stop",
        "category": "Anticonvulsant",
        "alternative": "Pregabalin"
    },
    {
        "name": "Pregabalin (Lyrica)",
        "use": "Treats fibromyalgia, nerve pain, and seizures",
        "dosage_guidance": "75mg-150mg twice daily",
        "precautions": "Can cause weight gain, swelling of the hands/feet, and sedation",
        "category": "Anticonvulsant",
        "alternative": "Gabapentin"
    },
    {
        "name": "Methylphenidate (Ritalin, Concerta)",
        "use": "Treats ADHD and narcolepsy",
        "dosage_guidance": "Varies significantly by formulation",
        "precautions": "Stimulant; causes insomnia, appetite loss, and increased heart rate",
        "category": "CNS Stimulant",
        "alternative": "Amphetamine salts (Adderall)"
    },
    {
        "name": "Amphetamine/Dextroamphetamine (Adderall)",
        "use": "Treats ADHD and narcolepsy",
        "dosage_guidance": "10mg-20mg daily",
        "precautions": "High potential for abuse; can cause high blood pressure and anxiety",
        "category": "CNS Stimulant",
        "alternative": "Lisdexamfetamine"
    },
    {
        "name": "Ibuprofen (Advil, Motrin)",
        "use": "Reduces pain, fever, and inflammation",
        "dosage_guidance": "400mg-800mg every 6-8 hours",
        "precautions": "Can cause stomach ulcers and kidney damage with long-term use",
        "category": "NSAID",
        "alternative": "Naproxen"
    },
    {
        "name": "Naproxen (Aleve)",
        "use": "Relieves pain and inflammation with a longer duration than ibuprofen",
        "dosage_guidance": "220mg-500mg twice daily",
        "precautions": "Take with food to prevent GI irritation; increases heart attack risk",
        "category": "NSAID",
        "alternative": "Ibuprofen"
    },
    {
        "name": "Acetaminophen (Tylenol)",
        "use": "Relieves pain and reduces fever",
        "dosage_guidance": "500mg-1000mg every 4-6 hours",
        "precautions": "Do not exceed 4000mg per day to prevent severe liver damage",
        "category": "Analgesic/Antipyretic",
        "alternative": "Ibuprofen"
    },
    {
        "name": "Meloxicam (Mobic)",
        "use": "Treats osteoarthritis and rheumatoid arthritis",
        "dosage_guidance": "7.5mg-15mg once daily",
        "precautions": "NSAID risks apply (stomach bleeding, cardiovascular risk)",
        "category": "NSAID",
        "alternative": "Celecoxib"
    },
    {
        "name": "Celecoxib (Celebrex)",
        "use": "Treats arthritis pain with less risk of stomach ulcers",
        "dosage_guidance": "100mg-200mg twice daily",
        "precautions": "Avoid in patients with sulfa allergies or severe heart disease",
        "category": "COX-2 Inhibitor NSAID",
        "alternative": "Meloxicam"
    },
    {
        "name": "Tramadol (Ultram)",
        "use": "Treats moderate to severe pain",
        "dosage_guidance": "50mg every 4-6 hours",
        "precautions": "Lowers seizure threshold; can cause serotonin syndrome if mixed with antidepressants",
        "category": "Opioid Analgesic",
        "alternative": "Hydrocodone"
    },
    {
        "name": "Oxycodone (Roxicodone, OxyContin)",
        "use": "Treats severe pain",
        "dosage_guidance": "5mg-15mg every 4-6 hours for acute pain",
        "precautions": "Extremely high risk for addiction and respiratory depression",
        "category": "Opioid Analgesic",
        "alternative": "Morphine"
    },
    {
        "name": "Pantoprazole (Protonix)",
        "use": "Treats acid reflux and prevents stress ulcers in hospitals",
        "dosage_guidance": "40mg once daily",
        "precautions": "May increase risk of C. diff infections with long-term use",
        "category": "Proton Pump Inhibitor",
        "alternative": "Omeprazole"
    },
    {
        "name": "Cyclobenzaprine (Flexeril)",
        "use": "Treats muscle spasms and acute musculoskeletal pain",
        "dosage_guidance": "5mg-10mg three times daily",
        "precautions": "Causes extreme drowsiness and dry mouth",
        "category": "Muscle Relaxant",
        "alternative": "Methocarbamol"
    },
    {
        "name": "Tamsulosin (Flomax)",
        "use": "Treats enlarged prostate (BPH) and helps pass kidney stones",
        "dosage_guidance": "0.4mg once daily",
        "precautions": "Can cause sudden drop in blood pressure upon standing (orthostatic hypotension)",
        "category": "Alpha Blocker",
        "alternative": "Doxazosin"
    },
    {
        "name": "Finasteride (Proscar, Propecia)",
        "use": "Treats enlarged prostate and male pattern hair loss",
        "dosage_guidance": "1mg (hair) or 5mg (prostate) daily",
        "precautions": "Pregnant women should not handle crushed pills; may cause sexual dysfunction",
        "category": "5-Alpha Reductase Inhibitor",
        "alternative": "Dutasteride"
    },
    {
        "name": "Allopurinol (Zyloprim)",
        "use": "Prevents gout attacks and lowers uric acid",
        "dosage_guidance": "100mg-300mg daily",
        "precautions": "Stop immediately if a rash occurs (risk of severe allergic reaction)",
        "category": "Xanthine Oxidase Inhibitor",
        "alternative": "Febuxostat"
    },
    {
        "name": "Sildenafil (Viagra)",
        "use": "Treats erectile dysfunction",
        "dosage_guidance": "50mg one hour before sexual activity",
        "precautions": "Absolutely contraindicated with nitrates; can cause flushing and headache",
        "category": "PDE5 Inhibitor",
        "alternative": "Tadalafil"
    },
    {
        "name": "Tadalafil (Cialis)",
        "use": "Treats erectile dysfunction and enlarged prostate",
        "dosage_guidance": "5mg daily or 10-20mg as needed",
        "precautions": "Longer duration of action than Viagra (up to 36 hours); avoid nitrates",
        "category": "PDE5 Inhibitor",
        "alternative": "Sildenafil"
    },
    {
        "name": "Latanoprost (Xalatan)",
        "use": "Treats glaucoma by lowering pressure in the eye",
        "dosage_guidance": "1 drop in affected eye(s) once daily in the evening",
        "precautions": "Can permanently change eye color to brown and increase eyelash growth",
        "category": "Prostaglandin Analog",
        "alternative": "Bimatoprost"
    },
    {
        "name": "Aripiprazole (Abilify)",
        "use": "Treats schizophrenia, bipolar disorder, and depression",
        "dosage_guidance": "2mg-15mg daily",
        "precautions": "Can cause restlessness (akathisia) and weight gain",
        "category": "Atypical Antipsychotic",
        "alternative": "Risperidone"
    },
    {
        "name": "Quetiapine (Seroquel)",
        "use": "Treats schizophrenia, bipolar disorder, and insomnia (off-label)",
        "dosage_guidance": "25mg-400mg daily depending on condition",
        "precautions": "Highly sedating; causes significant weight gain and metabolic changes",
        "category": "Atypical Antipsychotic",
        "alternative": "Olanzapine"
    },
    {
        "name": "Diclofenac (Voltaren)",
        "use": "Treats arthritis and acute pain (available orally and topically)",
        "dosage_guidance": "Topical gel applied 2-4 times daily; oral 50mg twice daily",
        "precautions": "Topical has fewer GI risks than oral, but still carries cardiovascular warnings",
        "category": "NSAID",
        "alternative": "Ibuprofen"
    },
    {
        "name": "Benzonatate (Tessalon Perles)",
        "use": "Relieves cough by numbing the throat and lungs",
        "dosage_guidance": "100mg-200mg three times daily",
        "precautions": "Swallow whole; chewing can cause dangerous numbness in the mouth/throat",
        "category": "Antitussive",
        "alternative": "Dextromethorphan"
    },
    {
        "name": "Guaifenesin (Mucinex)",
        "use": "Thins and loosens mucus in the chest",
        "dosage_guidance": "600mg-1200mg every 12 hours",
        "precautions": "Must drink plenty of water to help thin the mucus",
        "category": "Expectorant",
        "alternative": "Saline nebulizer"
    },
    {
        "name": "Levetiracetam (Keppra)",
        "use": "Prevents and treats seizures",
        "dosage_guidance": "500mg twice daily",
        "precautions": "Can cause severe mood swings, aggression, and fatigue",
        "category": "Anticonvulsant",
        "alternative": "Lacosamide"
    },
    {
        "name": "Mirtazapine (Remeron)",
        "use": "Treats depression, insomnia, and loss of appetite",
        "dosage_guidance": "15mg at bedtime",
        "precautions": "Causes massive appetite increase and weight gain; highly sedating at lower doses",
        "category": "Atypical Antidepressant",
        "alternative": "Trazodone"
    },
    {
        "name": "Divalproex (Depakote)",
        "use": "Treats bipolar mania, seizures, and prevents migraines",
        "dosage_guidance": "250mg-500mg twice daily",
        "precautions": "Toxic to liver; severe birth defects; causes weight gain and hair loss",
        "category": "Anticonvulsant / Mood Stabilizer",
        "alternative": "Lamotrigine"
    },
    {
        "name": "Lamotrigine (Lamictal)",
        "use": "Treats bipolar disorder and seizures",
        "dosage_guidance": "Requires slow titration to avoid severe skin rash",
        "precautions": "Risk of Stevens-Johnson Syndrome (life-threatening rash) if titrated too quickly",
        "category": "Anticonvulsant / Mood Stabilizer",
        "alternative": "Divalproex"
    },
    {
        "name": "Acyclovir (Zovirax)",
        "use": "Treats herpes simplex, chickenpox, and shingles",
        "dosage_guidance": "400mg three times daily for herpes",
        "precautions": "Needs frequent dosing compared to valacyclovir; stay hydrated",
        "category": "Antiviral",
        "alternative": "Valacyclovir"
    },
    {
        "name": "Clindamycin (Cleocin)",
        "use": "Treats skin infections, dental infections, and PID",
        "dosage_guidance": "150mg-300mg every 6-8 hours",
        "precautions": "High risk of causing C. diff colitis (severe diarrhea)",
        "category": "Antibiotic (Lincosamide)",
        "alternative": "Amoxicillin"
    },
    {
        "name": "Nitrofurantoin (Macrobid)",
        "use": "Treats and prevents urinary tract infections (UTIs)",
        "dosage_guidance": "100mg twice daily for 5-7 days",
        "precautions": "Will turn urine brown; take with food; avoid in poor kidney function",
        "category": "Antibiotic",
        "alternative": "Bactrim"
    },
    {
        "name": "Bactrim (Sulfamethoxazole/Trimethoprim)",
        "use": "Treats UTIs, skin infections (MRSA), and bronchitis",
        "dosage_guidance": "1 double-strength tablet twice daily",
        "precautions": "Avoid if sulfa allergy exists; drink lots of water; causes sun sensitivity",
        "category": "Antibiotic",
        "alternative": "Nitrofurantoin"
    },
    {
        "name": "Cefdinir (Omnicef)",
        "use": "Treats ear infections, sinus infections, and bronchitis",
        "dosage_guidance": "300mg twice daily",
        "precautions": "May cause reddish stools if taken with iron supplements",
        "category": "Antibiotic (Cephalosporin)",
        "alternative": "Amoxicillin"
    },
    {
        "name": "Methotrexate (Trexall)",
        "use": "Treats rheumatoid arthritis, psoriasis, and some cancers",
        "dosage_guidance": "Taken ONCE WEEKLY",
        "precautions": "Highly toxic; requires folic acid supplementation; severe birth defects",
        "category": "DMARD",
        "alternative": "Hydroxychloroquine"
    },
    {
        "name": "Hydroxychloroquine (Plaquenil)",
        "use": "Treats lupus, rheumatoid arthritis, and prevents malaria",
        "dosage_guidance": "200mg-400mg daily",
        "precautions": "Requires yearly eye exams due to risk of retinal toxicity",
        "category": "DMARD / Antimalarial",
        "alternative": "Methotrexate"
    },
    {
        "name": "Adalimumab (Humira)",
        "use": "Treats autoimmune diseases like Crohn's, RA, and psoriasis",
        "dosage_guidance": "Subcutaneous injection every 2 weeks",
        "precautions": "Lowers immune system; test for tuberculosis before starting",
        "category": "Biologic (TNF-alpha inhibitor)",
        "alternative": "Etanercept"
    },
    {
        "name": "Oxybutynin (Ditropan)",
        "use": "Treats overactive bladder and urinary incontinence",
        "dosage_guidance": "5mg 2-3 times daily",
        "precautions": "Causes severe dry mouth, constipation, and confusion in elderly",
        "category": "Anticholinergic",
        "alternative": "Mirabegron"
    },
    {
        "name": "Donepezil (Aricept)",
        "use": "Treats dementia associated with Alzheimer's disease",
        "dosage_guidance": "5mg-10mg daily at bedtime",
        "precautions": "Can cause vivid dreams, nausea, and a slow heart rate",
        "category": "Cholinesterase Inhibitor",
        "alternative": "Memantine"
    },
    {
        "name": "Memantine (Namenda)",
        "use": "Treats moderate to severe Alzheimer's disease",
        "dosage_guidance": "5mg-10mg twice daily",
        "precautions": "Generally well-tolerated; may cause dizziness or confusion",
        "category": "NMDA Receptor Antagonist",
        "alternative": "Donepezil"
    },
    {
        "name": "Carbidopa/Levodopa (Sinemet)",
        "use": "First-line treatment for Parkinson's disease",
        "dosage_guidance": "25/100mg 3-4 times daily",
        "precautions": "Can cause dyskinesias (involuntary movements); darkens urine/sweat",
        "category": "Dopamine Precursor",
        "alternative": "Pramipexole"
    },
    {
        "name": "Pramipexole (Mirapex)",
        "use": "Treats Parkinson's disease and Restless Legs Syndrome",
        "dosage_guidance": "0.125mg-1.5mg three times daily",
        "precautions": "Can cause sudden sleep attacks and compulsive behaviors (e.g., gambling)",
        "category": "Dopamine Agonist",
        "alternative": "Ropinirole"
    },
    {
        "name": "Baclofen (Lioresal)",
        "use": "Treats severe muscle spasticity (e.g., in MS or spinal cord injury)",
        "dosage_guidance": "5mg-20mg three times daily",
        "precautions": "Do not stop abruptly to avoid severe withdrawal/seizures; causes sedation",
        "category": "Muscle Relaxant",
        "alternative": "Tizanidine"
    },
    {
        "name": "Lidocaine Patch (Lidoderm)",
        "use": "Topical pain relief for shingles (postherpetic neuralgia)",
        "dosage_guidance": "Apply up to 3 patches for 12 hours on, 12 hours off",
        "precautions": "Do not wear for more than 12 hours to prevent toxicity",
        "category": "Topical Anesthetic",
        "alternative": "Capsaicin cream"
    },
    {
        "name": "Docusate Sodium (Colace)",
        "use": "Stool softener for preventing constipation",
        "dosage_guidance": "100mg twice daily",
        "precautions": "Take with plenty of water; does not stimulate a bowel movement",
        "category": "Laxative",
        "alternative": "Polyethylene Glycol"
    },
    {
        "name": "Polyethylene Glycol (Miralax)",
        "use": "Treats occasional constipation",
        "dosage_guidance": "17g dissolved in 8oz liquid daily",
        "precautions": "Safe for long term use; takes 1-3 days to work",
        "category": "Osmotic Laxative",
        "alternative": "Senna"
    },
    {
        "name": "Meclizine (Antivert)",
        "use": "Treats vertigo and motion sickness",
        "dosage_guidance": "12.5mg-25mg every 8-12 hours",
        "precautions": "Causes drowsiness; take 1 hour before travel for motion sickness",
        "category": "Antihistamine",
        "alternative": "Dimenhydrinate"
    },
    {
        "name": "Propranolol (Inderal)",
        "use": "Treats high blood pressure, tremors, performance anxiety, and migraines",
        "dosage_guidance": "10mg-40mg 2-4 times daily",
        "precautions": "Can worsen asthma; do not stop abruptly",
        "category": "Non-selective Beta Blocker",
        "alternative": "Metoprolol"
    },
    {
        "name": "Amiodarone (Pacerone)",
        "use": "Treats life-threatening irregular heart rhythms",
        "dosage_guidance": "200mg-400mg daily for maintenance",
        "precautions": "Toxic to lungs, liver, and thyroid; turns skin blue-gray in the sun",
        "category": "Antiarrhythmic",
        "alternative": "Sotalol"
    },
    {
        "name": "Ketorolac (Toradol)",
        "use": "Short-term treatment of moderate to severe pain",
        "dosage_guidance": "10mg every 4-6 hours",
        "precautions": "DO NOT use for more than 5 days total due to severe bleeding/kidney risk",
        "category": "NSAID",
        "alternative": "Ibuprofen"
    },
    {
        "name": "Colchicine (Colcrys)",
        "use": "Treats acute gout flare-ups",
        "dosage_guidance": "1.2mg immediately, then 0.6mg one hour later",
        "precautions": "Can cause severe diarrhea; numerous drug interactions",
        "category": "Anti-gout",
        "alternative": "Indomethacin"
    },
    {
        "name": "Chlorpheniramine (Chlor-Trimeton)",
        "use": "Treats allergy, cold, and hay fever symptoms",
        "dosage_guidance": "4mg every 4-6 hours",
        "precautions": "First-generation antihistamine; causes significant drowsiness",
        "category": "Antihistamine",
        "alternative": "Loratadine"
    },
    {
        "name": "Ezetimibe (Zetia)",
        "use": "Lowers cholesterol by preventing absorption in the gut",
        "dosage_guidance": "10mg daily",
        "precautions": "Often combined with a statin; generally well-tolerated",
        "category": "Cholesterol Absorption Inhibitor",
        "alternative": "Fenofibrate"
    },
    {
        "name": "Fenofibrate (Tricor)",
        "use": "Lowers very high triglycerides",
        "dosage_guidance": "48mg-145mg daily",
        "precautions": "Can increase risk of muscle pain if taken with a statin",
        "category": "Fibrate",
        "alternative": "Omega-3 fatty acids"
    },
    {
        "name": "Levonorgestrel (Plan B)",
        "use": "Emergency contraception",
        "dosage_guidance": "1.5mg single dose within 72 hours of unprotected sex",
        "precautions": "May cause irregular bleeding/nausea; less effective in heavier individuals",
        "category": "Progestin",
        "alternative": "Ulipristal"
    },
    {
        "name": "Ethinyl Estradiol / Norethindrone",
        "use": "Oral contraceptive (birth control pill)",
        "dosage_guidance": "Take 1 pill at the exact same time every day",
        "precautions": "Does not protect against STIs; increased risk of blood clots if smoking",
        "category": "Oral Contraceptive",
        "alternative": "IUD"
    },
    {
        "name": "Sumatriptan (Imitrex)",
        "use": "Treats acute migraine attacks",
        "dosage_guidance": "50mg-100mg at onset of migraine",
        "precautions": "Causes throat/chest tightness; do not use if history of heart attack",
        "category": "Triptan",
        "alternative": "Rizatriptan"
    },
    {
        "name": "Topiramate (Topamax)",
        "use": "Prevents migraines and treats seizures",
        "dosage_guidance": "25mg-50mg twice daily",
        "precautions": "Causes 'brain fog', weight loss, and tingling in fingers/toes",
        "category": "Anticonvulsant",
        "alternative": "Propranolol"
    },
    {
        "name": "Mupirocin (Bactroban)",
        "use": "Topical antibiotic for impetigo and MRSA skin infections",
        "dosage_guidance": "Apply to affected area 3 times daily for up to 10 days",
        "precautions": "For external use only; clean area before applying",
        "category": "Topical Antibiotic",
        "alternative": "Bacitracin"
    },
    {
        "name": "Nystatin",
        "use": "Treats fungal infections of the skin or mouth (thrush)",
        "dosage_guidance": "Swish and swallow 4 times daily for oral thrush",
        "precautions": "Retain in mouth as long as possible before swallowing",
        "category": "Antifungal",
        "alternative": "Clotrimazole"
    },
    {
        "name": "Methadone",
        "use": "Treats opioid use disorder and severe chronic pain",
        "dosage_guidance": "Must be dispensed from a certified clinic for OUD",
        "precautions": "Extremely high overdose risk; prolongs QT interval in heart",
        "category": "Opioid Agonist",
        "alternative": "Buprenorphine"
    },
    {
        "name": "Buprenorphine/Naloxone (Suboxone)",
        "use": "Treats opioid use disorder",
        "dosage_guidance": "Dissolved under the tongue daily",
        "precautions": "Causes sudden withdrawal if taken while other opioids are still in the system",
        "category": "Opioid Partial Agonist",
        "alternative": "Methadone"
    },
    {
        "name": "Naloxone (Narcan)",
        "use": "Reverses opioid overdoses",
        "dosage_guidance": "4mg nasal spray; repeat every 2-3 mins if no response",
        "precautions": "Call 911 immediately after giving; causes immediate withdrawal symptoms",
        "category": "Opioid Antagonist",
        "alternative": "None for emergency"
    },
    {
        "name": "Liraglutide (Victoza, Saxenda)",
        "use": "Treats Type 2 diabetes and aids in weight loss",
        "dosage_guidance": "Injected under the skin once daily",
        "precautions": "Causes nausea and delayed gastric emptying; risk of thyroid C-cell tumors",
        "category": "GLP-1 Receptor Agonist",
        "alternative": "Semaglutide"
    },
    {
        "name": "Empagliflozin (Jardiance)",
        "use": "Treats Type 2 diabetes and heart failure",
        "dosage_guidance": "10mg-25mg daily",
        "precautions": "Increases risk of severe UTIs and yeast infections by spilling sugar into urine",
        "category": "SGLT2 Inhibitor",
        "alternative": "Dapagliflozin"
    }
]

file_path = "datasetbase /health_dataset.json"

with open(file_path, "r") as f:
    data = json.load(f)

existing_names = {med["name"].lower() for med in data.get("medicines", [])}
added = 0
for med in new_medicines:
    if med["name"].lower() not in existing_names:
        data["medicines"].append(med)
        added += 1

with open(file_path, "w") as f:
    json.dump(data, f, indent=2)

print(f"Added {added} MORE new medicines to the dataset.")
