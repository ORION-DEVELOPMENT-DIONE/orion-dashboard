import { useState, useEffect } from 'react';
import { Globe, Search, RefreshCw } from 'lucide-react';

interface OrionNode {
  id: string;
  status: 'online' | 'offline' | 'updating';
  lastSeen: string;
  location?: string;
  metrics: {
    cpu: number;
    memory: number;
    uptime: string;
  };
}

export default function GlobalManagementPage() {
  const [nodes, setNodes] = useState<OrionNode[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [commands, setCommands] = useState<Record<string, string>>({}); // Track commands for each device
  const [commandOutputs, setCommandOutputs] = useState<Record<string, string>>({}); // Store command output for each device

  useEffect(() => {
    const ws = new WebSocket('ws://100.70.162.111:8080');
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      fetchNodes(ws);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
    
      if (message.type === 'devices-response') {
        const transformedNodes = message.devices.map((device: any) => ({
          id: device.deviceId,
          status: device.status,
          lastSeen: new Date(device.lastHeartbeat).toLocaleString(),
          location: device.location || 'Unknown',
          metrics: {
            cpu: device.metrics?.cpu || 0,
            memory: device.metrics?.memory || 0,
            uptime: device.metrics?.uptime || '0s',
          },
        }));
        setNodes(transformedNodes);
      } else if (message.type === 'exec-response') { // Changed from 'commandResponse'
        setCommandOutputs((prevOutputs) => ({
          ...prevOutputs,
          [message.deviceId]: message.message // Store the command output
        }));
      }
    };

    ws.onclose = () => console.log('WebSocket connection closed');
    ws.onerror = (err) => console.error('WebSocket error:', err);

    return () => {
      ws.close();
    };
  }, []);

  const fetchNodes = (ws: WebSocket) => {
    if (ws.readyState === WebSocket.OPEN) {
      setLoading(true);
      ws.send(JSON.stringify({ type: 'get-devices' }));
      setLoading(false);
    }
  };

  const updateNode = (nodeId: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'update-device', deviceId: nodeId, data: { status: 'updating' } }));
    }
  };
  const sendRunCommand = (nodeId: string, command: string) => {
    console.log('Sending command',command)
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ 
        type: 'runCommand',
        deviceId: nodeId,
        command: command 
      }));
    }
  };

  const handleCommandChange = (nodeId: string, command: string) => {
    setCommands((prevCommands) => ({
      ...prevCommands,
      [nodeId]: command,
    }));
  };

  const filteredNodes = nodes.filter(
    (node) =>
      node.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (node.location && node.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Globe className="h-6 w-6 text-purple-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-purple-50">Global Management</h1>
              <p className="text-purple-300">Monitor and manage all Orion nodes</p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-full text-sm bg-purple-500/20 text-purple-300">
            {loading ? 'Loading...' : 'Connected'}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
            <input
              type="text"
              placeholder="Search nodes by ID or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-purple-900/20 border border-purple-500/20 rounded-lg text-purple-100 placeholder-purple-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            onClick={() => fetchNodes(socket!)}
            className="p-2 bg-purple-900/20 border border-purple-500/20 rounded-lg text-purple-300 hover:bg-purple-500/20"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNodes.map((node) => (
            <div key={node.id} className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold">{node.id}</h3>
              <p>Status: {node.status}</p>
              <p>Last Seen: {node.lastSeen}</p>

              {/* Command Input and Button */}
              {node.status === 'online' && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={commands[node.id] || ''}
                    onChange={(e) => handleCommandChange(node.id, e.target.value)}
                    placeholder="Enter command"
                    className="w-full pl-3 pr-4 py-2 bg-purple-900/20 border border-purple-500/20 rounded-lg text-purple-100 placeholder-purple-400 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => sendRunCommand(node.id, commands[node.id])}
                    className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg"
                  >
                    Run Command
                  </button>
                </div>
              )}

              <div className="mt-4">
                {/* Display command output */}
                {commandOutputs[node.id] && (
                  <div className="bg-gray-800 text-purple-200 p-3 rounded-lg mt-2">
                    <pre>{commandOutputs[node.id]}</pre>
                  </div>
                )}
              </div>

              <button
                onClick={() => updateNode(node.id)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                Update
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
