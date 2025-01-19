import React from 'react';

interface SubSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SubSection({ title, children }: SubSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-100">{title}</h3>
      {children}
    </div>
  );
}