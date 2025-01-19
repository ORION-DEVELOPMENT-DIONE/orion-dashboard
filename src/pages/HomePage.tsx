import { Satellite, Leaf } from 'lucide-react';
import { VerificationCard } from '../components/VerificationCard';
import { HeroTitle } from '../components/hero/HeroTitle';
import { HeroButton } from '../components/hero/HeroButton';
import { DeviceList } from '../components/orion/DeviceList';
import { HeroStats } from '../components/hero/HeroStats';
import { useStarlinkStatus } from '../hooks/useStarlink';
import { Device } from '../types/device';
import { fetchDevices } from '../api/devices';
import { useEffect, useState } from 'react';

export function HomePage() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const loadDevices = async () => {
      try {
        const response = await fetchDevices();
        console.log(response.data)
        setDevices(response.data);
      } catch (err) {
        setError('Failed to load devices. Please try again later.');
        console.error('Error loading devices:', err);
      } finally {
        setLoading(false);
      }
    };


      loadDevices();
  }, []);
  console.log(devices)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] mix-blend-overlay opacity-20">
          <div className="absolute inset-0 bg-purple-900/30 mix-blend-multiply"></div>
        </div>
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-gradient-start/50"
          style={{ 
            backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)' 
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <HeroTitle 
                main="Orion Validator" 
                highlight="Powered by Dione Protocol" 
              />
              <p className="max-w-2xl mx-auto text-lg text-primary-100 sm:text-xl font-light leading-relaxed">
                Run your validator node sustainably with verified renewable energy sources 
                and reliable Starlink connectivity. Join the future of eco-friendly blockchain validation.
              </p>
            </div>

            <div className="flex justify-center gap-6">
              <HeroButton 
                variant="primary"
                className="transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </HeroButton>
              <HeroButton 
                variant="secondary"
                className="transform hover:scale-105 transition-all duration-200"
              >
                Learn More
              </HeroButton>
            </div>


            <HeroStats />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <VerificationCard
            title="Renewable Energy Verification"
            status="verified"
            description="AI-powered verification of your renewable energy source"
            icon={<Leaf className="h-8 w-8 text-green-400" />}
            className="transform hover:scale-105 transition-all duration-200"
          />
          <VerificationCard
        title="Starlink Connection"
        status={"verified"}
        description="Verification of stable Starlink connectivity"
        error={error}
        icon={<Satellite className="h-8 w-8 text-blue-400" />}
        className="transform hover:scale-105 transition-all duration-200 max-w-md w-full"
      />
        </div>
      </div>
          </div>
        </div>
      </div>

      {/* Device Discovery Section with enhanced styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <DeviceList />
        </div>
      </div>

      {/* Enhanced Verification Section */}
      
    </div>
  );
}