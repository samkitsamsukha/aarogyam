import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipient } from '../types';
import axios from 'axios'

interface RecipientContextType {
  recipient: Recipient | null;
  loading: boolean;
  error: string | null;
}

const RecipientContext = createContext<RecipientContextType | undefined>(undefined);

interface RecipientProviderProps {
  children: ReactNode;
}

export const RecipientProvider: React.FC<RecipientProviderProps> = ({ children }) => {
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch recipient data
    const fetchRecipient = async () => {
      try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/get-info", {
        headers: {
        authorization: token || "",
        "Content-Type": "application/json",
        },
      });
      setRecipient(response.data.recipient);
      setLoading(false);
      } catch (err) {
      setError('Failed to fetch recipient data');
      setLoading(false);
      }
    };

    fetchRecipient();
  }, []);

  return (
    <RecipientContext.Provider value={{ recipient, loading, error }}>
      {children}
    </RecipientContext.Provider>
  );
};

export const useRecipient = (): RecipientContextType => {
  const context = useContext(RecipientContext);
  if (!context) {
    throw new Error('useRecipient must be used within a RecipientProvider');
  }
  return context;
};