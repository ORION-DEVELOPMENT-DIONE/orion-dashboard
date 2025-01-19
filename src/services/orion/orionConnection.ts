import { WebSocketManager } from '../websocket/WebSocketManager';
import { EventEmitter } from '../../utils/EventEmitter';
import { WS_ENDPOINTS } from '../../config/endpoints';

export interface OrionStatus {
  connected: boolean;
  nodeId: string;
  services: {
    validator: 'running' | 'stopped' | 'error';
    pvSystem: 'running' | 'stopped' | 'error';
    network: 'running' | 'stopped' | 'error';
  };
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    temperature: number;
  };
}

export class OrionConnection extends EventEmitter {
  private ws: WebSocketManager | null = null;
  private status: OrionStatus | null = null;
  private reconnectTimer: number | null = null;
  private readonly RECONNECT_INTERVAL = 5000;

  constructor(private deviceId: string) {
    super();
  }

  async connect() {
    try {
      // Use secure WebSocket URL from config
      const wsUrl = `${WS_ENDPOINTS.ORION}/${this.deviceId}`;
      this.ws = new WebSocketManager(wsUrl);
      
      this.ws.subscribe('status', (data) => {
        this.handleStatusUpdate(data);
      });

      this.ws.connect();
      this.emit('connected');
    } catch (error) {
      this.handleConnectionError(error);
    }
  }

  // ... rest of the class implementation stays the same
}