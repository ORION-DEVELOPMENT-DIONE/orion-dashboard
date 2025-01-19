import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Sun, Battery, Thermometer, Clock } from 'lucide-react';
import { fetchDevices } from '../api/devices';

const timeRanges = [
  { id: '24h', label: 'Last 24h' },
  { id: '1w', label: 'Last Week' },
  { id: '1m', label: 'Last Month' },
];

export function EnergyMetrics({ deviceId }: { deviceId: string }) {
  const [selectedRange, setSelectedRange] = useState('24h');
  const [device, setDevice] = useState<any | null>(null);
  const [metricsHistory, setMetricsHistory] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentMetrics, setCurrentMetrics] = useState<any | null>(null);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const response = await fetchDevices();
        const devices = response.data;
        const selectedDevice = devices.find((d: any) => d.deviceId === deviceId);

        if (!selectedDevice) {
          throw new Error('Device not found');
        }

        setDevice(selectedDevice);

        // Sort metricsHistory by timestamp in ascending order
        const sortedHistory = selectedDevice.metricsHistory
          .map((entry: any) => ({
            time: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            voltage: entry.voltage,
            current: entry.current,
            power: entry.power,
            energy: entry.energy,
          }))
          .sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        setMetricsHistory(sortedHistory);
        
      } catch (err) {
        setError('Failed to load device data');
        console.error('Error loading device data:', err);
      }
    };

    fetchDeviceData();
  }, [deviceId]);

  if (error) {
    return (
      <div className="p-8 bg-purple-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/30">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Device Details */}
      <div className="relative">
        <div className="absolute inset-0 bg-purple-500/30 blur-[100px] rounded-full"></div>
        <div className="relative flex items-center gap-4 p-8 bg-purple-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/30">
          <div className="p-4 bg-purple-500/30 rounded-xl border border-purple-400/30">
            <Zap className="h-8 w-8 text-purple-100 animate-pulse" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300">
              {device?.name || 'Device Metrics'}
            </h1>
            <p className="text-lg text-purple-200">Real-time PV system monitoring</p>
          </div>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Sun />, label: 'Current Power', value: device?.currentMetrics?.power ? `${device.currentMetrics.power.toFixed(2)} W` : '...' },
          { icon: <Battery />, label: 'Daily Energy', value: device?.currentMetrics?.energy ? `${device.currentMetrics.energy.toFixed(1)} kWh` : '...' },
          { icon: <Thermometer />, label: 'Voltage', value: device?.currentMetrics?.voltage ? `${device.currentMetrics.voltage.toFixed(1)} V` : '...' }
        ].map((metric, i) => (
          <div key={i} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-purple-800/30 blur-2xl"></div>
            <div className="relative p-8 bg-purple-900/60 backdrop-blur-xl rounded-2xl border border-purple-400/30 transition-all duration-300 hover:bg-purple-800/60 hover:scale-[1.02] hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/30 rounded-xl border border-purple-400/30 group-hover:bg-purple-500/40 transition-colors">
                  {React.cloneElement(metric.icon, { className: "h-6 w-6 text-purple-100" })}
                </div>
                <span className="text-lg font-medium text-purple-100">{metric.label}</span>
              </div>
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-purple-200">
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Historical Metrics Chart */}
      <div className="relative">
        <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full"></div>
        <div className="relative bg-purple-900/60 backdrop-blur-xl rounded-2xl border border-purple-400/30 p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-purple-100">Power and Energy History</h2>

            <div className="flex items-center gap-2 bg-purple-950/50 rounded-lg p-1 backdrop-blur-sm border border-purple-500/20">
              {timeRanges.map(range => (
                <button
                  key={range.id}
                  onClick={() => setSelectedRange(range.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    selectedRange === range.id
                      ? 'bg-purple-500/30 text-white shadow-lg backdrop-blur-sm'
                      : 'text-purple-300 hover:text-purple-100 hover:bg-purple-500/20'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{range.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metricsHistory}>
                <defs>
                  <linearGradient id="powerLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d8b4fe" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="energyLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#67e8f9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" opacity={0.4} />
                <XAxis 
                  dataKey="time" 
                  stroke="#e9d5ff"
                  tick={{ fill: '#e9d5ff', fontSize: 12 }}
                  axisLine={{ stroke: '#4c1d95' }}

                />
                <YAxis 
                  stroke="#e9d5ff"
                  tick={{ fill: '#e9d5ff', fontSize: 12 }}
                  axisLine={{ stroke: '#4c1d95' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(88, 28, 135, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(216, 180, 254, 0.4)',
                    borderRadius: '1rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    padding: '1rem'
                  }}
                  labelStyle={{ color: '#f3e8ff', fontWeight: 'bold', fontSize: '14px' }}
                  itemStyle={{ color: '#f3e8ff', fontSize: '14px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="power" 
                  stroke="url(#powerLine)"
                  strokeWidth={4}
                  filter="url(#glow)"
                  dot={{ 
                    fill: '#d8b4fe',
                    r: 6,
                    strokeWidth: 1,
                    stroke: '#4c1d95'
                  }}
                  activeDot={{
                    r: 10,
                    stroke: '#d8b4fe',
                    strokeWidth: 3,
                    fill: '#4c1d95'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="url(#energyLine)"
                  strokeWidth={4}
                  filter="url(#glow)"
                  dot={{ 
                    fill: '#67e8f9',
                    r: 6,
                    strokeWidth: 0.01,
                    stroke: '#06b6d4'
                  }}
                  activeDot={{
                    r: 10,
                    stroke: '#67e8f9',
                    strokeWidth: 3,
                    fill: '#06b6d4'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
