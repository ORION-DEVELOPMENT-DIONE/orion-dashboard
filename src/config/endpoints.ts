// Central configuration for all API endpoints
export const ENDPOINTS = {
  // Use secure WebSocket endpoints when in production
  WS_BASE: import.meta.env.PROD 
    ? 'wss://api.orion-validator.com'
    : 'ws://localhost:8080',
  
  // REST API base URL
  API_BASE: import.meta.env.PROD
    ? 'https://api.orion-validator.com'
    : 'http://localhost:8080',
};

// WebSocket endpoints
export const WS_ENDPOINTS = {
  VALIDATOR: `${ENDPOINTS.WS_BASE}/validator`,
  PV_SYSTEM: `${ENDPOINTS.WS_BASE}/pv`,
  NETWORK: `${ENDPOINTS.WS_BASE}/network`,
  ORION: `${ENDPOINTS.WS_BASE}/orion`,
} as const;

// REST API endpoints
export const API_ENDPOINTS = {
  STAKING: `${ENDPOINTS.API_BASE}/staking`,
  DEVICE: `${ENDPOINTS.API_BASE}/device`,
} as const;