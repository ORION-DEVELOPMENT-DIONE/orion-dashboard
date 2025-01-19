import React from 'react';

interface StakingReviewStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StakingReviewStep: React.FC<StakingReviewStepProps> = ({ value, onChange, onNext, onBack }) => {
  return (
    <div>
      <h2>Enter Your Private Key</h2>
      <input 
        type="password" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder="Enter your private key"
        className={`
            w-full px-4 py-2 bg-purple-900/50 border border-purple-700 
            rounded-lg text-purple-50 placeholder-purple-400
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            transition-all duration-200
            
          `}
      />
      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};