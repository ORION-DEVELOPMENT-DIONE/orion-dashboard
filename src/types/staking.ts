export interface StakingFormData {
    walletAddress: string;
    privateKey: string;
    amount: string;
    nodeId: string;
    duration: number;
    rewardAddress: string;
    fee: number;
  }
  
  export interface ExportResponse {
    status: string;
    walletAddress: string;
    message: string;
    data: {
      txid: string;
      oAddressString: string;
    };
  }