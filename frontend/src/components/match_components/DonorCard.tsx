import { Calendar, Heart, User, Phone, Mail, MapPin, Activity, Droplet } from 'lucide-react';
import { Donor } from '../../types';
import Badge from './shared/Badge';
import InfoItem from './shared/InfoItem';
import ListItem from './shared/ListItem';
import Section from './shared/Section';

interface DonorCardProps {
  donor: Donor;
}

export default function DonorCard({ donor }: DonorCardProps) {
  const formatDate = (date?: Date) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-teal-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Donor</h2>
          <Badge status={donor.status} />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-teal-200 flex items-center justify-center text-teal-700">
            <User size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-gray-800">{donor.name}</h3>
            <div className="flex items-center text-gray-600">
              <span className="text-sm">{donor.gender}, {donor.age} years old</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <InfoItem 
            label="Blood Type" 
            value={donor.bloodType} 
            icon={<Droplet size={16} />} 
          />
          <InfoItem 
            label="Organ Donating" 
            value={donor.organType} 
            icon={<Heart size={16} />} 
          />
          <InfoItem 
            label="Available Date" 
            value={formatDate(donor.organAvailabilityDate)} 
            icon={<Calendar size={16} />} 
          />
          <InfoItem 
            label="Living Donor" 
            value={donor.isLivingDonor ? 'Yes' : 'No'} 
            icon={<Activity size={16} />} 
          />
        </div>

        <div className="space-y-1 mb-6">
          <InfoItem 
            label="Email" 
            value={donor.email} 
            icon={<Mail size={16} />} 
          />
          <InfoItem 
            label="Phone" 
            value={donor.phone} 
            icon={<Phone size={16} />} 
          />
          {donor.geoLocation?.lat && donor.geoLocation?.lng && (
            <InfoItem 
              label="Location" 
              value="View on map" 
              icon={<MapPin size={16} />} 
            />
          )}
        </div>

        <Section title="Medical History">
          <div className="grid grid-cols-1 gap-3">
            {donor.medicalHistory?.conditions && (
              <div>
                <p className="text-xs font-semibold text-gray-600">Medical Conditions</p>
                <ListItem items={donor.medicalHistory.conditions} />
              </div>
            )}
            
            {donor.medicalHistory?.allergies && (
              <div>
                <p className="text-xs font-semibold text-gray-600">Allergies</p>
                <ListItem items={donor.medicalHistory.allergies} />
              </div>
            )}
            
            {donor.medicalHistory?.recentMedications && (
              <div>
                <p className="text-xs font-semibold text-gray-600">Medications</p>
                <ListItem items={donor.medicalHistory.recentMedications} />
              </div>
            )}
            
            {donor.medicalHistory?.chronicDiseases && (
              <div>
                <p className="text-xs font-semibold text-gray-600">Chronic Diseases</p>
                <ListItem items={donor.medicalHistory.chronicDiseases} />
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <p className="text-xs font-semibold text-gray-600">Smoking</p>
                <p className="text-sm">{donor.medicalHistory?.smokingHistory ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Alcohol Use</p>
                <p className="text-sm">{donor.medicalHistory?.alcoholUse ? 'Yes' : 'No'}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-gray-600">Infections</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-gray-500">HIV</p>
                  <p className="text-sm">{donor.medicalHistory?.infections?.hiv ? 'Positive' : 'Negative'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hepatitis</p>
                  <p className="text-sm">{donor.medicalHistory?.infections?.hepatitis ? 'Positive' : 'Negative'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tuberculosis</p>
                  <p className="text-sm">{donor.medicalHistory?.infections?.tuberculosis ? 'Positive' : 'Negative'}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
        
        {donor.proof && (
          <Section title="Verification">
            <InfoItem label="Proof Document" value={donor.proof} />
          </Section>
        )}
      </div>
    </div>
  );
}