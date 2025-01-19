import { StakingInput } from '../StakingInput';
import { GradientButton } from '../GradientButton';

interface DelegationFeeStepProps {
  fee: number;
  useConnectedWallet: boolean;
  customAddress: string;
  onUseConnectedWalletChange: (value: boolean) => void;
  onCustomAddressChange: (value: string) => void;
  onFeeChange: (fee: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DelegationFeeStep({
  fee,
  useConnectedWallet,
  customAddress,
  onUseConnectedWalletChange,
  onCustomAddressChange,
  onFeeChange,
  onNext,
  onBack
}: DelegationFeeStepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-[#13111C] rounded-lg p-4">
        <p className="text-gray-300">
          Set the delegation fee percentage. This is the fee you'll charge delegators for staking their tokens with your validator.
        </p>
      </div>

      <h2 className="text-2xl font-bold">Delegation Fee</h2>

      <StakingInput
        id="delegationfee"
        label="Delegation Fee (%)"
        type="number"
        min="1"
        max="100"
        value={fee}
        onChange={(e) => onFeeChange(Number(e.target.value))}
        placeholder="Enter delegation fee percentage"
      />
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