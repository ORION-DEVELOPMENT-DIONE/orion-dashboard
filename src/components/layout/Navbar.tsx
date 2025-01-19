import { useAuth } from '../../contexts/AuthContext';
import { NavBrand } from './navbar/NavBrand';
import { NavLinks } from './navbar/NavLinks';
import { UserMenu } from './navbar/UserMenu';
import { AuthButtons } from './navbar/AuthButtons';
import { MobileMenuButton } from './navbar/MobileMenuButton';
import { useState } from 'react';

// Assuming you have a function for connecting the wallet (e.g., connectWallet)
//import { connectWallet } from '../../utils/wallet';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false); // For showing connection status

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
console.log('connected')
      setIsConnecting(false);
      // Optionally handle any additional logic after wallet connection (e.g., fetching user data)
    } catch (error) {
      setIsConnecting(false);
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/80 via-background/95 to-purple-950/80 backdrop-blur-md border-b border-white/10" />
      
      <div className="container relative">
        <div className="flex h-16 items-center justify-between px-4">
          <NavLinks />
          
          <div className="flex items-center space-x-4">
            {isAuthenticated && user?.email ? (
              <UserMenu email={user.email} onLogout={logout} />
            ) : (
              <>
                <AuthButtons />
                <button
                  onClick={handleConnectWallet}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              </>
            )}
            <MobileMenuButton />
          </div>
        </div>
      </div>
    </nav>
  );
}