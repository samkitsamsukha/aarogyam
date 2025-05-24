import React from 'react';
import { useRecipient } from '../context/RecipientContext';
import RecipientProfile from './recipient/RecipientProfile';
import DonorProfile from './donor/DonorProfile';
import Header from './ui/Header';
import StatusBanner from './ui/StatusBanner';
import { LoadingSpinner } from './ui/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { recipient, loading } = useRecipient();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!recipient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">No Recipient Data</h2>
          <p className="text-gray-600">
            There seems to be an issue loading the recipient data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header recipient={recipient} />
      <main className="container mx-auto px-4 py-8">
        <StatusBanner status={recipient.status} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecipientProfile recipient={recipient} />
          </div>
          <div className="lg:col-span-1">
            {(recipient.status === "Matched" || recipient.status === "Transplanted") && recipient.matchedDonor && (
              <DonorProfile donor={recipient.matchedDonor} status={recipient.status} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;