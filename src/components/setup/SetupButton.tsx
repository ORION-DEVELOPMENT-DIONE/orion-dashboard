import React from 'react';

interface SetupButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function SetupButton({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: SetupButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50";
  const variantStyles = {
    primary: "bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700",
    secondary: "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 active:bg-purple-500/40"
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}