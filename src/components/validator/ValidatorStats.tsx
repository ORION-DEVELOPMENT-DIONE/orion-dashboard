import React, { useEffect, useState } from 'react';
import { Clock, Zap, ArrowUpDown, CheckCircle2, XCircle, Wallet } from 'lucide-react';
import { Card } from '../Card';
import { getValidatorStats, fetchNodeInfo } from '../../services/validatorService';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatCard({ icon, label, value, subValue, trend }: StatCardProps) {
  return (
    <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-medium text-purple-200">{label}</h3>
      </div>
      <p className="text-3xl font-bold text-purple-100">{value}</p>
      {subValue && <p className="text-sm text-purple-300 mt-2">{subValue}</p>}
      {trend && (
        <div className={`text-sm mt-2 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}%
        </div>
      )}
    </Card>
  );
}

export function ValidatorStats() {
  // In real implementation, fetch these from validator API
  const stats2 = {
    uptime: {
      value: '99.98%',
      subValue: 'Last 30 days',
      trend: { value: 0.02, isPositive: true }
    },
    transactions: {
      value: '156,842',
      subValue: 'Total processed',
      trend: { value: 12.5, isPositive: true }
    },
    downtime: {
      value: '2m 15s',
      subValue: 'This month',
      trend: { value: 15, isPositive: false }
    },
    successRate: {
      value: '99.95%',
      subValue: 'Transaction success',
      trend: { value: 0.03, isPositive: true }
    },
    avgLatency: {
      value: '125ms',
      subValue: 'Response time',
      trend: { value: 5, isPositive: true }
    },
    totalStaked: {
      value: '32.5 ETH',
      subValue: 'Active stake',
      trend: { value: 0.5, isPositive: true }
    }
  };
  const [stats, setStats] = useState<any>(null);
  const nodeID = 'NodeID-HBZJTeTJi1rin8vTWMnyFsRuMH186Lm5e'; // Replace with your actual node ID

  useEffect(() => {
    const fetchStats = async () => {
      try {
        //const data = await getValidatorStats(nodeID);
        const nodeInfo = await fetchNodeInfo(nodeID);
        console.log("Node Info:", nodeInfo);
        //console.log("data",data)
        setStats(stats2);
      } catch (error) {
        console.error('Error fetching validator stats:', error);
      }
    };

    fetchStats();
  }, [nodeID]);

  if (!stats) {
    return          <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
    ;
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-purple-900/50 rounded-xl border border-purple-400/30" >
    <StatCard
      icon={<Clock className="h-6 w-6 text-purple-300" />}
      label="Health"
      value={stats.health ? 'Healthy' : 'Unhealthy'}
      subValue="Node Health"
    />
    <StatCard
      icon={<ArrowUpDown className="h-6 w-6 text-purple-300" />}
      label="Readiness"
      value={stats.readiness ? 'Ready' : 'Not Ready'}
      subValue="Node Readiness"
    />
    <StatCard
      icon={<XCircle className="h-6 w-6 text-purple-300" />}
      label="Liveness"
      value={stats.liveness ? 'Live' : 'Not Live'}
      subValue="Node Liveness"
    />
    {
      /*
       <StatCard
      icon={<CheckCircle2 className="h-6 w-6 text-purple-300" />}
      label="Node Version"
      value={stats.nodeInfo.version}
      subValue="Node Version"
    />
      */
       
    }
   
    <StatCard
      icon={<Zap className="h-6 w-6 text-purple-300" />}
      label="Total Stake"
      value={`${stats.totalStake} DIONE`}
      subValue="Total Stake"
    />
   {
      /* <StatCard
      icon={<Wallet className="h-6 w-6 text-purple-300" />}
      label="Validator Status"
      value={stats.currentValidator.status}
      subValue="Validator Status"
    />*/
       
    }
  </div>
  );
}

/* Real Implementation:
1. Data Collection:
   - Connect to validator client API for real-time stats
   - Query blockchain for transaction history
   - Monitor system metrics for uptime/downtime
   - Track network latency and response times

2. Performance Monitoring:
   - Set up alerts for downtime thresholds
   - Monitor transaction success rates
   - Track staking rewards and penalties
   - Calculate network participation metrics

3. Historical Analysis:
   - Store historical performance data
   - Calculate trends and patterns
   - Generate performance reports
   - Identify optimization opportunities
*/