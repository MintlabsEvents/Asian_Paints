import React from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="mb-6"
      >
        <Loader2 size={64} className="text-[#D4AF37]" />
      </motion.div>
      <h2 className="text-2xl font-semibold text-white mb-2">Processing Your Submission</h2>
      <p className="text-gray-400">Please wait while we prepare your download...</p>
    </motion.div>
  );
};

export default Loader;
