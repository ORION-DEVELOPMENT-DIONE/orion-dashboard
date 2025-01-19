// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
  }
  
  export interface User {
    id: string;
    email: string;
    devices: string[];
  }
  
  export interface Device {
    id: string;
    deviceId: string;
    name: string;
    status: 'active' | 'inactive' | 'maintenance' | 'linked';
    lastSeen: string;
  }
  
  export interface Validator {
    stakeAmount: number;
    delegationPercentage: number;
    nodeId: string;
    stakePeriod: number;
    status: 'initializing' | 'syncing' | 'active' | 'inactive';
    syncProgress?: {
      currentBlock: number;
      targetBlock: number;
      percentage: number;
    };
  }
  
  export interface Notification {
    id: string;
    type: 'STARLINK_DISCONNECTED' | 'VALIDATOR_OFFLINE' | 'NON_RENEWABLE_ENERGY' | 'SYNC_COMPLETE';
    message: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    read: boolean;
    createdAt: string;
  }