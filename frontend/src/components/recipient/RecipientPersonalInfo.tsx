import React from 'react';
import { Recipient } from '../../types';
import { InfoCard } from '../ui/InfoCard';
import { User, Mail, MapPin, Droplets } from 'lucide-react';

interface RecipientPersonalInfoProps {
  recipient: Recipient;
}

const RecipientPersonalInfo: React.FC<RecipientPersonalInfoProps> = ({ recipient }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={<User className="h-5 w-5 text-teal-500" />}
          title="Basic Information"
        >
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-cyan-600">Name</span>
              <span className="font-medium text-gray-800">{recipient.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-600">Age</span>
              <span className="font-medium text-gray-800">{recipient.age} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-600">Gender</span>
              <span className="font-medium text-gray-800">{recipient.gender}</span>
            </div>
          </div>
        </InfoCard>

        <InfoCard
          icon={<Mail className="h-5 w-5 text-teal-500" />}
          title="Contact Information"
        >
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-cyan-600">Email</span>
              <span className="font-medium text-cyan-700">{recipient.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-600">Phone</span>
              <span className="font-medium text-gray-800">{recipient.phone}</span>
            </div>
          </div>
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={<Droplets className="h-5 w-5 text-red-500" />}
          title="Blood & Organ Information"
        >
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-cyan-600">Blood Type</span>
              <span className="font-medium text-red-600">{recipient.bloodType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-600">Required Organ</span>
              <span className="font-medium text-gray-800">{recipient.requiredOrgan}</span>
            </div>
          </div>
        </InfoCard>

        <InfoCard
          icon={<MapPin className="h-5 w-5 text-teal-500" />}
          title="Location Information"
        >
          {recipient.geoLocation ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-cyan-600">Latitude</span>
                <span className="font-medium text-gray-800">{recipient.geoLocation.lat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyan-600">Longitude</span>
                <span className="font-medium text-gray-800">{recipient.geoLocation.lng}</span>
              </div>
            </div>
          ) : (
            <p className="text-cyan-500 italic">No location data available</p>
          )}
        </InfoCard>
      </div>
    </div>

  );
};

export default RecipientPersonalInfo;