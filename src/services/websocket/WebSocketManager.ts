import { WS_ENDPOINTS } from '../../config/endpoints';

type MessageHandler = (data: any) => void;
type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface SecurityConfig {
  token?: string;
  cert?: string;
  key?: string;
}

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 5000;
  private handlers: Map<string, MessageHandler[]> = new Map();
  private securityConfig: SecurityConfig = {};

  constructor(
    private url: string,
    security?: SecurityConfig
  ) {
    this.securityConfig = security || {};
  }

  // Configure security settings
  setSecurityConfig(config: SecurityConfig) {
    this.securityConfig = config;
    // Reconnect with new security settings if already connected
    if (this.ws) {
      this.disconnect();
      this.connect();
    }
  }

  connect() {
    try {
      // Add security headers and parameters
      const wsUrl = new URL(this.url);
      if (this.securityConfig.token) {
        wsUrl.searchParams.append('token', this.securityConfig.token);
      }

      this.ws = new WebSocket(wsUrl.toString());
      this.setupEventHandlers();
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.handleReconnection();
    }
  }

  private setupEventHandlers() {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      
      // Send authentication if token exists
      if (this.securityConfig.token) {
        this.ws?.send(JSON.stringify({
          type: 'auth',
          token: this.securityConfig.token
        }));
      }
    };

    // ... rest of the implementation stays the same
  }
}