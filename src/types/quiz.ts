export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'scale' | 'year';
  options?: QuizOption[];
  min?: number;
  max?: number;
  unit?: string;
  category: 'timeline' | 'capabilities' | 'risks' | 'outcomes';
}

export interface QuizOption {
  id: string;
  label: string;
  value: number | string;
  description?: string;
}

export interface QuizAnswer {
  questionId: string;
  value: number | string;
}

export interface QuizResults {
  answers: QuizAnswer[];
  completedAt: Date;
}
