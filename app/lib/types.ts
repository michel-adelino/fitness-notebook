export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'custom';
  defaultSets?: number;
  defaultReps?: number;
  defaultWeight?: number;
  notes?: string;
}

export interface ExerciseOnPage extends Exercise {
  sets?: number;
  reps?: number;
  weight?: number;
  order: number;
}

export interface ColorScheme {
  lineColor: string;
  headingColor: string;
  accentColor: string;
}

export interface Personalization {
  name: string;
  initials: string;
  quote: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  layout: 'weekly' | 'daily' | 'tracker' | 'split' | 'progressive' | 'fullbody' | 'blank' | 'table' | 'log' | 'planner';
  sections: string[];
  hasTable?: boolean;
  tableColumns?: string[];
}

export interface NotebookPage {
  templateId: string;
  exercises: ExerciseOnPage[];
  colors: ColorScheme;
  personalization: Personalization;
  pageSize: {
    width: number; // in mm
    height: number; // in mm
  };
}

