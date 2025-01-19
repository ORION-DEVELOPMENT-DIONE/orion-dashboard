import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../../Card';

const rewardsData = [
  { date: 'Mon', rewards: 0.0324, penalties: 0.0012 },
  { date: 'Tue', rewards: 0.0341, penalties: 0.0008 },
  { date: 'Wed', rewards: 0.0319, penalties: 0.0015 },
  { date: 'Thu', rewards: 0.0332, penalties: 0.0010 },
  { date: 'Fri', rewards: 0.0328, penalties: 0.0009 },
  { date: 'Sat', rewards: 0.0335, penalties: 0.0011 },
  { date: 'Sun', rewards: 0.0330, penalties: 0.0013 },
];

export function RewardsChart() {
  return (
    <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20">
      <h2 className="text-lg font-medium text-purple-200 mb-4">Weekly Rewards & Penalties</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rewardsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
            <XAxis dataKey="date" stroke="#e9d5ff" tick={{ fill: '#e9d5ff' }} />
            <YAxis stroke="#e9d5ff" tick={{ fill: '#e9d5ff' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e1b4b',
                border: '1px solid #4c1d95',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#e9d5ff' }}
            />
            <Bar
              dataKey="rewards"
              name="Rewards"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="penalties"
              name="Penalties"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}