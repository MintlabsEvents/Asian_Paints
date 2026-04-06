import React from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { useImages } from '../context/ImageContext';

const Loader: React.FC = () => {
  const { images } = useImages();

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* BACKGROUND LAYERS */}

      {/* Desktop */}
      <div className="hidden md:block absolute inset-0">
        <img src={images.lapBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <img src={images.lapBg2} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Mobile */}
      <div className="block md:hidden absolute inset-0">
        <img src={images.mobBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <img src={images.mobBg2} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* LOGOS (SAME POSITION) */}
      <div className="absolute top-[17%] md:top-[19%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-20 flex justify-between items-center">
        <img
          src={images.leftLogo}
          alt="Left Logo"
          className="h-[40px] md:h-[120px] w-auto ml-[18%] md:ml-[0%] lg:ml-[0%]"
        />
        <img
          src={images.rightLogo}
          alt="Right Logo"
          className="h-[40px] md:h-[120px] w-auto mr-[15%] md:mr-[5%] lg:mr-[0%]"
        />
      </div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="mb-6"
        >
          <Loader2 size={64} className="text-[#00ddff]" />
        </motion.div>

        <h2 className="text-2xl font-semibold text-white mb-2">
          Processing Your <br/> Submission
        </h2>

        <p className="text-gray-400">
          Please wait while<br/> we prepare your download...
        </p>
      </motion.div>

    </div>
  );
};

export default Loader;