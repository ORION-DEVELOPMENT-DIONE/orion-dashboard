import { useState, useEffect } from 'react';
import { discoveryService } from '../services/discovery/discoveryService';
import { OrionConnection, OrionStatus } from '../services/orion/orionConnection';

export function useOrionDevice() {
  const [devices, setDevices] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<OrionConnection | null>(null);
  const [status, setStatus] = useState<OrionStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    discoveryService.startDiscovery();

    const handleDeviceFound = (device: any) => {
      setDevices(prev => [...prev, device]);
    };

    const handleDeviceUpdated = (device: any) => {
      setDevices(prev => prev.map(d => d.id === device.id ? device : d));
    };

    discoveryService.on('deviceFound', handleDeviceFound);
    discoveryService.on('deviceUpdated', handleDeviceUpdated);

    return () => {
      discoveryService.stopDiscovery();
      discoveryService.removeListener('deviceFound', handleDeviceFound);
      discoveryService.removeListener('deviceUpdated', handleDeviceUpdated);
    };
  }, []);

  const connectToDevice = async (deviceId: string) => {
    try {
      const device = discoveryService.getDevice(deviceId);
      if (!device) {
        throw new Error('Device not found');
      }

      if (selectedDevice) {
        selectedDevice.disconnect();
      }

      const connection = new OrionConnection(deviceId);
      
      connection.on('status', (status) => {
        setStatus(status);
        setError(null);
      });

      connection.on('error', (err) => {
        setError(err.message);
      });

      await connection.connect();
      setSelectedDevice(connection);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ... rest of the hook implementation stays the same
}