import React from "react";
import { Recipient } from "../types";
import InfoCard from "./InfoCard";
import StatusBadge from "./StatusBadge";

interface RecipientInfoProps {
  recipient: Recipient;
  status: "Matched" | "Transplanted";
}

const RecipientInfo: React.FC<RecipientInfoProps> = ({ recipient, status }) => {
  return (
    <InfoCard 
      title={status === "Matched" ? "Matched Recipient (Awaiting Confirmation)" : "Transplant Recipient"} 
      className="h-fit border-l-4 border-teal-500"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{recipient.name}</h2>
          <StatusBadge status={recipient.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Gender:</span>
              <span className="font-medium">{recipient.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Age:</span>
              <span className="font-medium">{recipient.age} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Blood Type:</span>
              <span className="font-bold text-red-600">{recipient.bloodType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Required Organ:</span>
              <span className="font-medium">{recipient.requiredOrgan}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Waiting Since:</span>
              <span className="font-medium">
                {recipient.waitingSince.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Diagnosis:</span>
              <span className="font-medium">{recipient.medicalCondition.diagnosis}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Previous Transplants:</span>
              <span className="font-medium">
                {recipient.medicalCondition.previousTransplants ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        {status === "Matched" && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-800 text-sm">
              <span className="font-medium">Note:</span> This match is awaiting final confirmation 
              from the recipient. You will be notified once they confirm.
            </p>
          </div>
        )}

        {status === "Transplanted" && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">
              <span className="font-medium">Congratulations!</span> The transplant procedure has been 
              successfully completed. Thank you for your life-saving donation.
            </p>
          </div>
        )}
      </div>
    </InfoCard>
  );
};

export default RecipientInfo;