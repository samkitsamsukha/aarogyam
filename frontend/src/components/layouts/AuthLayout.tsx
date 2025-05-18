import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-20"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute top-1/4 -left-24 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-20"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20"
        />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-4 py-12">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;