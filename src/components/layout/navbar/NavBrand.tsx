import { Link } from 'react-router-dom';
import { RocketIcon } from 'lucide-react';

export function NavBrand() {
  return (
    <Link 
      to="/" 
      className="group flex items-center space-x-2"
    >
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-primary blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
        <RocketIcon className="relative h-6 w-6 text-primary rotate-0 group-hover:rotate-12 transition-transform duration-300" />
      </div>
      <span className="relative font-bold text-xl">
        <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600/50 to-primary/50 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Orion
        </span>
      </span>
    </Link>
  );
}