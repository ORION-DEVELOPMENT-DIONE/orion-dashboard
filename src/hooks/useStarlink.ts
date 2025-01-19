import axios from 'axios';
import { useState, useEffect } from 'react';

interface StarlinkResponse {
  error?: string;
  isStarlink?: string;
}

export function useStarlinkStatus() {
  const [status, setStatus] = useState<'verified' | 'pending' | 'notConnected'>('pending');
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = 'http://100.70.162.111:3004/api/v1';

  useEffect(() => {
    const checkStarlinkConnection = async () => {
      try {
        const response = await axios.get<StarlinkResponse>(`${API_BASE_URL}/check-starlink/`, {
            headers: {
              'accept': 'application/json'
            }
          });
          console.log(response.data)
        console.log(response)
        const data: StarlinkResponse = response.data;
        console.log(data)

        if (data.error) {
          setStatus('notConnected');
          setError(data.error);
          return;
        }

        setStatus('notConnected');
        setError(null);
      } catch (err) {
        setStatus('notConnected');
        setError('Failed to verify Starlink connection');
      }
    };

    checkStarlinkConnection();
  }, []);

  return { status, error };
}