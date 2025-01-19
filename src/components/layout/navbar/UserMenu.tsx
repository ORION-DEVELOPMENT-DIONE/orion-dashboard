import { Button } from '../../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../dropdown-menu';

interface UserMenuProps {
  email: string;
  onLogout: () => void;
}

export function UserMenu({ email, onLogout }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-8 w-8 rounded-full p-0 hover:bg-white/5"
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-primary/20">
            <span className="text-sm font-medium text-white">
              {email[0].toUpperCase()}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-background/95 backdrop-blur-sm border-white/10"
      >
        <DropdownMenuItem className="flex-col items-start">
          <div className="text-sm font-medium text-white">{email}</div>
          <div className="text-xs text-muted-foreground">User</div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onLogout} 
          className="text-red-400 hover:text-red-300 hover:bg-red-950/30 focus:bg-red-950/30"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



// fcc3f0b0e8a622b50ff969c4f4f12f572c77b1b03429441df3b9c2617d126470
// 0x26e7CDeb1Eb11C18Fa760dc27C0Aab7653258612