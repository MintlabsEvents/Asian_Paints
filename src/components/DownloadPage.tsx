import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Download } from 'lucide-react';
import { FormData } from '../types';
import { getPdfUrl } from '../constants';

/* ✅ SAME IMPORTS AS START PAGE */
import LeftLogo from '../assets/saless800.png';
import RightLogo from '../assets/ops800.png';

import LapBg from '../assets/images/laptop/bg.png';
import LapBg2 from '../assets/images/laptop/bg1.png';
import MobBg from '../assets/images/mobile/bg.png';
import MobBg2 from '../assets/images/mobile/bg1.png';

interface DownloadPageProps {
  formData: FormData;
}

export const DownloadPage: React.FC<DownloadPageProps> = ({ formData }) => {
  const pdfUrl = getPdfUrl(formData.agenda);

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* BACKGROUND LAYERS */}

      {/* Desktop */}
      <div className="hidden md:block absolute inset-0">
        <img src={LapBg} className="absolute inset-0 w-full h-full object-cover" />
        <img src={LapBg2} className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Mobile */}
      <div className="block md:hidden absolute inset-0">
        <img src={MobBg} className="absolute inset-0 w-full h-full object-cover" />
        <img src={MobBg2} className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* LOGOS (SAME POSITION AS START PAGE) */}
      <div className="absolute top-[17%] md:top-[19%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-20 flex justify-between items-center">
        
        <img
          src={LeftLogo}
          alt="Left Logo"
          className="h-[50px] md:h-[120px] w-auto ml-[12%] md:ml-[0%] lg:ml-[0%]"
        />

        <img
          src={RightLogo}
          alt="Right Logo"
          className="h-[50px] md:h-[120px] w-auto mr-[10%] md:mr-[5%] lg:mr-[0%]"
        />
      </div>

      {/* CONTENT */}
      <motion.div
        key="download"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl text-center">

          <div className="w-20 h-20 bg-[#00ddff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-[#00ddff]" />
          </div>

          <h2 className="text-3xl font-bold mb-8 text-white">
            Submission Successful
          </h2>

          <a
            href={pdfUrl}
            download
            className="w-full bg-[#00ddff] hover:bg-[#4ea9b7] text-navy font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00ddff]/20"
          >
            <Download size={20} /> Download PDF
          </a>

        </div>
      </motion.div>

    </div>
  );
};