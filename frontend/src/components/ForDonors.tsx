import React from 'react';
import { Gift, Shield, Clock, Award } from 'lucide-react';

const ForDonors: React.FC = () => {
  return (
    <section id="donors" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Become a <span className="text-primary-500">Donor</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              By registering as an organ donor, you can save up to 8 lives and enhance many more. Your generosity creates a lasting legacy.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Gift className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Give the Gift of Life</h3>
                  <p className="text-gray-600">
                    Your decision to donate can save multiple lives and provide hope to those waiting for transplants.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Safe and Secure Process</h3>
                  <p className="text-gray-600">
                    Our platform ensures your information is protected and the donation process follows strict medical protocols.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Easy Registration</h3>
                  <p className="text-gray-600">
                    Complete your donor profile in minutes and be part of our lifesaving network.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Ongoing Support</h3>
                  <p className="text-gray-600">
                    Our team provides guidance and support throughout the entire donation journey.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <button
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
              onClick={() => window.location.href = '/auth'}
              >
              Register as a Donor
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-primary-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary-100 rounded-full opacity-50"></div>
              
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/6823517/pexels-photo-6823517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Medical professional with patient" 
                  className="w-full h-auto"
                />
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    "I donated a kidney to a stranger. It was the most meaningful decision of my life."
                  </h3>
                  <p className="text-gray-600 mb-4">
                    After learning about the desperate need for kidney donors, I decided to become an altruistic donor. The team at Aarogyam made the process smooth and rewarding.
                  </p>
                  <div className="flex items-center">
                    <img 
                      src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Donor" 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">Michael Roberts</p>
                      <p className="text-gray-500 text-sm">Kidney Donor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForDonors;