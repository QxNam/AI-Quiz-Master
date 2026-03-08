
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizState {
  subject: string;
  grade: string;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: number[];
  isFinished: boolean;
  isLoading: boolean;
  error: string | null;
}

export enum AppStatus {
  SETUP = 'SETUP',
  LOADING = 'LOADING',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS',
  REVIEW = 'REVIEW'
}

export interface QuizSession {
  id: string;
  subject: string;
  scope: string;
  grade: string;
  studentName: string;
  startTime: string;
  endTime: string;
  questions: Question[];
  userAnswers: number[];
  scorePercent: number;
}