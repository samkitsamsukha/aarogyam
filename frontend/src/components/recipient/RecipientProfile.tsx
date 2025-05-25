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
      <div className="p-6 border-b border-cyan-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-teal-700">Recipient Profile</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-cyan-600">Waiting since:</span>
            <span className="text-sm font-medium text-gray-800">
              {formatDate(recipient.waitingSince)}
            </span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 border-b border-cyan-200">
          <TabsList className="flex space-x-2">
            <div
              style={{ display: 'contents' }}
            >
              <TabsTrigger value="personal">
                <span className="data-[state=active]:text-white data-[state=active]:bg-teal-500 text-teal-700 hover:bg-teal-100 px-4 py-2 rounded-md text-sm font-medium transition">
                  Personal Information
                </span>
              </TabsTrigger>
              <TabsTrigger value="medical">
                <span className="data-[state=active]:text-white data-[state=active]:bg-teal-500 text-teal-700 hover:bg-teal-100 px-4 py-2 rounded-md text-sm font-medium transition">
                  Medical Information
                </span>
              </TabsTrigger>
              <TabsTrigger value="status">
                <span className="data-[state=active]:text-white data-[state=active]:bg-teal-500 text-teal-700 hover:bg-teal-100 px-4 py-2 rounded-md text-sm font-medium transition">
                  Status & History
                </span>
              </TabsTrigger>
            </div>
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