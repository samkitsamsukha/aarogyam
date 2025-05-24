import React from 'react';
import { Donor } from '../../types';
import { InfoCard } from '../ui/InfoCard';
import { User, Mail, Phone, MapPin, Droplets, Heart } from 'lucide-react';

interface DonorPersonalInfoProps {
  donor: Donor;
}

const DonorPersonalInfo: React.FC<DonorPersonalInfoProps> = ({ donor }) => {
  return (
    <div className="space-y-6">
      <InfoCard
        icon={<User className="h-5 w-5 text-blue-500" />}
        title="Basic Information"
      >
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">{donor.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Age</span>
            <span className="font-medium">{donor.age} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Gender</span>
            <span className="font-medium">{donor.gender}</span>
          </div>
        </div>
      </InfoCard>

      <InfoCard
        icon={<Droplets className="h-5 w-5 text-red-500" />}
        title="Organ Information"
      >
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Blood Type</span>
            <span className="font-medium text-red-600">{donor.bloodType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Organ Type</span>
            <span className="font-medium">{donor.organType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Living Donor</span>
            <span className={`font-medium ${donor.isLivingDonor ? 'text-green-600' : 'text-gray-600'}`}>
              {donor.isLivingDonor ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </InfoCard>

      <InfoCard
        icon={<MapPin className="h-5 w-5 text-blue-500" />}
        title="Contact & Location"
      >
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-blue-600">{donor.email}</span>
          </div>
          {donor.phone && (
            <div className="flex justify-between">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium">{donor.phone}</span>
            </div>
          )}
          {donor.geoLocation && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="text-sm font-medium text-gray-700 mb-1">Location</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Latitude: {donor.geoLocation.lat}</div>
                <div>Longitude: {donor.geoLocation.lng}</div>
              </div>
            </div>
          )}
        </div>
      </InfoCard>
    </div>
  );
};

export default DonorPersonalInfo;