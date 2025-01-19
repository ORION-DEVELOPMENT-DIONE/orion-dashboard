export async function submitValidatorStake({
    nodeId,
    startDate,
    endDate,
    stakeAmount,
    delegationFee,
  }: {
    nodeId: string;
    startDate: Date;
    endDate: Date;
    stakeAmount: string;
    delegationFee: number;
  }) {
    if (!window.dione) {
      throw new Error("Dione wallet is not available");
    }
  
    const startTime = Math.floor(startDate.getTime() / 1000);
    const endTime = Math.floor(endDate.getTime() / 1000);
  
    try {
      await window.dione.addValidator({
        nodeID: nodeId,
        startTime,
        endTime,
        reward: delegationFee.toString(),
        amount: stakeAmount,
      });
    } catch (error) {
      console.error("Failed to submit validator stake:", error);
      throw error;
    }
  }

  /*
  
  */