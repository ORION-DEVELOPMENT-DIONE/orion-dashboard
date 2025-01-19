import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export function SidebarItem({ to, icon, label }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        "hover:bg-purple-500/20 hover:backdrop-blur-lg",
        isActive 
          ? "bg-purple-500/30 text-white backdrop-blur-lg" 
          : "text-purple-200 hover:text-white"
      )}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}