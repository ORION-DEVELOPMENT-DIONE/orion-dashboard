import React from 'react';
import { cn } from '../utils/cn';

interface SetupButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function SetupButton({ 
  children, 
  className, 
  variant = 'primary',
  ...props 
}: SetupButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-all duration-200",
        variant === 'primary' 
          ? "bg-purple-600 hover:bg-purple-700 text-white" 
          : "bg-purple-200 hover:bg-purple-300 text-purple-900",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}