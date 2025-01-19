import React from "react";

interface StakingFeeProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export const StakingFee: React.FC<StakingFeeProps> = ({
  value,
  onChange,
  onNext,
}) => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#240046] to-[#3c096c] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Staking Fee</h2>
      <p className="text-gray-300 text-sm text-center mb-4">
        Set the staking fee percentage. This fee will be deducted from your
        staking rewards.
      </p>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter fee percentage"
        className="w-full px-4 py-2 bg-[#9d4edd]/50 border border-[#7b2cbf] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b2cbf] transition-all duration-200 mb-6"
      />

      <button
        onClick={onNext}
        className="px-6 py-3 bg-[#9d4edd] hover:bg-[#7b2cbf] text-white font-medium rounded-full transition-all"
      >
        Next
      </button>
    </div>
  );
};
