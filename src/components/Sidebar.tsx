import React from 'react';
import { BarChart3, Home, Zap, Settings, Wallet } from 'lucide-react';
import { SidebarHeader } from './sidebar/SidebarHeader';
import { SidebarLink } from './sidebar/SidebarLink';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BarChart3, label: 'Validator Metrics', path: '/metrics' },
  { icon: Zap, label: 'Energy Metrics', path: '/energy' },
  { icon: Settings, label: 'Setup Wizard', path: '/setup' },
  { icon: Wallet, label: 'Staking', path: '/staking-dione' },
];

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen">
      <SidebarHeader />
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <SidebarLink {...item} />
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50">
          <p className="text-sm text-primary-700 font-medium">System Status</p>
          <p className="text-xs text-primary-600 mt-1">All systems operational</p>
        </div>
      </div>
    </div>
  );
}