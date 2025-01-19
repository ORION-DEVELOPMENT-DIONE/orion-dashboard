// Define types for PV system data
export interface PVSystemData {
  currentPower: number;      // Current power output in kW
  dailyEnergy: number;       // Daily energy production in kWh
  systemHealth: number;      // Health score (0-100)
  inverterStatus: string;    // Status of the inverter
  temperature: number;       // System temperature in Celsius
  lastUpdated: Date;        // Last data update timestamp
}

export interface PVAlert {
  id: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: Date;
}

// In real implementation:
// - Add more detailed metrics
// - Include specific inverter model data structures
// - Add weather data interfaces
// - Define validation rules