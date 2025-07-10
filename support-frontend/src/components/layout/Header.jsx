import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-white/95 to-pink-50/95 backdrop-blur-lg shadow-2xl border-b border-pink-200/30 sticky top-0 z-40 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 hover:shadow-red-500/40">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
                MyRights LK
              </h1>
              <p className="text-xs text-gray-500 font-medium">Your Rights. Our Mission.</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive('/') 
                  ? 'text-red-600 border-b-2 border-red-600 pb-1 shadow-lg' 
                  : 'text-gray-700 hover:text-red-600 hover:bg-red-50/50 px-3 py-2 rounded-lg'
              }`}
            >
              Home
            </Link>
            <Link
              to="/submit-complaint"
              className={`text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive('/submit-complaint') 
                  ? 'text-pink-600 border-b-2 border-pink-600 pb-1 shadow-lg' 
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/50 px-3 py-2 rounded-lg'
              }`}
            >
              Submit Complaint
            </Link>
            <Link
              to="/track-complaint"
              className={`text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive('/track-complaint') 
                  ? 'text-purple-600 border-b-2 border-purple-600 pb-1 shadow-lg' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50/50 px-3 py-2 rounded-lg'
              }`}
            >
              Track Complaint
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 p-2 rounded-lg hover:bg-red-50/50 transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;