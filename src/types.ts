export type QuestionOption = 'AA' | 'BB' | 'CC' | 'DD';

  export interface FormData {
    fullName: string;


    employeeCode?: string;
    unit?: string;
    territory?: string;

    questionC: string[];
    questionD: string[];

    agenda?: string;

    pdfUrl?: string;
  }

export type Page = 'START' | 'FORM' | 'LOADING' | 'DOWNLOAD';
