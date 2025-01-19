import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Server, Circle } from 'lucide-react';

interface Device {
  deviceId: string;
  name: string;
  location: string;
  status: string;
  online: boolean;
}

export function DeviceList() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetch('http://100.70.162.111:3004/api/devices')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.devices)) {
          setDevices(data.devices);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching devices:', error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl overflow-hidden sm:rounded-lg">
        <div className="divide-y divide-gray-200">
          {devices.map((device) => (
            <Link 
              key={device.deviceId} 
              to={`/dashboard/device/${device.deviceId}`} 
              className="block hover:bg-indigo-50 transition duration-300 ease-in-out"
            >
              <div className="py-4 px-6 flex items-center justify-between space-x-6">
                <div className="flex items-center space-x-4">
                  <Server className="h-8 w-8 text-indigo-500" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">{device.deviceId}</p>
                    <p className="text-gray-500">{device.location || 'Unknown Location'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle 
                    className={`h-3 w-3 ${device.online ? 'text-green-500' : 'text-red-500'}`} 
                    fill="currentColor"
                  />
                  <span className={`text-sm ${device.online ? 'text-green-600' : 'text-red-600'}`}>
                    {device.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
