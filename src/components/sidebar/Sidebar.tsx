import React from 'react';
import { 
  Home, 
  BarChart2, 
  Zap, 
  Globe, 
  Wand2,
  Coins,
  Link,
  FileText
} from 'lucide-react';
import { Logo } from './Logo';
import { SidebarItem } from './SidebarItem';
import { NetworkStatus } from './NetworkStatus'; 

const menuItems = [
  { to: '/', icon: <Home />, label: 'Home' },
  { to: '/metrics', icon: <BarChart2 />, label: 'Validator Metrics' },
  { to: '/energy', icon: <Zap />, label: 'Energy Metrics' },
  /*{ to: '/management', icon: <Globe />, label: 'Global Management' },*/
  { to: '/setup', icon: <Wand2 />, label: 'Setup Wizard' },
  { to: '/staking-dione', icon: <Coins />, label: 'Staking' },
  { to: '/pair', icon: <Link />, label: 'Pair Device' },
  { to: '/docs', icon: <FileText />, label: 'Documentation' },
];

export function Sidebar() {
  
  return (
    <div className="flex flex-col h-full bg-purple-900/40 backdrop-blur-lg border-r border-purple-500/20">
      <Logo />
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>

      <div className="p-4">
        <NetworkStatus 
          status="operational"
          message="All systems operational"
        />
      </div>
    </div>
  );
}