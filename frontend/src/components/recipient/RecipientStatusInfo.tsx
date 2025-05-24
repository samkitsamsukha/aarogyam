import React from 'react';
import { Recipient } from '../../types';
import { InfoCard } from '../ui/InfoCard';
import { ClipboardList, Clock } from 'lucide-react';
import { formatDate, calculateWaitingTime } from '../../utils/formatters';

interface RecipientStatusInfoProps {
  recipient: Recipient;
}

const RecipientStatusInfo: React.FC<RecipientStatusInfoProps> = ({ recipient }) => {
  return (
    <div className="space-y-6">
      <InfoCard
        icon={<ClipboardList className="h-5 w-5 text-blue-500" />}
        title="Status Information"
      >
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Current Status</span>
            <span className={`py-1 px-3 rounded-full text-sm font-medium ${
              recipient.status === 'Matched' ? 'bg-green-100 text-green-800' :
              recipient.status === 'Transplanted' ? 'bg-purple-100 text-purple-800' :
              recipient.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {recipient.status}
            </span>
          </div>
          
          {recipient.proof && (
            <div className="flex justify-between">
              <span className="text-gray-500">Documentation</span>
              <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                View Documentation
              </span>
            </div>
          )}
        </div>
      </InfoCard>

      <InfoCard
        icon={<Clock className="h-5 w-5 text-blue-500" />}
        title="Waiting Period"
      >
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Waiting Since</span>
            <span className="font-medium">{formatDate(recipient.waitingSince)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total Waiting Time</span>
            <span className="font-medium">{calculateWaitingTime(recipient.waitingSince)}</span>
          </div>
          
          {recipient.status === 'Matched' && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Please check your email</span> for further instructions on how to proceed with the match.
              </p>
            </div>
          )}
        </div>
      </InfoCard>
    </div>
  );
};

export default RecipientStatusInfo;