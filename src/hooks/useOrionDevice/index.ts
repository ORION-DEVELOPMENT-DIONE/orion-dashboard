import { useDeviceDiscovery } from './useDeviceDiscovery';
import { useDeviceConnection } from './useDeviceConnection';
import { UseOrionDeviceResult } from './types';

export function useOrionDevice(): UseOrionDeviceResult {
  const { devices, isScanning } = useDeviceDiscovery();
  const {
    selectedDevice,
    status,
    error,
    connectToDevice,
    disconnectDevice
  } = useDeviceConnection();

  const retryConnection = async () => {
    if (selectedDevice) {
      const deviceId = selectedDevice.getDeviceId();
      disconnectDevice();
      await connectToDevice(deviceId);
    }
  };

  return {
    devices,
    selectedDevice: selectedDevice?.getDeviceId() || null,
    status,
    error,
    isScanning,
    connectToDevice,
    disconnectDevice,
    retryConnection
  };
}

// Export types
export type { OrionDevice, UseOrionDeviceResult } from './types';