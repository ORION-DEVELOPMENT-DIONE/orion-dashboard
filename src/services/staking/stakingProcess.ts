import { StakingFormData, StakingResult } from "./types";
import { Odyssey, BinTools, Buffer, BN } from "../../dist"
//import { buildAndExportTx } from "../buildExportTx";
interface ExportParams {
  privateKey: string;
  walletAddress: string;
  amount: number;
}

interface ValidatorParams {
  privateKey: string;
  nodeId: string;
  rewardAddress: string;
  delegationFee: number;
}

export async function executeStakingProcess(
  formData: StakingFormData
): Promise<StakingResult[]> {
  const results: StakingResult[] = [];

  try {
    // Step 1: Export funds
    const exportParams: ExportParams = {
      privateKey: formData.privateKey,
      walletAddress: formData.walletAddress,
      amount: Number(formData.amount)
    };
    
    const exportTxId = await buildAndExportTx({
        privateKey: formData.privateKey,
        dHexAddress: formData.walletAddress,
        dioneAmount: formData.amount
      });
    results.push({ 
      success: true, 
      txId: exportTxId, 
      step: 'export' 
    });

    // Step 2: Import funds
    const importTxId = await buildImportTransaction({ privateKey: formData.privateKey });
    results.push({ 
      success: true, 
      txId: importTxId, 
      step: 'import' 
    });

    // Step 3: Add validator
    const validatorParams: ValidatorParams = {
      privateKey: formData.privateKey,
      nodeId: formData.nodeId,
      rewardAddress: formData.rewardAddress,
      delegationFee: formData.fee
    };
    
    const validatorTxId = await buildAddValidatorTransaction(validatorParams);
    results.push({ 
      success: true, 
      txId: validatorTxId, 
      step: 'validator' 
    });

    return results;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Process failed';
    results.push({
      success: false,
      error: errorMessage,
      step: results.length === 0 ? 'export' : 
            results.length === 1 ? 'import' : 'validator'
    });
    return results;
  }
}