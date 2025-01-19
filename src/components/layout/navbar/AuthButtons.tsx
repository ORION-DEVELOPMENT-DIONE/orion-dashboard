import { Link } from 'react-router-dom';
import { Button } from '../../button';
import { cn } from '../../../utils/cn';
export function AuthButtons() {
  return (
    <div className="flex items-center space-x-2">
      <Link to="/login">
        <Button 
          variant="ghost"
          className={cn(
            "text-muted-foreground/90 hover:text-white",
            "hover:bg-white/5 hover:shadow-none"
          )}
        >
          Sign in
        </Button>
      </Link>
      <Link to="/register">
        <Button 
          className={cn(
            "relative overflow-hidden",
            "bg-gradient-to-r from-purple-600 to-primary text-white",
            "hover:from-purple-500 hover:to-primary/90",
            "transition-all duration-300",
            "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
            "hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]"
          )}
        >
          <span className="relative z-10">Get Started</span>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-primary/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </Link>
    </div>
  );
}