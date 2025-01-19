import React from 'react';
import { Card } from '../Card';
import { Info } from 'lucide-react';

interface StatisticsProps {
  peers: {
    ip: string;
    publicIP: string;
    nodeID: string;
    version: string;
    lastSent: string;
    lastReceived: string;
    observedUptime: string;
  }[];
}

export function NodeStatistics({ peers }: StatisticsProps) {
  return (
    <div className="space-y-6 p-4 bg-purple-900/50 rounded-xl border border-purple-400/30">
      <h2 className="text-2xl font-bold text-purple-200">Node Statistics</h2>

      <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20 p-6">
        <h3 className="text-lg font-medium text-purple-200">Statistics Overview</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Number of Peers */}
          <div className="space-y-1">
            <p className="font-medium text-purple-300 flex items-center">
              Peers
              <span
                className="ml-2 text-purple-300"
                title="Number of peers currently connected to the node."
              >
                <Info className="inline h-5 w-5" />
              </span>
            </p>
            <p className="text-purple-100">{peers.length}</p>
          </div>

          {/* Observed Uptime */}
          <div className="space-y-1">
            <p className="font-medium text-purple-300 flex items-center">
              Observed Uptime
              <span
                className="ml-2 text-purple-300"
                title="Percentage of time the node has been observed online by peers."
              >
                <Info className="inline h-5 w-5" />
              </span>
            </p>
            <p className="text-purple-100">
              {peers[0]?.observedUptime || 'N/A'}%
            </p>
          </div>

          {/* Last Sent */}
          <div className="space-y-1">
            <p className="font-medium text-purple-300 flex items-center">
              Last Sent
              <span
                className="ml-2 text-purple-300"
                title="Timestamp of the last message sent by the node."
              >
                <Info className="inline h-5 w-5" />
              </span>
            </p>
            <p className="text-purple-100">{peers[0]?.lastSent || 'N/A'}</p>
          </div>

          {/* Last Received */}
          <div className="space-y-1">
            <p className="font-medium text-purple-300 flex items-center">
              Last Received
              <span
                className="ml-2 text-purple-300"
                title="Timestamp of the last message received by the node."
              >
                <Info className="inline h-5 w-5" />
              </span>
            </p>
            <p className="text-purple-100">{peers[0]?.lastReceived || 'N/A'}</p>
          </div>

          {/* IP Address */}
          <div className="space-y-1">
            <p className="font-medium text-purple-300 flex items-center">
              Public IP
              <span
                className="ml-2 text-purple-300"
                title="Public IP address of the node."
              >
                <Info className="inline h-5 w-5" />
              </span>
            </p>
            <p className="text-purple-100 break-words">
              {peers[0]?.publicIP || 'N/A'}
            </p>
          </div>

          {/* Node Version */}
          <div className="space-y-1">
            <p className="font-medium text-purple-300 flex items-center">
              Node Version
              <span
                className="ml-2 text-purple-300"
                title="The software version of the connected node."
              >
                <Info className="inline h-5 w-5" />
              </span>
            </p>
            <p className="text-purple-100">{peers[0]?.version || 'N/A'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}