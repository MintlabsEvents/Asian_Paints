import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Download, Loader2 } from 'lucide-react';
import { FormData } from '../types';
import { downloadPdf } from '../api/api';
import { useImages } from '../context/ImageContext';

export const AGENDA_PDF_MAPPING: Record<string, string> = {
  "Dealer Profitability": "1ORooinf6m7eMgx1imIIZYI6ZZNYy0cUX",
  "Expand Contractor Network": "1jTowox389VK34H2ehhSPJV4gDdKTAkBO",
  "Expand Dealer Network": "1sog1htnU9Dq6Kum2dohCLQCjt1uRP-dE",
  "Surface Share Gain": "1b5uUhR9wQLPrun_C-_04ZyCHcqLVkKtQ",
  "Engage Network": "1CWhPgacVzIDF_yVMtE5dukxQ2F25Ixok",
};

interface DownloadPageProps {
  formData: FormData;
}

export const DownloadPage: React.FC<DownloadPageProps> = ({ formData }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const { images } = useImages();

  const handleDownload = async () => {
    setIsDownloading(true);

    const fileId = AGENDA_PDF_MAPPING[formData.agenda];

    await downloadPdf(fileId);

    setIsDownloading(false);
    setIsDownloaded(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="hidden md:block absolute inset-0">
        <img src={images.lapBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <img src={images.lapBg2} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      <div className="block md:hidden absolute inset-0">
        <img src={images.mobBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <img src={images.mobBg2} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* LOGOS */}
      <div className="absolute top-[17%] md:top-[19%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-20 flex justify-between items-center">
        <img src={images.leftLogo} alt="Left Logo" className="h-[50px] md:h-[120px] w-auto ml-[12%] md:ml-[0%] lg:ml-[0%]" />
        <img src={images.rightLogo} alt="Right Logo" className="h-[50px] md:h-[120px] w-auto mr-[10%] md:mr-[5%] lg:mr-[0%]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">

        {!isDownloading && !isDownloaded ? (

          /* INITIAL STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl"
          >
            <div className="w-20 h-20 bg-[#00ddff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-[#00ddff]" />
            </div>

            <h2 className="text-3xl font-bold mb-8 text-white">
              Submission Successful
            </h2>

            <button
              onClick={handleDownload}
              className="w-full bg-[#00ddff] hover:bg-[#4ea9b7] text-navy font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <Download size={20} /> Download PDF
            </button>
          </motion.div>

        ) : isDownloading ? (

          /* LOADING STATE */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="mb-6"
            >
              <Loader2 size={64} className="text-[#00ddff]" />
            </motion.div>

            <h2 className="text-2xl font-semibold text-white mb-2">
              Your PDF will be downloaded shortly
            </h2>

            <p className="text-gray-400">
              Please wait while we prepare your file...
            </p>
          </motion.div>

        ) : (

          /* SUCCESS STATE */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <CheckCircle2 size={64} className="text-green-400 mb-6" />

            <h2 className="text-2xl font-semibold text-white mb-2">
              PDF Downloaded Successfully
            </h2>

            <p className="text-gray-400">
              You can check your downloads folder.
            </p>
          </motion.div>

        )}

      </div>
    </div>
  );
};