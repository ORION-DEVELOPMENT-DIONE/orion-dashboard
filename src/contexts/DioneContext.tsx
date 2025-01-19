import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface DioneContextType {
  walletAddress: string | undefined;
  status: string | undefined;
  balance: string | undefined;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  signTransaction: (unsignedTx: unknown, chain: string) => Promise<any>;
}

const DioneContext = createContext<DioneContextType | undefined>(undefined);

export const DioneProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);

  useEffect(() => {
    const checkWalletStatus = () => {
      if (typeof window !== "undefined" && window.dione) {
        setWalletAddress(window.dione.address);
        setStatus(window.dione.status);
        setBalance(window.dione.balance);
      }
    };

    // Initial check
    checkWalletStatus();

    // Set up interval to check wallet status
    const interval = setInterval(checkWalletStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const connectWallet = async () => {
    if (window.dione) {
      try {
        await window.dione.connect({ chain: "O" });
        setWalletAddress(window.dione.address);
        setStatus(window.dione.status);
        setBalance(window.dione.balance);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        throw error;
      }
    } else {
      throw new Error("Dione wallet is not installed");
    }
  };
  console.log(status)
  console.log(walletAddress)
  console.log(balance)

  const disconnectWallet = async () => {
    if (window.dione) {
      try {
        await window.dione.disconnect();
        setWalletAddress(undefined);
        setStatus(undefined);
        setBalance(undefined);
      } catch (error) {
        console.error("Failed to disconnect wallet:", error);
        throw error;
      }
    }
  };

  const signTransaction = async (unsignedTx: unknown, chain: string) => {
    if (window.dione) {
      try {
        const signedTx = await window.dione.signTx({ unsignedTx, chain });
        return signedTx;
      } catch (error) {
        console.error("Failed to sign transaction:", error);
        throw error;
      }
    }
    throw new Error("Dione wallet is not available");
  };

  return (
    <DioneContext.Provider
      value={{
        walletAddress,
        status,
        balance,
        connectWallet,
        disconnectWallet,
        signTransaction,
      }}
    >
      {children}
    </DioneContext.Provider>
  );
};

export const useDione = (): DioneContextType => {
  const context = useContext(DioneContext);
  if (!context) {
    throw new Error("useDione must be used within a DioneProvider");
  }
  return context;
};