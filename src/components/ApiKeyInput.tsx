import React, { useState } from 'react';
import { Key } from 'lucide-react';
import { Device } from '../types/device';

interface ApiKeyInputProps {
  device: Device;
  onApiKeySubmit: (apiKey: string) => void;
  onBack: () => void;
}

export function ApiKeyInput({ device, onApiKeySubmit, onBack }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApiKeySubmit(apiKey);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-purple-500/30 blur-[100px] rounded-full"></div>
      <div className="relative p-8 bg-purple-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/30">
        <button
          onClick={onBack}
          className="mb-6 text-purple-300 hover:text-purple-100 transition-colors"
        >
          ← Back to devices
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-purple-500/30 rounded-xl border border-purple-400/30">
            <Key className="h-8 w-8 text-purple-100" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-purple-100">Enter API Key</h2>
            <p className="text-purple-300">for {device.name} ({device.deviceId})</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full p-4 bg-purple-900/60 border border-purple-500/30 rounded-xl text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <button
            type="submit"
            disabled={!apiKey}
            className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-colors"
          >
            Access Device Metrics
          </button>
        </form>
      </div>
    </div>
  );
}