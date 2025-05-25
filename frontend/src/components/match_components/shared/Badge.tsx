import React from 'react';

interface BadgeProps {
  status: 'Pending' | 'Matched' | 'None' | 'Transplanted';
}

export default function Badge({ status }: BadgeProps) {
  const getStatusColors = () => {
    switch (status) {
      case 'Matched':
        return 'bg-teal-100 text-teal-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Transplanted':
        return 'bg-emerald-100 text-emerald-800';
      case 'None':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColors()}`}>
      {status}
    </span>
  );
}