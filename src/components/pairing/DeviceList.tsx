import React from 'react';
import { Device } from '../../types/device';
import { HardDrive, Activity, Clock } from 'lucide-react';
//import { formatDistanceToNow } from 'date-fns';

interface DeviceListProps {
  devices: Device[];
}

export function DeviceList({ devices }: DeviceListProps) {
  if (devices.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-xl font-semibold text-purple-100">Your Devices</h3>
      <div className="grid gap-4">
        {devices.map((device) => (
          <div
            key={device._id}
            className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <HardDrive className="h-5 w-5 text-purple-200" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium text-purple-100">{device.name}</h4>
                <div className="flex items-center gap-4 mt-1 text-sm text-purple-300">
                  <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4" />
                    <span>{device.status}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Last seen two minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}