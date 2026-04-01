export type QuestionOption = 'AA' | 'BB' | 'CC' | 'DD';

export interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  questionC: QuestionOption | null;
  questionD: QuestionOption | null;
}

export type Page = 'START' | 'FORM' | 'LOADING' | 'DOWNLOAD';
