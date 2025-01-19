import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';

export function NavLinks() {
  return (
    <div className="hidden md:flex items-center space-x-1">
      <NavLink to="/about" label="about" />
      <NavLink to="/projects" label="Projects" />
      <NavLink to="/whitepaper" label="whitepaper" />
      <NavLink to="/team" label="Team" />
      <NavLink to="/section" label="section" />
    </div>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link 
      to={to} 
      className={cn(
        "group relative px-4 py-2",
        "text-sm font-medium text-white",  // Changed from text-muted-foreground/90 to text-white
        "transition-colors duration-200 hover:text-white"
      )}
    >
      <span className="relative z-10">{label}</span>
      <span className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-600/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </Link>
  );
}
