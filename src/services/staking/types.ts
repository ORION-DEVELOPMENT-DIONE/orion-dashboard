export interface StakingFormData {
    walletAddress: string;
    privateKey: string;
    amount: string;
    nodeId: string;
    duration: number;
    rewardAddress: string;
    fee: number;
  }
  
  export interface StakingResult {
    success: boolean;
    txId?: string;
    error?: string;
    step: 'export' | 'import' | 'validator';
  }