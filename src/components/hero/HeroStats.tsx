import React from 'react';

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
  <div className="text-primary-100 transform hover:scale-105 transition-transform">
    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-100">
      {value}
    </div>
    <div className="text-sm text-purple-300">{label}</div>
  </div>
);

export function HeroStats() {
  return (
    <div className="flex justify-center gap-12 pt-12">
      <StatItem value="99.9%" label="Uptime" />
      <StatItem value="100+" label="Validators" />
      <StatItem value="0.01%" label="Energy Cost" />
    </div>
  );
}