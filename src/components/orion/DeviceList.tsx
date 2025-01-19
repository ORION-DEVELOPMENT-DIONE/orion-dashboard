import React from 'react';
import { useOrionDevice } from '../../hooks/useOrionDevice';
import { Card } from '../Card';
import { Wifi, WifiOff, Activity, Cpu, HardDrive, Thermometer } from 'lucide-react';
import type { OrionDevice } from '../../hooks/useOrionDevice';

export function DeviceList() {
  const { 
    devices = [], // Provide default empty array
    selectedDevice, 
    status, 
    error,
    isScanning,
    connectToDevice, 
    disconnectDevice 
  } = useOrionDevice() || {}; // Provide default empty object

  if (!devices) {
    return null; // Early return if devices is undefined
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-900/80 to-purple-800/80 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20">
        <div>
          <h2 className="text-2xl font-bold text-purple-50">Network Discovery</h2>
          <p className="text-purple-200 mt-1">Scanning for Orion devices on your network</p>
        </div>
        {isScanning && (
          <div className="flex items-center gap-3 bg-purple-950/50 px-4 py-2 rounded-lg border border-purple-500/20">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-200 font-medium">Scanning</span>
          </div>
        )}
      </div>
      
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
          <p className="text-red-200 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            {error}
          </p>
        </div>
      )}

      {devices.length === 0 ? (
        <Card className="bg-purple-900/20 border-purple-500/20 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="p-4 bg-purple-500/20 rounded-full animate-pulse">
              <WifiOff className="h-8 w-8 text-purple-300" />
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-purple-100">No devices found</p>
              <p className="text-purple-300 mt-2">Searching for Orion devices on your network...</p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {devices.map((device: OrionDevice) => (
            <Card 
              key={device.id}
              className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border-purple-500/20 hover:from-purple-900/60 hover:to-purple-800/60 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Wifi className="h-6 w-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-50">{device.hostname}</h3>
                    <p className="text-purple-300">{device.address}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => selectedDevice === device.id ? disconnectDevice() : connectToDevice(device.id)}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    selectedDevice === device.id
                      ? 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30'
                      : 'bg-purple-600 text-white hover:bg-purple-500'
                  }`}
                >
                  {selectedDevice === device.id ? 'Disconnect' : 'Connect'}
                </button>
              </div>

              {selectedDevice === device.id && status && (
                <div className="mt-6 pt-6 border-t border-purple-500/20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <MetricCard
                      icon={<Cpu className="h-4 w-4 text-purple-300" />}
                      label="CPU Usage"
                      value={`${status.metrics.cpu}%`}
                    />
                    <MetricCard
                      icon={<Activity className="h-4 w-4 text-purple-300" />}
                      label="Memory"
                      value={`${status.metrics.memory}%`}
                    />
                    <MetricCard
                      icon={<Thermometer className="h-4 w-4 text-purple-300" />}
                      label="Temperature"
                      value={`${status.metrics.temperature}°C`}
                    />
                    <MetricCard
                      icon={<HardDrive className="h-4 w-4 text-purple-300" />}
                      label="Disk Usage"
                      value={`${status.metrics.disk}%`}
                    />
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <div className="flex items-center gap-3 bg-purple-950/50 p-3 rounded-lg border border-purple-500/20">
      <div className="p-2 bg-purple-500/20 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-purple-300">{label}</p>
        <p className="text-purple-50 font-semibold">{value}</p>
      </div>
    </div>
  );
}