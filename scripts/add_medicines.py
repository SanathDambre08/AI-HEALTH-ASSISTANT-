import json
import os

new_medicines = [
    {
        "name": "Ibuprofen (Advil, Motrin)",
        "use": "Relieves pain, reduces inflammation, and lowers fever",
        "dosage_guidance": "200mg–400mg every 4–6 hours; max 3200mg per day",
        "precautions": "Take with food to prevent stomach upset; avoid in severe kidney disease or active ulcers",
        "category": "NSAID",
        "alternative": "Naproxen, Diclofenac"
    },
    {
        "name": "Loratadine (Claritin)",
        "use": "Treats allergies, hives, and allergic rhinitis without causing drowsiness",
        "dosage_guidance": "10mg once daily",
        "precautions": "Caution in severe liver disease; consult doctor if pregnant",
        "category": "Antihistamine",
        "alternative": "Cetirizine, Fexofenadine"
    },
    {
        "name": "Cetirizine (Zyrtec)",
        "use": "Relieves allergy symptoms like runny nose, sneezing, and itchy eyes",
        "dosage_guidance": "5mg–10mg once daily",
        "precautions": "May cause mild drowsiness; avoid alcohol",
        "category": "Antihistamine",
        "alternative": "Loratadine, Levocetirizine"
    },
    {
        "name": "Omeprazole (Prilosec)",
        "use": "Treats GERD, stomach ulcers, and acid reflux",
        "dosage_guidance": "20mg once daily before a meal",
        "precautions": "Do not chew or crush delayed-release capsules; long-term use may affect bone density",
        "category": "Proton Pump Inhibitor (PPI)",
        "alternative": "Pantoprazole, Esomeprazole"
    },
    {
        "name": "Pantoprazole (Protonix)",
        "use": "Reduces stomach acid, treats severe acid reflux and ulcers",
        "dosage_guidance": "40mg once daily before food",
        "precautions": "May cause vitamin B12 deficiency on long-term use; watch for signs of magnesium deficiency",
        "category": "Proton Pump Inhibitor (PPI)",
        "alternative": "Rabeprazole, Omeprazole"
    },
    {
        "name": "Metformin (Glucophage)",
        "use": "First-line treatment for Type 2 Diabetes to control blood sugar",
        "dosage_guidance": "500mg–1000mg twice daily with meals",
        "precautions": "Take with food to avoid nausea; monitor kidney function periodically; risk of lactic acidosis",
        "category": "Antidiabetic",
        "alternative": "Glimepiride, Sitagliptin"
    },
    {
        "name": "Atorvastatin (Lipitor)",
        "use": "Lowers cholesterol and triglyceride levels, reducing heart disease risk",
        "dosage_guidance": "10mg–80mg once daily",
        "precautions": "Avoid grapefruit juice; report unexplained muscle pain immediately; caution in liver disease",
        "category": "Statin",
        "alternative": "Rosuvastatin, Simvastatin"
    },
    {
        "name": "Rosuvastatin (Crestor)",
        "use": "Effectively lowers bad cholesterol (LDL) and increases good cholesterol (HDL)",
        "dosage_guidance": "5mg–40mg once daily",
        "precautions": "Monitor liver function; watch for severe muscle cramps",
        "category": "Statin",
        "alternative": "Atorvastatin, Pitavastatin"
    },
    {
        "name": "Amoxicillin (Amoxil)",
        "use": "Treats bacterial infections such as ear, throat, and urinary tract infections",
        "dosage_guidance": "250mg–500mg every 8 hours",
        "precautions": "Finish entire course even if feeling better; do not use if allergic to penicillin",
        "category": "Antibiotic",
        "alternative": "Cefixime, Azithromycin"
    },
    {
        "name": "Azithromycin (Zithromax)",
        "use": "Treats respiratory infections, skin infections, and certain STDs",
        "dosage_guidance": "500mg on day 1, then 250mg daily for 4 days",
        "precautions": "Can cause stomach upset; report irregular heartbeats; take at least 1 hour before antacids",
        "category": "Antibiotic",
        "alternative": "Clarithromycin, Erythromycin"
    },
    {
        "name": "Amlodipine (Norvasc)",
        "use": "Treats high blood pressure and chest pain (angina)",
        "dosage_guidance": "5mg–10mg once daily",
        "precautions": "May cause swelling in ankles or feet; do not stop abruptly",
        "category": "Antihypertensive (Calcium Channel Blocker)",
        "alternative": "Nifedipine, Diltiazem"
    },
    {
        "name": "Losartan (Cozaar)",
        "use": "Treats high blood pressure and protects kidneys in diabetics",
        "dosage_guidance": "50mg–100mg once daily",
        "precautions": "Do not use in pregnancy; may increase potassium levels",
        "category": "Antihypertensive (ARB)",
        "alternative": "Telmisartan, Valsartan"
    },
    {
        "name": "Levothyroxine (Synthroid)",
        "use": "Treats hypothyroidism (underactive thyroid)",
        "dosage_guidance": "Varies individually; usually taken once daily on an empty stomach",
        "precautions": "Take 30-60 mins before breakfast; avoid calcium/iron supplements within 4 hours",
        "category": "Thyroid Hormone",
        "alternative": "Liothyronine"
    },
    {
        "name": "Albuterol / Salbutamol (Ventolin)",
        "use": "Relieves asthma attacks, bronchospasm, and COPD symptoms",
        "dosage_guidance": "1-2 puffs every 4-6 hours as needed",
        "precautions": "May cause fast heartbeat or tremors; use proper inhaler technique",
        "category": "Bronchodilator",
        "alternative": "Levalbuterol, Formoterol"
    },
    {
        "name": "Montelukast (Singulair)",
        "use": "Prevents asthma attacks and treats severe allergic rhinitis",
        "dosage_guidance": "10mg once daily in the evening",
        "precautions": "Watch for mood changes or vivid dreams; not for acute asthma attacks",
        "category": "Antiasthmatic",
        "alternative": "Zafirlukast"
    },
    {
        "name": "Ondansetron (Zofran)",
        "use": "Prevents nausea and vomiting caused by surgery, chemotherapy, or gastroenteritis",
        "dosage_guidance": "4mg–8mg every 8 hours as needed",
        "precautions": "May cause headache or constipation; caution in irregular heartbeats",
        "category": "Antiemetic",
        "alternative": "Promethazine, Metoclopramide"
    },
    {
        "name": "Aspirin (Ecotrin)",
        "use": "Relieves minor aches, reduces fever, and prevents blood clots/heart attacks",
        "dosage_guidance": "75mg-81mg daily for heart protection; 325mg for pain",
        "precautions": "Do not give to children with fever (Reye's syndrome risk); watch for GI bleeding",
        "category": "NSAID / Antiplatelet",
        "alternative": "Clopidogrel (for blood thinning)"
    },
    {
        "name": "Clopidogrel (Plavix)",
        "use": "Prevents stroke, heart attack, and other heart problems",
        "dosage_guidance": "75mg once daily",
        "precautions": "Increases bleeding risk; tell your doctor before any surgery",
        "category": "Antiplatelet",
        "alternative": "Ticagrelor, Prasugrel"
    },
    {
        "name": "Gabapentin (Neurontin)",
        "use": "Treats nerve pain and prevents seizures",
        "dosage_guidance": "Starts at 300mg daily, increased gradually",
        "precautions": "Do not stop abruptly; causes dizziness and drowsiness",
        "category": "Anticonvulsant / Nerve Pain",
        "alternative": "Pregabalin"
    },
    {
        "name": "Sertraline (Zoloft)",
        "use": "Treats depression, panic attacks, OCD, and PTSD",
        "dosage_guidance": "50mg–200mg once daily",
        "precautions": "May take weeks to work; do not stop suddenly; watch for mood changes",
        "category": "Antidepressant (SSRI)",
        "alternative": "Escitalopram, Fluoxetine"
    },
    {
        "name": "Escitalopram (Lexapro)",
        "use": "Treats depression and generalized anxiety disorder",
        "dosage_guidance": "10mg–20mg once daily",
        "precautions": "Can cause nausea or drowsiness; risk of serotonin syndrome if mixed with certain meds",
        "category": "Antidepressant (SSRI)",
        "alternative": "Sertraline, Citalopram"
    },
    {
        "name": "Alprazolam (Xanax)",
        "use": "Treats severe anxiety and panic disorders",
        "dosage_guidance": "0.25mg–0.5mg up to 3 times a day",
        "precautions": "High potential for dependence; do not mix with alcohol; causes extreme drowsiness",
        "category": "Anxiolytic (Benzodiazepine)",
        "alternative": "Clonazepam, Lorazepam"
    },
    {
        "name": "Zolpidem (Ambien)",
        "use": "Short-term treatment for insomnia",
        "dosage_guidance": "5mg–10mg right before bedtime",
        "precautions": "Ensure you have 7-8 hours to sleep; risk of complex sleep behaviors (sleepwalking)",
        "category": "Sedative / Hypnotic",
        "alternative": "Zopiclone, Eszopiclone"
    },
    {
        "name": "Melatonin",
        "use": "Helps regulate sleep cycle and treats jet lag or mild insomnia",
        "dosage_guidance": "1mg–5mg 30 minutes before bedtime",
        "precautions": "Usually well-tolerated; may cause grogginess the next morning",
        "category": "Sleep Supplement",
        "alternative": "Magnesium Glycinate"
    },
    {
        "name": "Diphenhydramine (Benadryl)",
        "use": "Treats allergic reactions, motion sickness, and occasionally used as a sleep aid",
        "dosage_guidance": "25mg–50mg every 4-6 hours",
        "precautions": "Causes significant drowsiness; avoid driving; dry mouth is common",
        "category": "Antihistamine (1st Generation)",
        "alternative": "Chlorpheniramine"
    },
    {
        "name": "Loperamide (Imodium)",
        "use": "Treats acute and chronic diarrhea",
        "dosage_guidance": "4mg initially, then 2mg after each loose stool (max 16mg/day)",
        "precautions": "Do not use if diarrhea is accompanied by high fever or bloody stools",
        "category": "Antidiarrheal",
        "alternative": "Bismuth Subsalicylate"
    },
    {
        "name": "Bismuth Subsalicylate (Pepto-Bismol)",
        "use": "Treats indigestion, heartburn, nausea, and diarrhea",
        "dosage_guidance": "524mg every 30-60 mins as needed (max 8 doses in 24 hours)",
        "precautions": "May cause black stools or darkened tongue; do not use if allergic to aspirin",
        "category": "Antacid / Antidiarrheal",
        "alternative": "Loperamide"
    },
    {
        "name": "Docusate Sodium (Colace)",
        "use": "Stool softener used to treat occasional constipation",
        "dosage_guidance": "50mg–300mg daily",
        "precautions": "Drink plenty of water; not for immediate relief (takes 1-3 days)",
        "category": "Laxative",
        "alternative": "Bisacodyl, Senna"
    },
    {
        "name": "Bisacodyl (Dulcolax)",
        "use": "Stimulant laxative for constipation relief or bowel prep",
        "dosage_guidance": "5mg–15mg once daily",
        "precautions": "Do not chew or crush tablets; do not take within 1 hour of antacids or milk",
        "category": "Laxative",
        "alternative": "Senna, Polyethylene Glycol"
    },
    {
        "name": "Ciprofloxacin (Cipro)",
        "use": "Treats severe bacterial infections including UTI and respiratory infections",
        "dosage_guidance": "250mg–500mg twice daily",
        "precautions": "Risk of tendon rupture; avoid dairy products and antacids near dosing time",
        "category": "Antibiotic (Fluoroquinolone)",
        "alternative": "Levofloxacin"
    },
    {
        "name": "Levofloxacin (Levaquin)",
        "use": "Treats pneumonia, kidney infections, and sinus infections",
        "dosage_guidance": "500mg–750mg once daily",
        "precautions": "May cause dizziness or tendon issues; stay hydrated",
        "category": "Antibiotic (Fluoroquinolone)",
        "alternative": "Ciprofloxacin"
    },
    {
        "name": "Doxycycline (Vibramycin)",
        "use": "Treats acne, rosacea, tick-borne diseases, and respiratory infections",
        "dosage_guidance": "100mg once or twice daily",
        "precautions": "Take with full glass of water; makes skin sensitive to sunlight; avoid in children under 8",
        "category": "Antibiotic (Tetracycline)",
        "alternative": "Minocycline"
    },
    {
        "name": "Metronidazole (Flagyl)",
        "use": "Treats bacterial and parasitic infections (e.g., BV, Giardia)",
        "dosage_guidance": "250mg–500mg 2-3 times daily",
        "precautions": "Strictly avoid alcohol for at least 3 days after finishing course; causes metallic taste",
        "category": "Antibiotic / Antiprotozoal",
        "alternative": "Tinidazole"
    },
    {
        "name": "Fluconazole (Diflucan)",
        "use": "Treats vaginal, oral, and systemic fungal/yeast infections",
        "dosage_guidance": "150mg single dose for vaginal yeast infections",
        "precautions": "Caution in liver disease; interacts with many other medications",
        "category": "Antifungal",
        "alternative": "Itraconazole, Clotrimazole"
    },
    {
        "name": "Valacyclovir (Valtrex)",
        "use": "Treats cold sores, genital herpes, and shingles",
        "dosage_guidance": "500mg–1000mg twice daily depending on infection",
        "precautions": "Drink plenty of water to protect kidneys; start at first sign of outbreak",
        "category": "Antiviral",
        "alternative": "Acyclovir"
    },
    {
        "name": "Acyclovir (Zovirax)",
        "use": "Treats herpes simplex and varicella-zoster (chickenpox/shingles)",
        "dosage_guidance": "200mg–400mg 5 times a day",
        "precautions": "Requires frequent dosing; maintain hydration",
        "category": "Antiviral",
        "alternative": "Valacyclovir"
    },
    {
        "name": "Oseltamivir (Tamiflu)",
        "use": "Treats and prevents influenza (flu)",
        "dosage_guidance": "75mg twice daily for 5 days",
        "precautions": "Must start within 48 hours of symptom onset; may cause nausea",
        "category": "Antiviral",
        "alternative": "Zanamivir"
    },
    {
        "name": "Prednisone",
        "use": "Reduces severe inflammation, allergic reactions, and autoimmune flare-ups",
        "dosage_guidance": "Varies highly; usually 5mg–60mg daily",
        "precautions": "Take with food; never stop abruptly; long term use causes weight gain and bone thinning",
        "category": "Corticosteroid",
        "alternative": "Methylprednisolone, Dexamethasone"
    },
    {
        "name": "Dexamethasone (Decadron)",
        "use": "Treats severe inflammation, brain swelling, and severe asthma",
        "dosage_guidance": "Varies by condition",
        "precautions": "Potent steroid; monitor blood sugar; can suppress immune system",
        "category": "Corticosteroid",
        "alternative": "Prednisone"
    },
    {
        "name": "Hydrocortisone cream",
        "use": "Topical treatment for eczema, insect bites, and allergic rashes",
        "dosage_guidance": "Apply thin layer 1-2 times daily",
        "precautions": "Do not use on infected skin or face for long periods",
        "category": "Topical Steroid",
        "alternative": "Betamethasone"
    },
    {
        "name": "Folic Acid (Vitamin B9)",
        "use": "Prevents neural tube defects in pregnancy; treats anemia",
        "dosage_guidance": "400mcg–1mg daily",
        "precautions": "Excessively high doses can mask Vitamin B12 deficiency",
        "category": "Vitamin / Supplement",
        "alternative": "Multivitamins with Folate"
    },
    {
        "name": "Iron Supplement (Ferrous Sulfate)",
        "use": "Treats iron deficiency anemia",
        "dosage_guidance": "325mg daily or every other day",
        "precautions": "Take on empty stomach or with Vitamin C; causes black stools and constipation",
        "category": "Mineral Supplement",
        "alternative": "Ferrous Fumarate"
    },
    {
        "name": "Vitamin D3 (Cholecalciferol)",
        "use": "Treats Vitamin D deficiency, supports bone health and immunity",
        "dosage_guidance": "1000 IU–5000 IU daily or as prescribed",
        "precautions": "Toxicity rare but possible with extremely high doses; take with fatty meal",
        "category": "Vitamin / Supplement",
        "alternative": "Vitamin D2 (Ergocalciferol)"
    },
    {
        "name": "Warfarin (Coumadin)",
        "use": "Prevents blood clots, deep vein thrombosis, and stroke in atrial fibrillation",
        "dosage_guidance": "Highly individualized based on INR blood tests",
        "precautions": "Requires strict diet (consistent Vitamin K); high risk of bleeding; many drug interactions",
        "category": "Anticoagulant",
        "alternative": "Apixaban, Rivaroxaban"
    },
    {
        "name": "Apixaban (Eliquis)",
        "use": "Prevents blood clots and strokes without needing routine blood tests",
        "dosage_guidance": "2.5mg–5mg twice daily",
        "precautions": "Increases bleeding risk; do not stop suddenly without doctor's advice",
        "category": "Anticoagulant (DOAC)",
        "alternative": "Rivaroxaban, Dabigatran"
    },
    {
        "name": "Insulin Glargine (Lantus)",
        "use": "Long-acting insulin for Type 1 and Type 2 diabetes",
        "dosage_guidance": "Injected once daily under the skin",
        "precautions": "Monitor blood sugar closely; rotate injection sites; risk of hypoglycemia",
        "category": "Insulin",
        "alternative": "Insulin Detemir"
    },
    {
        "name": "Sildenafil (Viagra)",
        "use": "Treats erectile dysfunction and pulmonary arterial hypertension",
        "dosage_guidance": "50mg about 1 hour before sexual activity",
        "precautions": "Never take with nitrates (chest pain meds); seek help for erections lasting >4 hours",
        "category": "Phosphodiesterase-5 (PDE5) Inhibitor",
        "alternative": "Tadalafil, Vardenafil"
    },
    {
        "name": "Tadalafil (Cialis)",
        "use": "Treats erectile dysfunction and enlarged prostate (BPH)",
        "dosage_guidance": "5mg daily or 10mg-20mg as needed",
        "precautions": "Effects last up to 36 hours; do not use with nitrates",
        "category": "Phosphodiesterase-5 (PDE5) Inhibitor",
        "alternative": "Sildenafil"
    },
    {
        "name": "Tamsulosin (Flomax)",
        "use": "Relieves urinary symptoms of enlarged prostate (BPH)",
        "dosage_guidance": "0.4mg once daily after the same meal",
        "precautions": "May cause dizziness or drop in blood pressure when standing up",
        "category": "Alpha Blocker",
        "alternative": "Silodosin, Alfuzosin"
    },
    {
        "name": "Finasteride (Proscar, Propecia)",
        "use": "Treats enlarged prostate and male pattern hair loss",
        "dosage_guidance": "1mg for hair loss; 5mg for BPH daily",
        "precautions": "Women who are pregnant must not touch crushed tablets; may cause sexual side effects",
        "category": "5-Alpha Reductase Inhibitor",
        "alternative": "Dutasteride"
    },
    {
        "name": "Methylphenidate (Ritalin, Concerta)",
        "use": "Treats ADHD and narcolepsy",
        "dosage_guidance": "Varies by formulation; typically taken in the morning",
        "precautions": "Can cause insomnia, loss of appetite, and increased heart rate; high abuse potential",
        "category": "CNS Stimulant",
        "alternative": "Amphetamine salts (Adderall)"
    },
    {
        "name": "Amphetamine/Dextroamphetamine (Adderall)",
        "use": "Treats ADHD and narcolepsy",
        "dosage_guidance": "Varies heavily; 5mg–30mg doses",
        "precautions": "High addiction potential; monitor blood pressure; causes weight loss",
        "category": "CNS Stimulant",
        "alternative": "Methylphenidate"
    },
    {
        "name": "Bupropion (Wellbutrin)",
        "use": "Treats depression and helps with smoking cessation",
        "dosage_guidance": "150mg–300mg daily",
        "precautions": "Lowers seizure threshold; do not use if history of seizures or eating disorders",
        "category": "Antidepressant (NDRI)",
        "alternative": "Varenicline (for smoking cessation)"
    },
    {
        "name": "Amitriptyline (Elavil)",
        "use": "Treats depression, nerve pain, and prevents migraines",
        "dosage_guidance": "10mg–50mg at bedtime",
        "precautions": "Causes dry mouth, weight gain, and severe drowsiness; risk of arrhythmias",
        "category": "Tricyclic Antidepressant",
        "alternative": "Nortriptyline"
    },
    {
        "name": "Diclofenac (Voltaren)",
        "use": "Strong pain relief for arthritis, gout, and joint pain",
        "dosage_guidance": "50mg 2-3 times daily; or as a topical gel",
        "precautions": "High risk of stomach ulcers; avoid in heart disease",
        "category": "NSAID",
        "alternative": "Ibuprofen, Naproxen"
    },
    {
        "name": "Naproxen (Aleve)",
        "use": "Relieves pain, inflammation, and menstrual cramps",
        "dosage_guidance": "220mg–500mg every 12 hours",
        "precautions": "Longer acting than ibuprofen; take with food to protect stomach",
        "category": "NSAID",
        "alternative": "Ibuprofen, Meloxicam"
    },
    {
        "name": "Meloxicam (Mobic)",
        "use": "Treats osteoarthritis and rheumatoid arthritis",
        "dosage_guidance": "7.5mg–15mg once daily",
        "precautions": "Take with food; monitor for stomach pain and bleeding",
        "category": "NSAID",
        "alternative": "Celecoxib"
    },
    {
        "name": "Celecoxib (Celebrex)",
        "use": "Treats arthritis and acute pain with lower risk of stomach ulcers",
        "dosage_guidance": "100mg–200mg once or twice daily",
        "precautions": "Do not use if allergic to sulfa drugs; carries cardiovascular risks",
        "category": "COX-2 Inhibitor (NSAID)",
        "alternative": "Meloxicam"
    },
    {
        "name": "Allopurinol (Zyloprim)",
        "use": "Prevents gout attacks and kidney stones by lowering uric acid",
        "dosage_guidance": "100mg–300mg once daily",
        "precautions": "Drink plenty of water; stop immediately if skin rash occurs (serious risk)",
        "category": "Xanthine Oxidase Inhibitor",
        "alternative": "Febuxostat"
    },
    {
        "name": "Colchicine (Colcrys)",
        "use": "Treats and prevents acute gout flare-ups",
        "dosage_guidance": "1.2mg at first sign of flare, then 0.6mg an hour later",
        "precautions": "High toxicity risk; can cause severe diarrhea and muscle weakness",
        "category": "Anti-gout",
        "alternative": "NSAIDs or Corticosteroids for acute attacks"
    },
    {
        "name": "Propranolol (Inderal)",
        "use": "Treats high blood pressure, tremors, performance anxiety, and prevents migraines",
        "dosage_guidance": "10mg–40mg 2-3 times daily",
        "precautions": "Avoid in asthma; do not stop abruptly; causes fatigue",
        "category": "Beta Blocker",
        "alternative": "Metoprolol, Atenolol"
    },
    {
        "name": "Metoprolol (Lopressor, Toprol XL)",
        "use": "Treats high blood pressure, angina, and heart failure",
        "dosage_guidance": "25mg–100mg daily",
        "precautions": "May cause dizziness or slow heart rate; take with food",
        "category": "Beta Blocker",
        "alternative": "Carvedilol, Bisoprolol"
    },
    {
        "name": "Lisinopril (Prinivil, Zestril)",
        "use": "Treats high blood pressure and heart failure; protects diabetic kidneys",
        "dosage_guidance": "10mg–40mg once daily",
        "precautions": "Can cause a persistent dry cough; do not use in pregnancy",
        "category": "ACE Inhibitor",
        "alternative": "Enalapril, Ramipril"
    },
    {
        "name": "Furosemide (Lasix)",
        "use": "Strong diuretic (water pill) used to treat fluid retention and edema",
        "dosage_guidance": "20mg–80mg once or twice daily",
        "precautions": "Will cause frequent urination; depletes potassium (may need supplement)",
        "category": "Loop Diuretic",
        "alternative": "Torsemide, Hydrochlorothiazide"
    },
    {
        "name": "Hydrochlorothiazide (HCTZ)",
        "use": "Mild diuretic used to treat high blood pressure",
        "dosage_guidance": "12.5mg–25mg once daily",
        "precautions": "Take in the morning to avoid night urination; increases sun sensitivity",
        "category": "Thiazide Diuretic",
        "alternative": "Chlorthalidone"
    },
    {
        "name": "Spironolactone (Aldactone)",
        "use": "Treats heart failure, edema, and hormonal acne",
        "dosage_guidance": "25mg–100mg daily",
        "precautions": "Potassium-sparing (do not take potassium supplements); may cause breast tenderness",
        "category": "Potassium-Sparing Diuretic",
        "alternative": "Eplerenone"
    },
    {
        "name": "Clonidine (Catapres)",
        "use": "Treats high blood pressure, ADHD, and withdrawal symptoms",
        "dosage_guidance": "0.1mg–0.2mg twice daily",
        "precautions": "Causes severe dry mouth and sedation; rebound high BP if stopped abruptly",
        "category": "Alpha-2 Agonist",
        "alternative": "Guanfacine"
    },
    {
        "name": "Duloxetine (Cymbalta)",
        "use": "Treats depression, anxiety, fibromyalgia, and nerve pain",
        "dosage_guidance": "30mg–60mg once daily",
        "precautions": "Can cause nausea and sweating; difficult to stop taking (withdrawals)",
        "category": "Antidepressant (SNRI)",
        "alternative": "Venlafaxine"
    },
    {
        "name": "Venlafaxine (Effexor)",
        "use": "Treats severe depression and anxiety disorders",
        "dosage_guidance": "75mg–150mg once daily",
        "precautions": "May increase blood pressure; severe withdrawal symptoms if missed a dose",
        "category": "Antidepressant (SNRI)",
        "alternative": "Duloxetine, Desvenlafaxine"
    },
    {
        "name": "Quetiapine (Seroquel)",
        "use": "Treats schizophrenia, bipolar disorder, and sometimes insomnia",
        "dosage_guidance": "50mg–400mg daily (varies by condition)",
        "precautions": "Causes significant weight gain and severe drowsiness; monitor blood sugar",
        "category": "Atypical Antipsychotic",
        "alternative": "Olanzapine, Risperidone"
    },
    {
        "name": "Aripiprazole (Abilify)",
        "use": "Treats bipolar disorder, schizophrenia, and depression",
        "dosage_guidance": "2mg–15mg once daily",
        "precautions": "May cause restlessness or compulsive behaviors (gambling, eating)",
        "category": "Atypical Antipsychotic",
        "alternative": "Lurasidone, Quetiapine"
    },
    {
        "name": "Lithium (Lithobid)",
        "use": "Mood stabilizer for bipolar disorder",
        "dosage_guidance": "Varies; guided by frequent blood level tests",
        "precautions": "Requires blood tests for toxicity; stay hydrated and maintain normal salt intake",
        "category": "Mood Stabilizer",
        "alternative": "Valproic Acid, Lamotrigine"
    },
    {
        "name": "Lamotrigine (Lamictal)",
        "use": "Prevents bipolar depression and treats seizures",
        "dosage_guidance": "Must be slowly titrated up from 25mg",
        "precautions": "Risk of life-threatening rash (Stevens-Johnson syndrome) if escalated too fast",
        "category": "Anticonvulsant / Mood Stabilizer",
        "alternative": "Lithium, Carbamazepine"
    },
    {
        "name": "Topiramate (Topamax)",
        "use": "Prevents migraines and treats seizures",
        "dosage_guidance": "25mg–100mg twice daily",
        "precautions": "Can cause weight loss, memory issues ('brain fog'), and kidney stones",
        "category": "Anticonvulsant",
        "alternative": "Valproic acid, Propranolol (for migraines)"
    },
    {
        "name": "Sumatriptan (Imitrex)",
        "use": "Stops acute migraine headaches",
        "dosage_guidance": "50mg–100mg at onset of migraine",
        "precautions": "Causes tightness in chest/throat; avoid if you have history of heart attack or stroke",
        "category": "Triptan",
        "alternative": "Rizatriptan, Zolmitriptan"
    },
    {
        "name": "Cyclobenzaprine (Flexeril)",
        "use": "Treats muscle spasms and back pain",
        "dosage_guidance": "5mg–10mg up to 3 times daily",
        "precautions": "Highly sedating; do not drive; causes severe dry mouth",
        "category": "Muscle Relaxant",
        "alternative": "Methocarbamol, Tizanidine"
    },
    {
        "name": "Tizanidine (Zanaflex)",
        "use": "Treats severe muscle spasticity (e.g., in MS)",
        "dosage_guidance": "2mg–4mg every 6-8 hours",
        "precautions": "Causes low blood pressure and drowsiness; monitor liver enzymes",
        "category": "Muscle Relaxant",
        "alternative": "Baclofen"
    },
    {
        "name": "Levocetirizine (Xyzal)",
        "use": "Treats allergies and hives",
        "dosage_guidance": "5mg once daily at evening",
        "precautions": "Can cause mild drowsiness; avoid alcohol",
        "category": "Antihistamine",
        "alternative": "Cetirizine, Loratadine"
    },
    {
        "name": "Fluticasone nasal spray (Flonase)",
        "use": "Prevents and treats nasal allergy symptoms (stuffy/runny nose)",
        "dosage_guidance": "1-2 sprays per nostril once daily",
        "precautions": "Takes days to work optimally; may cause minor nosebleeds",
        "category": "Nasal Corticosteroid",
        "alternative": "Budesonide, Mometasone"
    },
    {
        "name": "Budesonide inhaler (Pulmicort)",
        "use": "Controller inhaler to prevent asthma attacks",
        "dosage_guidance": "1-2 puffs twice daily",
        "precautions": "Rinse mouth with water and spit after use to prevent oral thrush",
        "category": "Inhaled Corticosteroid",
        "alternative": "Fluticasone inhaler"
    },
    {
        "name": "Alendronate (Fosamax)",
        "use": "Treats and prevents osteoporosis",
        "dosage_guidance": "70mg once a week",
        "precautions": "Take with full glass of water first thing in morning; must stand/sit upright for 30 mins after",
        "category": "Bisphosphonate",
        "alternative": "Risedronate"
    },
    {
        "name": "Tretinoin topical (Retin-A)",
        "use": "Treats severe acne and reduces fine wrinkles",
        "dosage_guidance": "Apply pea-sized amount nightly",
        "precautions": "Makes skin highly sensitive to sun; causes initial redness and peeling",
        "category": "Topical Retinoid",
        "alternative": "Adapalene"
    },
    {
        "name": "Mupirocin topical (Bactroban)",
        "use": "Treats skin infections like impetigo and MRSA colonization",
        "dosage_guidance": "Apply small amount 3 times daily",
        "precautions": "For external use only; finish the entire prescribed duration",
        "category": "Topical Antibiotic",
        "alternative": "Bacitracin / Neosporin"
    },
    {
        "name": "Clotrimazole topical (Lotrimin)",
        "use": "Treats athlete's foot, jock itch, and ringworm",
        "dosage_guidance": "Apply twice daily for 2-4 weeks",
        "precautions": "Keep affected area clean and dry",
        "category": "Topical Antifungal",
        "alternative": "Terbinafine, Ketoconazole"
    },
    {
        "name": "Ketoconazole shampoo (Nizoral)",
        "use": "Treats severe dandruff and fungal scalp conditions",
        "dosage_guidance": "Use every 3-4 days; leave on scalp for 5 mins",
        "precautions": "Can cause hair dryness or slight discoloration",
        "category": "Antifungal",
        "alternative": "Selenium Sulfide"
    },
    {
        "name": "Mirtazapine (Remeron)",
        "use": "Treats depression, and helps with insomnia and appetite loss",
        "dosage_guidance": "15mg at bedtime",
        "precautions": "Causes significant weight gain and drowsiness; lower doses are more sedating than higher ones",
        "category": "Atypical Antidepressant",
        "alternative": "Trazodone"
    },
    {
        "name": "Trazodone",
        "use": "Primarily used off-label for insomnia; treats depression at high doses",
        "dosage_guidance": "50mg–100mg at bedtime",
        "precautions": "Can cause grogginess the next day; rare risk of prolonged erection (priapism)",
        "category": "Atypical Antidepressant / Hypnotic",
        "alternative": "Zolpidem, Mirtazapine"
    },
    {
        "name": "Tramadol (Ultram)",
        "use": "Treats moderate to severe pain",
        "dosage_guidance": "50mg every 4-6 hours",
        "precautions": "Risk of addiction; lowers seizure threshold; risk of serotonin syndrome",
        "category": "Opioid Analgesic",
        "alternative": "Codeine, Hydrocodone"
    },
    {
        "name": "Oxycodone/Acetaminophen (Percocet)",
        "use": "Treats severe pain not relieved by non-opioids",
        "dosage_guidance": "As prescribed; typically every 4-6 hours",
        "precautions": "High addiction and overdose risk; causes constipation; do not combine with alcohol or benzos",
        "category": "Opioid Analgesic",
        "alternative": "Hydrocodone/Acetaminophen"
    },
    {
        "name": "Codeine/Guaifenesin",
        "use": "Prescription cough suppressant for severe cough",
        "dosage_guidance": "10ml every 4-6 hours",
        "precautions": "Can cause drowsiness and constipation; potential for abuse",
        "category": "Cough Suppressant",
        "alternative": "Dextromethorphan"
    },
    {
        "name": "Dextromethorphan (Delsym, Robitussin)",
        "use": "Over-the-counter cough suppressant",
        "dosage_guidance": "Varies by formulation; typically 15mg-30mg every 6-8 hours",
        "precautions": "Do not use if taking MAOI antidepressants; does not cure the underlying cause",
        "category": "Antitussive",
        "alternative": "Codeine"
    },
    {
        "name": "Guaifenesin (Mucinex)",
        "use": "Thins and loosens mucus in chest congestion",
        "dosage_guidance": "600mg–1200mg every 12 hours",
        "precautions": "Drink plenty of water to help thin the mucus",
        "category": "Expectorant",
        "alternative": "Bromhexine"
    },
    {
        "name": "Pseudoephedrine (Sudafed)",
        "use": "Relieves severe nasal and sinus congestion",
        "dosage_guidance": "30mg–60mg every 4-6 hours",
        "precautions": "Can raise blood pressure and cause insomnia; avoid taking near bedtime",
        "category": "Decongestant",
        "alternative": "Phenylephrine"
    },
    {
        "name": "Phenylephrine",
        "use": "Over-the-counter decongestant for stuffy nose",
        "dosage_guidance": "10mg every 4 hours",
        "precautions": "Less effective than pseudoephedrine but does not require pharmacy check",
        "category": "Decongestant",
        "alternative": "Pseudoephedrine"
    },
    {
        "name": "Oxybutynin (Ditropan)",
        "use": "Treats overactive bladder and urinary incontinence",
        "dosage_guidance": "5mg 2-3 times daily",
        "precautions": "Causes significant dry mouth and constipation; avoid overheating as it reduces sweating",
        "category": "Anticholinergic",
        "alternative": "Tolterodine, Mirabegron"
    },
    {
        "name": "Mirabegron (Myrbetriq)",
        "use": "Treats overactive bladder with fewer dry mouth side effects",
        "dosage_guidance": "25mg–50mg once daily",
        "precautions": "Can raise blood pressure; monitor regularly",
        "category": "Beta-3 Agonist",
        "alternative": "Oxybutynin"
    },
    {
        "name": "Donepezil (Aricept)",
        "use": "Treats symptoms of Alzheimer's disease and dementia",
        "dosage_guidance": "5mg–10mg once daily at bedtime",
        "precautions": "Can cause nausea, diarrhea, and slow heart rate; does not cure Alzheimer's",
        "category": "Cholinesterase Inhibitor",
        "alternative": "Memantine"
    },
    {
        "name": "Memantine (Namenda)",
        "use": "Treats moderate to severe Alzheimer's disease",
        "dosage_guidance": "5mg–20mg daily",
        "precautions": "Can cause dizziness and confusion; often used with Donepezil",
        "category": "NMDA Receptor Antagonist",
        "alternative": "Donepezil"
    },
    {
        "name": "Methotrexate",
        "use": "Treats severe rheumatoid arthritis, psoriasis, and certain cancers",
        "dosage_guidance": "Typically taken ONCE WEEKLY (not daily) for arthritis",
        "precautions": "Highly toxic; requires strict folic acid supplementation and regular liver/blood tests; strictly avoid in pregnancy",
        "category": "Immunosuppressant",
        "alternative": "Leflunomide, Biologics"
    },
    {
        "name": "Hydroxychloroquine (Plaquenil)",
        "use": "Treats lupus, rheumatoid arthritis, and prevents malaria",
        "dosage_guidance": "200mg–400mg daily",
        "precautions": "Requires regular eye exams due to risk of retinal toxicity; take with food",
        "category": "DMARD / Antimalarial",
        "alternative": "Methotrexate"
    }
]

file_path = "datasetbase /health_dataset.json"

with open(file_path, "r") as f:
    data = json.load(f)

# Append avoiding exact duplicates by name
existing_names = {med["name"].lower() for med in data.get("medicines", [])}
added = 0
for med in new_medicines:
    if med["name"].lower() not in existing_names:
        data["medicines"].append(med)
        added += 1

with open(file_path, "w") as f:
    json.dump(data, f, indent=2)

print(f"Added {added} new medicines to the dataset.")
