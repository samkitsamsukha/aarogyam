import React from 'react';
import { Heart, Github, Twitter, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">OrganChain</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              A blockchain-based organ transplant system ensuring transparency, 
              security and fairness in organ donation and recipient selection.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donor-registration" className="text-gray-400 hover:text-white transition-colors">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/recipient-registration" className="text-gray-400 hover:text-white transition-colors">
                  Register as Recipient
                </Link>
              </li>
              <li>
                <Link to="/queue" className="text-gray-400 hover:text-white transition-colors">
                  View Queue
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FileText className="h-4 w-4 mr-2" /> Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Shield className="h-4 w-4 mr-2" /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FileText className="h-4 w-4 mr-2" /> Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FileText className="h-4 w-4 mr-2" /> FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">Join our newsletter</p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-sm bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} OrganChain. All rights reserved.</p>
          <p className="mt-2">Built on Ethereum blockchain technology.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;