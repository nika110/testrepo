import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  walletType: 'metamask' | 'phantom' | null;
  address: string | null;
  connectMetaMask: () => Promise<void>;
  connectPhantom: () => Promise<void>;
  disconnect: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
  }
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletType, setWalletType] = useState<'metamask' | 'phantom' | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if wallets are available
  const isMetaMaskAvailable = () => {
    return typeof window !== 'undefined' && window.ethereum?.isMetaMask;
  };

  const isPhantomAvailable = () => {
    return typeof window !== 'undefined' && window.solana?.isPhantom;
  };

  // Connect to MetaMask
  const connectMetaMask = async () => {
    try {
      setError(null);
      
      if (!isMetaMaskAvailable()) {
        setError('MetaMask is not installed. Please install MetaMask extension.');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setIsConnected(true);
        setWalletType('metamask');
        setAddress(accounts[0]);
        
        // Store connection in localStorage
        localStorage.setItem('walletConnection', JSON.stringify({
          type: 'metamask',
          address: accounts[0]
        }));
      }    } catch (err: any) {
      console.error('Error connecting to MetaMask:', err);
      if (err.code === 4001) {
        setError('Connection was cancelled. Please try again to connect your MetaMask wallet.');
      } else if (err.code === -32002) {
        setError('MetaMask is already processing a connection request. Please check your MetaMask extension.');
      } else {
        setError('Unable to connect to MetaMask. Please make sure MetaMask is installed and unlocked.');
      }
    }
  };

  // Connect to Phantom
  const connectPhantom = async () => {
    try {
      setError(null);
      
      if (!isPhantomAvailable()) {
        setError('Phantom wallet is not installed. Please install Phantom extension.');
        return;
      }

      const response = await window.solana.connect();
      
      if (response.publicKey) {
        setIsConnected(true);
        setWalletType('phantom');
        setAddress(response.publicKey.toString());
        
        // Store connection in localStorage
        localStorage.setItem('walletConnection', JSON.stringify({
          type: 'phantom',
          address: response.publicKey.toString()
        }));
      }    } catch (err: any) {
      console.error('Error connecting to Phantom:', err);
      if (err.code === 4001) {
        setError('Connection was cancelled. Please try again to connect your Phantom wallet.');
      } else if (err.code === -32003) {
        setError('Phantom wallet is locked. Please unlock your wallet and try again.');
      } else {
        setError('Unable to connect to Phantom wallet. Please make sure Phantom is installed and unlocked.');
      }
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    setIsConnected(false);
    setWalletType(null);
    setAddress(null);
    setError(null);
    
    // Remove from localStorage
    localStorage.removeItem('walletConnection');
    
    // Disconnect from Phantom if connected
    if (walletType === 'phantom' && window.solana?.disconnect) {
      window.solana.disconnect();
    }
  };

  // Check for existing connection on load
  useEffect(() => {
    const checkExistingConnection = async () => {
      const savedConnection = localStorage.getItem('walletConnection');
      if (savedConnection) {
        try {
          const { type, address: savedAddress } = JSON.parse(savedConnection);
          
          if (type === 'metamask' && isMetaMaskAvailable()) {
            // Check if MetaMask is still connected
            try {
              const accounts = await window.ethereum.request({
                method: 'eth_accounts',
              });
              
              if (accounts.length > 0 && accounts[0] === savedAddress) {
                setIsConnected(true);
                setWalletType('metamask');
                setAddress(accounts[0]);
              } else {
                localStorage.removeItem('walletConnection');
              }
            } catch (err) {
              localStorage.removeItem('walletConnection');
            }
          } else if (type === 'phantom' && isPhantomAvailable()) {
            // Check if Phantom is still connected
            try {
              if (window.solana.isConnected) {
                setIsConnected(true);
                setWalletType('phantom');
                setAddress(savedAddress);
              } else {
                localStorage.removeItem('walletConnection');
              }
            } catch (err) {
              localStorage.removeItem('walletConnection');
            }
          }
        } catch (err) {
          localStorage.removeItem('walletConnection');
        }
      }
    };

    checkExistingConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (walletType === 'metamask' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
          localStorage.setItem('walletConnection', JSON.stringify({
            type: 'metamask',
            address: accounts[0]
          }));
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [walletType, address]);

  // Listen for Phantom disconnect
  useEffect(() => {
    if (walletType === 'phantom' && window.solana) {
      const handleDisconnect = () => {
        disconnect();
      };

      window.solana.on('disconnect', handleDisconnect);
      
      return () => {
        window.solana.removeListener('disconnect', handleDisconnect);
      };
    }
  }, [walletType]);
  const value: WalletContextType = {
    isConnected,
    walletType,
    address,
    connectMetaMask,
    connectPhantom,
    disconnect,
    error,
    setError,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
