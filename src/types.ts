export interface Subject {
  code: string;
  name: string;
  credits: number;
  type: 'Core' | 'Adaptive' | 'Emerging' | 'Elective' | 'Non-Credit';
  lab_required: boolean;
  description: string;
  tools: string[];
  employment: string[];
}

export interface Semester {
  semester: number;
  total_credits: number;
  subjects: Subject[];
}

export interface CurriculumData {
  degree: string;
  branch: string;
  specialization: string;
  semesters: Semester[];
  total_credits: number;
  non_credit_subject: string;
  industry_score: number;
  skill_mapping: {
    skill: string;
    subjects: string[];
  }[];
  recommendations: string[];
  analytics: {
    layer_distribution: { name: string; value: number }[];
    importance_index: { name: string; value: number }[];
  };
}

export interface IndustryTrend {
  name: string;
  adoption: number;
  demand: number;
  learningCurve: 'Easy' | 'Moderate' | 'Hard';
  category: 'Stable' | 'Growing' | 'Emerging';
  roles: string[];
  growth: { year: number; value: number }[];
}
