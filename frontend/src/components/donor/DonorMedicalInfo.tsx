import React from 'react';
import { Donor } from '../../types';
import { InfoCard } from '../ui/InfoCard';
import { Stethoscope, AlertTriangle, Pill, Cigarette, Wine } from 'lucide-react';

interface DonorMedicalInfoProps {
  donor: Donor;
}

const DonorMedicalInfo: React.FC<DonorMedicalInfoProps> = ({ donor }) => {
  const { medicalHistory } = donor;
  
  if (!medicalHistory) {
    return <div className="text-gray-500 italic">No medical information available</div>;
  }

  return (
    <div className="space-y-6">
      <InfoCard
        icon={<Stethoscope className="h-5 w-5 text-blue-500" />}
        title="Medical Conditions"
      >
        {medicalHistory.conditions && medicalHistory.conditions.length > 0 ? (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Conditions</h4>
            <ul className="list-disc pl-5 text-gray-800">
              {medicalHistory.conditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 italic">No medical conditions reported</p>
        )}
        
        {medicalHistory.chronicDiseases && medicalHistory.chronicDiseases.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Chronic Diseases</h4>
            <ul className="list-disc pl-5 text-gray-800">
              {medicalHistory.chronicDiseases.map((disease, index) => (
                <li key={index}>{disease}</li>
              ))}
            </ul>
          </div>
        )}
      </InfoCard>

      <InfoCard
        icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
        title="Infections & Allergies"
      >
        <div className="space-y-3">
          {medicalHistory.infections && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Infections</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-2 ${medicalHistory.infections.hiv ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <span>HIV: {medicalHistory.infections.hiv ? 'Positive' : 'Negative'}</span>
                </div>
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-2 ${medicalHistory.infections.hepatitis ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <span>Hepatitis: {medicalHistory.infections.hepatitis ? 'Positive' : 'Negative'}</span>
                </div>
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-2 ${medicalHistory.infections.tuberculosis ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <span>Tuberculosis: {medicalHistory.infections.tuberculosis ? 'Positive' : 'Negative'}</span>
                </div>
              </div>
            </div>
          )}
          
          {medicalHistory.allergies && medicalHistory.allergies.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Allergies</h4>
              <ul className="list-disc pl-5 text-gray-800">
                {medicalHistory.allergies.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </InfoCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={<Pill className="h-5 w-5 text-purple-500" />}
          title="Medications"
        >
          {medicalHistory.recentMedications && medicalHistory.recentMedications.length > 0 ? (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Recent Medications</h4>
              <ul className="list-disc pl-5 text-gray-800">
                {medicalHistory.recentMedications.map((medication, index) => (
                  <li key={index}>{medication}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 italic">No recent medications reported</p>
          )}
        </InfoCard>

        <InfoCard
          icon={<Cigarette className="h-5 w-5 text-gray-500" />}
          title="Lifestyle Factors"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Smoking History</span>
              <span className={`font-medium ${medicalHistory.smokingHistory ? 'text-amber-600' : 'text-green-600'}`}>
                {medicalHistory.smokingHistory ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Alcohol Use</span>
              <span className={`font-medium ${medicalHistory.alcoholUse ? 'text-amber-600' : 'text-green-600'}`}>
                {medicalHistory.alcoholUse ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default DonorMedicalInfo;