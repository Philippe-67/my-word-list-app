import React from 'react';

interface StarsDisplayProps {
  starsCount: number;
  starsStatus: ('correct' | 'incorrect' | null)[];
}

const StarsDisplay: React.FC<StarsDisplayProps> = ({ starsCount, starsStatus }) => {
  const getClassName = (index: number) => {
    let className = 'star';
    if (index < starsCount) {
      className += ' filled';
    }
    if (index < starsCount && starsStatus[index]) {
      className += starsStatus[index] === 'correct' ? ' correct' : ' incorrect';
    }
    return className;
  };

  return (
    <div style={{ display: 'flex', marginTop: '10px' }}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={getClassName(index)}
          style={{ fontSize: '30px', marginRight: '5px' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarsDisplay;
