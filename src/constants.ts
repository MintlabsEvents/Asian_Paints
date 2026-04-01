import { QuestionOption } from "./types";

export const PDF_MAPPING: Record<string, string> = {
  // Mapping C_D to PDF URL
  'AA_AA': 'https://example.com/pdfs/one.pdf',
  'AA_BB': 'https://example.com/pdfs/one.pdf',
  'AA_CC': 'https://example.com/pdfs/two.pdf',
  'AA_DD': 'https://example.com/pdfs/two.pdf',
  
  'BB_AA': 'https://example.com/pdfs/one.pdf',
  'BB_BB': 'https://example.com/pdfs/two.pdf',
  'BB_CC': 'https://example.com/pdfs/three.pdf',
  'BB_DD': 'https://example.com/pdfs/three.pdf',
  
  'CC_AA': 'https://example.com/pdfs/two.pdf',
  'CC_BB': 'https://example.com/pdfs/three.pdf',
  'CC_CC': 'https://example.com/pdfs/four.pdf',
  'CC_DD': 'https://example.com/pdfs/four.pdf',
  
  'DD_AA': 'https://example.com/pdfs/three.pdf',
  'DD_BB': 'https://example.com/pdfs/four.pdf',
  'DD_CC': 'https://example.com/pdfs/four.pdf',
  'DD_DD': 'https://example.com/pdfs/one.pdf',
};

export const getPdfUrl = (c: QuestionOption | null, d: QuestionOption | null): string => {
  if (!c || !d) return '#';
  return PDF_MAPPING[`${c}_${d}`] || 'https://example.com/pdfs/default.pdf';
};
