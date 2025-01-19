import React from "react";
import { CheckCircle, Clock, Coins } from "lucide-react";
import { EarningsChart } from "./EarningChart";

interface ValidatorReviewProps {
  formData: {
    nodeId: string;
    oAddress: string;
    startTime: string;
    endTime: string;
    fee: number;
    stakeAmount: string;
    duration: number;
  };
}

export function ValidatorReview({ formData }: ValidatorReviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-900/30 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-purple-100 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-purple-400" />
            Validator Details
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-purple-300">Node ID</label>
              <p className="text-purple-100 font-mono text-sm break-all">
                {formData.nodeId}
              </p>
            </div>
            <div>
              <label className="text-sm text-purple-300">O-chain Address</label>
              <p className="text-purple-100 font-mono text-sm break-all">
                {formData.oAddress}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-900/30 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-purple-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            Staking Period
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-purple-300">Start Date</label>
              <p className="text-purple-100">
                {formatDate(formData.startTime)}
              </p>
            </div>
            <div>
              <label className="text-sm text-purple-300">End Date</label>
              <p className="text-purple-100">{formatDate(formData.endTime)}</p>
            </div>
            <div>
              <label className="text-sm text-purple-300">Duration</label>
              <p className="text-purple-100">{formData.duration} months</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-900/30 p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold text-purple-100 flex items-center gap-2">
          <Coins className="w-5 h-5 text-purple-400" />
          Projected Earnings
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-purple-300">Stake Amount</label>
              <p className="text-xl font-semibold text-purple-100">
                {formatAmount(formData.stakeAmount)} DIONE
              </p>
            </div>
            <div>
              <label className="text-sm text-purple-300">Delegation Fee</label>
              <p className="text-xl font-semibold text-purple-100">
                {formData.fee}%
              </p>
            </div>
          </div>
          <EarningsChart
            stakeAmount={Number(formData.stakeAmount)}
            duration={formData.duration}
            totalStaked={3129000000} // Static data for 2025
            blockRewards={500000000} // Static data for 2025 (Annual block rewards)
            transactionFees={33557} // Static data for 2025 (Annual transaction fees)
            operationalCost={500 / 12} // Static data: $500/year converted to monthly
          />
        </div>
      </div>
    </div>
  );
}
