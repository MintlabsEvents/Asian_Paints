import React, { useEffect, useState } from 'react';

interface ImagePreloaderProps {
  onLoaded: () => void;
  children: React.ReactNode;
}

// List all images to preload
const imagesToPreload = [
  // Laptop backgrounds
  '/src/assets/images/laptop/bg.png',
  '/src/assets/images/laptop/bg1.png',
  // Mobile backgrounds
  '/src/assets/images/mobile/bg.png',
  '/src/assets/images/mobile/bg1.png',
  // Logos
  '/src/assets/saless800.png',
  '/src/assets/ops800.png',
];

export const ImagePreloader: React.FC<ImagePreloaderProps> = ({ onLoaded, children }) => {
  const [loaded, setLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    
    const preloadImages = async () => {
      const promises = imagesToPreload.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            if (mounted) {
              setLoadedCount(prev => prev + 1);
            }
            resolve(src);
          };
          img.onerror = (err) => {
            console.warn(`Failed to load image: ${src}`, err);
            if (mounted) {
              setLoadedCount(prev => prev + 1);
            }
            resolve(src); // Resolve anyway to continue
          };
        });
      });

      await Promise.all(promises);
      if (mounted) {
        setLoaded(true);
        onLoaded();
      }
    };

    preloadImages();

    return () => {
      mounted = false;
    };
  }, [onLoaded]);

  // Show loading screen while images are loading
  if (!loaded) {
    return (
      <div className="fixed inset-0 bg-navy flex flex-col items-center justify-center z-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
          <p className="mt-4 text-white text-lg">Loading resources... ({loadedCount}/{imagesToPreload.length})</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};