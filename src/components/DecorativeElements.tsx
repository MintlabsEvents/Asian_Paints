import React from 'react';

export const DecorativeElements: React.FC = () => {
  return (
    <>
      <div className="fixed -bottom-20 -right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -top-20 -left-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
    </>
  );
};
