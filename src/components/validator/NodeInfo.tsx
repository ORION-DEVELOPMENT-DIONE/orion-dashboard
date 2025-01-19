import { Card } from '../Card';
import { Info } from 'lucide-react';
import './tooltip.css'; // Include custom tooltip styles or replace this with a library-based tooltip

interface NodeInfoProps {
  nodeID: string;
  nodePOP: {
    publicKey: string;
    proofOfPossession: string;
  };
  networkID: string;
  nodeVersion: {
    version: string;
    databaseVersion: string;
    rpcProtocolVersion: string;
    gitCommit: string;
    vmVersions: { alpha: string; delta: string; omega: string };
  };
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

export function NodeInfo({ nodeID, nodePOP, networkID, nodeVersion, peers }: NodeInfoProps) {
  return (
    <div className="space-y-6 p-4 bg-purple-900/50 rounded-xl border border-purple-400/30">
      <h2 className="text-2xl font-bold text-purple-200">Node Information</h2>

      {/* Grid layout with 3 cards per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Node ID */}
        <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20">
          <h3 className="text-lg font-medium text-purple-200">
            Node ID
            <span className="ml-2 text-purple-300 tooltip" data-tooltip="Unique identifier for the node.">
              <Info className="inline h-5 w-5" />
            </span>
          </h3>
          <p className="text-purple-100 break-words">{nodeID}</p>
        </Card>

        {/* Node Public Key and Proof of Possession */}
        <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20">
          <h3 className="text-lg font-medium text-purple-200">
            Public Key
            <span className="ml-2 text-purple-300 tooltip" data-tooltip="Public key of the node used for cryptographic operations.">
              <Info className="inline h-5 w-5" />
            </span>
          </h3>
          <p className="text-purple-100 break-words">{nodePOP.publicKey || "**************"}</p>
          <h3 className="text-lg font-medium text-purple-200 mt-4">
            Proof of Possession
            <span className="ml-2 text-purple-300 tooltip" data-tooltip="Proof that the node has possession of its private key.">
              <Info className="inline h-5 w-5" />
            </span>
          </h3>
          <p className="text-purple-100 break-words">{nodePOP.proofOfPossession || "**************"}</p>
        </Card>

        {/* Network ID */}
        <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20">
          <h3 className="text-lg font-medium text-purple-200">
            Network ID
            <span className="ml-2 text-purple-300 tooltip" data-tooltip="The network the node is connected to.">
              <Info className="inline h-5 w-5" />
            </span>
          </h3>
          <p className="text-purple-100">{131313 || networkID}</p>
        </Card>

        {/* Node Version */}
        <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-500/20">
  <h3 className="text-lg font-medium text-purple-200">Node Version</h3>
  <div className="mt-4 text-purple-100">
    <table className="table-auto w-full text-left text-sm">
      <tbody>
        <tr>
          <th className="pr-4 text-purple-300">Version:</th>
          <td title="Software version of the node.">{nodeVersion.version || "odysseygo v1.29" }</td>
        </tr>
        <tr>
          <th className="pr-4 text-purple-300">Database Version:</th>
          <td title="Database schema version.">{nodeVersion.databaseVersion}</td>
        </tr>
        <tr>
          <th className="pr-4 text-purple-300">RPC Protocol Version:</th>
          <td title="Remote Procedure Call protocol version.">{nodeVersion.rpcProtocolVersion}</td>
        </tr>
        <tr>
          <th className="pr-4 text-purple-300">Git Commit:</th>
          <td title="Git commit hash of the current node version.">{nodeVersion.gitCommit}</td>
        </tr>
        
      </tbody>
    </table>
  </div>
</Card>
      </div>
    </div>
  );
}