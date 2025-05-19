import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import AuthLayout from '../components/layouts/AuthLayout';
import { HeartPulse } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary-500 to-secondary-400 p-3 rounded-full inline-flex"
            >
              <HeartPulse className="h-8 w-8 text-white" fill="white" />
            </motion.div>
          </div>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl font-display font-bold text-gray-800 mb-1"
          >
            Life<span className="text-primary-600">Link</span>
          </motion.h1>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600"
          >
            Connecting donors & recipients for a better future
          </motion.p>
        </div>
        
        {/* Auth Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-xl shadow-card p-6 md:p-8"
        >
          {/* Tab Navigation */}
          <div className="flex mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 pb-3 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'login'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 pb-3 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'register'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Register
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="min-h-[320px]">
            {activeTab === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <LoginForm onRegisterClick={() => setActiveTab('register')} />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RegisterForm onLoginClick={() => setActiveTab('login')} />
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          <div className="flex items-center justify-center text-xs mb-2">
            {/* <PulseIcon className="h-3 w-3 text-secondary-500 mr-1" /> */}
            <span>Serving lives since 2025</span>
          </div>
          <p>© 2025 Aarogyam. All rights reserved.</p>
        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;