import React from 'react';
import { FileText, Server, Shield, Activity, RefreshCw, Database, Cpu, Zap, Search, Wallet, Bot } from 'lucide-react';
import { Section } from '../components/docs/Section';
import { SubSection } from '../components/docs/SubSection';
import { CodeBlock } from '../components/docs/CodeBlock';

export function DocsPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <FileText className="h-6 w-6 text-purple-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-purple-50">Documentation</h1>
          <p className="text-purple-300">Integration guide for Orion validator system</p>
        </div>
      </div>

      {/* AI Verification System */}
      <Section
        icon={<Bot className="h-6 w-6 text-purple-300" />}
        title="AI Verification System"
        description="Integration with renewable energy and Starlink verification"
      >
        <SubSection title="Renewable Energy Verification">
          <CodeBlock>
            {`// Required Data Points
{
  "solarData": {
    "currentOutput": number,    // Current power output in kW
    "dailyGeneration": number,  // Total daily generation in kWh
    "panelEfficiency": number,  // Panel efficiency percentage
    "inverterStatus": string,   // Inverter operational status
    "weatherConditions": {
      "cloudCover": number,     // Cloud coverage percentage
      "temperature": number,    // Ambient temperature
      "irradiance": number      // Solar irradiance W/m²
    }
  }
}

// Verification Process
1. Data Collection
   - Connect to inverter API
   - Collect real-time metrics
   - Store historical data

2. AI Analysis
   - Compare output with expected values
   - Analyze generation patterns
   - Detect anomalies
   - Verify continuous operation

3. Verification Response
{
  "verified": boolean,
  "confidence": number,       // Confidence score 0-1
  "metrics": {
    "reliability": number,    // System reliability score
    "efficiency": number,     // Current efficiency vs expected
    "uptime": number         // System uptime percentage
  },
  "recommendations": string[] // Optimization suggestions
}`}
          </CodeBlock>
        </SubSection>

        <SubSection title="Starlink Integration">
          <CodeBlock>
            {`// Required Metrics
{
  "connection": {
    "status": "online" | "offline",
    "latency": number,          // Connection latency in ms
    "downlink": number,         // Download speed Mbps
    "uplink": number,           // Upload speed Mbps
    "stability": number         // Connection stability score
  },
  "hardware": {
    "status": string,           // Hardware status
    "temperature": number,      // Device temperature
    "obstructions": number      // Obstruction percentage
  }
}

// Integration Steps
1. Starlink API Connection
   - Authenticate with Starlink API
   - Set up WebSocket connection
   - Monitor connection metrics

2. Performance Verification
   - Check latency requirements
   - Verify bandwidth availability
   - Monitor connection stability
   - Track uptime statistics

3. Status Updates
{
  "status": "verified" | "warning" | "error",
  "metrics": {
    "averageLatency": number,
    "uptimePercent": number,
    "reliabilityScore": number
  },
  "alerts": {
    "type": string,
    "message": string,
    "timestamp": string
  }[]
}`}
          </CodeBlock>
        </SubSection>
      </Section>

      {/* Discovery Service */}
      <Section
        icon={<Search className="h-6 w-6 text-purple-300" />}
        title="Discovery Service"
        description="Local network device discovery integration"
      >
        <SubSection title="Discovery Protocol">
          <CodeBlock>
            {`// Discovery Methods
1. mDNS Discovery
   - Service type: _orion._tcp.local
   - Port: 8080
   - TXT records: version, nodeId, capabilities

2. UDP Broadcast
   - Port: 5353
   - Broadcast address: 255.255.255.255
   - Message format: JSON

// Device Advertisement
{
  "type": "orion-node",
  "id": string,
  "version": string,
  "capabilities": string[],
  "services": {
    "validator": boolean,
    "metrics": boolean,
    "update": boolean
  }
}

// Integration Flow
1. Start Discovery
   - Initialize mDNS browser
   - Set up UDP listener
   - Define service filters

2. Handle Device Found
   - Validate device information
   - Check security requirements
   - Add to device registry

3. Monitor Devices
   - Track online status
   - Update capabilities
   - Handle disconnections`}
          </CodeBlock>
        </SubSection>
      </Section>

      {/* Validator Metrics */}
      <Section
        icon={<Activity className="h-6 w-6 text-purple-300" />}
        title="Validator Metrics Integration"
        description="Real-time validator performance monitoring"
      >
        <SubSection title="Metrics Collection">
          <CodeBlock>
            {`// WebSocket Connection
ws://node-address/metrics

// Metrics Format
{
  "performance": {
    "attestations": {
      "total": number,
      "successful": number,
      "missed": number
    },
    "proposals": {
      "total": number,
      "successful": number,
      "missed": number
    },
    "sync": {
      "status": string,
      "progress": number,
      "peers": number
    }
  },
  "system": {
    "cpu": number,
    "memory": number,
    "disk": number,
    "network": {
      "in": number,
      "out": number
    }
  }
}

// Integration Steps
1. Connect to Metrics Stream
   - Establish WebSocket connection
   - Handle reconnection
   - Process metrics updates

2. Store Metrics
   - Buffer recent metrics
   - Calculate averages
   - Store historical data

3. Alert Conditions
   - Define thresholds
   - Monitor critical metrics
   - Trigger notifications`}
          </CodeBlock>
        </SubSection>
      </Section>

      {/* Staking Integration */}
      <Section
        icon={<Wallet className="h-6 w-6 text-purple-300" />}
        title="Staking Integration"
        description="Validator staking and rewards system"
      >
        <SubSection title="Staking Protocol">
          <CodeBlock>
            {`// Staking Contract Interface
interface IStaking {
  // Stake tokens
  function stake(
    uint256 amount,
    string nodeId,
    uint256 duration
  ) external returns (bool);

  // Claim rewards
  function claimRewards(
    string nodeId
  ) external returns (uint256);

  // Get staking info
  function getStakingInfo(
    string nodeId
  ) external view returns (
    uint256 amount,
    uint256 startTime,
    uint256 endTime,
    uint256 rewards
  );
}

// Integration Requirements
1. Contract Interaction
   - Connect to blockchain
   - Handle transaction signing
   - Monitor transaction status

2. Rewards Calculation
   - Track validation performance
   - Calculate reward rates
   - Handle penalties

3. Status Updates
{
  "staking": {
    "status": "active" | "pending" | "ended",
    "amount": string,
    "duration": number,
    "rewards": string,
    "apy": number
  },
  "performance": {
    "uptime": number,
    "efficiency": number,
    "penalties": number
  }
}`}
          </CodeBlock>
        </SubSection>
      </Section>
    </div>
  );
}