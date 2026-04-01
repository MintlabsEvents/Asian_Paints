import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface StartPageProps {
  onStart: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  return (
    <motion.div
      key="start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center px-6 text-center py-12"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
      >
        Excellence in <span className="text-gold">Strategy</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 max-w-md mb-10 text-lg leading-relaxed"
      >
        Empowering your business with data-driven insights and professional guidance for a sustainable future.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="bg-gold hover:bg-gold-hover text-navy font-bold py-4 px-10 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-gold/20"
      >
        Get Started <ChevronRight size={20} />
      </motion.button>
    </motion.div>
  );
};
