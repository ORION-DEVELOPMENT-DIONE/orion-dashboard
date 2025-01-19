import React from "react";

interface StakingReviewProps {
  formData: {
    walletAddress: string;
    privateKey: string;
    amount: string;
    nodeId: string;
    duration: number;
    rewardAddress: string;
    fee: number;
  };
  results?: any[];
  error?: string;
  isProcessing: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export const StakingReview: React.FC<StakingReviewProps> = ({
  formData,
  results,
  error,
  isProcessing,
  onSubmit,
  onBack,
}) => {
  const reviewItems = [
    { label: "Wallet Address", value: formData.walletAddress },
    { label: "Private Key", value: "••••••••" },
    { label: "Stake Amount", value: `${formData.amount} tokens` },
    { label: "Node ID", value: formData.nodeId },
    { label: "Duration", value: `${formData.duration} months` },
    { label: "Reward Address", value: formData.rewardAddress },
    { label: "Delegation Fee", value: `${formData.fee}%` },
  ];

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#240046] to-[#3c096c] p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Review Your Staking Details</h2>

      {/* Review Items */}
      <div className="w-full space-y-4">
        {reviewItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-purple-700/50"
          >
            <span className="text-purple-300">{item.label}</span>
            <span className="text-purple-50 font-medium">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Transaction Results */}
      {results && results.length > 0 && (
        <div className="mt-6 p-4 bg-purple-900/30 rounded-lg w-full">
          <h3 className="text-lg font-semibold text-purple-50 mb-3">
            Transaction Results
          </h3>
          {results.map((result, index) => (
            <div key={index} className="space-y-2">
              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-sm text-purple-300">{key}</span>
                  <span className="text-purple-50 font-mono break-all">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg w-full">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between w-full mt-6">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className={`px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-full transition-all ${
            isProcessing ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Back
        </button>

        <button
          onClick={onSubmit}
          disabled={isProcessing}
          className={`px-6 py-3 font-medium rounded-full transition-all ${
            isProcessing
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-[#9d4edd] hover:bg-[#7b2cbf] text-white"
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};
