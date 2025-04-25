import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  registerDonor: (data: any) => Promise<boolean>;
  registerRecipient: (data: any) => Promise<boolean>;
  getQueue: () => Promise<any[]>;
  matchOrgan: () => Promise<boolean>;
  isLoading: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    setIsLoading(true);
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setIsConnected(true);
        toast.success('Wallet connected successfully!');
      } else {
        toast.error('MetaMask is not installed. Please install it to use this app.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet.');
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    toast.success('Wallet disconnected.');
  };

  // Mock function for registering a donor (in a real app, this would interact with a smart contract)
  const registerDonor = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Donor registration data:', data);
      toast.success('Donor registration submitted to blockchain!');
      return true;
    } catch (error) {
      console.error('Error registering donor:', error);
      toast.error('Failed to register donor.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function for registering a recipient
  const registerRecipient = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Recipient registration data:', data);
      toast.success('Recipient registration submitted to blockchain!');
      return true;
    } catch (error) {
      console.error('Error registering recipient:', error);
      toast.error('Failed to register recipient.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function for getting the queue
  const getQueue = async () => {
    setIsLoading(true);
    try {
      // Simulate blockchain data fetch
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockQueue = [
        { id: '0x1', organType: 'Kidney', bloodType: 'A+', timestamp: Date.now() - 86400000 * 5 },
        { id: '0x2', organType: 'Liver', bloodType: 'O-', timestamp: Date.now() - 86400000 * 10 },
        { id: '0x3', organType: 'Heart', bloodType: 'B+', timestamp: Date.now() - 86400000 * 3 },
        { id: '0x4', organType: 'Kidney', bloodType: 'AB+', timestamp: Date.now() - 86400000 * 7 },
        { id: '0x5', organType: 'Lung', bloodType: 'A-', timestamp: Date.now() - 86400000 * 12 },
      ];
      
      return mockQueue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      toast.error('Failed to fetch queue data.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function for matching an organ
  const matchOrgan = async () => {
    setIsLoading(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success('Organ matching process completed!');
      return true;
    } catch (error) {
      console.error('Error matching organ:', error);
      toast.error('Failed to match organ.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isConnected,
    account,
    connectWallet,
    disconnectWallet,
    registerDonor,
    registerRecipient,
    getQueue,
    matchOrgan,
    isLoading
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};