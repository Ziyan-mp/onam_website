import React, { useState } from 'react';
import { LuckyDrawAnimation } from '../components/LuckyDrawAnimation';

/**
 * Live Lucky Draw Controller Modal Wrapper
 */
export const WinnerDrawModal = ({ isOpen, onClose }) => {
  return (
    <LuckyDrawAnimation
      isOpen={isOpen}
      onClose={onClose}
      onWinnerDeclared={(winner) => {
        console.log('Winner declared:', winner);
      }}
    />
  );
};

export default WinnerDrawModal;
