import { Menu } from 'lucide-react';
import { Button } from '../../button';
export function MobileMenuButton() {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      className="md:hidden hover:bg-white/5"
    >
      <Menu className="h-5 w-5 text-muted-foreground hover:text-white transition-colors" />
    </Button>
  );
}