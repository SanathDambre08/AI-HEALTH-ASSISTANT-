-- ============================================
-- MediPulse — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================

-- 1. Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT DEFAULT '',
    age TEXT DEFAULT '',
    gender TEXT DEFAULT '',
    blood_group TEXT DEFAULT '',
    allergies TEXT DEFAULT '',
    conditions TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Emergency Contacts
CREATE TABLE IF NOT EXISTS public.emergency_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    contact1_name TEXT DEFAULT '',
    contact1_phone TEXT DEFAULT '',
    contact1_relation TEXT DEFAULT '',
    contact2_name TEXT DEFAULT '',
    contact2_phone TEXT DEFAULT '',
    contact2_relation TEXT DEFAULT '',
    doctor_name TEXT DEFAULT '',
    doctor_phone TEXT DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own emergency contacts" ON public.emergency_contacts FOR ALL USING (auth.uid() = user_id);

-- 3. Symptoms History
CREATE TABLE IF NOT EXISTS public.symptoms_history (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    symptoms TEXT NOT NULL,
    answers JSONB DEFAULT '{}',
    result JSONB DEFAULT '{}',
    urgency TEXT DEFAULT 'mild',
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.symptoms_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own symptoms" ON public.symptoms_history FOR ALL USING (auth.uid() = user_id);

-- 4. Medicine Schedule
CREATE TABLE IF NOT EXISTS public.medicine_schedule (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    dosage TEXT DEFAULT '',
    frequency TEXT DEFAULT '',
    times JSONB DEFAULT '[]',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.medicine_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own medicine schedule" ON public.medicine_schedule FOR ALL USING (auth.uid() = user_id);

-- 5. Medicine Logs (adherence tracking)
CREATE TABLE IF NOT EXISTS public.medicine_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    medicine_id BIGINT,
    medicine_name TEXT DEFAULT '',
    status TEXT DEFAULT 'taken',
    datetime TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.medicine_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own medicine logs" ON public.medicine_logs FOR ALL USING (auth.uid() = user_id);

-- 6. Mental Health Logs
CREATE TABLE IF NOT EXISTS public.mental_health_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type TEXT DEFAULT 'mood',
    mood TEXT DEFAULT '',
    note TEXT DEFAULT '',
    chat_history JSONB DEFAULT '[]',
    datetime TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.mental_health_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own mental health logs" ON public.mental_health_logs FOR ALL USING (auth.uid() = user_id);

-- 7. Eye Test Results
CREATE TABLE IF NOT EXISTS public.eye_test_results (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    score INTEGER DEFAULT 0,
    max_level INTEGER DEFAULT 0,
    details JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.eye_test_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own eye test results" ON public.eye_test_results FOR ALL USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id) VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Medicines Dictionary
CREATE TABLE IF NOT EXISTS public.medicines (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    generic_name TEXT DEFAULT '',
    brand_names JSONB DEFAULT '[]',
    category TEXT DEFAULT '',
    purpose TEXT DEFAULT '',
    dosage TEXT DEFAULT '',
    food_interaction TEXT DEFAULT '',
    side_effects JSONB DEFAULT '[]',
    precautions JSONB DEFAULT '[]',
    warnings JSONB DEFAULT '[]',
    alternatives JSONB DEFAULT '[]',
    price_tier TEXT DEFAULT 'medium'
);

ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for medicines" ON public.medicines FOR SELECT USING (true);

-- 9. Symptoms Dictionary
CREATE TABLE IF NOT EXISTS public.symptoms_dictionary (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    keywords JSONB DEFAULT '[]',
    follow_up JSONB DEFAULT '[]',
    results JSONB DEFAULT '{}'
);

ALTER TABLE public.symptoms_dictionary ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for symptoms_dictionary" ON public.symptoms_dictionary FOR SELECT USING (true);
