import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { apiClient } from '../../lib/api-client';
import { useAuth } from '../../contexts/AuthContext';

export function DevicePairing() {
  const [deviceId, setDeviceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePairing = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await apiClient.linkDevice(deviceId);
      setSuccess(true);
      setTimeout(() => {
        navigate('/metrics');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to link device');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-500/20 rounded-xl backdrop-blur-sm border border-purple-500/20">
          <Link2 className="h-6 w-6 text-purple-200" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-purple-50">Link Your Device</h2>
          <p className="text-sm text-purple-300">Enter your device ID to get started</p>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          <p className="text-green-100">
            Device linked successfully! Redirecting to dashboard...
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="text-red-100">{error}</p>
        </div>
      )}

      <form onSubmit={handlePairing} className="space-y-6">
        <div>
          <label htmlFor="deviceId" className="block text-sm font-medium text-purple-200 mb-2">
            Device ID
          </label>
          <input
            id="deviceId"
            type="text"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            className="w-full rounded-lg bg-purple-900/20 border border-purple-500/20 px-4 py-2 text-purple-100 placeholder-purple-400 focus:border-purple-500 focus:ring-purple-500"
            placeholder="Enter your device ID"
            required
          />
          <p className="mt-2 text-sm text-purple-400">
            You can find your device ID on the device's display or in its documentation
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className={`w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
            loading || success
              ? 'bg-purple-700 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900`}
        >
          {loading ? 'Linking...' : success ? 'Device Linked!' : 'Link Device'}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-purple-300">
          Need help finding your device ID?{' '}
          <a href="/docs" className="text-purple-400 hover:text-purple-300">
            Check the documentation
          </a>
        </p>
      </div>
    </div>
  );
}