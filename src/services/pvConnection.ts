import { PVSystemData, PVAlert } from '../types/pv';

// Mock WebSocket connection
// In real implementation:
// - Use actual WebSocket connection to backend
// - Implement reconnection logic
// - Handle connection state
// - Add authentication
class PVConnection {
  private ws: WebSocket | null = null;
  private listeners: ((data: PVSystemData) => void)[] = [];
  
  connect() {
    // Mock connection with interval updates
    setInterval(() => {
      this.emitMockData();
    }, 5000);

    /* Real Implementation:
    this.ws = new WebSocket('wss://your-backend/pv-stream');
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.notifyListeners(data);
    };
    this.ws.onclose = () => this.handleReconnection();
    */
  }

  private emitMockData() {
    const mockData: PVSystemData = {
      currentPower: Math.random() * 10,
      dailyEnergy: Math.random() * 100,
      systemHealth: 95 + Math.random() * 5,
      inverterStatus: 'operational',
      temperature: 25 + Math.random() * 10,
      lastUpdated: new Date(),
    };
    this.notifyListeners(mockData);
  }

  private notifyListeners(data: PVSystemData) {
    this.listeners.forEach(listener => listener(data));
  }

  subscribe(callback: (data: PVSystemData) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }
}

export const pvConnection = new PVConnection();