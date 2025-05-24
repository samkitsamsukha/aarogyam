import React, { useState } from "react";
import { Donor } from "../types";
import InfoCard from "./InfoCard";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MedicalHistoryProps {
  donor: Donor;
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ donor }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>("conditions");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const SectionHeader = ({ title, section }: { title: string; section: string }) => (
    <div 
      className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-50 transition-colors duration-200"
      onClick={() => toggleSection(section)}
    >
      <h4 className="font-medium text-gray-700">{title}</h4>
      {expandedSection === section ? (
        <ChevronUp size={18} className="text-teal-500" />
      ) : (
        <ChevronDown size={18} className="text-gray-400" />
      )}
    </div>
  );

  return (
    <InfoCard title="Medical History" className="h-full">
      <div className="divide-y divide-gray-200">
        <div className="pb-2">
          <SectionHeader title="Medical Conditions" section="conditions" />
          {expandedSection === "conditions" && (
            <div className="pl-4 py-2 space-y-1 animate-fadeIn">
              {donor.medicalHistory.conditions.length > 0 ? (
                donor.medicalHistory.conditions.map((condition, index) => (
                  <div key={index} className="text-gray-700">• {condition}</div>
                ))
              ) : (
                <div className="text-gray-500 italic">No medical conditions reported</div>
              )}
            </div>
          )}
        </div>

        <div className="py-2">
          <SectionHeader title="Allergies" section="allergies" />
          {expandedSection === "allergies" && (
            <div className="pl-4 py-2 space-y-1 animate-fadeIn">
              {donor.medicalHistory.allergies.length > 0 ? (
                donor.medicalHistory.allergies.map((allergy, index) => (
                  <div key={index} className="text-gray-700">• {allergy}</div>
                ))
              ) : (
                <div className="text-gray-500 italic">No allergies reported</div>
              )}
            </div>
          )}
        </div>

        <div className="py-2">
          <SectionHeader title="Medications" section="medications" />
          {expandedSection === "medications" && (
            <div className="pl-4 py-2 space-y-1 animate-fadeIn">
              {donor.medicalHistory.recentMedications.length > 0 ? (
                donor.medicalHistory.recentMedications.map((medication, index) => (
                  <div key={index} className="text-gray-700">• {medication}</div>
                ))
              ) : (
                <div className="text-gray-500 italic">No medications reported</div>
              )}
            </div>
          )}
        </div>

        <div className="py-2">
          <SectionHeader title="Chronic Diseases" section="chronic" />
          {expandedSection === "chronic" && (
            <div className="pl-4 py-2 space-y-1 animate-fadeIn">
              {donor.medicalHistory.chronicDiseases.length > 0 ? (
                donor.medicalHistory.chronicDiseases.map((disease, index) => (
                  <div key={index} className="text-gray-700">• {disease}</div>
                ))
              ) : (
                <div className="text-gray-500 italic">No chronic diseases reported</div>
              )}
            </div>
          )}
        </div>

        <div className="py-2">
          <SectionHeader title="Lifestyle & Habits" section="lifestyle" />
          {expandedSection === "lifestyle" && (
            <div className="pl-4 py-2 grid grid-cols-2 gap-2 animate-fadeIn">
              <div className="text-gray-700">Smoking History:</div>
              <div className={donor.medicalHistory.smokingHistory ? "text-amber-600 font-medium" : "text-green-600 font-medium"}>
                {donor.medicalHistory.smokingHistory ? "Yes" : "No"}
              </div>
              
              <div className="text-gray-700">Alcohol Use:</div>
              <div className={donor.medicalHistory.alcoholUse ? "text-amber-600 font-medium" : "text-green-600 font-medium"}>
                {donor.medicalHistory.alcoholUse ? "Yes" : "No"}
              </div>
            </div>
          )}
        </div>

        <div className="py-2">
          <SectionHeader title="Infections" section="infections" />
          {expandedSection === "infections" && (
            <div className="pl-4 py-2 animate-fadeIn">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-700">HIV:</div>
                <div className={donor.medicalHistory.infections.hiv ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                  {donor.medicalHistory.infections.hiv ? "Positive" : "Negative"}
                </div>
                
                <div className="text-gray-700">Hepatitis:</div>
                <div className={donor.medicalHistory.infections.hepatitis ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                  {donor.medicalHistory.infections.hepatitis ? "Positive" : "Negative"}
                </div>
                
                <div className="text-gray-700">Tuberculosis:</div>
                <div className={donor.medicalHistory.infections.tuberculosis ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                  {donor.medicalHistory.infections.tuberculosis ? "Positive" : "Negative"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </InfoCard>
  );
};

export default MedicalHistory;