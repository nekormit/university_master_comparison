
export interface Program {
  id: string;
  academicField: string;
  universityName: string;
  universityLocation: string;
  universityOverallRanking: number | null;
  universitySubjectRanking: number | null;
  programName: string;
  programLink: string;
  programDuration: string;
  admissionRequirements: string;
  totalCredits: number;
  annualTuitionFee: number;
  dateAdded: string;
}

export interface ProgramFormData extends Omit<Program, 'id' | 'dateAdded'> {}
