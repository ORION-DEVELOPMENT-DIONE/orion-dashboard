import React from 'react';
import { Wallet } from 'lucide-react';

export function StakingHeader() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-purple-500/20 rounded-xl">
        <Wallet className="h-6 w-6 text-purple-300" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-purple-50">Stake Your Tokens</h1>
        <p className="text-purple-300">Configure your staking parameters</p>
      </div>
    </div>
  );
}