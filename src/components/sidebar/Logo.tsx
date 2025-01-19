import React from 'react';
import { Orbit } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="block">
      <div className="flex items-center gap-3 px-4 py-5 hover:bg-purple-500/10 transition-colors rounded-lg">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"></div>
          <Orbit className="w-7 h-7 text-purple-200 relative animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white">
            ORION
          </h1>
          <p className="text-xs text-purple-300">Remote Validator</p>
        </div>
      </div>
    </Link>
  );
}