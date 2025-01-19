import React, { useState, useEffect } from 'react';
import { Device } from '../types/device';
import { fetchDevices } from '../api/devices';
import { DeviceSelector } from '../components/DeviceSelector';
import { ApiKeyInput } from '../components/ApiKeyInput';
import { EnergyMetrics } from '../components/EnergyMetrics';
import { getAuthToken } from '../utils/auth';

function MetricsPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const response = await fetchDevices();
        console.log(response.data)
        setDevices(response.data);
      } catch (err) {
        setError('Failed to load devices. Please try again later.');
        console.error('Error loading devices:', err);
      } finally {
        setLoading(false);
      }
    };

    if (getAuthToken()) {
      loadDevices();
    } else {
      setError('No authentication token found. Please log in.');
      setLoading(false);
    }
  }, []);

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
    setApiKey(null);
  };

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
  };

  const handleBack = () => {
    setSelectedDevice(null);
    setApiKey(null);
  };
  console.log(selectedDevice)

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-950 text-purple-100 p-8">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-purple-950 text-purple-100 p-8">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-xl text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-semibold transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-950 text-purple-100 p-8">
      {!selectedDevice && (
        <DeviceSelector
          devices={devices}
          onDeviceSelect={handleDeviceSelect}
        />
      )}
      
      {selectedDevice && !apiKey && (
        <ApiKeyInput
          device={selectedDevice}
          onApiKeySubmit={handleApiKeySubmit}
          onBack={handleBack}
        />
      )}
      
      {selectedDevice && apiKey && (
        <EnergyMetrics deviceId={selectedDevice.deviceId}/>
      )}
    </div>
  );
}

export default MetricsPage;