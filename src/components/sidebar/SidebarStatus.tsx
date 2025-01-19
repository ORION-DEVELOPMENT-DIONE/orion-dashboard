import React from 'react';

export function SidebarStatus() {
  return (
    <div className="p-4">
      <div className="p-4 rounded-xl bg-purple-900/20 backdrop-blur-sm border border-purple-500/20">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
          <p className="text-sm text-purple-200 font-medium">Network Status</p>
        </div>
        <p className="text-xs text-purple-300 mt-1">All systems operational</p>
      </div>
    </div>
  );
}