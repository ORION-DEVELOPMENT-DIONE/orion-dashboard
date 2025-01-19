import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../../Card';
import { getPerformanceData } from '../../../services/performanceService';

const performanceData = [
  { time: '00:00', attestations: 98, proposals: 100, sync: 99.9 },
  { time: '04:00', attestations: 99, proposals: 100, sync: 99.8 },
  { time: '08:00', attestations: 97, proposals: 100, sync: 99.9 },
  { time: '12:00', attestations: 99, proposals: 100, sync: 99.7 },
  { time: '16:00', attestations: 98, proposals: 100, sync: 99.9 },
  { time: '20:00', attestations: 99, proposals: 100, sync: 99.8 },
];

export function PerformanceChart() {
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const nodeID = ''; // Replace with your actual node ID

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        //const data = await getPerformanceData(nodeID);
        setPerformanceData(performanceData);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchPerformanceData();
  }, [nodeID]);
  return (
    <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20">
      <h2 className="text-lg font-medium text-purple-200 mb-4">Performance Metrics</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
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
            <Line
              type="monotone"
              dataKey="attestations"
              name="Attestations"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ fill: '#a855f7' }}
            />
            <Line
              type="monotone"
              dataKey="proposals"
              name="Proposals"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: '#22c55e' }}
            />
            <Line
              type="monotone"
              dataKey="sync"
              name="Sync Rate"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}