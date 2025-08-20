import { useState } from 'react';

type StarStatus = 'correct' | 'incorrect' | null;

export function useStars() {
  const [starsCount, setStarsCount] = useState<number>(0);
  const [starsStatus, setStarsStatus] = useState<StarStatus[]>(Array(5).fill(null));

  const updateStar = (index: number, isCorrect: boolean) => {
    setStarsStatus(prev => {
      const newStatus = [...prev];
      newStatus[index] = isCorrect ? 'correct' : 'incorrect';
      return newStatus;
    });
    setStarsCount(prev => (prev + 1 > 5 ? 5 : prev + 1));
  };

  const resetStars = () => {
    setStarsCount(0);
    setStarsStatus(Array(5).fill(null));
  };

  return { starsCount, starsStatus, updateStar, resetStars };
}
