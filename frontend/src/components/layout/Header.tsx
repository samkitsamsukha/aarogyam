import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, WalletCards } from 'lucide-react';
import { useWeb3 } from '../../context/Web3Context';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isConnected, account, connectWallet, disconnectWallet } = useWeb3();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Donor Registration', path: '/donor-registration' },
    { name: 'Recipient Registration', path: '/recipient-registration' },
    { name: 'View Queue', path: '/queue' },
    { name: 'Admin', path: '/admin' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Heart className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">Aarogyam</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${isActive(item.path) 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-3 border-l border-gray-300 pl-3">
              {isConnected ? (
                <div className="flex items-center">
                  <span className="text-xs text-gray-600 mr-2 truncate w-24">
                    {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
                  </span>
                  <button 
                    onClick={disconnectWallet}
                    className="text-sm bg-red-50 hover:bg-red-100 text-red-600 py-1 px-3 rounded-md transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button 
                  onClick={connectWallet}
                  className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md transition-colors"
                >
                  <WalletCards className="h-4 w-4 mr-1" /> Connect Wallet
                </button>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isConnected ? (
                <div className="flex items-center justify-between px-3">
                  <span className="text-sm text-gray-600 truncate max-w-[180px]">
                    {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
                  </span>
                  <button 
                    onClick={disconnectWallet}
                    className="text-sm bg-red-50 hover:bg-red-100 text-red-600 py-1 px-3 rounded-md"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button 
                  onClick={connectWallet}
                  className="w-full flex items-center justify-center text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md"
                >
                  <WalletCards className="h-4 w-4 mr-1" /> Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;