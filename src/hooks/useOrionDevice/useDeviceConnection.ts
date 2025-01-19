import { useState, useCallback } from 'react';
import { OrionConnection, OrionStatus } from '../../services/orion/orionConnection';
import { discoveryService } from '../../services/discovery/discoveryService';

export function useDeviceConnection() {
  const [selectedDevice, setSelectedDevice] = useState<OrionConnection | null>(null);
  const [status, setStatus] = useState<OrionStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStatusUpdate = useCallback((newStatus: OrionStatus) => {
    setStatus(newStatus);
    setError(null);
  }, []);

  const handleError = useCallback((err: Error) => {
    setError(err.message);
  }, []);

  const connectToDevice = useCallback(async (deviceId: string) => {
    try {
      const device = discoveryService.getDevice(deviceId);
      if (!device) {
        throw new Error('Device not found');
      }

      if (selectedDevice) {
        selectedDevice.disconnect();
      }

      const connection = new OrionConnection(deviceId);
      connection.on('status', handleStatusUpdate);
      connection.on('error', handleError);

      await connection.connect();
      setSelectedDevice(connection);
    } catch (err: any) {
      setError(err.message);
    }
  }, [selectedDevice, handleStatusUpdate, handleError]);

  const disconnectDevice = useCallback(() => {
    if (selectedDevice) {
      selectedDevice.disconnect();
      setSelectedDevice(null);
      setStatus(null);
    }
  }, [selectedDevice]);

  return {
    selectedDevice,
    status,
    error,
    connectToDevice,
    disconnectDevice
  };
}