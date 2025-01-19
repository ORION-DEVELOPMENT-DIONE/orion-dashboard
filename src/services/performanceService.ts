import axios from 'axios';

const API_BASE_URL = 'http://testnode.dioneprotocol.com/';

export const getPerformanceData = async (nodeID: string) => {
  const response = await axios.get(`${API_BASE_URL}/getCurrentValidator`, { params: { nodeID } });
  return response.data;
};