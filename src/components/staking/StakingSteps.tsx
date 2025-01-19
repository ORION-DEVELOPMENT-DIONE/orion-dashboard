import React from 'react';
import { SetupProgress } from '../setup/SetupProgress';
import { StakingStep } from './StakingStep';
import { StakingInput } from './StakingInput';
import { StakingSlider } from './StakingSlider';
import { StakingReview } from './StakingReview';
import { SetupButton } from '../setup/SetupButton';

interface StakingStepsProps {
  currentStep: number;
  formData: any;
  updateFormData: (field: string, value: string | number) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function StakingSteps({ 
  currentStep, 
  formData, 
  updateFormData,
  onNext,
  onBack,
  onSubmit
}: StakingStepsProps) {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StakingStep
            title="Stake Amount"
            description="Enter the amount of tokens you want to stake"
            actions={<SetupButton onClick={onNext}>Next</SetupButton>}
          >
            <StakingInput
              id="amount"
              label="Amount to Stake"
              value={formData.amount}
              onChange={(e) => updateFormData('amount', e.target.value)}
              placeholder="Enter stake amount"
              type="number"
              min="0"
            />
          </StakingStep>
        );
      
      case 2:
        return (
          <StakingStep
            title="Node Information"
            description="Enter your validator node ID"
            actions={
              <>
                <SetupButton variant="secondary" onClick={onBack}>Back</SetupButton>
                <SetupButton onClick={onNext}>Next</SetupButton>
              </>
            }
          >
            <StakingInput
              id="nodeId"
              label="Node ID"
              value={formData.nodeId}
              onChange={(e) => updateFormData('nodeId', e.target.value)}
              placeholder="Enter your node ID"
            />
          </StakingStep>
        );

      // ... Similar pattern for steps 3-5 ...

      default:
        return (
          <StakingStep
            title="Review Your Stake"
            description="Please review your staking configuration"
            actions={
              <>
                <SetupButton variant="secondary" onClick={onBack}>Back</SetupButton>
                <SetupButton onClick={onSubmit}>Confirm Stake</SetupButton>
              </>
            }
          >
            <StakingReview formData={formData} />
          </StakingStep>
        );
    }
  };

  return (
    <>
      <SetupProgress currentStep={currentStep} totalSteps={5} />
      {renderStepContent()}
    </>
  );
}