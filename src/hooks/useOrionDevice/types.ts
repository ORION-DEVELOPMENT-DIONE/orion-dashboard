export interface OrionDevice {
  id: string;
  address: string;
  hostname: string;
  port: number;
  lastSeen: Date;
}

export interface UseOrionDeviceState {
  devices: OrionDevice[];
  selectedDevice: string | null;
  status: OrionStatus | null;
  error: string | null;
  isScanning: boolean;
}

export interface UseOrionDeviceActions {
  connectToDevice: (deviceId: string) => Promise<void>;
  disconnectDevice: () => void;
  retryConnection: () => Promise<void>;
}

export interface UseOrionDeviceResult extends UseOrionDeviceState, UseOrionDeviceActions {}