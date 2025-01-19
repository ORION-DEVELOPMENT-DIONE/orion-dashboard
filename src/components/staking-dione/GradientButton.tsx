import React from 'react';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function GradientButton({ variant = 'primary', children, className = '', ...props }: GradientButtonProps) {
  return (
    <button
      {...props}
      className={`
        px-6 py-2 rounded-lg font-medium text-white
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600' 
          : 'bg-gray-800 hover:bg-gray-700'}
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        ${className}
      `}
    >
      {children}
    </button>
  );
}