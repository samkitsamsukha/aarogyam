import React, { useState } from 'react';
import { Donor } from '../../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import DonorPersonalInfo from './DonorPersonalInfo';
import DonorMedicalInfo from './DonorMedicalInfo';
import { formatDate } from '../../utils/formatters';

interface DonorProfileProps {
  donor: Donor;
  status: string;
}

const DonorProfile: React.FC<DonorProfileProps> = ({ donor, status }) => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            {status === 'Matched' ? 'Matched Donor' : 'Transplant Donor'}
          </h2>
          {donor.organAvailabilityDate && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Available since:</span>
              <span className="text-sm font-medium text-gray-800">
                {formatDate(donor.organAvailabilityDate)}
              </span>
            </div>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 border-b border-gray-200">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="medical">Medical Information</TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="personal">
            <DonorPersonalInfo donor={donor} />
          </TabsContent>
          <TabsContent value="medical">
            <DonorMedicalInfo donor={donor} />
          </TabsContent>
        </div>
      </Tabs>

      {status === 'Matched' && (
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <p className="text-sm text-blue-700 text-center font-medium">
            Check your email for further instructions to accept this match
          </p>
        </div>
      )}
    </div>
  );
};

export default DonorProfile;