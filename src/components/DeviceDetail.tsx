import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Terminal, Cpu, HardDrive, Thermometer } from 'lucide-react';
import { io } from 'socket.io-client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface SystemInfo {
  deviceId: string;
  cpu: {
    model: string;
    cores: number;
    usage: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
  };
  disk: {
    size: number;
    used: number;
    available: number;
  };
  temperature: number;
  timestamp: string;
}

interface DeviceStatus {
  online: boolean;
  lastSeen: string | null;
}

export function DeviceDetail() {
  const { id } = useParams();
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [metrics, setMetrics] = useState<SystemInfo[]>([]);
  const [status, setStatus] = useState<DeviceStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial device status and metrics
  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch device status
        const statusResponse = await fetch(`http://100.70.162.111:3004/api/devices/${id}/status`);
        if (!statusResponse.ok) throw new Error('Failed to fetch device status');
        const statusData = await statusResponse.json();
        setStatus(statusData);

        // Fetch device metrics with the last 30 minutes of data
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
        const metricsResponse = await fetch(
          `http://100.70.162.111:3004/api/devices/${id}/metrics?from=${thirtyMinutesAgo}&limit=30`
        );
        if (!metricsResponse.ok) throw new Error('Failed to fetch device metrics');
        const metricsData = await metricsResponse.json();
        
        if (metricsData.metrics.length > 0) {
          setMetrics(metricsData.metrics);
          console.log(metricsData.metrics)
          console.log(metricsData.metrics[metricsData.metrics.length - 2]);
          setSystemInfo(metricsData.metrics[metricsData.metrics.length - 2]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching device data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceData();
    const interval = setInterval(fetchDeviceData, 60000); // Refresh data every minute
    return () => clearInterval(interval);
  }, [id]);

  // Socket connection for real-time updates
  useEffect(() => {
    if (!id || !status?.online) return;

    console.log('Initializing socket connection for device:', id);
    const socket = io('http://100.70.162.111:3004', {
      query: { deviceId: id }
    });
    socket.on('connect', () => {
      console.log('Socket connected successfully');
      setError(null);
    });
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setStatus(prev => prev ? { ...prev, online: false } : null);
    });
    socket.on(`systemInfo:${id}`, (info: SystemInfo) => {
      console.log('Received system info:', info);
      setSystemInfo(info);
      setMetrics(prev => [...prev.slice(-29), info]);
      setStatus(prev => prev ? { ...prev, online: true, lastSeen: new Date().toISOString() } : null);
    });

    socket.on(`commandResponse:${id}`, (response) => {
      console.log('Received command response:', response);
      setOutput(prev => `${prev}\n${response.error ? `Error: ${response.error}` : response.output}`);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      setError('Connection error: ' + error.message);
    });

    return () => {
      console.log('Cleaning up socket connection');
      socket.disconnect();
    };
  }, [id, status?.online]);

  const handleCommand = async () => {
    if (!command.trim()) return;

    console.log('Sending command:', command);
    try {
      setOutput(prev => `${prev}\n> ${command}`);
      const response = await fetch(`http://100.70.162.111:3004/api/devices/${id}/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      });

      const data = await response.json();
      console.log('Command response:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send command');
      }

      setCommand('');
    } catch (error) {
      console.error('Error sending command:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setOutput(prev => `${prev}\nError: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading device {id}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!systemInfo || !status) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">No data available for device {id}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connection Status Banner */}
      <div className={`p-2 rounded-md text-center ${
        status.online ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        Device is {status.online ? 'Online' : 'Offline'}
        {status.lastSeen && !status.online && (
          <span className="ml-2">
            (Last seen: {new Date(status.lastSeen).toLocaleString()})
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="CPU Usage"
          value={`${systemInfo.cpu.usage.toFixed(1)}%`}
          icon={<Cpu className="h-6 w-6" />}
          detail={`${systemInfo.cpu.model} (${systemInfo.cpu.cores} cores)`}
          trend={metrics.length > 1 ? metrics[metrics.length - 2].cpu.usage - metrics[metrics.length - 2].cpu.usage : 0}
        />
        <MetricCard
          title="Memory"
          value={`${((systemInfo.memory.used / systemInfo.memory.total) * 100).toFixed(1)}%`}
          icon={<HardDrive className="h-6 w-6" />}
          detail={`${formatBytes(systemInfo.memory.used)} / ${formatBytes(systemInfo.memory.total)}`}
          trend={metrics.length > 1 ? 
            (metrics[metrics.length - 2].memory.used / metrics[metrics.length - 2].memory.total) * 100 -
            (metrics[metrics.length - 2].memory.used / metrics[metrics.length - 2].memory.total) * 100 : 0}
        />
        
        <MetricCard
          title="Temperature"
          value={`${systemInfo.temperature}°C`}
          icon={<Thermometer className="h-6 w-6" />}
          trend={metrics.length > 1 ? 
            metrics[metrics.length - 1].temperature - metrics[metrics.length - 2].temperature : 0}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">System Metrics History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip
                labelFormatter={(label) => new Date(label).toLocaleString()}
                formatter={(value, name) => {
                  switch (name) {
                    case 'cpu.usage':
                      return [`${Number(value).toFixed(1)}%`, 'CPU Usage'];
                    case 'memory.percentage':
                      return [`${Number(value).toFixed(1)}%`, 'Memory Usage'];
                    case 'temperature':
                      return [`${Number(value).toFixed(1)}°C`, 'Temperature'];
                    default:
                      return [value, name];
                  }
                }}
              />
              <Line
                type="monotone"
                dataKey="cpu.usage"
                name="CPU Usage"
                stroke="#f97316"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey={(data) => {
                  if (data.memory && data.memory.used && data.memory.total) {
                    console.log("drrrrata", data.memory.used);
                    const percentage = (data.memory.used / data.memory.total) * 100;
                    console.log("Memory usage percentage:", percentage);
                    return percentage;
                  } else {
                    console.log("Memory data is unavailable");
                    return 0; // Or some other default value
                  }
                }}                name="memory.percentage"
                stroke="#2563eb"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                name="Temperature"
                stroke="#dc2626"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Terminal className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium">Terminal</h3>
            </div>
            <button
              onClick={() => setOutput('')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-gray-900 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
            <pre className="text-gray-100 font-mono text-sm whitespace-pre-wrap">
              {output || 'No output yet. Enter a command below to get started...'}
            </pre>
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleCommand()}
              className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter command..."
              disabled={!status.online}
            />
            <button
              onClick={handleCommand}
              disabled={!status.online}
              className={`px-4 py-2 rounded-r-md text-white ${
                status.online
                  ? 'bg-orange-500 hover:bg-orange-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  detail?: string;
  trend?: number;
}

function MetricCard({ title, value, icon, detail, trend }: MetricCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="text-orange-500">{icon}</div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                {trend !== undefined && (
                  <span className={`ml-2 text-sm ${
                    trend > 0 ? 'text-red-600' : trend < 0 ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'}
                    {Math.abs(trend).toFixed(1)}
                  </span>
                )}
              </dd>
              {detail && (
                <dd className="text-sm text-gray-500">{detail}</dd>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatBytes(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unitIndex = 0;
  
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }
  
  return `${value.toFixed(1)} ${units[unitIndex]}`;
}