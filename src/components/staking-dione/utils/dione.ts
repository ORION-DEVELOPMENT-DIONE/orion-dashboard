export async function submitValidation(params: {
    nodeId: string;
    amount: string;
    startTime: number;
    endTime: number;
    reward: string;
  }) {
    if (!window.dione) {
      throw new Error('Dione wallet is not available');
    }
  
    try {
      console.log(params)
      return await window.dione.addValidator({
        nodeID: params.nodeId,
        amount: params.amount,
        startTime: params.startTime,
        endTime: params.endTime,
        reward: params.reward,
      });
    } catch (error) {
      console.error('Validation submission failed:', error);
      throw error;
    }
  }