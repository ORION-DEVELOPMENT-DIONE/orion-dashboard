export interface Metric {
  voltage: number;
  current: number;
  power: number;
  energy: number;
  max_current: number;

  max_power: number;
  timestamp: string;
}
export interface Node {
  nodeID: string;
  publicKey: string;
  blsSignature: string;
}




export interface Device {
  _id: string;
  deviceId: string;
  userId: string;
  name: string;
  status: string;
  node: Node;
  validator: any;

  currentMetrics: Metric;
  metricsHistory: Metric[];
  lastSeen: string;
  __v: number;
}

export interface DevicesResponse {
  success: boolean;
  data: Device[];
}
