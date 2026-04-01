import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-navy/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center shadow-lg">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gold rounded-sm flex items-center justify-center font-bold text-navy text-xl">
          A
        </div>
        <span className="text-gold font-bold tracking-widest text-sm hidden sm:block uppercase">Asian Paints</span>
      </div>
    </header>
  );
};
