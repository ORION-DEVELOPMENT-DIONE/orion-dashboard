import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { ValidatorStats } from '../components/validator/ValidatorStats';
import { PerformanceChart } from '../components/validator/charts/PerformanceChart';
import { RewardsChart } from '../components/validator/charts/RewardsChart';
import { NetworkChart } from '../components/validator/charts/NetworkChart';
import { NodeHealth } from '../components/validator/NodeHealth';
import { NodeInfo } from '../components/validator/NodeInfo';
import { fetchDevices } from '../api/devices';

// Interfaces for data
interface NodeHealthData {
  health: boolean;
  readiness: boolean;
  liveness: boolean;
}

interface NodeInfoData {
  nodeID: string;
  nodeVersion: string;
  stakeAmount: number;
  delegators: number;
  rewardOwner: string;
  publicKey: string;
}

interface ValidatorData {
  txID: string;
  uptime: number;
}

export function ValidatorMetrics() {
  // Local state
  const [nodeHealth, setNodeHealth] = useState<NodeHealthData | null>(null);
  const [nodeInfo, setNodeInfo] = useState<NodeInfoData | null>(null);
  const [validators, setValidators] = useState<ValidatorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);  

  // Fetch devices on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const response = await fetchDevices(); // Assume this fetches the data
        if (response.success && Array.isArray(response.data) && response.data.length > 0) {
          const firstDevice = response.data[0]; // Access the first element
          const { validator } = firstDevice; // Extract the `validator` field
  
          // Update state with the relevant data
          setNodeHealth(validator.health || { health: false, readiness: false, liveness: false });
          setPublicKey(firstDevice.node.publicKey);
          const nodeInfoData = {
            nodeID: validator.nodeID,
            nodeVersion: validator.info?.nodeVersion || 'Unknown',
            stakeAmount: validator.statistics?.stakeAmount || 0,
            delegators: validator.statistics?.delegators || 0,
            rewardOwner: validator.statistics?.rewardOwner || 'Unknown',
            publicKey: firstDevice.node?.publicKey || 'N/A',
            nodePOP: validator.nodePOP || {}, // Ensure this matches the expected type
            networkID: validator.info?.networkID || 'N/A',
            peers: validator.info?.peers || [],
          };
          setNodeInfo(nodeInfoData);  
          setValidators([validator]); // Wrap in an array for the validator list
        } else {
          throw new Error('No valid data found in response.');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  /**
   * 🔄 Handle Retry
   */
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    window.location.reload();
  };

  /**
   * 🎛️ Render Loading or Error State
   */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 space-y-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-red-300">{error}</p>
        <button
          onClick={handleRetry}
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Retry
        </button>
      </div>
    );
  }

  /**
   * 🖥️ Render Main Component
   */
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Activity className="text-purple-500" />
        <div>
          <h1 className="text-2xl font-bold text-purple-50">Validator Metrics</h1>
          <p className="text-purple-300">Real-time performance monitoring</p>
        </div>
      </div>
      {nodeHealth && <NodeHealth {...nodeHealth} />}
      {/* Node Information */}
      {nodeInfo && <NodeInfo {...nodeInfo} />}

      {/* Node Health */}
      

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <RewardsChart />
        <NetworkChart />
      </div>

      {/* Validator List */}
      <div>
        <h2 className="text-xl font-bold text-purple-50">Validators</h2>
        <ul>
          {validators.map((validator, index) => (
            <li key={index} className="text-purple-300">
              {`Validator ${index + 1}: ${validator.txID || 'N/A'}, Uptime: ${validator.uptime || 'N/A'}%`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}