import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle,
  Home,
  Eye,
  ArrowRight,
  Shield,
  BadgeCheck,
  Clock,
  FileText,
  Mail,
  Sparkles,
  Info,
  Calendar,
  CreditCard,
  RefreshCw
} from 'lucide-react';

// UI Components matching your style
const Card = ({ children, className }) => (
  <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-blue-500/40',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 shadow-gray-500/20 border border-gray-300',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-green-500/40'
  };
  
  return (
    <button
      className={`group relative px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
};

const PaymentAlreadyDone = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const complaintId = new URLSearchParams(location.search).get('complaintId');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 relative overflow-hidden font-inter">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-300/10 to-indigo-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 animate-float">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-32 left-32 animate-float delay-1000">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-green-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-40 left-20 animate-float delay-500">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-40"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-16 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-blue-500 to-emerald-600 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
            <BadgeCheck className="w-14 h-14 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600 py-2 px-3 bg-clip-text text-transparent mb-4 drop-shadow-lg leading-tight">
            Payment Already Completed
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Great news! Your payment has already been processed successfully. Your complaint is in our system.
          </p>
        </div>

        {/* Main Status Card */}
        <Card className="animate-slide-in-up mb-8">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-blue-500 to-emerald-600 -m-8 mb-8 px-8 py-8 rounded-t-2xl text-white">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">Payment Verified</h2>
                <p className="text-green-100">Your transaction has been completed successfully</p>
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 animate-fade-in-scale">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">Payment Status</h3>
                  <p className="text-sm text-gray-600 mb-3">Your payment has been successfully processed and confirmed</p>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Completed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 animate-fade-in-scale delay-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">Complaint Status</h3>
                  <p className="text-sm text-gray-600 mb-3">Your complaint is active and being processed by our team</p>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-600 font-medium">In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8 animate-fade-in-scale delay-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Payment Already Processed
                </h4>
                <div className="space-y-2 text-blue-800">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Your payment was successfully completed earlier</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Mail className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>Confirmation email was sent to your registered address</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <RefreshCw className="w-4 h-4 mt-0.5 text-indigo-600 flex-shrink-0" />
                    <span>You can track your complaint progress anytime</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => navigate('/track-complaint')}
              className="flex-1 animate-fade-in-scale delay-300"
              variant="primary"
            >
              <Eye className="w-5 h-5" />
              View Complaint Status
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              onClick={() => navigate('/')} 
              className="flex-1 animate-fade-in-scale delay-400"
              variant="secondary"
            >
              <Home className="w-5 h-5" />
              Back to Home
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Custom Styles for animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in-up {
            animation: slideInUp 0.8s ease-out forwards;
            animation-delay: 0.2s;
            opacity: 0;
          }

          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-scale {
            animation: fadeInScale 0.8s ease-out forwards;
            opacity: 0;
          }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.5s; }
          .delay-600 { animation-delay: 0.6s; }
          .delay-700 { animation-delay: 0.7s; }
        `}
      </style>
    </div>
  );
};

export default PaymentAlreadyDone;