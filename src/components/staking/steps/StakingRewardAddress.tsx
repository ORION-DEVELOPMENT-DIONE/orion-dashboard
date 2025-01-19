import React, { useState } from "react";

interface StakingRewardAddressProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StakingRewardAddress: React.FC<StakingRewardAddressProps> = ({
  value,
  onChange,
  onNext,
  onBack,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (!value.trim()) {
      setError("Reward address cannot be empty.");
      return;
    }
    setError(null); // Clear error if validation passes
    onNext();
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#240046] to-[#3c096c] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        Enter Your Staking Reward Address
      </h2>

      <div className="relative w-full">
        <input
          type={isPasswordVisible ? "text" : "password"}
          value={value}
          onChange={(e) => {
            setError(null); // Clear error on user input
            onChange(e.target.value);
          }}
          placeholder="Enter your staking reward address"
          className="w-full px-4 py-2 border-2 border-[#9d4edd] rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#7b2cbf] placeholder-gray-400 mb-2"
        />
        <button
          type="button"
          onClick={() => setPasswordVisible(!isPasswordVisible)}
          className="absolute right-3 top-2 text-purple-400 hover:text-purple-300"
        >
          {isPasswordVisible ? "Hide" : "Show"}
        </button>
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <div className="flex justify-between w-full mt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-full transition-all"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!value.trim()}
          className={`px-6 py-3 font-medium rounded-full transition-all ${
            value.trim()
              ? "bg-[#9d4edd] hover:bg-[#7b2cbf] text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
