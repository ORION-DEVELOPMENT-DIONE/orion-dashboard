import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { LucideIcon } from 'lucide-react';

interface SidebarLinkProps {
  icon: LucideIcon;
  label: string;
  path: string;
}

export function SidebarLink({ icon: Icon, label, path }: SidebarLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
        "hover:bg-purple-500/10 group relative overflow-hidden",
        isActive && "bg-purple-500/20 text-purple-200 font-medium"
      )}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0",
        "group-hover:via-purple-500/10 transition-all duration-500",
        isActive && "via-purple-500/20"
      )} />
      <Icon className={cn(
        "h-5 w-5 transition-colors",
        isActive ? "text-purple-300" : "text-gray-400 group-hover:text-purple-300"
      )} />
      <span className={cn(
        "relative z-10",
        isActive ? "text-purple-200" : "text-gray-400 group-hover:text-purple-200"
      )}>
        {label}
      </span>
    </Link>
  );
}