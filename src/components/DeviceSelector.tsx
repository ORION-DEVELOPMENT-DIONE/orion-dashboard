import React, { useState } from 'react';
import { Device } from '../types/device';
import { HardDrive, ChevronRight } from 'lucide-react';

interface DeviceSelectorProps {
  devices: Device[];
  onDeviceSelect: (device: Device) => void;
}

export function DeviceSelector({ devices, onDeviceSelect }: DeviceSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevices = devices.filter(device => 
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.deviceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-purple-500/30 blur-[100px] rounded-full"></div>
        <div className="relative p-8 bg-purple-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/30">
          <h2 className="text-3xl font-bold text-purple-100 mb-6">Select Device</h2>
          
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 bg-purple-900/60 border border-purple-500/30 rounded-xl text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 mb-6"
          />

          <div className="grid gap-4">
            {filteredDevices.map(device => (
              <button
                key={device._id}
                onClick={() => onDeviceSelect(device)}
                className="group flex items-center justify-between p-6 bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/30 rounded-xl border border-purple-400/30 group-hover:bg-purple-500/40 transition-colors">
                    <HardDrive className="h-6 w-6 text-purple-100" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-purple-100">{device.name}</h3>
                    <p className="text-purple-300">ID: {device.deviceId}</p>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-purple-400 group-hover:text-purple-100 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}