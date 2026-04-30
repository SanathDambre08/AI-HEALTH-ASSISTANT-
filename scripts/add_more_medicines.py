import json

new_medicines = [
    {
        "name": "Ibuprofen (Advil, Motrin)",
        "use": "Relieves pain, reduces inflammation, and lowers fever",
        "dosage_guidance": "200mg–400mg every 4–6 hours",
        "precautions": "Take with food to prevent stomach upset",
        "category": "NSAID",
        "alternative": "Naproxen"
    },
    {
        "name": "Buprenorphine/Naloxone (Suboxone)",
        "use": "Treats opioid use disorder and prevents withdrawal",
        "dosage_guidance": "Taken sublingually; highly individualized dosing",
        "precautions": "Can cause fatal respiratory depression if mixed with benzos or alcohol",
        "category": "Opioid Partial Agonist",
        "alternative": "Methadone"
    },
    {
        "name": "Methadone",
        "use": "Treats severe chronic pain and opioid dependence",
        "dosage_guidance": "Administered strictly via certified clinics for dependence",
        "precautions": "Extremely high overdose risk; prolongs QT interval in heart",
        "category": "Opioid Agonist",
        "alternative": "Buprenorphine"
    },
    {
        "name": "Levetiracetam (Keppra)",
        "use": "Prevents and treats seizures",
        "dosage_guidance": "500mg twice daily to start",
        "precautions": "Can cause extreme mood swings, aggression, and depression ('Keppra rage')",
        "category": "Anticonvulsant",
        "alternative": "Lacosamide"
    },
    {
        "name": "Pregabalin (Lyrica)",
        "use": "Treats nerve pain, fibromyalgia, and prevents seizures",
        "dosage_guidance": "75mg twice daily to start",
        "precautions": "May cause weight gain, swelling, and dizziness; taper slowly to stop",
        "category": "Anticonvulsant / Nerve Pain",
        "alternative": "Gabapentin"
    },
    {
        "name": "Aripiprazole (Abilify)",
        "use": "Treats bipolar disorder, schizophrenia, and adjunct for depression",
        "dosage_guidance": "2mg–15mg once daily",
        "precautions": "May cause unusual compulsive behaviors (gambling, binge eating)",
        "category": "Atypical Antipsychotic",
        "alternative": "Risperidone"
    },
    {
        "name": "Risperidone (Risperdal)",
        "use": "Treats schizophrenia, bipolar mania, and irritability in autism",
        "dosage_guidance": "1mg–2mg daily to start",
        "precautions": "May increase prolactin levels leading to breast enlargement (even in males); risk of weight gain",
        "category": "Atypical Antipsychotic",
        "alternative": "Olanzapine"
    },
    {
        "name": "Olanzapine (Zyprexa)",
        "use": "Treats schizophrenia and bipolar disorder",
        "dosage_guidance": "5mg–10mg once daily",
        "precautions": "Causes massive weight gain and high blood sugar; monitor metabolic panels",
        "category": "Atypical Antipsychotic",
        "alternative": "Quetiapine"
    },
    {
        "name": "Naloxone (Narcan)",
        "use": "Reverses opioid overdoses",
        "dosage_guidance": "4mg nasal spray; repeat every 2-3 mins if no response",
        "precautions": "Immediately call 911 after administering; induces sudden withdrawal",
        "category": "Opioid Antagonist",
        "alternative": "Naltrexone (for long term)"
    },
    {
        "name": "Naltrexone (Vivitrol)",
        "use": "Prevents relapse in alcohol and opioid use disorders",
        "dosage_guidance": "50mg daily oral or monthly injection",
        "precautions": "Must be completely opioid-free for 7-10 days before starting to avoid severe withdrawal",
        "category": "Opioid Antagonist",
        "alternative": "Acamprosate (for alcohol)"
    },
    {
        "name": "Acamprosate (Campral)",
        "use": "Helps maintain alcohol abstinence",
        "dosage_guidance": "666mg three times a day",
        "precautions": "Not effective if patient is still actively drinking; requires frequent dosing",
        "category": "Alcohol deterrent",
        "alternative": "Naltrexone"
    },
    {
        "name": "Disulfiram (Antabuse)",
        "use": "Deterrent for alcohol use",
        "dosage_guidance": "250mg once daily",
        "precautions": "Causes violent vomiting, flushing, and heart palpitations if ANY alcohol is consumed (even mouthwash)",
        "category": "Alcohol deterrent",
        "alternative": "Naltrexone"
    },
    {
        "name": "Varenicline (Chantix)",
        "use": "Helps quit smoking by blocking nicotine receptors",
        "dosage_guidance": "0.5mg–1mg twice daily",
        "precautions": "May cause vivid nightmares and mood changes; take with full glass of water",
        "category": "Smoking Cessation",
        "alternative": "Bupropion"
    },
    {
        "name": "Liraglutide (Victoza, Saxenda)",
        "use": "Treats Type 2 Diabetes and aids in weight loss",
        "dosage_guidance": "Daily subcutaneous injection",
        "precautions": "May cause severe nausea; risk of thyroid tumors (animal studies)",
        "category": "GLP-1 Agonist",
        "alternative": "Semaglutide"
    },
    {
        "name": "Semaglutide (Ozempic, Wegovy)",
        "use": "Treats Type 2 Diabetes and significant weight loss aid",
        "dosage_guidance": "Weekly subcutaneous injection",
        "precautions": "Causes delayed gastric emptying (nausea, vomiting); risk of pancreatitis",
        "category": "GLP-1 Agonist",
        "alternative": "Tirzepatide"
    },
    {
        "name": "Tirzepatide (Mounjaro)",
        "use": "Treats Type 2 Diabetes; highly effective for weight loss",
        "dosage_guidance": "Weekly subcutaneous injection",
        "precautions": "Monitor for severe gastrointestinal issues; adjust dose slowly",
        "category": "GIP and GLP-1 Agonist",
        "alternative": "Semaglutide"
    },
    {
        "name": "Sitagliptin (Januvia)",
        "use": "Treats Type 2 diabetes by increasing insulin release",
        "dosage_guidance": "100mg once daily",
        "precautions": "Risk of joint pain and pancreatitis; well tolerated overall",
        "category": "DPP-4 Inhibitor",
        "alternative": "Linagliptin"
    },
    {
        "name": "Empagliflozin (Jardiance)",
        "use": "Treats Type 2 diabetes and reduces risk of heart failure",
        "dosage_guidance": "10mg–25mg once daily",
        "precautions": "Causes sugar in urine leading to high risk of yeast infections and UTIs",
        "category": "SGLT2 Inhibitor",
        "alternative": "Dapagliflozin"
    },
    {
        "name": "Dapagliflozin (Farxiga)",
        "use": "Treats Type 2 diabetes, heart failure, and chronic kidney disease",
        "dosage_guidance": "10mg once daily",
        "precautions": "Risk of severe urinary infections; keeps kidneys functioning longer",
        "category": "SGLT2 Inhibitor",
        "alternative": "Empagliflozin"
    },
    {
        "name": "Gliclazide (Diamicron)",
        "use": "Treats Type 2 diabetes by stimulating pancreas to make more insulin",
        "dosage_guidance": "30mg–120mg daily",
        "precautions": "High risk of low blood sugar (hypoglycemia); must take with food",
        "category": "Sulfonylurea",
        "alternative": "Glimepiride"
    },
    {
        "name": "Ezetimibe (Zetia)",
        "use": "Lowers cholesterol by blocking absorption in the intestine",
        "dosage_guidance": "10mg once daily",
        "precautions": "Often used alongside a statin; monitor liver function",
        "category": "Cholesterol Absorption Inhibitor",
        "alternative": "Statins"
    },
    {
        "name": "Evolocumab (Repatha)",
        "use": "Dramatically lowers LDL (bad) cholesterol",
        "dosage_guidance": "Injection every 2 or 4 weeks",
        "precautions": "Expensive; may cause injection site reactions or muscle pain",
        "category": "PCSK9 Inhibitor",
        "alternative": "Alirocumab"
    },
    {
        "name": "Amiodarone (Pacerone)",
        "use": "Treats life-threatening irregular heartbeats (arrhythmias)",
        "dosage_guidance": "Varies highly; usually 100mg-200mg daily for maintenance",
        "precautions": "Highly toxic to lungs, thyroid, and eyes; requires constant monitoring",
        "category": "Antiarrhythmic",
        "alternative": "Sotalol"
    },
    {
        "name": "Digoxin (Lanoxin)",
        "use": "Treats heart failure and atrial fibrillation",
        "dosage_guidance": "0.125mg–0.25mg daily",
        "precautions": "Narrow therapeutic window; toxicity causes nausea and yellow-tinted vision",
        "category": "Cardiac Glycoside",
        "alternative": "Beta blockers"
    },
    {
        "name": "Rivaroxaban (Xarelto)",
        "use": "Prevents blood clots, stroke, and treats deep vein thrombosis",
        "dosage_guidance": "15mg–20mg once daily with food",
        "precautions": "Must be taken with evening meal; high risk of bleeding; no routine blood tests needed",
        "category": "Anticoagulant (DOAC)",
        "alternative": "Apixaban"
    },
    {
        "name": "Dabigatran (Pradaxa)",
        "use": "Prevents blood clots and stroke",
        "dosage_guidance": "150mg twice daily",
        "precautions": "Capsules must be kept in original bottle to prevent moisture damage; bleeding risk",
        "category": "Anticoagulant (DOAC)",
        "alternative": "Apixaban"
    },
    {
        "name": "Enoxaparin (Lovenox)",
        "use": "Prevents and treats blood clots; often used post-surgery or in pregnancy",
        "dosage_guidance": "Subcutaneous injection daily or twice daily",
        "precautions": "May cause bruising at injection site; monitor platelet counts",
        "category": "Low Molecular Weight Heparin",
        "alternative": "Heparin"
    },
    {
        "name": "Clindamycin (Cleocin)",
        "use": "Treats serious bacterial infections, acne, and dental infections",
        "dosage_guidance": "150mg–300mg every 6 hours",
        "precautions": "High risk of causing severe C. difficile diarrhea; stop if diarrhea occurs",
        "category": "Antibiotic (Lincosamide)",
        "alternative": "Amoxicillin"
    },
    {
        "name": "Vancomycin (Vancocin)",
        "use": "Treats severe MRSA infections and C. difficile (oral form only)",
        "dosage_guidance": "Varies heavily; IV for systemic, oral for GI",
        "precautions": "Can cause kidney damage or 'Red Man Syndrome' if given via IV too fast",
        "category": "Antibiotic (Glycopeptide)",
        "alternative": "Linezolid"
    },
    {
        "name": "Cefalexin (Keflex)",
        "use": "Treats skin, ear, and urinary tract infections",
        "dosage_guidance": "250mg–500mg every 6 hours",
        "precautions": "Caution if allergic to penicillin; take with food to avoid nausea",
        "category": "Antibiotic (Cephalosporin)",
        "alternative": "Cefuroxime"
    },
    {
        "name": "Nitrofurantoin (Macrobid)",
        "use": "Treats and prevents uncomplicated urinary tract infections (UTIs)",
        "dosage_guidance": "100mg twice daily for 5-7 days",
        "precautions": "Will turn urine brown/dark yellow; take with food; avoid in poor kidney function",
        "category": "Antibiotic",
        "alternative": "Bactrim (Sulfamethoxazole)"
    },
    {
        "name": "Sulfamethoxazole/Trimethoprim (Bactrim)",
        "use": "Treats UTIs, MRSA skin infections, and certain pneumonias",
        "dosage_guidance": "1 tablet twice daily",
        "precautions": "High risk of allergic skin reactions (sulfa allergy); drink plenty of water",
        "category": "Antibiotic",
        "alternative": "Nitrofurantoin"
    },
    {
        "name": "Terbinafine (Lamisil)",
        "use": "Treats fungal nail infections and severe ringworm",
        "dosage_guidance": "250mg once daily for 6-12 weeks (oral)",
        "precautions": "Oral form requires liver function tests; can cause temporary taste loss",
        "category": "Antifungal",
        "alternative": "Itraconazole"
    },
    {
        "name": "Itraconazole (Sporanox)",
        "use": "Treats severe systemic fungal infections and nail fungus",
        "dosage_guidance": "200mg once or twice daily",
        "precautions": "Avoid in heart failure; interacts with numerous medications",
        "category": "Antifungal",
        "alternative": "Terbinafine"
    },
    {
        "name": "Mupirocin (Bactroban)",
        "use": "Topical antibiotic for impetigo and MRSA in the nose",
        "dosage_guidance": "Apply to affected area 3 times daily",
        "precautions": "For external use only; clean area before applying",
        "category": "Topical Antibiotic",
        "alternative": "Bacitracin"
    },
    {
        "name": "Tretinoin (Retin-A)",
        "use": "Topical treatment for acne, wrinkles, and sun damage",
        "dosage_guidance": "Apply pea-sized amount every night",
        "precautions": "Makes skin extremely sensitive to sun; causes initial purging/peeling",
        "category": "Topical Retinoid",
        "alternative": "Adapalene"
    },
    {
        "name": "Adapalene (Differin)",
        "use": "Topical acne treatment",
        "dosage_guidance": "Apply thin layer once daily",
        "precautions": "Less irritating than Tretinoin but still causes sun sensitivity",
        "category": "Topical Retinoid",
        "alternative": "Tretinoin"
    },
    {
        "name": "Benzoyl Peroxide",
        "use": "Over-the-counter topical treatment for acne",
        "dosage_guidance": "Wash or gel used 1-2 times daily",
        "precautions": "Bleaches hair and fabrics/towels; can dry out skin",
        "category": "Acne Treatment",
        "alternative": "Salicylic Acid"
    },
    {
        "name": "Isotretinoin (Accutane)",
        "use": "Treats severe, cystic acne that hasn't responded to other treatments",
        "dosage_guidance": "Dosed by weight; daily for 4-6 months",
        "precautions": "Causes severe birth defects; requires strict pregnancy prevention (iPLEDGE); causes extreme dry skin",
        "category": "Systemic Retinoid",
        "alternative": "Oral Antibiotics (Doxycycline)"
    },
    {
        "name": "Finasteride (Propecia, Proscar)",
        "use": "Treats male pattern baldness and enlarged prostate",
        "dosage_guidance": "1mg daily for hair loss; 5mg for prostate",
        "precautions": "Can cause sexual dysfunction; women who are pregnant must not handle crushed pills",
        "category": "5-Alpha Reductase Inhibitor",
        "alternative": "Minoxidil"
    },
    {
        "name": "Minoxidil (Rogaine)",
        "use": "Topical solution or oral pill to stimulate hair growth",
        "dosage_guidance": "Apply to scalp twice daily",
        "precautions": "Oral form lowers blood pressure and can cause fluid retention; toxic to cats",
        "category": "Vasodilator / Hair Growth",
        "alternative": "Finasteride"
    },
    {
        "name": "Tamsulosin (Flomax)",
        "use": "Relieves symptoms of enlarged prostate (BPH) and helps pass kidney stones",
        "dosage_guidance": "0.4mg once daily",
        "precautions": "May cause sudden drop in blood pressure when standing up",
        "category": "Alpha Blocker",
        "alternative": "Silodosin"
    },
    {
        "name": "Sildenafil (Viagra)",
        "use": "Treats erectile dysfunction and pulmonary hypertension",
        "dosage_guidance": "50mg taken 1 hour before sexual activity",
        "precautions": "Never take with nitrates (nitroglycerin); seek help for erections lasting >4 hours",
        "category": "PDE5 Inhibitor",
        "alternative": "Tadalafil"
    },
    {
        "name": "Tadalafil (Cialis)",
        "use": "Treats erectile dysfunction and enlarged prostate",
        "dosage_guidance": "5mg daily or 10-20mg as needed",
        "precautions": "Effects last up to 36 hours; never take with nitrates",
        "category": "PDE5 Inhibitor",
        "alternative": "Sildenafil"
    },
    {
        "name": "Sertraline (Zoloft)",
        "use": "Treats depression, panic disorder, OCD, and PTSD",
        "dosage_guidance": "50mg–200mg daily",
        "precautions": "Takes 4-6 weeks to see full effect; watch for increased suicidal thoughts initially",
        "category": "Antidepressant (SSRI)",
        "alternative": "Escitalopram"
    },
    {
        "name": "Fluoxetine (Prozac)",
        "use": "Treats depression, OCD, bulimia, and panic disorder",
        "dosage_guidance": "20mg–40mg daily",
        "precautions": "Long half-life means it stays in body for weeks after stopping; take in the morning",
        "category": "Antidepressant (SSRI)",
        "alternative": "Sertraline"
    },
    {
        "name": "Escitalopram (Lexapro)",
        "use": "Treats depression and generalized anxiety disorder",
        "dosage_guidance": "10mg–20mg daily",
        "precautions": "Well-tolerated but can cause nausea or sexual dysfunction; do not stop abruptly",
        "category": "Antidepressant (SSRI)",
        "alternative": "Citalopram"
    },
    {
        "name": "Bupropion (Wellbutrin)",
        "use": "Treats depression and helps quit smoking; off-label for ADHD",
        "dosage_guidance": "150mg–300mg daily",
        "precautions": "Avoid in patients with seizure disorders or eating disorders",
        "category": "Antidepressant (NDRI)",
        "alternative": "Sertraline"
    },
    {
        "name": "Duloxetine (Cymbalta)",
        "use": "Treats depression, anxiety, fibromyalgia, and chronic nerve pain",
        "dosage_guidance": "30mg–60mg daily",
        "precautions": "Hard to taper off due to severe withdrawal symptoms (brain zaps)",
        "category": "Antidepressant (SNRI)",
        "alternative": "Venlafaxine"
    },
    {
        "name": "Venlafaxine (Effexor)",
        "use": "Treats severe depression and anxiety",
        "dosage_guidance": "75mg–225mg daily",
        "precautions": "May increase blood pressure at higher doses; do not miss doses",
        "category": "Antidepressant (SNRI)",
        "alternative": "Duloxetine"
    },
    {
        "name": "Mirtazapine (Remeron)",
        "use": "Treats depression, especially if accompanied by insomnia or severe weight loss",
        "dosage_guidance": "15mg at bedtime",
        "precautions": "Lower doses cause more sedation; massive appetite increase",
        "category": "Atypical Antidepressant",
        "alternative": "Trazodone"
    },
    {
        "name": "Trazodone (Desyrel)",
        "use": "Treats depression, but most commonly used off-label for insomnia",
        "dosage_guidance": "50mg–100mg at bedtime",
        "precautions": "May cause grogginess the next day; rare risk of prolonged erection",
        "category": "Atypical Antidepressant / Sleep Aid",
        "alternative": "Zolpidem"
    },
    {
        "name": "Alprazolam (Xanax)",
        "use": "Treats acute panic attacks and severe anxiety",
        "dosage_guidance": "0.25mg–0.5mg as needed",
        "precautions": "Highly addictive; do not mix with alcohol; causes extreme drowsiness",
        "category": "Benzodiazepine",
        "alternative": "Clonazepam"
    },
    {
        "name": "Clonazepam (Klonopin)",
        "use": "Treats panic disorder, seizures, and anxiety",
        "dosage_guidance": "0.5mg–1mg twice daily",
        "precautions": "Longer acting than Xanax; severe withdrawal if stopped abruptly",
        "category": "Benzodiazepine",
        "alternative": "Lorazepam"
    },
    {
        "name": "Lorazepam (Ativan)",
        "use": "Treats acute anxiety, seizures, and alcohol withdrawal",
        "dosage_guidance": "0.5mg–1mg as needed",
        "precautions": "High risk of dependence; causes memory impairment",
        "category": "Benzodiazepine",
        "alternative": "Diazepam"
    },
    {
        "name": "Diazepam (Valium)",
        "use": "Treats anxiety, muscle spasms, and alcohol withdrawal",
        "dosage_guidance": "2mg–10mg 2-4 times a day",
        "precautions": "Very long-acting; accumulates in the body causing prolonged sedation",
        "category": "Benzodiazepine",
        "alternative": "Lorazepam"
    },
    {
        "name": "Zolpidem (Ambien)",
        "use": "Short-term treatment for insomnia",
        "dosage_guidance": "5mg–10mg right before bed",
        "precautions": "Risk of complex sleep behaviors (sleepwalking, sleep-driving)",
        "category": "Sedative-Hypnotic",
        "alternative": "Eszopiclone"
    },
    {
        "name": "Eszopiclone (Lunesta)",
        "use": "Treats insomnia for staying asleep",
        "dosage_guidance": "1mg–3mg at bedtime",
        "precautions": "Can cause an unpleasant metallic taste in the mouth",
        "category": "Sedative-Hypnotic",
        "alternative": "Zolpidem"
    },
    {
        "name": "Ondansetron (Zofran)",
        "use": "Prevents severe nausea and vomiting",
        "dosage_guidance": "4mg–8mg every 8 hours",
        "precautions": "May cause headache and constipation; can affect heart rhythm",
        "category": "Antiemetic",
        "alternative": "Promethazine"
    },
    {
        "name": "Promethazine (Phenergan)",
        "use": "Treats nausea, vomiting, allergies, and motion sickness",
        "dosage_guidance": "12.5mg–25mg every 4-6 hours",
        "precautions": "Highly sedating; do not use in children under 2 (respiratory depression)",
        "category": "Antiemetic / Antihistamine",
        "alternative": "Ondansetron"
    },
    {
        "name": "Metoclopramide (Reglan)",
        "use": "Treats gastroparesis and severe nausea",
        "dosage_guidance": "10mg 30 mins before meals",
        "precautions": "Can cause irreversible muscle spasms/twitches (tardive dyskinesia)",
        "category": "Prokinetic / Antiemetic",
        "alternative": "Ondansetron"
    },
    {
        "name": "Omeprazole (Prilosec)",
        "use": "Treats acid reflux, GERD, and stomach ulcers",
        "dosage_guidance": "20mg–40mg daily before a meal",
        "precautions": "Long-term use can lower bone density and Vitamin B12 levels",
        "category": "Proton Pump Inhibitor (PPI)",
        "alternative": "Pantoprazole"
    },
    {
        "name": "Pantoprazole (Protonix)",
        "use": "Treats severe acid reflux and prevents ulcers",
        "dosage_guidance": "40mg once daily before food",
        "precautions": "Similar risks to omeprazole; swallow whole, do not crush",
        "category": "Proton Pump Inhibitor (PPI)",
        "alternative": "Esomeprazole"
    },
    {
        "name": "Famotidine (Pepcid)",
        "use": "Prevents and treats heartburn and acid indigestion",
        "dosage_guidance": "20mg twice daily",
        "precautions": "Fewer drug interactions than PPIs; can take as-needed",
        "category": "H2 Blocker",
        "alternative": "Cimetidine"
    },
    {
        "name": "Docusate (Colace)",
        "use": "Stool softener for gentle relief of constipation",
        "dosage_guidance": "100mg once or twice daily",
        "precautions": "Take with plenty of water; takes a few days to work",
        "category": "Laxative",
        "alternative": "Polyethylene Glycol"
    },
    {
        "name": "Polyethylene Glycol (Miralax)",
        "use": "Osmotic laxative for constipation",
        "dosage_guidance": "17g dissolved in 8oz liquid daily",
        "precautions": "Safe for long-term use; takes 1-3 days to produce a bowel movement",
        "category": "Laxative",
        "alternative": "Lactulose"
    },
    {
        "name": "Loperamide (Imodium)",
        "use": "Treats acute diarrhea",
        "dosage_guidance": "4mg initially, then 2mg after each loose stool",
        "precautions": "Do not use if diarrhea is caused by bacterial infection (e.g., C. diff)",
        "category": "Antidiarrheal",
        "alternative": "Bismuth Subsalicylate"
    },
    {
        "name": "Levothyroxine (Synthroid)",
        "use": "Treats hypothyroidism (underactive thyroid)",
        "dosage_guidance": "Varies; usually taken first thing in the morning",
        "precautions": "Must take on an empty stomach; avoid iron/calcium supplements for 4 hours",
        "category": "Thyroid Hormone",
        "alternative": "Liothyronine"
    },
    {
        "name": "Methimazole (Tapazole)",
        "use": "Treats hyperthyroidism (overactive thyroid)",
        "dosage_guidance": "5mg–15mg daily",
        "precautions": "Can suppress white blood cells (watch for sore throat/fever); liver toxicity",
        "category": "Antithyroid Agent",
        "alternative": "Propylthiouracil (PTU)"
    },
    {
        "name": "Estradiol (Estrace)",
        "use": "Hormone replacement therapy for menopause symptoms",
        "dosage_guidance": "Oral pill, patch, or cream depending on formulation",
        "precautions": "Increases risk of blood clots and certain cancers; do not smoke",
        "category": "Estrogen Hormone",
        "alternative": "Conjugated Estrogens"
    },
    {
        "name": "Levonorgestrel/Ethinyl Estradiol",
        "use": "Combination oral contraceptive (birth control)",
        "dosage_guidance": "Take 1 pill at the exact same time every day",
        "precautions": "Does not protect against STIs; high risk of blood clots if patient smokes over age 35",
        "category": "Oral Contraceptive",
        "alternative": "Progestin-only pills"
    },
    {
        "name": "Levonorgestrel (Plan B One-Step)",
        "use": "Emergency contraception to prevent pregnancy after unprotected sex",
        "dosage_guidance": "1.5mg single dose within 72 hours of unprotected sex",
        "precautions": "May cause nausea and irregular bleeding; less effective in heavier individuals",
        "category": "Emergency Contraceptive",
        "alternative": "Ulipristal"
    },
    {
        "name": "Allopurinol (Zyloprim)",
        "use": "Prevents gout attacks and lowers uric acid levels",
        "dosage_guidance": "100mg–300mg daily",
        "precautions": "Stop immediately if rash develops (risk of severe allergic reaction); drink plenty of water",
        "category": "Xanthine Oxidase Inhibitor",
        "alternative": "Febuxostat"
    },
    {
        "name": "Colchicine (Colcrys)",
        "use": "Treats acute gout flare-ups",
        "dosage_guidance": "1.2mg immediately, then 0.6mg an hour later",
        "precautions": "High toxicity risk; causes severe diarrhea at higher doses",
        "category": "Anti-gout",
        "alternative": "NSAIDs, Corticosteroids"
    },
    {
        "name": "Alendronate (Fosamax)",
        "use": "Treats and prevents osteoporosis",
        "dosage_guidance": "70mg once weekly",
        "precautions": "Must sit/stand upright for 30 mins after taking; take with full glass of plain water",
        "category": "Bisphosphonate",
        "alternative": "Risedronate"
    },
    {
        "name": "Methotrexate",
        "use": "Treats rheumatoid arthritis, psoriasis, and certain cancers",
        "dosage_guidance": "Taken ONCE WEEKLY for autoimmune conditions",
        "precautions": "Highly toxic to liver; must take folic acid; causes severe birth defects",
        "category": "Immunosuppressant / DMARD",
        "alternative": "Hydroxychloroquine, Biologics"
    },
    {
        "name": "Hydroxychloroquine (Plaquenil)",
        "use": "Treats lupus, rheumatoid arthritis, and prevents malaria",
        "dosage_guidance": "200mg–400mg daily",
        "precautions": "Requires yearly eye exams to check for retinal toxicity",
        "category": "DMARD / Antimalarial",
        "alternative": "Methotrexate"
    },
    {
        "name": "Adalimumab (Humira)",
        "use": "Treats severe rheumatoid arthritis, Crohn's disease, and psoriasis",
        "dosage_guidance": "Subcutaneous injection every 2 weeks",
        "precautions": "Lowers immune system significantly; test for tuberculosis before starting",
        "category": "Biologic (TNF Inhibitor)",
        "alternative": "Infliximab, Etanercept"
    },
    {
        "name": "Montelukast (Singulair)",
        "use": "Prevents asthma attacks and treats allergic rhinitis",
        "dosage_guidance": "10mg once daily in the evening",
        "precautions": "Black box warning for neuropsychiatric events (mood changes, suicidal thoughts)",
        "category": "Leukotriene Receptor Antagonist",
        "alternative": "Zafirlukast"
    },
    {
        "name": "Albuterol (Ventolin, ProAir)",
        "use": "Rescue inhaler for acute asthma and COPD symptoms",
        "dosage_guidance": "1-2 puffs every 4-6 hours as needed",
        "precautions": "Causes jitteriness, high heart rate; rinse mouth if using combo inhalers",
        "category": "Short-Acting Beta Agonist (SABA)",
        "alternative": "Levalbuterol"
    },
    {
        "name": "Fluticasone/Salmeterol (Advair)",
        "use": "Maintenance inhaler for asthma and COPD",
        "dosage_guidance": "1 puff twice daily",
        "precautions": "Must rinse mouth after use to prevent oral thrush; not for acute attacks",
        "category": "ICS / LABA Combo",
        "alternative": "Budesonide/Formoterol (Symbicort)"
    },
    {
        "name": "Tiotropium (Spiriva)",
        "use": "Maintenance inhaler for COPD",
        "dosage_guidance": "Inhale 1 capsule contents daily",
        "precautions": "Do not swallow the capsules; can cause dry mouth",
        "category": "Long-Acting Muscarinic Antagonist (LAMA)",
        "alternative": "Umeclidinium"
    },
    {
        "name": "Gabapentin (Neurontin)",
        "use": "Treats nerve pain and prevents certain seizures",
        "dosage_guidance": "300mg–600mg three times daily",
        "precautions": "Causes significant sedation; do not stop abruptly",
        "category": "Anticonvulsant / Neuropathy",
        "alternative": "Pregabalin"
    },
    {
        "name": "Cyclobenzaprine (Flexeril)",
        "use": "Short-term treatment for muscle spasms",
        "dosage_guidance": "5mg–10mg three times daily",
        "precautions": "Extremely sedating; causes dry mouth; avoid in elderly if possible",
        "category": "Muscle Relaxant",
        "alternative": "Methocarbamol"
    },
    {
        "name": "Methocarbamol (Robaxin)",
        "use": "Treats muscle spasms and pain",
        "dosage_guidance": "1000mg–1500mg up to four times daily",
        "precautions": "Less sedating than cyclobenzaprine; may turn urine black, brown, or green",
        "category": "Muscle Relaxant",
        "alternative": "Cyclobenzaprine"
    },
    {
        "name": "Oxycodone (Roxicodone)",
        "use": "Treats moderate to severe acute pain",
        "dosage_guidance": "5mg–15mg every 4-6 hours",
        "precautions": "High addiction potential; severe respiratory depression risk",
        "category": "Opioid Analgesic",
        "alternative": "Hydrocodone"
    },
    {
        "name": "Hydrocodone/Acetaminophen (Vicodin, Norco)",
        "use": "Treats moderate to severe pain",
        "dosage_guidance": "1 tablet every 4-6 hours",
        "precautions": "Contains Tylenol; do not exceed 4000mg of acetaminophen per day to avoid liver failure",
        "category": "Opioid Analgesic",
        "alternative": "Oxycodone/Acetaminophen"
    },
    {
        "name": "Lidocaine patches (Lidoderm)",
        "use": "Topical pain relief for localized nerve pain (e.g., post-shingles)",
        "dosage_guidance": "Apply up to 3 patches for 12 hours on, 12 hours off",
        "precautions": "Do not leave on for >12 hours to avoid systemic toxicity",
        "category": "Topical Anesthetic",
        "alternative": "Capsaicin cream"
    },
    {
        "name": "Sumatriptan (Imitrex)",
        "use": "Treats acute migraine headaches",
        "dosage_guidance": "50mg–100mg at onset of migraine",
        "precautions": "Causes chest/throat tightness; avoid if history of heart attack or stroke",
        "category": "Serotonin Receptor Agonist (Triptan)",
        "alternative": "Rizatriptan"
    },
    {
        "name": "Topiramate (Topamax)",
        "use": "Prevents migraines and treats seizures",
        "dosage_guidance": "25mg–100mg twice daily",
        "precautions": "Causes 'brain fog', weight loss, and tingling in fingers/toes",
        "category": "Anticonvulsant",
        "alternative": "Propranolol"
    },
    {
        "name": "Aspirin",
        "use": "Relieves minor aches, prevents blood clots/heart attacks",
        "dosage_guidance": "81mg daily for heart; 325mg for pain",
        "precautions": "High risk of stomach bleeding; do not give to children (Reye's syndrome)",
        "category": "NSAID / Antiplatelet",
        "alternative": "Clopidogrel"
    },
    {
        "name": "Clopidogrel (Plavix)",
        "use": "Prevents strokes, heart attacks, and blood clots after stents",
        "dosage_guidance": "75mg once daily",
        "precautions": "Increases bleeding risk; tell your doctor before any surgeries",
        "category": "Antiplatelet",
        "alternative": "Ticagrelor"
    },
    {
        "name": "Amiodarone (Cordarone)",
        "use": "Treats dangerous irregular heart rhythms",
        "dosage_guidance": "Highly variable",
        "precautions": "Toxic to lungs, thyroid, liver; can cause skin to turn blue-gray in sun",
        "category": "Antiarrhythmic",
        "alternative": "Sotalol"
    },
    {
        "name": "Digoxin (Lanoxin)",
        "use": "Treats heart failure and atrial fibrillation",
        "dosage_guidance": "0.125mg–0.25mg daily",
        "precautions": "Very narrow safety margin; toxicity causes nausea, confusion, and visual changes (yellow halos)",
        "category": "Cardiac Glycoside",
        "alternative": "Beta-blockers"
    },
    {
        "name": "Warfarin (Coumadin)",
        "use": "Prevents blood clots",
        "dosage_guidance": "Varies daily based on INR blood test results",
        "precautions": "Requires strict diet consistency (Vitamin K); many drug interactions",
        "category": "Anticoagulant",
        "alternative": "Apixaban"
    },
    {
        "name": "Isosorbide Mononitrate (Imdur)",
        "use": "Prevents angina (chest pain)",
        "dosage_guidance": "30mg–120mg daily",
        "precautions": "Causes severe headaches and dizziness; never take with PDE5 inhibitors (Viagra)",
        "category": "Nitrate",
        "alternative": "Nitroglycerin"
    },
    {
        "name": "Nitroglycerin sublingual (Nitrostat)",
        "use": "Treats acute angina (chest pain) attacks",
        "dosage_guidance": "0.4mg under tongue every 5 mins up to 3 doses",
        "precautions": "Call 911 if pain persists after first dose; do not swallow",
        "category": "Nitrate",
        "alternative": "Isosorbide"
    },
    {
        "name": "Folic Acid",
        "use": "Prevents neural tube defects in pregnancy; treats anemia",
        "dosage_guidance": "400mcg–1000mcg daily",
        "precautions": "Well tolerated; high doses can mask B12 deficiency",
        "category": "Vitamin Supplement",
        "alternative": "Prenatal vitamins"
    },
    {
        "name": "Cyanocobalamin (Vitamin B12)",
        "use": "Treats pernicious anemia and B12 deficiency",
        "dosage_guidance": "1000mcg orally or via injection monthly",
        "precautions": "Safe; excess is excreted in urine",
        "category": "Vitamin Supplement",
        "alternative": "Methylcobalamin"
    },
    {
        "name": "Iron (Ferrous Sulfate)",
        "use": "Treats iron deficiency anemia",
        "dosage_guidance": "325mg once or twice daily",
        "precautions": "Causes constipation and black stools; take on empty stomach with Vitamin C for best absorption",
        "category": "Mineral Supplement",
        "alternative": "Ferrous Fumarate"
    },
    {
        "name": "Potassium Chloride (Klor-Con)",
        "use": "Treats or prevents low potassium (often caused by diuretics)",
        "dosage_guidance": "10mEq–20mEq daily",
        "precautions": "Can cause severe stomach irritation; swallow pill whole with food and water",
        "category": "Mineral Supplement",
        "alternative": "Potassium Citrate"
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
