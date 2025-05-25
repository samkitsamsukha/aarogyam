import React, { ReactNode } from 'react';

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children }) => {
  return (
    <div className="bg-white rounded-lg border border-teal-100 overflow-hidden transition-shadow hover:shadow-md">
      <div className="p-4 border-b border-cyan-100 flex items-center bg-teal-50">
        <div className="mr-2 text-teal-600">{icon}</div>
        <h3 className="font-medium text-cyan-800">{title}</h3>
      </div>
      <div className="p-4 text-gray-700">
        {children}
      </div>
    </div>

  );
};