import React, { useState } from 'react';
import { Recipient } from '../../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { formatDate } from '../../utils/formatters';
import RecipientPersonalInfo from './RecipientPersonalInfo';
import RecipientMedicalInfo from './RecipientMedicalInfo';
import RecipientStatusInfo from './RecipientStatusInfo';

interface RecipientProfileProps {
  recipient: Recipient;
}

const RecipientProfile: React.FC<RecipientProfileProps> = ({ recipient }) => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Recipient Profile</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Waiting since:</span>
            <span className="text-sm font-medium text-gray-800">
              {formatDate(recipient.waitingSince)}
            </span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 border-b border-gray-200">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="medical">Medical Information</TabsTrigger>
            <TabsTrigger value="status">Status & History</TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="personal">
            <RecipientPersonalInfo recipient={recipient} />
          </TabsContent>
          <TabsContent value="medical">
            <RecipientMedicalInfo recipient={recipient} />
          </TabsContent>
          <TabsContent value="status">
            <RecipientStatusInfo recipient={recipient} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default RecipientProfile;