import React from 'react';
import { HeartPulse } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/3852577/pexels-photo-3852577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center bg-white/20 p-3 rounded-full mb-6">
            <HeartPulse className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Join Us in Saving Lives Through Organ Donation
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Whether you're looking to become a donor or searching for a match, your journey starts here. Together, we can make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#donors" 
              className="bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-full font-medium transition-all"
            >
              Become a Donor
            </a>
            <a 
              href="#recipients" 
              className="bg-primary-800 text-white hover:bg-primary-700 px-6 py-3 rounded-full font-medium transition-all"
            >
              Register as a Recipient
            </a>
          </div>
          
          <p className="text-white/80 mt-8">
            Already registered? <a href="#" className="underline hover:text-white">Sign in to your account</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;