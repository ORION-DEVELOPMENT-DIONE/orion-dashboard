import React, { useEffect, useState } from 'react';
import { DevicePairing } from '../components/pairing/DevicePairing';
import { DeviceList } from '../components/pairing/DeviceList';
import { fetchDevices } from '../api/devices';
import { Device } from '../types/device';

export function DevicePairingPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadDevices = async () => {
      try {
        const response = await fetchDevices();
        console.log(response.data)
        setDevices(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load devices');
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
  }, []);
  if (loading) {
    return          <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
    ;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="p-8 max-w-xl mx-auto">
      <DeviceList devices={devices} />
      <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl">
        
        <DevicePairing />
      </div>
    </div>
  );
}