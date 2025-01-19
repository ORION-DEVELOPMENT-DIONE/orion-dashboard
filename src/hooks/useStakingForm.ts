import { useState } from 'react';

interface StakingFormData {
  amount: string;
  nodeId: string;
  duration: number;
  rewardAddress: string;
  fee: number;
}

export function useStakingForm() {
  const [formData, setFormData] = useState<StakingFormData>({
    amount: '',
    nodeId: '',
    duration: 12,
    rewardAddress: '',
    fee: 10,
  });

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Staking:', formData);
    // Add actual submission logic here
  };

  return {
    formData,
    updateFormData,
    handleSubmit,
  };
}