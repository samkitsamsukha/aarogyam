import React from 'react';
import { FileCheck, UserCheck, Search, HeartPulse } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Register',
      description: 'Create your profile as a donor or recipient with your medical information.',
      icon: <FileCheck className="h-10 w-10 text-primary-500" />,
      color: 'bg-primary-50'
    },
    {
      id: 2,
      title: 'Verification',
      description: 'Our medical team verifies your information and eligibility.',
      icon: <UserCheck className="h-10 w-10 text-secondary-500" />,
      color: 'bg-secondary-50'
    },
    {
      id: 3,
      title: 'Match',
      description: 'Our algorithm finds potential matches based on medical compatibility.',
      icon: <Search className="h-10 w-10 text-primary-500" />,
      color: 'bg-primary-50'
    },
    {
      id: 4,
      title: 'Connect',
      description: 'Connect with your match through our secure platform and proceed with the transplant process.',
      icon: <HeartPulse className="h-10 w-10 text-secondary-500" />,
      color: 'bg-secondary-50'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Aarogyam Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform simplifies the complex process of organ donation and transplantation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="flex flex-col items-center text-center bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8"
            >
              <div className={`${step.color} p-4 rounded-full mb-6`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {step.id}. {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Aarogyam ensures a safe, secure, and transparent process from registration to successful transplantation.
          </p>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium transition-colors">
            Learn More About Our Process
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;