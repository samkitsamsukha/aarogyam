import React from "react";
import { Donor } from "../types";
import InfoCard from "./InfoCard";
import StatusBadge from "./StatusBadge";
import { Mail, Phone, Droplet, User, CalendarDays, HeartPulse, ShieldCheck } from "lucide-react";

interface DonorInfoProps {
  donor: Donor;
}

const DonorInfo: React.FC<DonorInfoProps> = ({ donor }) => {
  return (
    <InfoCard title="Donor Information" className="h-full">
      <div className="flex flex-col gap-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-gray-800">{donor.name}</h2>
          <StatusBadge status={donor.status} />
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="space-y-4 p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2 text-gray-500">
                <User className="w-4 h-4" />
                Gender:
              </div>
              <span className="font-medium">{donor.gender}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2 text-gray-500">
                <CalendarDays className="w-4 h-4" />
                Age:
              </div>
              <span className="font-medium">{donor.age} years</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2 text-gray-500">
                <Mail className="w-4 h-4" />
                Email:
              </div>
              <span className="font-medium text-teal-600 underline">{donor.email}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2 text-gray-500">
                <Phone className="w-4 h-4" />
                Phone:
              </div>
              <span className="font-medium">{donor.phone}</span>
            </div>
          </div>

          {/* Medical Info */}
          <div className="space-y-4 p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2 text-gray-500">
                <Droplet className="w-4 h-4" />
                Blood Type:
              </div>
              <span className="font-bold text-red-600">{donor.bloodType}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2 text-gray-500">
                <HeartPulse className="w-4 h-4" />
                Organ Type:
              </div>
              <span className="font-medium">{donor.organType}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2 text-gray-500">
                <CalendarDays className="w-4 h-4" />
                Availability:
              </div>
              <span className="font-medium">
                {donor.organAvailabilityDate.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2 text-gray-500">
                <ShieldCheck className="w-4 h-4" />
                Living Donor:
              </div>
              <span className="font-medium">{donor.isLivingDonor ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-right">
          Registered: {donor.createdAt?.toLocaleString()} &nbsp;|&nbsp; 
          Last Updated: {donor.updatedAt?.toLocaleString()}
        </div>
      </div>
    </InfoCard>
  );
};

export default DonorInfo;
