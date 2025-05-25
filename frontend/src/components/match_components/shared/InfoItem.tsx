import React, { ReactNode } from 'react';

interface InfoItemProps {
  label: string;
  value: string | number | ReactNode | null | undefined;
  icon?: ReactNode;
}

export default function InfoItem({ label, value, icon }: InfoItemProps) {
  if (value === undefined || value === null) return null;
  
  return (
    <div className="flex items-start mb-2">
      {icon && <span className="mr-2 text-teal-600">{icon}</span>}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}