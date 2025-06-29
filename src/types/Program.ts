
export interface Program {
  id: string;
  academic_field: string;
  university_name: string;
  university_location: string | null;
  university_overall_ranking: number | null;
  university_subject_ranking: number | null;
  program_name: string;
  program_link: string | null;
  program_duration: string | null;
  admission_requirements: string | null;
  total_credits: number;
  annual_tuition_fee: number;
  date_added: string;
  created_at: string;
  updated_at: string;
}

export interface ProgramFormData {
  academic_field: string;
  university_name: string;
  university_location: string;
  university_overall_ranking: number | null;
  university_subject_ranking: number | null;
  program_name: string;
  program_link: string;
  program_duration: string;
  admission_requirements: string;
  total_credits: number;
  annual_tuition_fee: number;
}
