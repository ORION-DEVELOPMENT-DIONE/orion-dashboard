import React from 'react';

interface StakingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function StakingInput({ label, id, className = '', ...props }: StakingInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-purple-200">
        {label}
      </label>
      <input
        id={id}
        className={`
          w-full px-4 py-2 bg-purple-900/50 border border-purple-700 
          rounded-lg text-purple-50 placeholder-purple-400
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          transition-all duration-200
          ${className}
        `}
        {...props}
      />
    </div>
  );
}