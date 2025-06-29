
-- Create a table for university programs
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  academic_field TEXT NOT NULL,
  university_name TEXT NOT NULL,
  university_location TEXT,
  university_overall_ranking INTEGER,
  university_subject_ranking INTEGER,
  program_name TEXT NOT NULL,
  program_link TEXT,
  program_duration TEXT,
  admission_requirements TEXT,
  total_credits INTEGER DEFAULT 0,
  annual_tuition_fee INTEGER DEFAULT 0,
  date_added TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read programs (public data)
CREATE POLICY "Anyone can view programs" 
  ON public.programs 
  FOR SELECT 
  TO public
  USING (true);

-- Create policy to allow all users to insert programs
CREATE POLICY "Anyone can create programs" 
  ON public.programs 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Create policy to allow all users to update programs
CREATE POLICY "Anyone can update programs" 
  ON public.programs 
  FOR UPDATE 
  TO public
  USING (true);

-- Create policy to allow all users to delete programs
CREATE POLICY "Anyone can delete programs" 
  ON public.programs 
  FOR DELETE 
  TO public
  USING (true);
