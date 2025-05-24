import React from 'react';
import { Recipient } from '../../types';
import { InfoCard } from '../ui/InfoCard';
import { Stethoscope, Pill, AlertTriangle, Cigarette, Wine } from 'lucide-react';

interface RecipientMedicalInfoProps {
  recipient: Recipient;
}

const RecipientMedicalInfo: React.FC<RecipientMedicalInfoProps> = ({ recipient }) => {
  const { medicalCondition } = recipient;
  
  if (!medicalCondition) {
    return <div className="text-gray-500 italic">No medical information available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={<Stethoscope className="h-5 w-5 text-blue-500" />}
          title="Diagnosis & Conditions"
        >
          <div className="space-y-3">
            {medicalCondition.diagnosis && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Diagnosis</h4>
                <p className="text-gray-800">{medicalCondition.diagnosis}</p>
              </div>
            )}
            
            {medicalCondition.chronicDiseases && medicalCondition.chronicDiseases.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Chronic Diseases</h4>
                <ul className="list-disc pl-5 text-gray-800">
                  {medicalCondition.chronicDiseases.map((disease, index) => (
                    <li key={index}>{disease}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </InfoCard>

        <InfoCard
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
          title="Infections & Allergies"
        >
          <div className="space-y-3">
            {medicalCondition.infections && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Infections</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full mr-2 ${medicalCondition.infections.hiv ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span>HIV: {medicalCondition.infections.hiv ? 'Positive' : 'Negative'}</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full mr-2 ${medicalCondition.infections.hepatitis ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span>Hepatitis: {medicalCondition.infections.hepatitis ? 'Positive' : 'Negative'}</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full mr-2 ${medicalCondition.infections.tuberculosis ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span>Tuberculosis: {medicalCondition.infections.tuberculosis ? 'Positive' : 'Negative'}</span>
                  </div>
                </div>
              </div>
            )}
            
            {medicalCondition.allergies && medicalCondition.allergies.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Allergies</h4>
                <ul className="list-disc pl-5 text-gray-800">
                  {medicalCondition.allergies.map((allergy, index) => (
                    <li key={index}>{allergy}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={<Pill className="h-5 w-5 text-purple-500" />}
          title="Treatment History"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Previous Transplants</span>
              <span className={`font-medium ${medicalCondition.previousTransplants ? 'text-amber-600' : 'text-green-600'}`}>
                {medicalCondition.previousTransplants ? 'Yes' : 'No'}
              </span>
            </div>
            
            {medicalCondition.recentMedications && medicalCondition.recentMedications.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Recent Medications</h4>
                <ul className="list-disc pl-5 text-gray-800">
                  {medicalCondition.recentMedications.map((medication, index) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </InfoCard>

        <InfoCard
          icon={<Cigarette className="h-5 w-5 text-gray-500" />}
          title="Lifestyle Factors"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Smoking History</span>
              <span className={`font-medium ${medicalCondition.smokingHistory ? 'text-amber-600' : 'text-green-600'}`}>
                {medicalCondition.smokingHistory ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Alcohol Use</span>
              <span className={`font-medium ${medicalCondition.alcoholUse ? 'text-amber-600' : 'text-green-600'}`}>
                {medicalCondition.alcoholUse ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default RecipientMedicalInfo;