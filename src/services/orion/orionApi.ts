import { WebSocketManager } from '../websocket/WebSocketManager';

// TODO: Replace with actual Orion device endpoint
const ORION_WS_ENDPOINT = 'ws://orion-device.local/ws';

interface OrionStatus {
  nodeId: string;
  services: {
    validator: 'running' | 'stopped' | 'error';
    pvSystem: 'running' | 'stopped' | 'error';
    network: 'running' | 'stopped' | 'error';
  };
  systemHealth: {
    cpu: number;
    memory: number;
    disk: number;
    temperature: number;
  };
}

interface CommandResponse {
  success: boolean;
  message: string;
  data?: any;
}

class OrionApiService {
  private ws: WebSocketManager;
  private status: OrionStatus | null = null;

  constructor() {
    this.ws = new WebSocketManager(ORION_WS_ENDPOINT);
  }

  connect() {
    this.ws.connect();
  }

  // Get node ID
  async getNodeId(): Promise<string | null> {
    return this.status?.nodeId || null;
  }

  // Check service status
  async getServiceStatus(service: keyof OrionStatus['services']) {
    return this.status?.services[service] || 'unknown';
  }

  // Available commands
  async executeCommand(command: 'restart' | 'status' | 'logs', service?: string): Promise<CommandResponse> {
    try {
      // Send command through WebSocket
      return { success: true, message: 'Command executed' };
    } catch (error) {
      return { success: false, message: 'Command failed' };
    }
  }

  // Subscribe to status updates
  subscribeToStatus(callback: (status: OrionStatus) => void) {
    return this.ws.subscribe('status', (data: OrionStatus) => {
      this.status = data;
      callback(data);
    });
  }

  disconnect() {
    this.ws.disconnect();
  }
}

export const orionApi = new OrionApiService();

/* Usage Example:
import { orionApi } from './services/orion/orionApi';

// In your component:
useEffect(() => {
  orionApi.connect();
  
  const unsubscribe = orionApi.subscribeToStatus((status) => {
    setNodeId(status.nodeId);
    setServices(status.services);
    setHealth(status.systemHealth);
  });

  return () => {
    unsubscribe();
    orionApi.disconnect();
  };
}, []);

// Check service status
const status = await orionApi.getServiceStatus('validator');

// Execute command
const response = await orionApi.executeCommand('restart', 'validator');
*/