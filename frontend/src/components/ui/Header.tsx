import React from 'react';
import { Recipient } from '../../types';
import { Heart } from 'lucide-react';
import Logout from '../Logout';

interface HeaderProps {
  recipient: Recipient;
}

const Header: React.FC<HeaderProps> = ({ recipient }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-teal-500 p-2 rounded-md mr-3">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-cyan-900">Organ Transplant Dashboard</h1>
              <p className="text-sm text-cyan-600">Patient ID: {recipient._id?.substring(0, 8)}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6">
            <div className="flex items-center">
              <span className="text-sm font-medium text-teal-800 mr-2">
                {recipient.name}
              </span>
              <div className="h-6 w-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-medium">
                {recipient.name.charAt(0)}
              </div>
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </header>

  );
};

export default Header;