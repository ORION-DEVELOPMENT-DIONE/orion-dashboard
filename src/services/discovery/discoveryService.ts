import { EventEmitter } from '../../utils/EventEmitter';

interface OrionDevice {
  id: string;
  address: string;
  hostname: string;
  port: number;
  lastSeen: Date;
}

class DiscoveryService extends EventEmitter {
  private devices: Map<string, OrionDevice> = new Map();
  private discoveryInterval: number | null = null;
  private readonly DISCOVERY_INTERVAL = 5000;

  constructor() {
    super();
  }

  startDiscovery() {
    // Simulate mDNS discovery
    this.discoveryInterval = window.setInterval(() => {
      this.mockDiscovery();
    }, this.DISCOVERY_INTERVAL);
  }

  stopDiscovery() {
    if (this.discoveryInterval) {
      window.clearInterval(this.discoveryInterval);
      this.discoveryInterval = null;
    }
  }

  private mockDiscovery() {
    // Simulate finding a device
    const mockDevice: OrionDevice = {
      id: 'orion-1',
      address: '192.168.1.100',
      hostname: 'orion-device.local',
      port: 8080,
      lastSeen: new Date()
    };

    this.updateDevice(mockDevice);
  }

  private updateDevice(device: OrionDevice) {
    const existing = this.devices.get(device.id);
    if (!existing) {
      this.devices.set(device.id, device);
      this.emit('deviceFound', device);
    } else {
      this.devices.set(device.id, {
        ...existing,
        lastSeen: new Date()
      });
      this.emit('deviceUpdated', device);
    }
  }

  getDevices(): OrionDevice[] {
    return Array.from(this.devices.values());
  }

  getDevice(id: string): OrionDevice | undefined {
    return this.devices.get(id);
  }
}

export const discoveryService = new DiscoveryService();