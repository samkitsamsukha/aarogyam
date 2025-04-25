import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  highlight?: 'blue' | 'green' | 'red' | 'none';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  highlight = 'none' 
}) => {
  const highlightClass = {
    blue: 'border-l-4 border-blue-500',
    green: 'border-l-4 border-green-500',
    red: 'border-l-4 border-red-500',
    none: ''
  };

  return (
    <div 
      className={`
        bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden
        ${onClick ? 'cursor-pointer' : ''}
        ${highlightClass[highlight]}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;