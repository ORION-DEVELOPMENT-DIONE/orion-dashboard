import React from "react";

interface StakingNodeProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StakingNode({
  value,
  onChange,
  onNext,
  onBack,
}: StakingNodeProps) {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#240046] to-[#3c096c] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Enter Node ID</h2>
      <input
        type="text"
        placeholder="Enter your node ID"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border-2 border-[#9d4edd] rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#7b2cbf] placeholder-gray-400 mb-6"
      />
      <div className="flex justify-between w-full">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-full transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-[#9d4edd] hover:bg-[#7b2cbf] text-white font-medium rounded-full transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
}
