import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-primary-400 mr-2" />
              <span className="text-2xl font-bold">LifeLink</span>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting organ donors and recipients through our innovative platform, saving lives one match at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-primary-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#donors" className="text-gray-400 hover:text-primary-400 transition-colors">
                  For Donors
                </a>
              </li>
              <li>
                <a href="#recipients" className="text-gray-400 hover:text-primary-400 transition-colors">
                  For Recipients
                </a>
              </li>
              <li>
                <a href="#stories" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-primary-400 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Donation Process
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Medical Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Support Groups
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Partner Hospitals
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 mr-3 mt-0.5" />
                <span className="text-gray-400">
                  123 Medical Center Drive<br />
                  San Francisco, CA 94143
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-400 mr-3" />
                <a href="tel:+18005551234" className="text-gray-400 hover:text-primary-400 transition-colors">
                  (800) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-400 mr-3" />
                <a href="mailto:info@lifelink.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                  info@lifelink.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} LifeLink. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;