import React, { createContext, useContext, useState } from 'react';

type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: React.ReactNode;
}

export const TabsList: React.FC<TabsListProps> = ({ children }) => {
  return (
    <div className="flex space-x-1 overflow-x-auto py-2">
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children }) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }
  
  const isSelected = context.value === value;
  
  return (
    <button
      onClick={() => context.onValueChange(value)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isSelected
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }
  
  if (context.value !== value) {
    return null;
  }
  
  return <div className="animate-fadeIn">{children}</div>;
};