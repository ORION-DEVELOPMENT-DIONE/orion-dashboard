import { StakingInput } from '../StakingInput';
import { GradientButton } from '../GradientButton';

interface RewardAddressStepProps {
  useConnectedWallet: boolean;
  customAddress: string;
  onUseConnectedWalletChange: (value: boolean) => void;
  onCustomAddressChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function RewardAddressStep({
  useConnectedWallet,
  customAddress,
  onUseConnectedWalletChange,
  onCustomAddressChange,
  onNext,
  onBack
}: RewardAddressStepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-[#13111C] rounded-lg p-4">
        <p className="text-gray-300">
          Choose the address that will receive the rewards from validating. Rewards will be sent to this address automatically. 
          Make sure it's the correct address, because this can't be changed later.
        </p>
      </div>

      <h2 className="text-2xl font-bold">Choose Reward Address</h2>
      
      <p className="text-gray-300">Choose a wallet address to which staking rewards will be sent</p>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            checked={useConnectedWallet}
            onChange={() => onUseConnectedWalletChange(true)}
            className="form-radio text-purple-500"
          />
          <span className="text-white">Connected wallet</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="radio"
            checked={!useConnectedWallet}
            onChange={() => onUseConnectedWalletChange(false)}
            className="form-radio text-purple-500"
          />
          <span className="text-white">Custom Address</span>
        </label>

        {!useConnectedWallet && (
          <StakingInput
            id="ochain"
            label="Custom O-Chain Address"
            value={customAddress}
            onChange={(e) => onCustomAddressChange(e.target.value)}
            placeholder="Paste O-Chain address"
          />
        )}
      </div>

      <div className="flex justify-between pt-4">
        <GradientButton variant="secondary" onClick={onBack}>
          Back
        </GradientButton>
        <GradientButton onClick={onNext}>
          Next
        </GradientButton>
      </div>
    </div>
  );
}