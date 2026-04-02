import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Download } from 'lucide-react';
import { FormData } from '../types';
import { getPdfUrl } from '../constants';

interface DownloadPageProps {
  formData: FormData;
}

export const DownloadPage: React.FC<DownloadPageProps> = ({ formData }) => {
  return (
    <motion.div
      key="download"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex-1 flex flex-col items-center justify-center py-12 px-6"
    >
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl text-center">
        <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-gold" />
        </div>
        <h2 className="text-3xl font-bold mb-8">Submission Successful</h2>
        
        <a
         href={getPdfUrl(formData.questionC?.[0] || null, formData.questionD?.[0] || null)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gold hover:bg-gold-hover text-navy font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-gold/20"
        >
          <Download size={20} /> Download PDF
        </a>
      </div>
    </motion.div>
  );
};
