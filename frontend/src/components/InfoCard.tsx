import React, { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3">
        <h3 className="text-white font-medium text-lg">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default InfoCard;