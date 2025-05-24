import React, { ReactNode } from 'react';

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
      <div className="p-4 border-b border-gray-100 flex items-center">
        <div className="mr-2">{icon}</div>
        <h3 className="font-medium text-gray-800">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};