import json

new_medicines_2 = [
    {
        "name": "Levocetirizine (Xyzal)",
        "use": "Treats allergies and hives",
        "dosage_guidance": "5mg once daily",
        "precautions": "Can cause drowsiness and dry mouth",
        "category": "Antihistamine",
        "alternative": "Cetirizine"
    },
    {
        "name": "Fexofenadine (Allegra)",
        "use": "Treats seasonal allergy symptoms",
        "dosage_guidance": "180mg once daily or 60mg twice daily",
        "precautions": "Do not take with fruit juices (apple, orange, grapefruit) as they decrease absorption",
        "category": "Antihistamine",
        "alternative": "Loratadine"
    },
    {
        "name": "Pseudoephedrine (Sudafed)",
        "use": "Relieves nasal and sinus congestion",
        "dosage_guidance": "30mg-60mg every 4-6 hours",
        "precautions": "Can cause insomnia, jitteriness, and increase blood pressure",
        "category": "Decongestant",
        "alternative": "Phenylephrine"
    },
    {
        "name": "Dextromethorphan (Delsym, Robitussin)",
        "use": "Cough suppressant for dry, hacking coughs",
        "dosage_guidance": "10mg-30mg every 4-8 hours depending on formulation",
        "precautions": "Avoid if taking MAO inhibitors; can cause dizziness",
        "category": "Antitussive",
        "alternative": "Benzonatate"
    },
    {
        "name": "Esomeprazole (Nexium)",
        "use": "Treats GERD, stomach ulcers, and acid reflux",
        "dosage_guidance": "20mg-40mg daily before meals",
        "precautions": "Long-term use may lower bone density and magnesium levels",
        "category": "Proton Pump Inhibitor",
        "alternative": "Omeprazole"
    },
    {
        "name": "Ranitidine (Zantac)",
        "use": "Treats and prevents heartburn",
        "dosage_guidance": "150mg twice daily",
        "precautions": "Note: Has been recalled in many countries due to NDMA impurities",
        "category": "H2 Blocker",
        "alternative": "Famotidine"
    },
    {
        "name": "Bisacodyl (Dulcolax)",
        "use": "Stimulant laxative for constipation or bowel prep",
        "dosage_guidance": "5mg-15mg once daily",
        "precautions": "Do not chew or crush tablets; do not take within 1 hour of antacids or milk",
        "category": "Stimulant Laxative",
        "alternative": "Senna"
    },
    {
        "name": "Senna (Senokot)",
        "use": "Stimulant laxative to relieve constipation",
        "dosage_guidance": "8.6mg-17.2mg once or twice daily",
        "precautions": "May cause urine to turn a reddish-brown color; do not use long-term",
        "category": "Stimulant Laxative",
        "alternative": "Bisacodyl"
    },
    {
        "name": "Lactulose (Enulose)",
        "use": "Treats constipation and hepatic encephalopathy",
        "dosage_guidance": "10g-20g daily for constipation",
        "precautions": "May cause gas and bloating; takes 24-48 hours to produce a bowel movement",
        "category": "Osmotic Laxative",
        "alternative": "Polyethylene Glycol"
    },
    {
        "name": "Bismuth Subsalicylate (Pepto-Bismol)",
        "use": "Treats diarrhea, heartburn, and upset stomach",
        "dosage_guidance": "524mg every 30-60 mins as needed (up to 8 doses per day)",
        "precautions": "Can turn stool and tongue black (harmless); avoid in children due to Reye's syndrome risk",
        "category": "Antidiarrheal / Antacid",
        "alternative": "Loperamide"
    },
    {
        "name": "Calcium Carbonate (Tums)",
        "use": "Relieves heartburn, acid indigestion, and acts as a calcium supplement",
        "dosage_guidance": "Chew 2-4 tablets as symptoms occur",
        "precautions": "Can cause constipation; do not exceed max daily dose to prevent kidney stones",
        "category": "Antacid",
        "alternative": "Famotidine"
    },
    {
        "name": "Clarithromycin (Biaxin)",
        "use": "Treats respiratory, skin, and H. pylori stomach infections",
        "dosage_guidance": "250mg-500mg twice daily",
        "precautions": "Strong metallic taste in mouth; many drug interactions",
        "category": "Antibiotic (Macrolide)",
        "alternative": "Azithromycin"
    },
    {
        "name": "Minocycline (Minocin)",
        "use": "Treats severe acne and certain bacterial infections",
        "dosage_guidance": "50mg-100mg twice daily",
        "precautions": "May cause dizziness or vertigo; sun sensitivity; tooth discoloration in children",
        "category": "Antibiotic (Tetracycline)",
        "alternative": "Doxycycline"
    },
    {
        "name": "Levofloxacin (Levaquin)",
        "use": "Treats pneumonia, sinusitis, skin, and urinary tract infections",
        "dosage_guidance": "250mg-750mg once daily",
        "precautions": "Risk of tendon rupture and nerve damage; avoid dairy around time of dose",
        "category": "Antibiotic (Fluoroquinolone)",
        "alternative": "Ciprofloxacin"
    },
    {
        "name": "Cefuroxime (Ceftin)",
        "use": "Treats bronchitis, gonorrhea, Lyme disease, and ear infections",
        "dosage_guidance": "250mg-500mg twice daily",
        "precautions": "Take with food to increase absorption; caution with penicillin allergies",
        "category": "Antibiotic (Cephalosporin)",
        "alternative": "Cefalexin"
    },
    {
        "name": "Metronidazole (Flagyl)",
        "use": "Treats bacterial vaginosis, C. diff, and certain parasitic infections",
        "dosage_guidance": "250mg-500mg 2-3 times daily",
        "precautions": "Absolutely no alcohol consumption (causes severe nausea/vomiting); metallic taste",
        "category": "Antibiotic / Antiprotozoal",
        "alternative": "Tinidazole"
    },
    {
        "name": "Tinidazole (Tindamax)",
        "use": "Treats trichomoniasis, giardiasis, and amebiasis",
        "dosage_guidance": "Usually a single 2g dose with food",
        "precautions": "Do not consume alcohol during and for 3 days after treatment",
        "category": "Antibiotic / Antiprotozoal",
        "alternative": "Metronidazole"
    },
    {
        "name": "Ketoconazole (Nizoral)",
        "use": "Treats severe fungal infections (topical mostly used now for dandruff)",
        "dosage_guidance": "Topical shampoo used twice weekly; oral forms heavily restricted",
        "precautions": "Oral form has black box warning for severe liver toxicity",
        "category": "Antifungal",
        "alternative": "Fluconazole"
    },
    {
        "name": "Clotrimazole (Lotrimin)",
        "use": "Treats athlete's foot, jock itch, and ringworm",
        "dosage_guidance": "Apply to affected area twice daily",
        "precautions": "For external use only; clean and dry area before applying",
        "category": "Antifungal",
        "alternative": "Terbinafine"
    },
    {
        "name": "Miconazole (Monistat)",
        "use": "Treats vaginal yeast infections",
        "dosage_guidance": "Insert 1 applicatorful at bedtime for 1-7 days depending on product",
        "precautions": "May weaken latex condoms; causes local burning/irritation initially",
        "category": "Antifungal",
        "alternative": "Fluconazole"
    },
    {
        "name": "Terbinafine (Lamisil AT)",
        "use": "Treats athlete's foot, jock itch, and ringworm",
        "dosage_guidance": "Apply to affected area once or twice daily",
        "precautions": "Wash hands after applying; generally very effective for dermatophytes",
        "category": "Antifungal",
        "alternative": "Clotrimazole"
    },
    {
        "name": "Atenolol (Tenormin)",
        "use": "Treats high blood pressure and chest pain",
        "dosage_guidance": "25mg-100mg daily",
        "precautions": "May mask signs of low blood sugar; do not stop abruptly",
        "category": "Beta Blocker",
        "alternative": "Metoprolol"
    },
    {
        "name": "Carvedilol (Coreg)",
        "use": "Treats heart failure and high blood pressure",
        "dosage_guidance": "3.125mg-25mg twice daily",
        "precautions": "Take with food to lower risk of low blood pressure upon standing",
        "category": "Alpha/Beta Blocker",
        "alternative": "Metoprolol"
    },
    {
        "name": "Enalapril (Vasotec)",
        "use": "Treats high blood pressure and heart failure",
        "dosage_guidance": "2.5mg-40mg daily",
        "precautions": "Can cause a dry, hacking cough; do not use if pregnant",
        "category": "ACE Inhibitor",
        "alternative": "Lisinopril"
    },
    {
        "name": "Valsartan (Diovan)",
        "use": "Treats high blood pressure and heart failure",
        "dosage_guidance": "40mg-320mg daily",
        "precautions": "Can increase potassium levels; avoid salt substitutes containing potassium",
        "category": "Angiotensin II Receptor Blocker (ARB)",
        "alternative": "Losartan"
    },
    {
        "name": "Diltiazem (Cardizem)",
        "use": "Treats high blood pressure, angina, and irregular heart rates",
        "dosage_guidance": "120mg-360mg daily (extended release)",
        "precautions": "Swallow extended-release capsules whole; do not crush or chew",
        "category": "Calcium Channel Blocker",
        "alternative": "Verapamil"
    },
    {
        "name": "Verapamil (Calan)",
        "use": "Treats high blood pressure, angina, and certain arrhythmias",
        "dosage_guidance": "120mg-360mg daily",
        "precautions": "Frequently causes constipation; avoid grapefruit juice",
        "category": "Calcium Channel Blocker",
        "alternative": "Diltiazem"
    },
    {
        "name": "Nifedipine (Procardia)",
        "use": "Treats high blood pressure and angina",
        "dosage_guidance": "30mg-90mg daily (extended release)",
        "precautions": "Can cause significant swelling in the legs/ankles and flushing",
        "category": "Calcium Channel Blocker",
        "alternative": "Amlodipine"
    },
    {
        "name": "Hydrochlorothiazide (Microzide)",
        "use": "Treats high blood pressure and fluid retention",
        "dosage_guidance": "12.5mg-50mg daily",
        "precautions": "Take in the morning to avoid nighttime urination; can lower potassium",
        "category": "Thiazide Diuretic",
        "alternative": "Chlorthalidone"
    },
    {
        "name": "Chlorthalidone (Thalitone)",
        "use": "Treats high blood pressure and edema",
        "dosage_guidance": "12.5mg-25mg daily",
        "precautions": "Longer acting and more potent than hydrochlorothiazide; monitor electrolytes",
        "category": "Thiazide-like Diuretic",
        "alternative": "Hydrochlorothiazide"
    },
    {
        "name": "Pravastatin (Pravachol)",
        "use": "Lowers cholesterol and triglycerides",
        "dosage_guidance": "10mg-80mg daily",
        "precautions": "Lower risk of muscle pain compared to other statins; no grapefruit juice interaction",
        "category": "Statin",
        "alternative": "Atorvastatin"
    },
    {
        "name": "Simvastatin (Zocor)",
        "use": "Lowers cholesterol and reduces risk of heart disease",
        "dosage_guidance": "5mg-40mg daily at bedtime",
        "precautions": "Many drug interactions; avoid grapefruit juice; risk of muscle pain",
        "category": "Statin",
        "alternative": "Rosuvastatin"
    },
    {
        "name": "Lovastatin (Mevacor)",
        "use": "Lowers cholesterol levels",
        "dosage_guidance": "20mg-40mg daily with the evening meal",
        "precautions": "Must be taken with food for optimal absorption",
        "category": "Statin",
        "alternative": "Pravastatin"
    },
    {
        "name": "Gemfibrozil (Lopid)",
        "use": "Lowers very high triglyceride levels",
        "dosage_guidance": "600mg twice daily, 30 minutes before breakfast and dinner",
        "precautions": "High risk of muscle breakdown if taken with a statin",
        "category": "Fibrate",
        "alternative": "Fenofibrate"
    },
    {
        "name": "Omega-3-acid ethyl esters (Lovaza)",
        "use": "Lowers very high triglyceride levels in adults",
        "dosage_guidance": "4 capsules daily",
        "precautions": "May cause fishy burps or taste; use with caution if allergic to fish",
        "category": "Lipid-Regulating Agent",
        "alternative": "Fenofibrate"
    },
    {
        "name": "Nitroglycerin patch (Nitro-Dur)",
        "use": "Prevents angina (chest pain)",
        "dosage_guidance": "Apply 1 patch daily for 12-14 hours, then remove",
        "precautions": "Requires a patch-free period to prevent tolerance; can cause headaches",
        "category": "Nitrate",
        "alternative": "Isosorbide Mononitrate"
    },
    {
        "name": "Isosorbide Dinitrate (Isordil)",
        "use": "Prevents angina (chest pain)",
        "dosage_guidance": "5mg-40mg 2-3 times daily",
        "precautions": "Requires a 14-hour dose-free interval daily to prevent tolerance",
        "category": "Nitrate",
        "alternative": "Isosorbide Mononitrate"
    },
    {
        "name": "Ranolazine (Ranexa)",
        "use": "Treats chronic angina",
        "dosage_guidance": "500mg-1000mg twice daily",
        "precautions": "Does not affect blood pressure/heart rate; can prolong the QT interval",
        "category": "Antianginal Agent",
        "alternative": "Beta blockers"
    },
    {
        "name": "Hydralazine (Apresoline)",
        "use": "Treats high blood pressure",
        "dosage_guidance": "10mg-50mg up to 4 times daily",
        "precautions": "Can cause rapid heart rate and a lupus-like syndrome at high doses",
        "category": "Vasodilator",
        "alternative": "Minoxidil"
    },
    {
        "name": "Minoxidil (oral)",
        "use": "Treats severe high blood pressure unresponsive to other drugs",
        "dosage_guidance": "5mg-40mg daily",
        "precautions": "Can cause fluid retention, rapid heart rate, and excess hair growth",
        "category": "Vasodilator",
        "alternative": "Hydralazine"
    },
    {
        "name": "Methyldopa (Aldomet)",
        "use": "Treats high blood pressure, often used in pregnancy",
        "dosage_guidance": "250mg 2-3 times daily",
        "precautions": "Can cause sedation, depression, and liver issues",
        "category": "Alpha-2 Agonist",
        "alternative": "Labetalol"
    },
    {
        "name": "Clonidine (Catapres)",
        "use": "Treats high blood pressure and ADHD (off-label)",
        "dosage_guidance": "0.1mg-0.3mg twice daily or as a weekly patch",
        "precautions": "Do not stop abruptly to avoid severe rebound high blood pressure",
        "category": "Alpha-2 Agonist",
        "alternative": "Guanfacine"
    },
    {
        "name": "Guanfacine (Tenex, Intuniv)",
        "use": "Treats high blood pressure and ADHD",
        "dosage_guidance": "1mg-4mg daily",
        "precautions": "Less sedating than clonidine but can still cause drowsiness and dry mouth",
        "category": "Alpha-2 Agonist",
        "alternative": "Clonidine"
    },
    {
        "name": "Prasugrel (Effient)",
        "use": "Prevents blood clots after a heart attack or stent placement",
        "dosage_guidance": "10mg daily",
        "precautions": "Higher bleeding risk than clopidogrel; contraindicated if history of stroke",
        "category": "Antiplatelet",
        "alternative": "Clopidogrel"
    },
    {
        "name": "Ticagrelor (Brilinta)",
        "use": "Prevents blood clots after a heart attack",
        "dosage_guidance": "90mg twice daily for first year, then 60mg twice daily",
        "precautions": "Can cause shortness of breath (dyspnea); avoid taking with high-dose aspirin",
        "category": "Antiplatelet",
        "alternative": "Clopidogrel"
    },
    {
        "name": "Edoxaban (Savaysa)",
        "use": "Prevents strokes in atrial fibrillation and treats DVT/PE",
        "dosage_guidance": "60mg once daily",
        "precautions": "Do not use if kidneys work *too* well (CrCl > 95 mL/min)",
        "category": "Anticoagulant (DOAC)",
        "alternative": "Apixaban"
    },
    {
        "name": "Desmopressin (DDAVP)",
        "use": "Treats bedwetting, diabetes insipidus, and certain bleeding disorders",
        "dosage_guidance": "0.2mg at bedtime for bedwetting",
        "precautions": "Limit fluid intake at night to prevent dangerous water intoxication/low sodium",
        "category": "Synthetic Vasopressin",
        "alternative": "Imipramine"
    },
    {
        "name": "Oxybutynin (Oxytrol)",
        "use": "Treats overactive bladder and frequent urination",
        "dosage_guidance": "Available as a patch applied every 3-4 days",
        "precautions": "Patch causes less dry mouth and constipation than the oral pill",
        "category": "Anticholinergic",
        "alternative": "Tolterodine"
    },
    {
        "name": "Tolterodine (Detrol)",
        "use": "Treats overactive bladder",
        "dosage_guidance": "2mg-4mg daily",
        "precautions": "Causes dry mouth, dry eyes, and constipation",
        "category": "Anticholinergic",
        "alternative": "Mirabegron"
    },
    {
        "name": "Mirabegron (Myrbetriq)",
        "use": "Treats overactive bladder",
        "dosage_guidance": "25mg-50mg once daily",
        "precautions": "Can increase blood pressure; fewer anticholinergic side effects",
        "category": "Beta-3 Agonist",
        "alternative": "Oxybutynin"
    },
    {
        "name": "Solifenacin (Vesicare)",
        "use": "Treats symptoms of an overactive bladder",
        "dosage_guidance": "5mg-10mg daily",
        "precautions": "Can cause severe dry mouth and constipation; do not crush or chew",
        "category": "Anticholinergic",
        "alternative": "Tolterodine"
    },
    {
        "name": "Phenazopyridine (Azo)",
        "use": "Relieves pain, burning, and urgency of urinary tract infections",
        "dosage_guidance": "200mg three times daily for max 2 days",
        "precautions": "Turns urine and tears a bright red/orange color; can stain contacts/clothes",
        "category": "Urinary Analgesic",
        "alternative": "None directly"
    },
    {
        "name": "Sildenafil (Revatio)",
        "use": "Treats pulmonary arterial hypertension",
        "dosage_guidance": "20mg three times daily",
        "precautions": "Never take with nitrates; this is a lower dose formulation of Viagra",
        "category": "PDE5 Inhibitor",
        "alternative": "Tadalafil"
    },
    {
        "name": "Bosentan (Tracleer)",
        "use": "Treats pulmonary arterial hypertension",
        "dosage_guidance": "62.5mg-125mg twice daily",
        "precautions": "Highly toxic to liver; severe birth defects (requires REMS program)",
        "category": "Endothelin Receptor Antagonist",
        "alternative": "Macitentan"
    },
    {
        "name": "Epoprostenol (Flolan)",
        "use": "Treats severe pulmonary arterial hypertension",
        "dosage_guidance": "Continuous IV infusion",
        "precautions": "Has a half-life of minutes; interruption of infusion can be fatal",
        "category": "Prostacyclin Analog",
        "alternative": "Treprostinil"
    },
    {
        "name": "Treprostinil (Remodulin, Tyvaso)",
        "use": "Treats pulmonary arterial hypertension",
        "dosage_guidance": "Continuous SC/IV infusion or inhaled",
        "precautions": "Subcutaneous infusion site pain is very common and severe",
        "category": "Prostacyclin Analog",
        "alternative": "Epoprostenol"
    },
    {
        "name": "Riociguat (Adempas)",
        "use": "Treats pulmonary hypertension (both PAH and CTEPH)",
        "dosage_guidance": "1mg-2.5mg three times daily",
        "precautions": "Causes severe birth defects; do not take with nitrates or PDE5 inhibitors",
        "category": "Soluble Guanylate Cyclase Stimulator",
        "alternative": "Sildenafil"
    },
    {
        "name": "Salmeterol (Serevent)",
        "use": "Maintenance treatment for asthma and COPD",
        "dosage_guidance": "1 inhalation twice daily",
        "precautions": "Not for acute attacks; must be used with an inhaled corticosteroid in asthma",
        "category": "Long-Acting Beta Agonist (LABA)",
        "alternative": "Formoterol"
    },
    {
        "name": "Formoterol (Foradil)",
        "use": "Maintenance treatment for asthma and COPD",
        "dosage_guidance": "1 capsule inhaled twice daily via aerolizer",
        "precautions": "Do not swallow capsules; faster onset than salmeterol",
        "category": "Long-Acting Beta Agonist (LABA)",
        "alternative": "Salmeterol"
    },
    {
        "name": "Budesonide (Pulmicort)",
        "use": "Maintenance treatment for asthma",
        "dosage_guidance": "Inhaled once or twice daily",
        "precautions": "Rinse mouth after use to prevent thrush; available as nebulizer solution for kids",
        "category": "Inhaled Corticosteroid",
        "alternative": "Fluticasone"
    },
    {
        "name": "Budesonide/Formoterol (Symbicort)",
        "use": "Maintenance treatment for asthma and COPD",
        "dosage_guidance": "2 inhalations twice daily",
        "precautions": "Rinse mouth after use; sometimes used as SMART therapy for acute relief and maintenance",
        "category": "ICS / LABA Combo",
        "alternative": "Fluticasone/Salmeterol"
    },
    {
        "name": "Umeclidinium (Incruse Ellipta)",
        "use": "Maintenance treatment for COPD",
        "dosage_guidance": "1 inhalation daily",
        "precautions": "Can worsen narrow-angle glaucoma or urinary retention",
        "category": "Long-Acting Muscarinic Antagonist (LAMA)",
        "alternative": "Tiotropium"
    },
    {
        "name": "Ipratropium (Atrovent)",
        "use": "Relieves acute bronchospasm in COPD",
        "dosage_guidance": "2 inhalations 4 times a day",
        "precautions": "Avoid getting spray in eyes (can cause blurred vision or pupil dilation)",
        "category": "Short-Acting Muscarinic Antagonist (SAMA)",
        "alternative": "Albuterol"
    },
    {
        "name": "Albuterol/Ipratropium (Combivent, DuoNeb)",
        "use": "Relieves acute bronchospasm in COPD",
        "dosage_guidance": "Inhale 4 times daily as needed",
        "precautions": "Combines two mechanisms for better airway opening; monitor heart rate",
        "category": "SABA / SAMA Combo",
        "alternative": "Albuterol alone"
    },
    {
        "name": "Theophylline (Theo-24)",
        "use": "Maintenance treatment for asthma and COPD",
        "dosage_guidance": "300mg-600mg daily",
        "precautions": "Very narrow therapeutic index; requires blood level monitoring; toxicity causes seizures and arrhythmias",
        "category": "Methylxanthine",
        "alternative": "Inhaled Corticosteroids"
    },
    {
        "name": "Roflumilast (Daliresp)",
        "use": "Reduces exacerbations in severe COPD",
        "dosage_guidance": "500mcg once daily",
        "precautions": "Causes significant weight loss, diarrhea, and psychiatric events",
        "category": "PDE4 Inhibitor",
        "alternative": "Azithromycin"
    },
    {
        "name": "Zafirlukast (Accolate)",
        "use": "Prevents asthma attacks",
        "dosage_guidance": "20mg twice daily",
        "precautions": "Take on an empty stomach (1 hour before or 2 hours after meals); can cause liver toxicity",
        "category": "Leukotriene Receptor Antagonist",
        "alternative": "Montelukast"
    },
    {
        "name": "Zileuton (Zyflo)",
        "use": "Prevents asthma attacks",
        "dosage_guidance": "600mg four times a day or twice daily (CR formulation)",
        "precautions": "Can cause liver toxicity; must monitor liver enzymes regularly",
        "category": "5-Lipoxygenase Inhibitor",
        "alternative": "Montelukast"
    },
    {
        "name": "Omalizumab (Xolair)",
        "use": "Treats moderate to severe allergic asthma and chronic hives",
        "dosage_guidance": "Subcutaneous injection every 2-4 weeks",
        "precautions": "Risk of severe allergic reaction (anaphylaxis); must carry an EpiPen",
        "category": "Monoclonal Antibody (Anti-IgE)",
        "alternative": "Mepolizumab"
    },
    {
        "name": "Mepolizumab (Nucala)",
        "use": "Treats severe eosinophilic asthma",
        "dosage_guidance": "100mg subcutaneous injection every 4 weeks",
        "precautions": "Can cause headache and injection site reactions; treats a specific asthma subtype",
        "category": "Monoclonal Antibody (Anti-IL-5)",
        "alternative": "Benralizumab"
    },
    {
        "name": "Benralizumab (Fasenra)",
        "use": "Treats severe eosinophilic asthma",
        "dosage_guidance": "30mg subcutaneous injection every 4-8 weeks",
        "precautions": "Less frequent dosing than mepolizumab; may cause headache or sore throat",
        "category": "Monoclonal Antibody (Anti-IL-5)",
        "alternative": "Mepolizumab"
    },
    {
        "name": "Dupilumab (Dupixent)",
        "use": "Treats moderate to severe eczema, asthma, and nasal polyps",
        "dosage_guidance": "Subcutaneous injection every 2 weeks",
        "precautions": "Can cause eye problems like conjunctivitis or keratitis",
        "category": "Monoclonal Antibody (IL-4/IL-13)",
        "alternative": "Omalizumab"
    },
    {
        "name": "Methocarbamol (Robaxin)",
        "use": "Treats muscle spasms and pain",
        "dosage_guidance": "1000mg-1500mg up to 4 times daily",
        "precautions": "May cause urine to turn black, brown, or green; causes sedation",
        "category": "Muscle Relaxant",
        "alternative": "Cyclobenzaprine"
    },
    {
        "name": "Carisoprodol (Soma)",
        "use": "Short-term treatment of acute muscle spasms",
        "dosage_guidance": "250mg-350mg three times daily and at bedtime",
        "precautions": "High potential for abuse and dependence; avoid mixing with other CNS depressants",
        "category": "Muscle Relaxant",
        "alternative": "Methocarbamol"
    },
    {
        "name": "Tizanidine (Zanaflex)",
        "use": "Treats muscle spasticity from conditions like MS",
        "dosage_guidance": "2mg-4mg every 6-8 hours",
        "precautions": "Can cause severe low blood pressure and drowsiness; requires liver monitoring",
        "category": "Muscle Relaxant (Alpha-2 Agonist)",
        "alternative": "Baclofen"
    },
    {
        "name": "Orphenadrine (Norflex)",
        "use": "Treats muscle spasms and Parkinson's disease",
        "dosage_guidance": "100mg twice daily",
        "precautions": "Has strong anticholinergic side effects (dry mouth, blurred vision, urinary retention)",
        "category": "Muscle Relaxant",
        "alternative": "Cyclobenzaprine"
    },
    {
        "name": "Metaxalone (Skelaxin)",
        "use": "Treats acute muscle spasms",
        "dosage_guidance": "800mg 3-4 times daily",
        "precautions": "Take with food to increase absorption; may cause nausea and drowsiness",
        "category": "Muscle Relaxant",
        "alternative": "Methocarbamol"
    },
    {
        "name": "Chlorzoxazone (Lorzone)",
        "use": "Treats muscle spasms and pain",
        "dosage_guidance": "250mg-500mg 3-4 times daily",
        "precautions": "May turn urine orange or reddish-purple; can cause liver toxicity",
        "category": "Muscle Relaxant",
        "alternative": "Cyclobenzaprine"
    },
    {
        "name": "Aspirin/Acetaminophen/Caffeine (Excedrin)",
        "use": "Treats migraine and tension headaches",
        "dosage_guidance": "2 tablets at symptom onset",
        "precautions": "Contains significant caffeine; avoid taking near bedtime; watch for stomach bleeding from aspirin",
        "category": "Analgesic Combination",
        "alternative": "Sumatriptan"
    },
    {
        "name": "Butalbital/Acetaminophen/Caffeine (Fioricet)",
        "use": "Treats tension headaches",
        "dosage_guidance": "1-2 capsules every 4 hours as needed",
        "precautions": "High risk of rebound headaches and dependence if used frequently",
        "category": "Analgesic Combination",
        "alternative": "Excedrin"
    },
    {
        "name": "Rizatriptan (Maxalt)",
        "use": "Treats acute migraine attacks",
        "dosage_guidance": "5mg-10mg at onset of migraine",
        "precautions": "Fast acting but causes chest/throat tightness; contraindicated in ischemic heart disease",
        "category": "Triptan",
        "alternative": "Sumatriptan"
    },
    {
        "name": "Zolmitriptan (Zomig)",
        "use": "Treats acute migraine attacks",
        "dosage_guidance": "1.25mg-2.5mg at onset of migraine",
        "precautions": "Available as a nasal spray for rapid onset; causes tingling and dizziness",
        "category": "Triptan",
        "alternative": "Sumatriptan"
    },
    {
        "name": "Eletriptan (Relpax)",
        "use": "Treats acute migraine attacks",
        "dosage_guidance": "20mg-40mg at onset of migraine",
        "precautions": "Do not use within 72 hours of strong CYP3A4 inhibitors (e.g., clarithromycin, ketoconazole)",
        "category": "Triptan",
        "alternative": "Rizatriptan"
    },
    {
        "name": "Naratriptan (Amerge)",
        "use": "Treats acute migraine attacks",
        "dosage_guidance": "1mg-2.5mg at onset of migraine",
        "precautions": "Slower onset but lasts longer than other triptans, useful for long-lasting migraines",
        "category": "Triptan",
        "alternative": "Frovatriptan"
    },
    {
        "name": "Frovatriptan (Frova)",
        "use": "Treats acute migraine attacks and prevents menstrual migraines",
        "dosage_guidance": "2.5mg at onset of migraine",
        "precautions": "Has the longest half-life of all triptans; good for preventing rebound headaches",
        "category": "Triptan",
        "alternative": "Naratriptan"
    },
    {
        "name": "Ubrogepant (Ubrelvy)",
        "use": "Treats acute migraine attacks",
        "dosage_guidance": "50mg-100mg at onset of migraine",
        "precautions": "Does not cause blood vessel constriction like triptans; safe for cardiovascular patients",
        "category": "CGRP Receptor Antagonist",
        "alternative": "Rimegepant"
    },
    {
        "name": "Rimegepant (Nurtec ODT)",
        "use": "Treats acute migraine attacks and prevents them",
        "dosage_guidance": "75mg orally dissolving tablet as needed or every other day",
        "precautions": "Orally disintegrating tablet works quickly; well-tolerated with less nausea than triptans",
        "category": "CGRP Receptor Antagonist",
        "alternative": "Ubrogepant"
    },
    {
        "name": "Erenumab (Aimovig)",
        "use": "Prevents migraine attacks",
        "dosage_guidance": "70mg-140mg subcutaneous injection monthly",
        "precautions": "Can cause significant constipation and high blood pressure",
        "category": "CGRP Inhibitor",
        "alternative": "Galcanezumab"
    },
    {
        "name": "Galcanezumab (Emgality)",
        "use": "Prevents migraine attacks and cluster headaches",
        "dosage_guidance": "120mg subcutaneous injection monthly",
        "precautions": "Injection site reactions are common; very effective for episodic and chronic migraines",
        "category": "CGRP Inhibitor",
        "alternative": "Fremanezumab"
    },
    {
        "name": "Fremanezumab (Ajovy)",
        "use": "Prevents migraine attacks",
        "dosage_guidance": "225mg monthly or 675mg every 3 months subcutaneously",
        "precautions": "Flexible dosing schedule; injection site pain and redness are common",
        "category": "CGRP Inhibitor",
        "alternative": "Erenumab"
    },
    {
        "name": "Botulinum Toxin Type A (Botox)",
        "use": "Prevents chronic migraines (>15 headache days/month)",
        "dosage_guidance": "Multiple injections in the head and neck every 12 weeks",
        "precautions": "Can cause temporary neck pain or muscle weakness/drooping",
        "category": "Neurotoxin",
        "alternative": "CGRP Inhibitors"
    },
    {
        "name": "Amitriptyline (Elavil)",
        "use": "Prevents migraines and treats nerve pain/depression",
        "dosage_guidance": "10mg-50mg at bedtime",
        "precautions": "Causes strong sedation, dry mouth, weight gain, and urinary retention",
        "category": "Tricyclic Antidepressant",
        "alternative": "Nortriptyline"
    },
    {
        "name": "Nortriptyline (Pamelor)",
        "use": "Prevents migraines and treats nerve pain/depression",
        "dosage_guidance": "10mg-75mg at bedtime",
        "precautions": "Similar to amitriptyline but generally better tolerated with fewer anticholinergic effects",
        "category": "Tricyclic Antidepressant",
        "alternative": "Amitriptyline"
    },
    {
        "name": "Venlafaxine (Effexor)",
        "use": "Prevents migraines and treats depression/anxiety",
        "dosage_guidance": "37.5mg-150mg daily",
        "precautions": "May increase blood pressure; severe withdrawal symptoms if stopped abruptly",
        "category": "SNRI Antidepressant",
        "alternative": "Duloxetine"
    },
    {
        "name": "Verapamil (Calan)",
        "use": "Prevents cluster headaches and migraines",
        "dosage_guidance": "240mg-480mg daily",
        "precautions": "Can cause severe constipation and slow heart rate; requires EKG monitoring at high doses",
        "category": "Calcium Channel Blocker",
        "alternative": "Divalproex"
    },
    {
        "name": "Dexamethasone (Decadron)",
        "use": "Treats severe inflammation, allergic reactions, and prevents migraine recurrence in ER",
        "dosage_guidance": "Varies; short courses usually",
        "precautions": "Causes insomnia, jitteriness, and increases blood sugar; long term use causes bone loss",
        "category": "Corticosteroid",
        "alternative": "Prednisone"
    },
    {
        "name": "Prednisone (Deltasone)",
        "use": "Treats severe inflammation, asthma flares, and autoimmune conditions",
        "dosage_guidance": "Varies; often given as a 5-day taper pack",
        "precautions": "Must taper off to prevent adrenal crisis; causes weight gain, fluid retention, and mood changes",
        "category": "Corticosteroid",
        "alternative": "Methylprednisolone"
    },
    {
        "name": "Methylprednisolone (Medrol)",
        "use": "Treats severe inflammation and allergic reactions",
        "dosage_guidance": "Often given as a 'Medrol Dosepak' 6-day taper",
        "precautions": "Take with food to prevent severe stomach upset; can increase blood pressure and blood sugar",
        "category": "Corticosteroid",
        "alternative": "Prednisone"
    },
    {
        "name": "Hydrocortisone (Cortef)",
        "use": "Replacement therapy for adrenal insufficiency (Addison's disease)",
        "dosage_guidance": "15mg-30mg daily in divided doses",
        "precautions": "Must double or triple dose during illness or stress to prevent life-threatening adrenal crisis",
        "category": "Corticosteroid",
        "alternative": "Fludrocortisone"
    },
    {
        "name": "Fludrocortisone (Florinef)",
        "use": "Replacement therapy for Addison's disease; treats low blood pressure",
        "dosage_guidance": "0.1mg daily",
        "precautions": "Causes significant salt and water retention; monitor potassium levels as they can drop",
        "category": "Mineralocorticoid",
        "alternative": "Hydrocortisone"
    }
]

file_path = "datasetbase /health_dataset.json"

with open(file_path, "r") as f:
    data = json.load(f)

existing_names = {med["name"].lower() for med in data.get("medicines", [])}
added = 0
for med in new_medicines_2:
    if med["name"].lower() not in existing_names:
        data["medicines"].append(med)
        added += 1

with open(file_path, "w") as f:
    json.dump(data, f, indent=2)

print(f"Added {added} MORE new medicines to the dataset.")
