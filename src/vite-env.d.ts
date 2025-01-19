/// <reference types="vite/client" />
// global.d.ts
interface Window {
    dione?: {
      address: string;
      status: string;
      balance: string;
      connect: (params: { chain: string }) => Promise<void>;
      disconnect: () => Promise<void>;
      signTx: (params: { unsignedTx: unknown; chain: string }) => Promise<any>;
      addDelegator: (params: { nodeID: string; endTime: number; amount: string }) => Promise<any>;
      addValidator: (params: { nodeID: string; startTime: number; endTime: number; reward: string; amount: string }) => Promise<any>;
    };
  }