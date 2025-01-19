import React from 'react';
import { cn } from '../../utils/cn';

interface NetworkStatusProps {
  status: 'operational' | 'degraded' | 'down';
  message: string;
}

export function NetworkStatus({ status, message }: NetworkStatusProps) {
  const statusColors = {
    operational: 'bg-green-500',
    degraded: 'bg-yellow-500',
    down: 'bg-red-500'
  };

  return (
    <div className="bg-purple-900/40 backdrop-blur-sm rounded-lg p-4 mt-auto">
      <div className="flex items-center gap-2">
        <div className={cn(
          "w-2 h-2 rounded-full animate-pulse",
          statusColors[status]
        )} />
        <span className="text-sm font-medium text-white">Network Status</span>
      </div>
      <p className="text-xs text-purple-200 mt-1">{message}</p>
    </div>
  );
}