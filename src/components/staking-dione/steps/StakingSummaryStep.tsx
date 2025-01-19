import { useState } from 'react';
import { GradientButton } from '../GradientButton';
import { formatDIONE, formatUSD, formatAddress } from '../utils/format';
import { submitValidation } from '../utils/dione';

interface StakingSummaryStepProps {
  summary: {
    network: string;
    stakeAmount: string;
    endingIn: {
      days: number;
      hours: number;
      minutes: number;
      date: string;
    };
    nodeId: string;
    rewardsAddress: string;
    delegationRewardAddress: string;
    delegationFee: number;
  };
  onSubmit: () => void;
  onBack: () => void;
}

export function StakingSummaryStep({
  summary,
  onSubmit,
  onBack
}: StakingSummaryStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const startTime = Math.floor((Date.now() + 10000) / 1000);
      console.log(startTime)
      const endTime = Math.floor(new Date(summary.endingIn.date).getTime() / 1000);
      console.log(endTime)
      
      await submitValidation({
        nodeId: summary.nodeId,
        amount: summary.stakeAmount,
        startTime,
        endTime,
        reward: summary.rewardsAddress.toString(),
      }).then(res=>{console.log(res)});
      onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit validation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#13111C] rounded-lg p-4">
        <p className="text-gray-300">
          Review these details carefully. Once you've committed and confirmed your validation transaction, the details you've configured are irreversible.
        </p>
      </div>

      <h2 className="text-2xl font-bold">Validation Summary</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-gray-400 mb-2">Network</h3>
            <p className="text-xl">{summary.network}</p>
          </div>
          <div>
            <h3 className="text-gray-400 mb-2">Validation Amount</h3>
            <p className="text-xl text-green-400">{formatDIONE(summary.stakeAmount)}</p>
            <p className="text-sm text-gray-400">{formatUSD(summary.stakeAmount)}</p>
          </div>
          <div>
            <h3 className="text-gray-400 mb-2">Validation Period</h3>
            <div className="flex gap-4">
              <div>
                <p className="text-xl">{summary.endingIn.days}</p>
                <p className="text-sm text-gray-400">Day(s)</p>
              </div>
              <div>
                <p className="text-xl">{summary.endingIn.hours}</p>
                <p className="text-sm text-gray-400">Hour(s)</p>
              </div>
              <div>
                <p className="text-xl">{summary.endingIn.minutes}</p>
                <p className="text-sm text-gray-400">Minute(s)</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-1">Ends: {summary.endingIn.date}</p>
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-800 pt-6">
          <div className="flex justify-between">
            <span className="text-gray-400">Node ID</span>
            <span>{summary.nodeId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Rewards Address</span>
            <span className="font-mono">{formatAddress(summary.rewardsAddress)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Delegation Fee</span>
            <span>{summary.delegationFee}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Delegation Rewards Address</span>
            <span className="font-mono">{formatAddress(summary.rewardsAddress)}</span>
          </div>
          
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-100">
          {error}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <GradientButton 
          variant="secondary" 
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </GradientButton>
        <GradientButton 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Validation'}
        </GradientButton>
      </div>
    </div>
  );
}