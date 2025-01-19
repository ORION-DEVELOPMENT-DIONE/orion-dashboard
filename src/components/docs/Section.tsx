import React from 'react';
import { Card } from '../Card';

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function Section({ icon, title, description, children }: SectionProps) {
  return (
    <Card className="bg-purple-900/20 border-purple-500/20 backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-purple-50">{title}</h2>
          <p className="text-purple-300">{description}</p>
        </div>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </Card>
  );
}