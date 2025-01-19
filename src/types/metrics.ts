export interface RealtimeMetrics {
    power: number;
    energy: number;
    temperature: number;
    timestamp: string;
  }
  
  export interface MetricsResponse {
    success: boolean;
    data: RealtimeMetrics;
  }