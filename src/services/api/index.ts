// API Service Integration Guide
// ---------------------------

// Best Practices:
// 1. Create small, focused files
// 2. Break down large files into modules
// 3. Single responsibility per file
// 4. Extract reusable logic into utilities

// Required API Endpoints (Update these with your actual endpoints):
// -------------------------------------------------------------
// Validator: wss://your-validator-api.com/metrics
// PV System: wss://your-pv-system.com/stream
// Network: wss://your-network-api.com/metrics
// Staking: https://your-staking-api.com/api/stake

// Integration Points:
// -----------------
// 1. Validator Metrics (ValidatorMetrics.tsx)
// 2. PV System Monitor (PVMonitor.tsx)
// 3. Staking System (StakingPage.tsx)
// 4. Network Metrics (NetworkChart.tsx)

// WebSocket Configuration:
// ----------------------
// - Reconnect Interval: 5000ms
// - Max Reconnect Attempts: 5
// - Ping Interval: 30000ms

// Authentication:
// -------------
// TODO: Implement authentication for:
// - WebSocket connections
// - API endpoints
// - Staking transactions

// Error Handling:
// -------------
// TODO: Implement for:
// - Connection failures
// - API call failures
// - Data validation errors
// - Authentication errors

export * from './validatorApi';
export * from './pvApi';
export * from './networkApi';
export * from './stakingApi';