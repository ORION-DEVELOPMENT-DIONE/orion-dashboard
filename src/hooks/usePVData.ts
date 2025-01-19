import { useState, useEffect } from 'react';
import { PVSystemData } from '../types/pv';
import { pvConnection } from '../services/pvConnection';

export function usePVData() {
  const [pvData, setPVData] = useState<PVSystemData | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Start connection
    pvConnection.connect();
    setIsConnected(true);

    // Subscribe to updates
    const unsubscribe = pvConnection.subscribe((data) => {
      setPVData(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    pvData,
    isConnected,
  };
}

/* Real Implementation Additional Features:
- Connection state management
- Error handling
- Reconnection logic
- Data validation
- Local caching
- Offline support
*/