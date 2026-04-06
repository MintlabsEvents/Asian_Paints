import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useImages } from '../context/ImageContext';

interface StartPageProps {
  onStart: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  const { images } = useImages();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* BACKGROUND LAYERS */}
      <div className="hidden md:block absolute inset-0">
        <img
          src={images.lapBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src={images.lapBg2}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="block md:hidden absolute inset-0">
        <img
          src={images.mobBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src={images.mobBg2}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="absolute top-[17%] md:top-[19%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-20 flex justify-between items-center">
        <img
          src={images.leftLogo}
          alt="Left Logo"
          className="h-[50px] md:h-[120px] w-auto ml-[12%] md:ml-[0%] lg:ml-[0%]"
        />
        <img
          src={images.rightLogo}
          alt="Right Logo"
          className="h-[50px] md:h-[120px] w-auto mr-[10%] md:mr-[5%] lg:mr-[0%]"
        />
      </div>

      {/* CONTENT */}
      <motion.div
        key="start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white"
        >
          Please fill the <span className="text-[#00ddff]">Form</span>
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-[#00ddff] hover:bg-[#4ea9b7] text-navy font-bold py-4 px-10 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-gold/20"
        >
          Get Started <ChevronRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
};