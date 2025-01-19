import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../../Card';

const networkData = [
  { time: '00:00', peers: 45, latency: 120 },
  { time: '04:00', peers: 48, latency: 115 },
  { time: '08:00', peers: 52, latency: 125 },
  { time: '12:00', peers: 50, latency: 118 },
  { time: '16:00', peers: 49, latency: 122 },
  { time: '20:00', peers: 47, latency: 119 },
];

export function NetworkChart() {
  return (
    <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20">
      <h2 className="text-lg font-medium text-purple-200 mb-4">Network Health</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={networkData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
            <XAxis dataKey="time" stroke="#e9d5ff" tick={{ fill: '#e9d5ff' }} />
            <YAxis stroke="#e9d5ff" tick={{ fill: '#e9d5ff' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e1b4b',
                border: '1px solid #4c1d95',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#e9d5ff' }}
            />
            <Area
              type="monotone"
              dataKey="peers"
              name="Active Peers"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.2}
            />
            <Area
              type="monotone"
              dataKey="latency"
              name="Latency (ms)"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}