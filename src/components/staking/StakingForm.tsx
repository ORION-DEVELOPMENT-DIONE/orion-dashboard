import React, { useState } from 'react';
import { StakingInput } from './StakingInput';
import { StakingSlider } from './StakingSlider';
import { SetupButton } from '../SetupButton'

interface StakingFormProps {
  nodeId: string; // Retrieved from Orion device
  onSubmit: (formData: StakingFormData) => Promise<void>;
}

export interface StakingFormData {
  // Step 1: Export funds
  privateKey: string;
  dioneAmount: number;
  // Step 2: Validator setup
  nodeId: string;
  rewardAddress: string;
  startTime: number;
  endTime: number;
  delegationFee: number;
  stakeAmount: number;
}

export function StakingForm({ nodeId, onSubmit }: StakingFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<StakingFormData>({
    privateKey: '',
    dioneAmount: 0,
    nodeId,
    rewardAddress: '',
    startTime: Date.now(),
    endTime: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days default
    delegationFee: 2, // 2% default
    stakeAmount: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 ? (
        // Step 1: Export Funds Form
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-100">Step 1: Export Funds</h2>
          
          <StakingInput
            id="privateKey"
            label="Private Key"
            type="password"
            value={formData.privateKey}
            onChange={(e) => setFormData(prev => ({ ...prev, privateKey: e.target.value }))}
            placeholder="Enter your D-Chain private key"
          />

          <StakingInput
            id="dioneAmount"
            label="DIONE Amount"
            type="number"
            value={formData.dioneAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, dioneAmount: Number(e.target.value) }))}
            placeholder="Amount must be greater than import fee"
          />

          <SetupButton type="submit" className="w-full">
            Continue to Validator Setup
          </SetupButton>
        </div>
      ) : (
        // Step 2: Validator Setup Form
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-100">Step 2: Validator Setup</h2>

          <StakingInput
            id="nodeId"
            label="Node ID"
            value={nodeId}
            disabled
            placeholder="Retrieved from Orion device"
          />

          <StakingInput
            id="rewardAddress"
            label="Reward Address"
            value={formData.rewardAddress}
            onChange={(e) => setFormData(prev => ({ ...prev, rewardAddress: e.target.value }))}
            placeholder="Enter reward address"
          />

          <StakingInput
            id="stakeAmount"
            label="Stake Amount"
            type="number"
            value={formData.stakeAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, stakeAmount: Number(e.target.value) }))}
            placeholder="Enter stake amount"
          />

          <StakingSlider
            label="Delegation Fee"
            value={formData.delegationFee}
            onChange={(value) => setFormData(prev => ({ ...prev, delegationFee: value }))}
            min={1}
            max={20}
            unit="%"
          />

          <div className="flex gap-4">
            <SetupButton 
              type="button" 
              variant="secondary"
              onClick={() => setStep(1)}
              className="w-full"
            >
              Back
            </SetupButton>
            <SetupButton type="submit" className="w-full">
              Setup Validator
            </SetupButton>
          </div>
        </div>
      )}
    </form>
  );
}