import React, { useState } from "react";
import { Donor, Recipient } from "../types";
import DonorInfo from "./DonorInfo";
import MedicalHistory from "./MedicalHistory";
import RecipientInfo from "./RecipientInfo";
import { Activity, UserRound, MapPin, FileText } from "lucide-react";
import Logout from "./Logout";

interface DonorDashboardProps {
  donor: Donor;
  recipient?: Recipient;
}

const DonorDashboard: React.FC<DonorDashboardProps> = ({ donor, recipient }) => {
  const [activeTab, setActiveTab] = useState<string>("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <UserRound size={20} /> },
    { id: "medical", label: "Medical History", icon: <Activity size={20} /> },
    { id: "documents", label: "Documents", icon: <FileText size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50">
      <header className="bg-gradient-to-r from-teal-600 to-cyan-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Donor Dashboard</h1>
            <div className="flex flex-row gap-6 items-center">
              <span className="text-teal-100">Welcome, {donor.name}</span>
              <Logout />
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={activeTab === tab.id ? "text-teal-500" : "text-gray-400"}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Donor Information */}
            {activeTab === "profile" && <DonorInfo donor={donor} />}
            
            {/* Medical History */}
            {activeTab === "medical" && <MedicalHistory donor={donor} />}
            
            {/* Documents Section */}
            {activeTab === "documents" && (
              <InfoCard title="Documents & Verification" className="h-full">
                <div className="p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Medical Certification</h4>
                      <p className="text-sm text-gray-500">Uploaded on {donor.createdAt?.toLocaleString()}</p>
                    </div>
                    <button className="text-teal-600 hover:text-teal-800 font-medium text-sm">
                      View
                    </button>
                  </div>
                </div>
              </InfoCard>
            )}
          </div>

          {/* Right column - Status and Recipient Information */}
          <div className="space-y-8">
            {/* Status summary card - always visible */}
            <InfoCard title="Donation Status" className="bg-gradient-to-b from-white to-teal-50">
              <div className="flex flex-col items-center py-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {donor.status === "Pending" && "P"}
                        {donor.status === "Matched" && "M"}
                        {donor.status === "Transplanted" && "T"}
                        {donor.status === "None" && "N"}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -right-1 top-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      donor.status === "Pending" ? "bg-amber-400" :
                      donor.status === "Matched" ? "bg-teal-400" :
                      donor.status === "Transplanted" ? "bg-emerald-500" : "bg-gray-400"
                    }`}>
                      <span className="text-white text-xs font-bold">
                        {donor.status === "Pending" ? "!" :
                         donor.status === "Matched" ? "✓" :
                         donor.status === "Transplanted" ? "✓✓" : "?"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <h3 className="mt-4 font-bold text-lg text-gray-800">{donor.status}</h3>
                
                <p className="text-center text-gray-600 mt-2">
                  {donor.status === "Pending" && "Your donation application is under review."}
                  {donor.status === "Matched" && "You have been matched with a recipient."}
                  {donor.status === "Transplanted" && "Donation process completed successfully."}
                  {donor.status === "None" && "No active donation process."}
                </p>
              </div>
            </InfoCard>

            {/* Show Recipient Info if status is Matched or Transplanted */}
            {recipient && (donor.status === "Matched" || donor.status === "Transplanted") && (
              <RecipientInfo 
                recipient={recipient} 
                status={donor.status as "Matched" | "Transplanted"} 
              />
            )}

            {/* Notification card */}
            {/* <InfoCard title="Notifications" className="bg-gradient-to-b from-white to-cyan-50">
              <div className="divide-y divide-gray-100">
                <div className="py-3">
                  <p className="text-sm font-medium text-gray-800">System Update</p>
                  <p className="text-xs text-gray-500">Your profile has been updated</p>
                </div>
                <div className="py-3">
                  <p className="text-sm font-medium text-gray-800">Status Change</p>
                  <p className="text-xs text-gray-500">Your donor status is now {donor.status}</p>
                </div>
              </div>
            </InfoCard> */}
          </div>
        </div>
      </main>

      {/* <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">Organ Donation Network</h3>
              <p className="text-sm">Connecting donors and recipients to save lives.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-teal-300 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-teal-300 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-teal-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-teal-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-300 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
            &copy; {new Date().getFullYear()} Organ Donation Network. All rights reserved.
          </div>
        </div>
      </footer> */}
    </div>
  );
};

// Component for the InfoCard to avoid circular dependencies
const InfoCard: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3">
        <h3 className="text-white font-medium text-lg">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default DonorDashboard;