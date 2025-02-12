
import axios from 'axios';
import { DevicesResponse } from '../types/device';
import { getAuthToken } from '../utils/auth';

const API_BASE_URL = 'https://54.38.189.103:3004/api/v1';

export const fetchDevices = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axios.get<DevicesResponse>(`${API_BASE_URL}/devices`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json'
    }
  });
  return response.data;
};