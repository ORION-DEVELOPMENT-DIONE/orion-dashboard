import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningsChartProps {
  stakeAmount: number;
  duration: number; // Duration in months
  totalStaked: number;
  blockRewards: number; // Annual block rewards
  transactionFees: number; // Annual transaction fees in USD
  operationalCost: number; // Monthly operational cost
}

export function EarningsChart({
  stakeAmount,
  duration,
  totalStaked,
  blockRewards,
  transactionFees,
  operationalCost,
}: EarningsChartProps) {
  const calculateEarnings = () => {
    const monthlyData = [];
    const proportion = stakeAmount / totalStaked;

    // Monthly block reward and transaction fee share
    const monthlyBlockReward = (blockRewards * proportion) / 12;
    const monthlyTransactionFee = (transactionFees * proportion) / 12;

    let currentEarnings = 0;

    for (let month = 0; month <= duration; month++) {
      const monthlyIncome = monthlyBlockReward + monthlyTransactionFee;
      const netMonthlyIncome = monthlyIncome - operationalCost;

      currentEarnings += netMonthlyIncome;
      monthlyData.push({
        month: `Month ${month}`,
        amount: currentEarnings > 0 ? currentEarnings : 0, // Ensure no negative values
      });
    }
    return monthlyData;
  };

  const data = calculateEarnings();

  return (
    <div className="h-64 w-full bg-purple-900/30 rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="month" 
            stroke="#a78bfa"
            tick={{ fill: '#a78bfa' }}
            interval={Math.floor(duration / 4)}
          />
          <YAxis 
            stroke="#a78bfa"
            tick={{ fill: '#a78bfa' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1b4b',
              border: '1px solid #4c1d95',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#a78bfa' }}
            itemStyle={{ color: '#a78bfa' }}
          />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#7c3aed" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
