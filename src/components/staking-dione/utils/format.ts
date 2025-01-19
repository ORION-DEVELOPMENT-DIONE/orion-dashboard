export function formatDIONE(amount: string): string {
    const value = parseFloat(amount);
    if (isNaN(value)) return '0 DIONE';
    return `${value.toLocaleString()} DIONE`;
  }
  
  export function formatUSD(dioneAmount: string): string {
    // Mock exchange rate - replace with actual rate from API
    const DIONE_TO_USD = 1.20;
    const value = parseFloat(dioneAmount) * DIONE_TO_USD;
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }
  
  export function calculateTimeRemaining(endDate: Date): {
    days: number;
    hours: number;
    minutes: number;
  } {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  }
  
  export function formatAddress(address: string): string {
    if (!address) return '';
    if (address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }