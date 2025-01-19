import React from 'react';
import { cn } from '../../utils/cn';

interface HeroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function HeroButton({ 
  variant = 'primary', 
  children, 
  className,
  ...props 
}: HeroButtonProps) {
  return (
    <button
      className={cn(
        "px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105",
        variant === 'primary' 
          ? "bg-white text-primary-700 hover:bg-primary-50 hover:shadow-lg hover:shadow-white/10" 
          : "bg-primary-700 text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-700/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}