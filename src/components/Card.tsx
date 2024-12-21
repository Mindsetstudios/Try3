import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link?: string;
  onClick?: () => void;
}

const Card = ({ title, description, icon, color, link, onClick }: CardProps) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (onClick) {
      return (
        <button onClick={onClick} className="block w-full text-left group">
          {children}
        </button>
      );
    }
    return (
      <a href={link} className="block group">
        {children}
      </a>
    );
  };

  return (
    <CardWrapper>
      <div className={`${color} rounded-lg p-6 h-full transition-transform duration-300 group-hover:scale-105`}>
        <div className="flex items-center mb-4">
          <div className="text-white">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-200">{description}</p>
      </div>
    </CardWrapper>
  );
};

export default Card;