import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-500 to-secondary-400 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&w=1800')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Connecting <span className="text-secondary-100">Lives</span>. 
                Sharing <span className="text-secondary-100">Hope</span>.
              </h1>
              <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-2xl">
                LifeLink bridges the gap between organ donors and recipients, providing a seamless platform to save lives through the gift of organ donation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#donors" 
                  className="bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-full font-medium flex items-center justify-center sm:justify-start transition-all"
                >
                  Become a Donor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a 
                  href="#recipients" 
                  className="bg-primary-800 text-white hover:bg-primary-700 px-6 py-3 rounded-full font-medium flex items-center justify-center sm:justify-start transition-all"
                >
                  Find a Donor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 animate-fade-in">
              <div className="animate-pulse-slow inline-block p-3 bg-primary-100 text-primary-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Impact</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-primary-600">5K+</p>
                  <p className="text-gray-600">Lives Saved</p>
                </div>
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-secondary-600">12K+</p>
                  <p className="text-gray-600">Registered Donors</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-primary-600">8K+</p>
                  <p className="text-gray-600">Successful Matches</p>
                </div>
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-secondary-600">95%</p>
                  <p className="text-gray-600">Satisfaction Rate</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">
                Join thousands who have already made a difference through the gift of organ donation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;