import { io, Socket } from 'socket.io-client';
import { Notification, Device, Validator } from '../types/api';

interface ServerToClientEvents {
  notification: (notification: Notification) => void;
  deviceLinked: (data: { userId: string }) => void;
  validatorCreated: (validator: Validator) => void;
  deviceUpdate: (device: Device) => void;
}

interface ClientToServerEvents {
  subscribe: (deviceId: string) => void;
  unsubscribe: (deviceId: string) => void;
}

class SocketClient {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

  connect() {
    if (this.socket?.connected) return;

    this.socket = io(import.meta.env.VITE_API_URL, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  subscribeToDevice(deviceId: string) {
    this.socket?.emit('subscribe', deviceId);
  }

  unsubscribeFromDevice(deviceId: string) {
    this.socket?.emit('unsubscribe', deviceId);
  }

  onNotification(callback: (notification: Notification) => void) {
    this.socket?.on('notification', callback);
    return () => this.socket?.off('notification', callback);
  }

  onDeviceUpdate(callback: (device: Device) => void) {
    this.socket?.on('deviceUpdate', callback);
    return () => this.socket?.off('deviceUpdate', callback);
  }

  onValidatorCreated(callback: (validator: Validator) => void) {
    this.socket?.on('validatorCreated', callback);
    return () => this.socket?.off('validatorCreated', callback);
  }
}

export const socketClient = new SocketClient();