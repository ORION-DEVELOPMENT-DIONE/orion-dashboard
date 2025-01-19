import React from 'react';
import { usePVData } from '../hooks/usePVData';
import { Battery, Sun, Thermometer } from 'lucide-react';

export function PVMonitor() {
  const { pvData, isConnected } = usePVData();

  if (!pvData) {
    return (
      <div className="p-6 bg-purple-900/20 rounded-xl">
        <p className="text-purple-200">Connecting to PV system...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-purple-900/20 rounded-xl backdrop-blur-sm border border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Sun className="h-6 w-6 text-purple-300" />
          <h3 className="text-lg font-medium text-purple-200">Current Power</h3>
        </div>
        <p className="text-3xl font-bold text-purple-100">
          {pvData.currentPower.toFixed(2)} kW
        </p>
      </div>

      <div className="p-6 bg-purple-900/20 rounded-xl backdrop-blur-sm border border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Battery className="h-6 w-6 text-purple-300" />
          <h3 className="text-lg font-medium text-purple-200">Daily Energy</h3>
        </div>
        <p className="text-3xl font-bold text-purple-100">
          {pvData.dailyEnergy.toFixed(1)} kWh
        </p>
      </div>

      <div className="p-6 bg-purple-900/20 rounded-xl backdrop-blur-sm border border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Thermometer className="h-6 w-6 text-purple-300" />
          <h3 className="text-lg font-medium text-purple-200">Temperature</h3>
        </div>
        <p className="text-3xl font-bold text-purple-100">
          {pvData.temperature.toFixed(1)}°C
        </p>
      </div>
    </div>
  );
}

/* Real Implementation Additional Features:
- Historical data charts
- Alert system
- System health indicators
- Weather integration
- Predictive analytics
- Export functionality
*/