import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Users } from 'lucide-react';

interface RoleSelectorProps {
  value: string;
  onChange: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700 mb-2">I want to register as:</p>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange('donor')}
          className={`relative flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
            value === 'donor'
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          {value === 'donor' && (
            <motion.div
              layoutId="selectedRole"
              className="absolute -top-1 -right-1 bg-primary-500 rounded-full w-4 h-4 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <div className="bg-white rounded-full w-2 h-2" />
            </motion.div>
          )}
          
          <div className={`p-2 rounded-full mb-2 ${
            value === 'donor' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'
          }`}>
            <HeartPulse className="h-6 w-6" />
          </div>
          
          <span className={`text-sm font-medium ${
            value === 'donor' ? 'text-primary-700' : 'text-gray-700'
          }`}>
            Donor
          </span>
          
          <span className="text-xs text-gray-500 mt-1 text-center">
            I want to donate organs
          </span>
        </button>
        
        <button
          type="button"
          onClick={() => onChange('recipient')}
          className={`relative flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
            value === 'recipient'
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          {value === 'recipient' && (
            <motion.div
              layoutId="selectedRole"
              className="absolute -top-1 -right-1 bg-primary-500 rounded-full w-4 h-4 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <div className="bg-white rounded-full w-2 h-2" />
            </motion.div>
          )}
          
          <div className={`p-2 rounded-full mb-2 ${
            value === 'recipient' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'
          }`}>
            <Users className="h-6 w-6" />
          </div>
          
          <span className={`text-sm font-medium ${
            value === 'recipient' ? 'text-primary-700' : 'text-gray-700'
          }`}>
            Recipient
          </span>
          
          <span className="text-xs text-gray-500 mt-1 text-center">
            I need an organ transplant
          </span>
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;