import React from 'react';

interface StakingProgressProps {
  currentStep: number;
  steps: Array<{
    number: number;
    title: string;
    isActive: boolean;
    isCompleted: boolean;
  }>;
}

export function StakingProgress({ currentStep, steps }: StakingProgressProps) {
  return (
    <div className="w-64 rounded-lg p-6">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-start mb-6 last:mb-0">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step.isActive ? 'bg-white text-[#13111C]' : 
                  step.isCompleted ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'}`}
            >
              {step.number}
            </div>
            {index < steps.length - 1 && (
              <div className="w-0.5 h-6 bg-gray-300 my-1" />
            )}
          </div>
          <span className={`ml-3 text-sm ${step.isActive ? 'text-white' : 'text-gray-400'}`}>
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
}