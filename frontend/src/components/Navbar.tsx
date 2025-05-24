import React, { useState, useEffect } from 'react';
import { Menu, X, HeartPulse } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <HeartPulse className="h-8 w-8 text-primary-500 mr-2" />
            <span className="text-xl font-bold text-primary-800">Aarogyam</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-primary-600 transition-colors">
              How It Works
            </a>
            <a href="#donors" className="text-gray-700 hover:text-primary-600 transition-colors">
              For Donors
            </a>
            <a href="#recipients" className="text-gray-700 hover:text-primary-600 transition-colors">
              For Recipients
            </a>
            <a href="#stories" className="text-gray-700 hover:text-primary-600 transition-colors">
              Success Stories
            </a>
            <a href="#faq" className="text-gray-700 hover:text-primary-600 transition-colors">
              FAQs
            </a>
            <button
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-full transition-colors"
              onClick={() => window.location.href = '/auth'}
            >
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white mt-2 py-4 px-2 rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a 
                href="#how-it-works" 
                onClick={() => setIsOpen(false)} 
                className="text-gray-700 hover:text-primary-600 transition-colors px-4 py-2"
              >
                How It Works
              </a>
              <a 
                href="#donors" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition-colors px-4 py-2"
              >
                For Donors
              </a>
              <a 
                href="#recipients" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition-colors px-4 py-2"
              >
                For Recipients
              </a>
              <a 
                href="#stories" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition-colors px-4 py-2"
              >
                Success Stories
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition-colors px-4 py-2"
              >
                FAQs
              </a>
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-full transition-colors ml-4">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;