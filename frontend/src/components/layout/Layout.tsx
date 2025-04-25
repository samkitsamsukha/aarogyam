import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useWeb3 } from '../../context/Web3Context';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoading } = useWeb3();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-700">Processing blockchain transaction...</p>
              <p className="mt-2 text-sm text-gray-500">Please do not close this window</p>
            </div>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;