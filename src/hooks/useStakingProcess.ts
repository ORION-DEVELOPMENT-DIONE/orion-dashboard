import { useState } from 'react';
import { exportFunds } from '../lib/staking';
import { StakingFormData, ExportResponse } from '../types/staking';

export function useStakingProcess() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<ExportResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startStakingProcess = async (formData: StakingFormData) => {
    setIsProcessing(true);
    setError(null);
    setResults([]);

    try {
      // Step 1: Export funds from D chain to O chain
      const exportResult = await exportFunds({
        walletAddress: formData.walletAddress,
        privateKey: formData.privateKey,
        dioneAmount: formData.amount
      });
      setResults(prev => [...prev, exportResult]);

      // Additional steps will be implemented based on API availability
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during the staking process');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    results,
    error,
    startStakingProcess
  };
}