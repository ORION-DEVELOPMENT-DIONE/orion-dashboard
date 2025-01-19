import React from 'react';
import { cn } from '../../utils/cn';

interface SetupStepProps {
  title: string;
  children: React.ReactNode;
  actions: React.ReactNode;
}

export function SetupStep({ title, children, actions }: SetupStepProps) {
  return (
    <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-purple-100 mb-4">{title}</h2>
      <div className="text-purple-200 space-y-4">
        {children}
      </div>
      <div className="mt-6 flex gap-3 justify-end">
        {actions}
      </div>
    </div>
  );
}