import React from 'react';
import { HeartPulse, Search, Calendar, MessageSquare } from 'lucide-react';

const ForRecipients: React.FC = () => {
  return (
    <section id="recipients" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Find Your <span className="text-secondary-500">Donor</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Aarogyam helps connect you with compatible donors, providing hope and a second chance at life through our advanced matching system.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-secondary-100 p-3 rounded-full mr-4">
                  <HeartPulse className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Personalized Matching</h3>
                  <p className="text-gray-600">
                    Our advanced algorithm finds potential donors based on medical compatibility, increasing your chances for a successful transplant.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary-100 p-3 rounded-full mr-4">
                  <Search className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Broader Donor Network</h3>
                  <p className="text-gray-600">
                    Access to thousands of registered donors across the country, expanding your options beyond traditional waiting lists.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary-100 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Reduced Waiting Time</h3>
                  <p className="text-gray-600">
                    Our efficient matching process can significantly reduce the time spent waiting for a compatible donor.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary-100 p-3 rounded-full mr-4">
                  <MessageSquare className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Comprehensive Support</h3>
                  <p className="text-gray-600">
                    Medical guidance, emotional support, and assistance throughout your transplant journey.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-full font-medium transition-colors">
                Register as a Recipient
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-secondary-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-primary-100 rounded-full opacity-50"></div>
              
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Patient recovering after transplant" 
                  className="w-full h-auto"
                />
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    "I received a heart transplant through Aarogyam. Now I'm living life to the fullest."
                  </h3>
                  <p className="text-gray-600 mb-4">
                    After years on a traditional waiting list, Aarogyam connected me with a compatible donor in just three months. The transplant was successful, and I'm eternally grateful.
                  </p>
                  <div className="flex items-center">
                    <img 
                      src="https://images.pexels.com/photos/7990658/pexels-photo-7990658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Recipient" 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">Sarah Johnson</p>
                      <p className="text-gray-500 text-sm">Heart Recipient</p>
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

export default ForRecipients;