import React from 'react';

interface ActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  color: 'red' | 'green' | 'blue';
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  onClick, 
  color, 
  disabled = false 
}) => {
  const colors = {
    red: 'hover:bg-red-500/20 text-red-400',
    green: 'hover:bg-green-500/20 text-green-400',
    blue: 'hover:bg-blue-500/20 text-blue-400'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-1 rounded-full transition ${colors[color]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {icon}
    </button>
  );
};