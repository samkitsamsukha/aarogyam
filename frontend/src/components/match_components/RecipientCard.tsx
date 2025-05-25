import React from 'react';
import { Calendar, Heart, User, Phone, Mail, MapPin, Clock, Activity, Droplet } from 'lucide-react';
import { Recipient } from '../types';
import Badge from './shared/Badge';
import InfoItem from './shared/InfoItem';
import ListItem from './shared/ListItem';
import Section from './shared/Section';

interface RecipientCardProps {
  recipient: Recipient;
  onAcceptOrgan: () => void;
}

export default function RecipientCard({ recipient, onAcceptOrgan }: RecipientCardProps) {
  const formatDate = (date?: Date) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-cyan-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Recipient</h2>
          <Badge status={recipient.status} />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-700">
            <User size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-gray-800">{recipient.name}</h3>
            <div className="flex items-center text-gray-600">
              <span className="text-sm">{recipient.gender}, {recipient.age} years old</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <InfoItem 
            label="Blood Type" 
            value={recipient.bloodType} 
            icon={<Droplet size={16} />} 
          />
          <InfoItem 
            label="Required Organ" 
            value={recipient.requiredOrgan} 
            icon={<Heart size={16} />} 
          />
          <InfoItem 
            label="Waiting Since" 
            value={formatDate(recipient.waitingSince)} 
            icon={<Clock size={16} />} 
          />
          <InfoItem 
            label="Previous Transplants" 
            value={recipient.medicalCondition?.previousTransplants ? 'Yes' : 'No'} 
            icon={<Activity size={16} />} 
          />
        </div>

        <div className="space-y-1 mb-6">
          <InfoItem 
            label="Email" 
            value={recipient.email} 
            icon={<Mail size={16} />} 
          />
          <InfoItem 
            label="Phone" 
            value={recipient.phone} 
            icon={<Phone size={16} />} 
          />
          {recipient.geoLocation?.lat && recipient.geoLocation?.lng && (
            <InfoItem 
              label="Location" 
              value="View on map" 
              icon={<MapPin size={16} />} 
            />
          )}
        </div>

        <Section title="Medical Condition">
          <div className="grid grid-cols-1 gap-3">
            {recipient.medicalCondition?.diagnosis && (
              <div>
                <p className="text-xs font-semibold text-gray-600">Diagnosis</p>
                <p className="text-sm">{recipient.medicalCondition.diagnosis}</p>
              </div>
            )}
            
            {recipient.medicalCondition?.chronicDiseases && (
              <div>
                <p className="text-xs font-semibold text-gray-600">Chronic Diseases</p>
                <ListItem items={recipient.medicalCondition.chronicDiseases} />
              </div>
            )}
            
            {recipient.medicalCondition?.allergies && (
              <div>
                <p className="text-xs font-semibold text-gray-600">Allergies</p>
                <ListItem items={recipient.medicalCondition.allergies} />
              </div>
            )}
            
            {recipient.medicalCondition?.recentMedications && (
              <div>
                <p className="text-xs font-semibold text-gray-600">Medications</p>
                <ListItem items={recipient.medicalCondition.recentMedications} />
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <p className="text-xs font-semibold text-gray-600">Smoking</p>
                <p className="text-sm">{recipient.medicalCondition?.smokingHistory ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Alcohol Use</p>
                <p className="text-sm">{recipient.medicalCondition?.alcoholUse ? 'Yes' : 'No'}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-gray-600">Infections</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-gray-500">HIV</p>
                  <p className="text-sm">{recipient.medicalCondition?.infections?.hiv ? 'Positive' : 'Negative'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hepatitis</p>
                  <p className="text-sm">{recipient.medicalCondition?.infections?.hepatitis ? 'Positive' : 'Negative'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tuberculosis</p>
                  <p className="text-sm">{recipient.medicalCondition?.infections?.tuberculosis ? 'Positive' : 'Negative'}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
        
        {recipient.proof && (
          <Section title="Verification">
            <InfoItem label="Proof Document" value={recipient.proof} />
          </Section>
        )}
        
        <div className="mt-6">
          <button
            onClick={onAcceptOrgan}
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transform transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            Accept the Organ
          </button>
        </div>
      </div>
    </div>
  );
}