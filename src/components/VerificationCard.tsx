import React from 'react';
import { cn } from '../utils/cn';

interface VerificationCardProps {
  title: string;
  status: 'verified' | 'pending' | 'notConnected';
  description: string;
  icon: React.ReactNode;
  className?: string;
  error?: string | null;
}

export function VerificationCard({ 
  title, 
  status, 
  description, 
  icon,
  className,
  error 
}: VerificationCardProps) {
  const statusColors = {
    verified: 'bg-green-500',
    pending: 'bg-yellow-500',
    notConnected : 'bg-red-500'
  };

  return (
    <div className={cn(
      "bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-500/20",
      className
    )}>
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-purple-900/40 rounded-lg">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              statusColors[status]
            )}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          <p className="mt-1 text-purple-200">
            {error || description}
          </p>
        </div>
      </div>
    </div>
  );
}