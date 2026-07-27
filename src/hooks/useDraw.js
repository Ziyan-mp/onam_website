import { useContext } from 'react';
import { DrawContext } from '../context/DrawContext';

export const useDraw = () => {
  const context = useContext(DrawContext);
  if (!context) {
    throw new Error('useDraw must be used within a DrawProvider');
  }
  return context;
};

export default useDraw;
