import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 text-white py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">MyRights LK</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              We help protect your intellectual property rights by providing a streamlined 
              complaint submission process for copyright infringement cases.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer hover:shadow-red-500/40">
                <span className="text-sm font-bold">FB</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer hover:shadow-pink-500/40">
                <span className="text-sm font-bold">TW</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-red-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer hover:shadow-purple-500/40">
                <span className="text-sm font-bold">IN</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-red-400 transition-all duration-300 transform hover:translate-x-2 hover:font-semibold inline-block">Home</a></li>
              <li><a href="/submit-complaint" className="hover:text-pink-400 transition-all duration-300 transform hover:translate-x-2 hover:font-semibold inline-block">Submit Complaint</a></li>
              <li><a href="/track-complaint" className="hover:text-purple-400 transition-all duration-300 transform hover:translate-x-2 hover:font-semibold inline-block">Track Complaint</a></li>
              <li><a href="/FAQ" className="hover:text-red-400 transition-all duration-300 transform hover:translate-x-2 hover:font-semibold inline-block">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-red-400 transition-colors duration-300">Email: rp.support@gmail.com</li>
              <li className="hover:text-pink-400 transition-colors duration-300">Phone: +94 71 685 3350</li>
              <li className="hover:text-purple-400 transition-colors duration-300">Address: Colombo, Sri Lanka</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gradient-to-r from-red-500/30 via-pink-500/30 to-purple-500/30 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-purple-500/20 mt-8 pt-8 text-center text-gray-300 rounded-t-lg backdrop-blur-sm">
          <p className="font-medium">
            &copy; 2025 MyRights LK. All rights reserved. Powered by{' '}
            <a
              href="https://ransarans-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:underline font-semibold"
            >
              sasinransara.io
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;