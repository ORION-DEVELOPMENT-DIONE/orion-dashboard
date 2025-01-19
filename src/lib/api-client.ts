import { ApiResponse, Device, User, Validator } from '../types/api';

const API_URL = "http://100.70.162.111:3004/api/v1";

class ApiClient {
    private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  }

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await this.fetch<{ success: boolean; token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.token) {
      this.setToken(response.token);
      return {
        token: response.token,
        user: response.user
      };
    }
    
    throw new Error('Invalid response from server');
  }

  async getProfile(): Promise<User> {
    const response = await this.fetch<{ success: boolean; data: User }>('/auth/me');
    if (response.success) {
      return response.data;
    }
    throw new Error('Failed to get profile');
  }
  async register(email: string, password: string) {
    return this.fetch<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Device endpoints
  async getDevices() {
    return this.fetch<Device[]>('/devices');
  }

  async linkDevice(deviceId: string) {
    return this.fetch<Device>('/devices/link', {
      method: 'POST',
      body: JSON.stringify({ deviceId }),
    });
  }

  // Validator endpoints
  async createValidator(data: {
    deviceId: string;
    stakeAmount: number;
    delegationPercentage: number;
    stakePeriod: number;
    nodeId: string;
  }) {
    return this.fetch<Validator>('/validators', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getValidatorStatus(id: string) {
    return this.fetch<Validator>(`/validators/${id}/status`);
  }

  // Notification endpoints
  async getNotifications() {
    return this.fetch<Notification[]>('/notifications');
  }

  async markNotificationAsRead(id: string) {
    return this.fetch<Notification>(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }
}

export const apiClient = new ApiClient();