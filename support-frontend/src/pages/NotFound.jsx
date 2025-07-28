import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  FileText,
  ArrowRight,
  Search,
  AlertCircle,
  HelpCircle,
  Mail,
  Phone,
  RefreshCw
} from 'lucide-react';

// UI Components with improved styling
const Button = ({ children, className, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-blue-500/40',
    outline: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 shadow-gray-500/30 border border-gray-400',
    secondary: 'bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-800 shadow-indigo-500/30 border border-indigo-300'
  };
  
  return (
    <button
      className={`group relative px-6 py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 w-full ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
};

const NotFound = () => {
  const navigate = useNavigate();
  
  const handleHomeClick = () => {
    navigate('/');
  };

  const handleComplaintClick = () => {
    navigate('/submit-complaint');
  };

  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-300/20 to-indigo-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 animate-float">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-70"></div>
        </div>
        <div className="absolute bottom-32 left-32 animate-float delay-1000">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full opacity-70"></div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 min-h-screen">
        <div className="max-w-lg w-full">
          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/60 animate-fade-in-up">
            {/* 404 Icon and Number */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center mx-auto shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <span className="text-4xl font-bold text-white">404</span>
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-4 leading-tight">
                Page Not Found
              </h1>
              
              <p className="text-lg text-gray-700 mb-2 font-medium">
                Oops! The page you're looking for doesn't exist.
              </p>
              <p className="text-base text-gray-600">
                It might have been moved, deleted, or you entered the wrong URL.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4 mb-8">
              <Button onClick={handleHomeClick} className="animate-fade-in-scale">
                <Home className="w-5 h-5" />
                Go to Home
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button onClick={handleComplaintClick} variant="outline" className="animate-fade-in-scale delay-100">
                <FileText className="w-5 h-5" />
                Submit a Complaint
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Help Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 animate-fade-in-scale delay-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Need Help?
                  </h3>
                  <p className="text-sm text-gray-700 mb-3 font-medium">
                    If you think this is an error or need assistance, contact our support team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 text-sm">
                    <div className="flex items-center gap-2 text-blue-700 font-medium">
                      <Mail className="w-4 h-4" />
                      <span>support@myrights.lk</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700 font-medium">
                      <Phone className="w-4 h-4" />
                      <span>+94 71 685 3350</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.6s ease-out forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default NotFound;