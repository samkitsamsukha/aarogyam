import React from 'react';
import { Recipient } from '../../types';
import { InfoCard } from '../ui/InfoCard';
import { User, Mail, Phone, MapPin, Droplets, Heart } from 'lucide-react';

interface RecipientPersonalInfoProps {
  recipient: Recipient;
}

const RecipientPersonalInfo: React.FC<RecipientPersonalInfoProps> = ({ recipient }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={<User className="h-5 w-5 text-blue-500" />}
          title="Basic Information"
        >
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{recipient.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Age</span>
              <span className="font-medium">{recipient.age} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Gender</span>
              <span className="font-medium">{recipient.gender}</span>
            </div>
          </div>
        </InfoCard>

        <InfoCard
          icon={<Mail className="h-5 w-5 text-blue-500" />}
          title="Contact Information"
        >
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-blue-600">{recipient.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium">{recipient.phone}</span>
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
              <span className="text-gray-500">Blood Type</span>
              <span className="font-medium text-red-600">{recipient.bloodType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Required Organ</span>
              <span className="font-medium">{recipient.requiredOrgan}</span>
            </div>
          </div>
        </InfoCard>

        <InfoCard
          icon={<MapPin className="h-5 w-5 text-blue-500" />}
          title="Location Information"
        >
          {recipient.geoLocation ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Latitude</span>
                <span className="font-medium">{recipient.geoLocation.lat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Longitude</span>
                <span className="font-medium">{recipient.geoLocation.lng}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">No location data available</p>
          )}
        </InfoCard>
      </div>
    </div>
  );
};

export default RecipientPersonalInfo;