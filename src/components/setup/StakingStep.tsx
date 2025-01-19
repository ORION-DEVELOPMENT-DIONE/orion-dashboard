import React from 'react';

interface StakingStepProps {
  title: string;
  description: string;
  children: React.ReactNode;
  actions: React.ReactNode;
}

export function StakingStep({ title, description, children, actions }: StakingStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-purple-50 mb-2">{title}</h2>
        <p className="text-purple-300">{description}</p>
      </div>
      
      <div className="space-y-4">
        {children}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        {actions}
      </div>
    </div>
  );
}