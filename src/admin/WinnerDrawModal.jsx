import React from 'react';
import { LuckyDrawAnimation } from '../components/LuckyDrawAnimation';
import { useDraw } from '../hooks/useDraw';

/**
 * Live Lucky Draw Controller Modal Wrapper
 */
export const WinnerDrawModal = ({ isOpen, onClose }) => {
  const { triggerDrawRefresh } = useDraw();

  return (
    <LuckyDrawAnimation
      isOpen={isOpen}
      onClose={onClose}
      onWinnerDeclared={(winner) => {
        console.log('Winner declared:', winner);
        triggerDrawRefresh();
      }}
    />
  );
};

export default WinnerDrawModal;
