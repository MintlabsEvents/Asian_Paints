import React, { createContext, useContext, ReactNode } from 'react';

interface ImageContextType {
  images: {
    leftLogo: string;
    rightLogo: string;
    lapBg: string;
    lapBg2: string;
    mobBg: string;
    mobBg2: string;
  };
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

// Import images
import LeftLogo from '../assets/saless800.png';
import RightLogo from '../assets/ops800.png';
import LapBg from '../assets/images/laptop/bg.png';
import LapBg2 from '../assets/images/laptop/bg1.png';
import MobBg from '../assets/images/mobile/bg.png';
import MobBg2 from '../assets/images/mobile/bg1.png';

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const images = {
    leftLogo: LeftLogo,
    rightLogo: RightLogo,
    lapBg: LapBg,
    lapBg2: LapBg2,
    mobBg: MobBg,
    mobBg2: MobBg2,
  };

  return (
    <ImageContext.Provider value={{ images }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};