import React from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { Card } from '../Card';
import './tooltip.css'; // Add this to include your tooltip styles

interface NodeHealthProps {
  health: boolean;
  readiness: boolean;
  liveness: boolean;
}

export function NodeHealth({ health = true, readiness=true, liveness=true }: NodeHealthProps) {
  const tooltips = {
    health: 'Indicates whether the node is operating as expected.',
    readiness: 'Shows if the node is ready to handle requests.',
    liveness: 'Confirms if the node is live and operational.',
  };

  return (
    <div className="p-4 bg-purple-900/50 rounded-xl border border-purple-400/30">

      <h2 className="text-2xl font-bold text-purple-200">Node Health Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            {health ? <CheckCircle2 className="h-6 w-6 text-green-400" /> : <XCircle className="h-6 w-6 text-red-400" />}
            <h3 className="text-lg font-medium text-purple-200">
              Health
              <span className="ml-2 text-purple-300 tooltip" data-tooltip={tooltips.health}>
                <Info className="inline h-5 w-5" />
              </span>
            </h3>
          </div>
          <p className="text-3xl font-bold text-purple-100">{health ? 'Healthy' : 'Unhealthy'}</p>
        </Card>

        <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            {readiness ? <CheckCircle2 className="h-6 w-6 text-green-400" /> : <XCircle className="h-6 w-6 text-red-400" />}
            <h3 className="text-lg font-medium text-purple-200">
              Readiness
              <span className="ml-2 text-purple-300 tooltip" data-tooltip={tooltips.readiness}>
                <Info className="inline h-5 w-5" />
              </span>
            </h3>
          </div>
          <p className="text-3xl font-bold text-purple-100">{readiness ? 'Ready' : 'Not Ready'}</p>
        </Card>

        <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            {liveness ? <CheckCircle2 className="h-6 w-6 text-green-400" /> : <XCircle className="h-6 w-6 text-red-400" />}
            <h3 className="text-lg font-medium text-purple-200">
              Liveness
              <span className="ml-2 text-purple-300 tooltip" data-tooltip={tooltips.liveness}>
                <Info className="inline h-5 w-5" />
              </span>
            </h3>
          </div>
          <p className="text-3xl font-bold text-purple-100">{liveness ? 'Live' : 'Not Live'}</p>
        </Card>
      </div>
    </div>
  );
}