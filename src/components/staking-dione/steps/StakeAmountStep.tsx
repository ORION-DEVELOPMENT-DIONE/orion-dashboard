import { Copy } from "lucide-react";
import { GradientButton } from "../GradientButton";
import { StakingInput } from "../StakingInput";
interface StakeAmountStepProps {
    walletConnected: boolean; // Indicates if the wallet is connected
    walletAddress: string; // Wallet address string
    balance: string; // Current balance in the wallet
    stakeAmount: string; // User's entered stake amount
    onStakeAmountChange: (amount: string) => void; // Handler for stake amount changes
    onNext: () => void; // Proceed to the next step
    onBack: () => void; // Return to the previous step
    minimumStakeAmount?: number; // Optional: Minimum stake amount (e.g., 500,000 Dione)
    error?: string; // Optional: Error message for invalid inputs
    isLoading?: boolean; // Optional: Loading state for stake validation or fetching balance
  }
  
export function StakeAmountStep({
    walletConnected,
    walletAddress,
    balance,
    stakeAmount,
    onStakeAmountChange,
    onNext,
    onBack,
    minimumStakeAmount = 500000,
    error,
    isLoading = false,
  }: StakeAmountStepProps) {
    return (
      <div className="space-y-6">
        {/* Info Section */}
        <div className="bg-[#13111C] rounded-lg p-4">
          <p className="text-gray-300">
            Choose the amount to stake. You must have at least {minimumStakeAmount.toLocaleString()} Dione to be a validator. 
            If you do not have the minimum amount, you can become a delegator instead.
          </p>
        </div>
  
        <h2 className="text-2xl font-bold">Choose Staking Amount</h2>
  
        {/* Wallet Info */}
        {walletConnected && (
          <div className="flex items-center gap-2 text-gray-300">
            <span>Wallet address - {walletAddress}</span>
            <button 
              className="p-1 hover:text-white"
              onClick={() => navigator.clipboard.writeText(walletAddress)}
            >
              <Copy size={16} />
            </button>
          </div>
        )}
  
        {/* Balance Info */}
        <div>
          <p className="text-gray-400 mb-2">Stakeable Tokens</p>
          <p className="text-xl font-medium">
            {isLoading ? 'Loading...' : walletConnected ? balance : 'Please try to reconnect'} (O-Chain)
          </p>
        </div>
  
        {/* Stake Amount Input */}
        <StakingInput
          id="stakeamount"
          label="Stake Amount"
          type="number"
          value={stakeAmount}
          onChange={(e) => onStakeAmountChange(e.target.value)}
          placeholder={`Enter stake amount (Min: ${minimumStakeAmount})`}
          min={minimumStakeAmount}
        />
  
        {/* Error Display */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
  
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <GradientButton variant="secondary" onClick={onBack}>
            Back
          </GradientButton>
          <GradientButton onClick={onNext} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Next'}
          </GradientButton>
        </div>
      </div>
    );
  }
  