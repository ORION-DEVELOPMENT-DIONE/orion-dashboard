import {  MonitorDot } from 'lucide-react';
import { Outlet } from 'react-router-dom';



export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <MonitorDot className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-bold">Orange Pi Manager</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="p-8 space-y-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

//to={`/dashboard/device/${device.deviceId}`}