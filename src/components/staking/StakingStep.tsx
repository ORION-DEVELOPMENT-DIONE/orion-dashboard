import React from 'react';

interface StakingStepProps {
  title: string;
  description: string;
  children: React.ReactNode;
  actions: React.ReactNode;
}

export function StakingStep({ title, description, children, actions }: StakingStepProps) {
  return (
    <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-purple-100">{title}</h2>
      <p className="text-purple-300 mt-1 mb-6">{description}</p>
      <div className="space-y-4">
        {children}
      </div>
      <div className="mt-6 flex gap-3 justify-end">
        {actions}
      </div>
    </div>
  );
}