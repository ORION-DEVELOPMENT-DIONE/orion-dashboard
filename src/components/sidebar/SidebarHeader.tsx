import React from "react";
import { Orbit } from "lucide-react";

export function SidebarHeader() {

  return (
    <div className="relative p-6">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-600 opacity-90 rounded-t-3xl" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] mix-blend-overlay opacity-20 rounded-t-3xl" />
      <div className="relative flex items-center gap-3">
        <div className="p-2 bg-purple-500/20 rounded-xl backdrop-blur-sm border border-purple-500/20">
          <Orbit className="h-6 w-6 text-purple-200" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl text-purple-50">ORION</span>
          <span className="text-xs text-purple-200">Remote Validator</span>
            
        </div>
      </div>
    </div>
  );
}
