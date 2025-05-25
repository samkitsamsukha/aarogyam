import React, { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ title, children, className = '' }: SectionProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">{title}</h3>
      <div className="bg-white rounded-md p-3 shadow-sm">{children}</div>
    </div>
  );
}