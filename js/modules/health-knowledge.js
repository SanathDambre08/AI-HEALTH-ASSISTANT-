/**
 * MediPulse Health Knowledge Module
 */
const HealthKnowledgeModule = (() => {
    const TOPICS = [
        { id: 'diabetes', name: 'Diabetes', icon: '🩸', category: 'Chronic', desc: 'Understanding blood sugar management' },
        { id: 'hypertension', name: 'Hypertension', icon: '❤️', category: 'Chronic', desc: 'High blood pressure explained' },
        { id: 'asthma', name: 'Asthma', icon: '🫁', category: 'Respiratory', desc: 'Airways and breathing management' },
        { id: 'dengue', name: 'Dengue Fever', icon: '🦟', category: 'Infectious', desc: 'Mosquito-borne viral disease' },
        { id: 'typhoid', name: 'Typhoid', icon: '🤒', category: 'Infectious', desc: 'Bacterial infection from contaminated food/water' },
        { id: 'malaria', name: 'Malaria', icon: '🦠', category: 'Infectious', desc: 'Parasitic disease spread by mosquitoes' },
        { id: 'anxiety', name: 'Anxiety Disorders', icon: '😰', category: 'Mental Health', desc: 'Understanding anxiety and panic' },
        { id: 'depression', name: 'Depression', icon: '💙', category: 'Mental Health', desc: 'Clinical depression awareness' },
        { id: 'vitamin-d', name: 'Vitamin D Deficiency', icon: '☀️', category: 'Nutrition', desc: 'The sunshine vitamin' },
        { id: 'pcod', name: 'PCOD/PCOS', icon: '🩺', category: 'Women\'s Health', desc: 'Polycystic ovary syndrome' },
        { id: 'thyroid', name: 'Thyroid Disorders', icon: '🦋', category: 'Hormonal', desc: 'Hypo and Hyperthyroidism' },
        { id: 'migraine', name: 'Migraine', icon: '🤕', category: 'Neurological', desc: 'Severe recurring headaches' },
        { id: 'food-poisoning', name: 'Food Poisoning', icon: '🤢', category: 'Digestive', desc: 'Contaminated food illness' },
        { id: 'common-cold', name: 'Common Cold & Flu', icon: '🤧', category: 'Respiratory', desc: 'Viral upper respiratory infections' },
        { id: 'uti', name: 'Urinary Tract Infection', icon: '💧', category: 'Infections', desc: 'UTI causes and prevention' },
        { id: 'acidity', name: 'Acidity & GERD', icon: '🔥', category: 'Digestive', desc: 'Gastric acid and reflux' },
        { id: 'cholera', name: 'Cholera', icon: '💧', category: 'Infectious', desc: 'Severe bacterial intestinal infection' },
        { id: 'tb', name: 'Tuberculosis (TB)', icon: '🫁', category: 'Infectious', desc: 'Bacterial infection affecting lungs' },
        { id: 'anemia', name: 'Anemia', icon: '🩸', category: 'Blood', desc: 'Lack of healthy red blood cells' },
        { id: 'arthritis', name: 'Arthritis', icon: '🦴', category: 'Musculoskeletal', desc: 'Joint inflammation and pain' },
        { id: 'sleep-apnea', name: 'Sleep Apnea', icon: '😴', category: 'Respiratory', desc: 'Breathing stops during sleep' },
        { id: 'alzheimers', name: 'Alzheimer\'s', icon: '🧠', category: 'Neurological', desc: 'Progressive memory loss' },
        { id: 'copd', name: 'COPD', icon: '🫁', category: 'Respiratory', desc: 'Chronic inflammatory lung disease' },
        { id: 'stroke', name: 'Stroke', icon: '🧠', category: 'Cardiovascular', desc: 'Interrupted blood flow to brain' },
        { id: 'heart-attack', name: 'Heart Attack', icon: '💔', category: 'Cardiovascular', desc: 'Blockage of blood flow to heart' },
        { id: 'peptic-ulcer', name: 'Peptic Ulcer', icon: '🔥', category: 'Digestive', desc: 'Sores in stomach lining' },
        { id: 'kidney-stones', name: 'Kidney Stones', icon: '🪨', category: 'Urinary', desc: 'Hard deposits in kidneys' },
        { id: 'cataract', name: 'Cataract', icon: '👁️', category: 'Eye Health', desc: 'Clouding of eye lens' },
        { id: 'eczema', name: 'Eczema', icon: '✋', category: 'Skin', desc: 'Itchy, inflamed skin condition' },
        { id: 'osteoporosis', name: 'Osteoporosis', icon: '🦴', category: 'Musculoskeletal', desc: 'Weak and brittle bones' },
        { id: 'pneumonia', name: 'Pneumonia', icon: '🫁', category: 'Infectious', desc: 'Lung infection causing inflammation' }
    ];

    const KNOWLEDGE_BASE = {
        'diabetes': {
            title: 'Diabetes',
            content: `
**What is Diabetes?**
Diabetes is a chronic condition where the body either doesn't produce enough insulin (Type 1) or can't effectively use the insulin it produces (Type 2). Insulin is a hormone that regulates blood sugar.

**Types:**
- **Type 1:** Autoimmune — body attacks insulin-producing cells. Usually diagnosed in children/young adults. Requires insulin.
- **Type 2:** Body becomes resistant to insulin. Most common (90% of cases). Often linked to lifestyle factors.
- **Gestational:** Develops during pregnancy.

**Common Symptoms:**
• Frequent urination • Excessive thirst • Unexplained weight loss • Fatigue • Blurry vision • Slow-healing wounds

**Risk Factors:**
• Family history • Obesity/overweight • Sedentary lifestyle • Age > 45 • PCOD • High BP

**Prevention Tips:**
1. Maintain healthy weight
2. Exercise 30 min/day
3. Eat balanced meals — reduce sugar and refined carbs
4. Regular blood sugar checks (especially if family history)
5. Manage stress

**When to Get Tested:**
If you have risk factors or symptoms, get a Fasting Blood Sugar (FBS) and HbA1c test.
            `
        },
        'hypertension': {
            title: 'Hypertension (High Blood Pressure)',
            content: `
**What is Hypertension?**
Hypertension is when the force of blood against artery walls is consistently too high. Called the "silent killer" because it often has no symptoms.

**Normal BP:** < 120/80 mmHg
**Elevated:** 120-129/< 80
**Stage 1:** 130-139/80-89
**Stage 2:** ≥ 140/≥ 90

**Symptoms (often none):**
• Headaches • Nosebleeds • Shortness of breath • Dizziness • Chest pain (severe)

**Risk Factors:**
• Excess salt intake • Obesity • Stress • Smoking • Alcohol • Family history • Age

**Prevention:**
1. Reduce salt intake (< 5g/day)
2. Exercise regularly (brisk walking 30 min/day)
3. Maintain healthy weight
4. Limit alcohol
5. Manage stress through yoga/meditation
6. Monitor BP regularly at home

**Treatment:**
• Lifestyle changes first
• Medications: Amlodipine, Telmisartan, Enalapril (doctor prescribed)
• Never stop BP medication without doctor's advice
            `
        },
        'dengue': {
            title: 'Dengue Fever',
            content: `
**What is Dengue?**
Dengue is a mosquito-borne viral disease spread by Aedes mosquitoes (they bite during daytime). Common in India, especially during monsoons.

**Symptoms (appear 4-10 days after bite):**
• High fever (104°F/40°C) • Severe headache • Pain behind eyes • Joint/muscle pain • Rash • Nausea/vomiting • Fatigue

**Warning Signs (SEEK EMERGENCY):**
🔴 Severe abdominal pain
🔴 Persistent vomiting
🔴 Bleeding gums/nose
🔴 Blood in stool/urine
🔴 Restlessness or drowsiness

**Treatment:**
• No specific antiviral — supportive care only
• Paracetamol for fever (NO Aspirin, NO Ibuprofen — they increase bleeding risk)
• Drink plenty of fluids and ORS
• Monitor platelet count daily
• Hospital admission if platelets drop below 50,000

**Prevention:**
1. Use mosquito repellent
2. Wear long sleeves during daytime
3. Remove stagnant water (breeding ground)
4. Use mosquito nets and screens
5. Keep surroundings clean
            `
        },
        'anxiety': {
            title: 'Anxiety Disorders',
            content: `
**What is Anxiety?**
Anxiety is a normal emotion, but when it becomes excessive, persistent, and interferes with daily life, it may be an anxiety disorder.

**Types:**
• Generalized Anxiety Disorder (GAD) — constant worry
• Panic Disorder — sudden panic attacks
• Social Anxiety — fear of social situations
• Phobias — intense fear of specific things

**Common Symptoms:**
• Excessive worry • Restlessness • Rapid heartbeat • Sweating • Trembling • Difficulty concentrating • Sleep problems • Irritability

**Self-Help Techniques:**
1. **4-7-8 Breathing:** Inhale 4 counts, hold 7, exhale 8
2. **Grounding (5-4-3-2-1):** Name 5 things you see, 4 touch, 3 hear, 2 smell, 1 taste
3. Regular physical exercise (natural anxiety reducer)
4. Limit caffeine and alcohol
5. Maintain consistent sleep schedule
6. Practice mindfulness/meditation

**When to Seek Help:**
• Anxiety interferes with work/relationships
• Panic attacks become frequent
• You avoid situations due to anxiety
• Physical symptoms persist

**Professional Help:**
• Therapy (CBT is highly effective)
• Medication (SSRIs, as prescribed by psychiatrist)
• Support groups
            `
        },
        'vitamin-d': {
            title: 'Vitamin D Deficiency',
            content: `
**What is Vitamin D?**
Vitamin D is essential for bone health, immunity, and muscle function. It's called the "sunshine vitamin" because your body makes it when exposed to sunlight.

**Why It's Common in India:**
Despite being a tropical country, 70-90% of Indians have Vitamin D deficiency due to:
• Staying indoors most of the day
• Dark skin (needs more sun exposure)
• Pollution blocking UV rays
• Sunscreen use
• Limited dietary sources

**Symptoms of Deficiency:**
• Fatigue and tiredness • Bone and back pain • Frequent illness • Muscle weakness • Depression • Hair loss • Slow wound healing

**Normal Levels:**
• Sufficient: 30-100 ng/mL
• Insufficient: 20-29 ng/mL
• Deficient: < 20 ng/mL

**Sources:**
1. **Sunlight:** 15-20 min of morning sun (before 10 AM) on face and arms
2. **Food:** Fatty fish, egg yolks, fortified milk, mushrooms
3. **Supplements:** Cholecalciferol (D3) — as prescribed

**Treatment:**
• Get a blood test (25-OH Vitamin D)
• Supplements: 1000-2000 IU daily or 60,000 IU weekly (if deficient)
• Take with fatty food for absorption
• Recheck levels after 3 months
            `
        },
        'acidity': {
            title: 'Acidity & GERD',
            content: `
**What is Acidity?**
Acidity occurs when the stomach produces excess acid, causing heartburn, discomfort, and sometimes acid reflux (GERD).

**Common Causes:**
• Spicy/oily food • Skipping meals • Stress • Smoking • Alcohol • Caffeine • Eating late at night • Certain medications (NSAIDs)

**Symptoms:**
• Burning sensation in chest/throat • Sour taste in mouth • Bloating • Burping • Nausea • Difficulty swallowing (if chronic)

**Home Remedies:**
1. Cold milk (immediate relief)
2. Jeera (cumin) water
3. Bananas (natural antacid)
4. Fennel seeds after meals
5. Avoid lying down after eating (wait 2-3 hours)

**Medications:**
• **Antacids:** Eno, Digene (quick relief)
• **H2 blockers:** Famotidine (mild)
• **PPIs:** Pantoprazole, Omeprazole (stronger, for chronic acidity)

**Lifestyle Changes:**
1. Eat smaller, frequent meals
2. Don't skip meals
3. Reduce spicy/fried food
4. Elevate head while sleeping
5. Manage stress
6. Avoid tight clothing around stomach

**When to See Doctor:**
• Symptoms persist > 2 weeks
• Difficulty swallowing
• Unexplained weight loss
• Vomiting blood
            `
        },
        'cholera': {
            title: 'Cholera',
            content: `
**What is Cholera?**
Cholera is an acute diarrheal illness caused by infection of the intestine with Vibrio cholerae bacteria. It is highly contagious and spreads through contaminated water or food.

**Symptoms:**
• Profuse watery diarrhea (rice-water stools) • Vomiting • Leg cramps • Rapid dehydration • Extreme thirst

**Warning Signs (SEEK EMERGENCY):**
🔴 Severe dehydration (sunken eyes, dry skin, no urine)
🔴 Rapid heart rate
🔴 Low blood pressure

**Treatment:**
• **Rehydration:** ORS (Oral Rehydration Solution) is critical. IV fluids for severe cases.
• Zinc supplements for children.
• Antibiotics (like Doxycycline or Azithromycin) to reduce duration, prescribed by a doctor.

**Prevention:**
1. Drink safe water (boiled or purified).
2. Wash hands frequently with soap and water.
3. Eat food that is completely cooked and hot.
4. Avoid raw vegetables and unpeeled fruits.
            `
        },
        'tb': {
            title: 'Tuberculosis (TB)',
            content: `
**What is TB?**
Tuberculosis is a bacterial infection caused by Mycobacterium tuberculosis that mostly affects the lungs but can affect other parts of the body. It spreads through the air when an infected person coughs or sneezes.

**Symptoms:**
• Cough lasting >3 weeks • Chest pain • Coughing up blood or sputum • Fatigue • Unexplained weight loss • Fever and night sweats

**Types:**
• Latent TB: Bacteria is present but inactive. No symptoms, not contagious.
• Active TB: Bacteria is active, causing symptoms and is contagious.

**Treatment:**
• A strict course of antibiotics (e.g., Isoniazid, Rifampin, Ethambutol, Pyrazinamide) for 6 to 9 months.
• It is critical to finish the entire course to prevent drug-resistant TB.

**Prevention:**
1. BCG vaccine (usually given to infants).
2. Good ventilation in homes and workplaces.
3. Cover mouth when coughing.
            `
        },
        'anemia': {
            title: 'Anemia',
            content: `
**What is Anemia?**
Anemia is a condition where you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues, leading to fatigue. The most common type is Iron-Deficiency Anemia.

**Symptoms:**
• Fatigue and weakness • Pale or yellowish skin • Irregular heartbeats • Shortness of breath • Dizziness or lightheadedness • Cold hands and feet

**Common Causes:**
• Iron deficiency • Vitamin B12 deficiency • Chronic diseases • Blood loss (e.g., heavy periods)

**Treatment:**
• Iron supplements (take with Vitamin C for better absorption).
• Vitamin B12 injections or supplements.
• Dietary changes.

**Prevention & Diet:**
1. Eat iron-rich foods: Spinach, red meat, lentils, beans, tofu.
2. Consume Vitamin C (citrus fruits) alongside iron to boost absorption.
3. Avoid drinking tea/coffee immediately after meals (inhibits iron absorption).
            `
        },
        'arthritis': {
            title: 'Arthritis',
            content: `
**What is Arthritis?**
Arthritis is the swelling and tenderness of one or more joints. The main symptoms are joint pain and stiffness, which typically worsen with age.

**Common Types:**
• Osteoarthritis: Wear and tear of cartilage.
• Rheumatoid Arthritis: Autoimmune disease where the immune system attacks the joints.
• Gout: Caused by uric acid crystal buildup in the joints.

**Symptoms:**
• Joint pain • Stiffness • Swelling • Redness • Decreased range of motion

**Treatment:**
• Painkillers and anti-inflammatory drugs (NSAIDs).
• Physical therapy to strengthen muscles around joints.
• Disease-modifying antirheumatic drugs (DMARDs) for Rheumatoid Arthritis.

**Management Tips:**
1. Maintain a healthy weight to reduce joint stress.
2. Low-impact exercises (swimming, cycling, walking).
3. Hot and cold therapy for pain relief.
4. Omega-3 rich foods to reduce inflammation.
            `
        },
        'sleep-apnea': {
            title: 'Sleep Apnea',
            content: `
**What is Sleep Apnea?**
Sleep apnea is a potentially serious sleep disorder in which breathing repeatedly stops and starts during sleep. Obstructive Sleep Apnea (OSA) is the most common form.

**Symptoms:**
• Loud snoring • Episodes of stopped breathing during sleep (observed by others) • Gasping for air during sleep • Morning headache • Excessive daytime sleepiness

**Risk Factors:**
• Excess weight • Neck circumference • Being older • Family history • Smoking • Use of alcohol or sedatives

**Treatment:**
• CPAP (Continuous Positive Airway Pressure) machine.
• Oral appliances designed to keep the throat open.
• Surgery in severe cases.

**Lifestyle Changes:**
1. Lose excess weight.
2. Exercise regularly.
3. Avoid alcohol, sleeping pills, and tranquilizers.
4. Sleep on your side instead of your back.
            `
        },
        'alzheimers': {
            title: "Alzheimer's Disease",
            content: `
**What is Alzheimer's?**
Alzheimer's is a progressive neurologic disorder that causes the brain to shrink (atrophy) and brain cells to die. It is the most common cause of dementia.

**Symptoms:**
• Memory loss that disrupts daily life • Difficulty planning or solving problems • Confusion with time or place • Misplacing things • Changes in mood or personality

**Risk Factors:**
• Age (most common >65 years) • Family history and genetics • Poor cardiovascular health • Severe head trauma

**Treatment:**
• There is no cure, but medications (like cholinesterase inhibitors) may temporarily improve symptoms.
• Creating a safe and supportive environment.
• Support for caregivers is essential.

**Prevention:**
1. Regular physical exercise.
2. Heart-healthy diet (like the Mediterranean diet).
3. Mental stimulation (reading, puzzles, learning new skills).
4. Good sleep hygiene.
            `
        },
        'copd': {
            title: 'COPD (Chronic Obstructive Pulmonary Disease)',
            content: `
**What is COPD?**
COPD is a chronic inflammatory lung disease that causes obstructed airflow from the lungs. Emphysema and chronic bronchitis are the two most common conditions that contribute to COPD.

**Symptoms:**
• Shortness of breath, especially during physical activities • Wheezing • Chest tightness • Chronic cough that may produce mucus • Frequent respiratory infections

**Causes:**
• Long-term exposure to irritating gases or particulate matter, most often from cigarette smoke.
• Exposure to fumes from burning fuel for cooking and heating in poorly ventilated homes.

**Treatment:**
• Bronchodilators to relax the muscles around the airways.
• Inhaled steroids to reduce airway inflammation.
• Oxygen therapy.
• Pulmonary rehabilitation programs.

**Prevention:**
1. QUIT SMOKING (the most critical step).
2. Avoid secondhand smoke and occupational dust/fumes.
3. Get annual flu and pneumonia vaccines.
            `
        },
        'stroke': {
            title: 'Stroke',
            content: `
**What is a Stroke?**
A stroke occurs when the blood supply to part of your brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Brain cells begin to die in minutes.

**Remember FAST (SEEK EMERGENCY IMMEDIATELY):**
🔴 **F**ace drooping: Is one side of the face drooping?
🔴 **A**rm weakness: Is one arm weak or numb?
🔴 **S**peech difficulty: Is speech slurred?
🔴 **T**ime to call emergency services immediately!

**Other Symptoms:**
• Sudden numbness or weakness in the leg • Sudden confusion • Sudden trouble seeing in one or both eyes • Sudden severe headache

**Risk Factors:**
• High blood pressure • Smoking • Diabetes • High cholesterol • Obesity

**Prevention:**
1. Control high blood pressure.
2. Quit smoking.
3. Manage diabetes.
4. Maintain a healthy weight and diet.
5. Exercise regularly.
            `
        },
        'heart-attack': {
            title: 'Heart Attack (Myocardial Infarction)',
            content: `
**What is a Heart Attack?**
A heart attack occurs when the flow of blood to the heart is severely reduced or blocked, usually by a buildup of fat, cholesterol, and other substances (plaque) in the coronary arteries.

**Symptoms (SEEK EMERGENCY IMMEDIATELY):**
🔴 Chest pain, pressure, tightness, or aching.
🔴 Pain or discomfort that spreads to the shoulder, arm, back, neck, jaw, or upper stomach.
🔴 Cold sweat, nausea, or lightheadedness.
🔴 Shortness of breath.

**Risk Factors:**
• Age • Tobacco use • High blood pressure • High cholesterol • Obesity • Diabetes • Family history of heart attacks

**Immediate Action:**
• Call emergency medical help immediately.
• Chew and swallow an aspirin while waiting for help (unless allergic or instructed otherwise by a doctor).

**Prevention:**
1. Control blood pressure and cholesterol.
2. Don't smoke.
3. Eat a heart-healthy diet.
4. Exercise at least 30 minutes a day.
5. Manage stress.
            `
        },
        'peptic-ulcer': {
            title: 'Peptic Ulcer',
            content: `
**What are Peptic Ulcers?**
Peptic ulcers are open sores that develop on the inside lining of your stomach and the upper portion of your small intestine. The most common symptom is stomach pain.

**Causes:**
• Infection with Helicobacter pylori (H. pylori) bacteria.
• Long-term use of nonsteroidal anti-inflammatory drugs (NSAIDs) like ibuprofen or naproxen.

**Symptoms:**
• Burning stomach pain • Feeling of fullness, bloating, or belching • Intolerance to fatty foods • Heartburn • Nausea

**Warning Signs:**
🔴 Vomiting or vomiting blood.
🔴 Dark, tarry, or bloody stools.
🔴 Trouble breathing or feeling faint.

**Treatment:**
• Antibiotics to kill H. pylori.
• Medications that block or reduce acid production (PPIs, H2 blockers).
• Antacids.

**Prevention:**
1. Protect yourself from infections (wash hands frequently).
2. Use caution with pain relievers (take with meals, use lower doses).
3. Avoid smoking and limit alcohol consumption.
            `
        },
        'kidney-stones': {
            title: 'Kidney Stones',
            content: `
**What are Kidney Stones?**
Kidney stones are hard deposits made of minerals and salts that form inside your kidneys. Passing them can be quite painful, but they usually cause no permanent damage if recognized in a timely fashion.

**Symptoms:**
• Severe, sharp pain in the side and back, below the ribs.
• Pain that radiates to the lower abdomen and groin.
• Pain that comes in waves and fluctuates in intensity.
• Pain or burning sensation while urinating.
• Pink, red, or brown urine.
• Nausea and vomiting.

**Causes:**
• Not drinking enough water.
• Diets high in protein, salt, and sugar.
• Obesity.
• Certain medical conditions and supplements.

**Treatment:**
• Drinking a lot of water (2-3 liters a day).
• Pain relievers.
• Medical therapy to help pass the stone (alpha-blockers).
• Surgery or sound wave therapy for large stones.

**Prevention:**
1. Stay hydrated throughout the day.
2. Eat fewer oxalate-rich foods if prone to calcium oxalate stones (e.g., spinach, nuts).
3. Choose a diet low in salt and animal protein.
            `
        },
        'cataract': {
            title: 'Cataract',
            content: `
**What is a Cataract?**
A cataract is a clouding of the normally clear lens of the eye. For people who have cataracts, seeing through cloudy lenses is a bit like looking through a frosty or fogged-up window.

**Symptoms:**
• Clouded, blurred, or dim vision.
• Increasing difficulty with vision at night.
• Sensitivity to light and glare.
• Need for brighter light for reading and other activities.
• Seeing "halos" around lights.
• Fading or yellowing of colors.

**Risk Factors:**
• Increasing age • Diabetes • Excessive exposure to sunlight • Smoking • Obesity • High blood pressure

**Treatment:**
• In early stages, stronger lighting and eyeglasses can help.
• Surgery is the only effective treatment, which involves removing the clouded lens and replacing it with an artificial clear lens. It is generally a safe and effective procedure.

**Prevention:**
1. Have regular eye exams.
2. Wear sunglasses to block UV rays.
3. Quit smoking.
4. Manage other health problems like diabetes.
5. Eat a healthy diet with plenty of fruits and vegetables.
            `
        },
        'eczema': {
            title: 'Eczema (Atopic Dermatitis)',
            content: `
**What is Eczema?**
Eczema is a condition that makes your skin red and itchy. It's common in children but can occur at any age. It is chronic and tends to flare periodically.

**Symptoms:**
• Dry skin.
• Itching, which may be severe, especially at night.
• Red to brownish-gray patches, especially on the hands, feet, ankles, wrists, neck, upper chest, eyelids, inside the bend of the elbows and knees.
• Small, raised bumps, which may leak fluid and crust over when scratched.
• Thickened, cracked, scaly skin.

**Triggers:**
• Certain soaps, detergents, or perfumes.
• Dust mites, animal dander, pollen.
• Sweat and stress.
• Certain foods (e.g., milk, eggs, peanuts).

**Treatment & Management:**
• **Moisturize:** Apply cream or ointment at least twice a day.
• **Medications:** Corticosteroid creams to control itching and inflammation. Calcineurin inhibitors.
• **Light therapy:** For severe cases.

**Prevention:**
1. Moisturize skin frequently.
2. Identify and avoid triggers.
3. Take shorter, warm (not hot) baths or showers.
4. Use gentle, mild soaps.
            `
        },
        'osteoporosis': {
            title: 'Osteoporosis',
            content: `
**What is Osteoporosis?**
Osteoporosis causes bones to become weak and brittle — so brittle that a fall or even mild stresses such as bending over or coughing can cause a fracture.

**Symptoms:**
There typically are no symptoms in the early stages. But once your bones have been weakened by osteoporosis, you might have signs and symptoms that include:
• Back pain, caused by a fractured or collapsed vertebra.
• Loss of height over time.
• A stooped posture.
• A bone that breaks much more easily than expected.

**Risk Factors:**
• Women, especially after menopause.
• Age.
• Family history.
• Small body frame.
• Low calcium intake, eating disorders, or gastrointestinal surgery.
• Long-term use of corticosteroid medications.

**Treatment:**
• Medications: Bisphosphonates are most commonly prescribed.
• Hormone-related therapy.
• Bone-building medications for severe cases.

**Prevention:**
1. Get enough Calcium (dairy products, dark green leafy vegetables).
2. Get enough Vitamin D (sunlight, supplements).
3. Exercise regularly, especially weight-bearing and muscle-strengthening exercises.
4. Avoid smoking and excessive alcohol.
            `
        },
        'pneumonia': {
            title: 'Pneumonia',
            content: `
**What is Pneumonia?**
Pneumonia is an infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus, causing cough with phlegm or pus, fever, chills, and difficulty breathing.

**Symptoms:**
• Chest pain when you breathe or cough.
• Confusion or changes in mental awareness (in adults age 65 and older).
• Cough, which may produce phlegm.
• Fatigue.
• Fever, sweating, and shaking chills.
• Lower than normal body temperature (in older adults and people with weak immune systems).
• Nausea, vomiting, or diarrhea.
• Shortness of breath.

**Causes:**
• Bacteria (Streptococcus pneumoniae is the most common).
• Viruses (including flu viruses, RSV, and SARS-CoV-2).
• Fungi.

**Treatment:**
• Antibiotics for bacterial pneumonia.
• Antiviral medication for viral pneumonia.
• Fever reducers and cough medicine.
• Hospitalization for severe cases, especially for young children or adults over 65.

**Prevention:**
1. Get vaccinated (pneumococcal, flu, COVID-19).
2. Practice good hygiene (wash hands regularly).
3. Don't smoke.
4. Keep your immune system strong with enough sleep, a healthy diet, and regular exercise.
            `
        }
    };

    let _selectedTopic = null;

    function render() {
        _selectedTopic = null;

        const categories = [...new Set(TOPICS.map(t => t.category))];

        return `
        <div class="page-header">
            <h1 class="page-title">
                <span class="page-title-icon stat-icon blue"><i data-lucide="book-open"></i></span>
                Health Library
            </h1>
            <p class="page-description">Learn about common health conditions in simple, easy-to-understand language.</p>
        </div>

        <div class="glass-card-static mb-lg">
            <div class="search-container" style="margin-bottom: 0;">
                <i data-lucide="search" class="search-icon"></i>
                <input type="text" id="knowledgeSearchInput" class="search-input" placeholder="Search a health topic (e.g., Diabetes, Anxiety, Dengue...)" autocomplete="off">
                <div class="search-suggestions" id="knowledgeSuggestions"></div>
            </div>
        </div>

        <div id="knowledgeContent">
            ${renderTopicGrid(categories)}
        </div>
        `;
    }

    function renderTopicGrid(categories) {
        return categories.map(cat => `
            <div class="mb-lg">
                <h3 style="font-size: var(--font-base); color: var(--text-muted); margin-bottom: var(--space-md); text-transform: uppercase; letter-spacing: 1px;">${cat}</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-md);">
                    ${TOPICS.filter(t => t.category === cat).map(topic => `
                        <div class="quick-action topic-card" data-topic-id="${topic.id}" style="text-align: left; align-items: flex-start;">
                            <div style="font-size: var(--font-2xl);">${topic.icon}</div>
                            <div>
                                <div class="quick-action-label">${topic.name}</div>
                                <div style="font-size: var(--font-xs); color: var(--text-muted);">${topic.desc}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    function renderTopicDetail(topic) {
        const knowledge = KNOWLEDGE_BASE[topic.id];

        return `
        <div class="animate-in">
            <button class="btn btn-outline btn-sm mb-lg" id="backToTopics">
                <i data-lucide="arrow-left"></i> Back to Topics
            </button>

            <div class="glass-card-static mb-lg" style="border-left: 3px solid var(--primary);">
                <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg);">
                    <span style="font-size: var(--font-2xl);">${topic.icon}</span>
                    <div>
                        <h2 style="font-size: var(--font-xl);">${topic.name}</h2>
                        <span class="badge badge-primary">${topic.category}</span>
                    </div>
                </div>

                <div id="topicContent" style="font-size: var(--font-sm); line-height: 1.8; color: var(--text-primary);">
                    ${knowledge ? formatContent(knowledge.content) : '<div class="loading-overlay"><div class="spinner"></div><p class="loading-text">Loading information...</p></div>'}
                </div>
            </div>

            <div class="glass-card-static" style="border-left: 3px solid var(--warning);">
                <p style="font-size: var(--font-sm); color: var(--text-secondary);">
                    ⚠️ <strong>Disclaimer:</strong> This information is for educational purposes only. Consult a healthcare professional for medical advice, diagnosis, or treatment.
                </p>
            </div>
        </div>
        `;
    }

    function formatContent(text) {
        // Simple markdown-like formatting
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/^### (.+)$/gm, '<h4 style="color: var(--primary); margin: var(--space-md) 0 var(--space-sm);">$1</h4>')
            .replace(/^## (.+)$/gm, '<h3 style="color: var(--primary); margin: var(--space-lg) 0 var(--space-sm);">$1</h3>')
            .replace(/^• (.+)$/gm, '<div style="padding-left: var(--space-md); margin: 2px 0;">→ $1</div>')
            .replace(/^(\d+)\. (.+)$/gm, '<div style="padding-left: var(--space-md); margin: 2px 0;"><strong>$1.</strong> $2</div>')
            .replace(/🔴 (.+)/g, '<span style="color: var(--danger); font-weight: 600;">🔴 $1</span>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
    }

    async function showTopicDetail(topic) {
        _selectedTopic = topic;
        const container = document.getElementById('knowledgeContent');
        container.innerHTML = renderTopicDetail(topic);

        // If not in knowledge base, try AI
        if (!KNOWLEDGE_BASE[topic.id] && AIService.isOnline()) {
            const result = await AIService.explainHealthTopic(topic.name);
            if (result) {
                const contentEl = document.getElementById('topicContent');
                if (contentEl) {
                    contentEl.innerHTML = formatContent(result);
                }
            }
        }

        bindDetailEvents();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function bindSearchEvents() {
        const input = document.getElementById('knowledgeSearchInput');
        const suggestions = document.getElementById('knowledgeSuggestions');

        if (input) {
            input.addEventListener('input', () => {
                const val = input.value.trim().toLowerCase();
                if (val.length >= 2) {
                    const matches = TOPICS.filter(t =>
                        t.name.toLowerCase().includes(val) ||
                        t.desc.toLowerCase().includes(val) ||
                        t.category.toLowerCase().includes(val)
                    );
                    if (matches.length > 0) {
                        suggestions.innerHTML = matches.map(t => `
                            <div class="search-suggestion-item" data-topic-id="${t.id}">
                                ${t.icon} <strong>${t.name}</strong> <span style="color: var(--text-muted);">— ${t.category}</span>
                            </div>
                        `).join('');
                        suggestions.classList.add('active');
                    } else if (AIService.isOnline()) {
                        suggestions.innerHTML = `
                            <div class="search-suggestion-item" data-ai-topic="${val}">
                                🤖 Ask AI about "${val}"
                            </div>
                        `;
                        suggestions.classList.add('active');
                    } else {
                        suggestions.classList.remove('active');
                    }
                } else {
                    suggestions.classList.remove('active');
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const val = input.value.trim();
                    if (val.length >= 2) {
                        const match = TOPICS.find(t => t.name.toLowerCase().includes(val.toLowerCase()));
                        if (match) {
                            showTopicDetail(match);
                        } else if (AIService.isOnline()) {
                            showTopicDetail({ id: val.toLowerCase().replace(/\s/g, '-'), name: val, icon: '📖', category: 'AI Search', desc: '' });
                        }
                        suggestions.classList.remove('active');
                    }
                }
            });
        }

        if (suggestions) {
            suggestions.addEventListener('click', (e) => {
                const item = e.target.closest('.search-suggestion-item');
                if (item) {
                    const topicId = item.getAttribute('data-topic-id');
                    const aiTopic = item.getAttribute('data-ai-topic');

                    if (topicId) {
                        const topic = TOPICS.find(t => t.id === topicId);
                        if (topic) showTopicDetail(topic);
                    } else if (aiTopic) {
                        showTopicDetail({ id: aiTopic.replace(/\s/g, '-'), name: aiTopic, icon: '📖', category: 'AI Search', desc: '' });
                    }
                    suggestions.classList.remove('active');
                }
            });
        }

        // Topic cards
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-topic-id');
                const topic = TOPICS.find(t => t.id === id);
                if (topic) showTopicDetail(topic);
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                suggestions?.classList.remove('active');
            }
        });
    }

    function bindDetailEvents() {
        const backBtn = document.getElementById('backToTopics');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                _selectedTopic = null;
                const container = document.getElementById('knowledgeContent');
                const categories = [...new Set(TOPICS.map(t => t.category))];
                container.innerHTML = renderTopicGrid(categories);
                bindSearchEvents();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        }
    }

    function afterRender() {
        bindSearchEvents();
    }

    return { render, afterRender };
})();
