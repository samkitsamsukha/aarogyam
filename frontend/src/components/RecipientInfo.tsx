import React from "react";
import { Recipient } from "../types";
import InfoCard from "./InfoCard";
import StatusBadge from "./StatusBadge";

interface RecipientInfoProps {
  recipient: Recipient;
  status: "Matched" | "Transplanted";
}

const RecipientInfo: React.FC<RecipientInfoProps> = ({ recipient, status }) => {

  const InfoRow = ({ label, value, highlight = "" }) => (
    <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md hover:bg-gray-100 transition">
      <span className="text-gray-500">{label}:</span>
      <span className={`text-sm sm:text-base ${highlight}`}>{value}</span>
    </div>
  );


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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow label="Gender" value={recipient.gender} />
          <InfoRow label="Age" value={`${recipient.age} years`} />
          <InfoRow label="Blood Type" value={recipient.bloodType} highlight="text-red-600 font-bold" />
          <InfoRow label="Required Organ" value={recipient.requiredOrgan} />
          <InfoRow label="Waiting Since" value={recipient.waitingSince.toLocaleString()} />
          <InfoRow label="Diagnosis" value={recipient.medicalCondition.diagnosis} highlight="text-indigo-600 font-semibold" />
          <InfoRow
            label="Previous Transplants"
            value={recipient.medicalCondition.previousTransplants ? "Yes" : "No"}
            highlight={recipient.medicalCondition.previousTransplants ? "text-yellow-600 font-medium" : ""}
          />
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