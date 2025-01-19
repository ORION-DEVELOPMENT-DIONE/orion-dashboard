import { useState, useEffect } from 'react';
import { discoveryService } from '../../services/discovery/discoveryService';
import { OrionDevice } from './types';

export function useDeviceDiscovery() {
  const [devices, setDevices] = useState<OrionDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    setIsScanning(true);
    discoveryService.startDiscovery();

    const handleDeviceFound = (device: OrionDevice) => {
      setDevices(prev => [...prev, device]);
    };

    const handleDeviceUpdated = (device: OrionDevice) => {
      setDevices(prev => prev.map(d => d.id === device.id ? device : d));
    };

    discoveryService.on('deviceFound', handleDeviceFound);
    discoveryService.on('deviceUpdated', handleDeviceUpdated);

    return () => {
      setIsScanning(false);
      discoveryService.stopDiscovery();
      discoveryService.removeListener('deviceFound', handleDeviceFound);
      discoveryService.removeListener('deviceUpdated', handleDeviceUpdated);
    };
  }, []);

  return { devices, isScanning };
}