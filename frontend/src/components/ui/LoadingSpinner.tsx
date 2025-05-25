import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-3"></div>
      <p className="text-gray-600">Loading information...</p>
    </div>
  );
};