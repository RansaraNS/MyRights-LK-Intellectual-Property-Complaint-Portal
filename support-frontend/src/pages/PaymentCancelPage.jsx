import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  XCircle,
  Home,
  CreditCard,
  ArrowRight,
  Clock,
  FileText,
  Shield,
  Info,
  Sparkles,
  CheckCircle,
  Mail
} from 'lucide-react';

// UI Components with improved visibility
const Card = ({ children, className }) => (
  <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/60 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-red-500/50',
    secondary: 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 shadow-gray-500/30 border border-gray-400',
    warning: 'bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white shadow-amber-500/50'
  };
  
  return (
    <button
      className={`group relative px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
};

const PaymentCancelPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const complaintId = queryParams.get('complaintId');

  const handlePaymentRedirect = () => {
    navigate(`/payment?complaintId=${complaintId}`);
  };

  const handleHomeRedirect = () => {
    console.log('Redirecting to home page');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-amber-100 relative overflow-hidden font-inter">
      {/* Animated Background Elements - More visible */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-300/20 to-amber-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Elements - More visible */}
        <div className="absolute top-20 right-20 animate-float">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-70"></div>
        </div>
        <div className="absolute bottom-32 left-32 animate-float delay-1000">
          <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-red-500 rounded-full opacity-70"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-16 px-4">
        {/* Hero Section - Improved text visibility */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
            <XCircle className="w-14 h-14 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-700 via-rose-700 to-orange-700 py-2 px-3 bg-clip-text text-transparent mb-4 drop-shadow-lg leading-tight">
            Payment Cancelled
          </h1>
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto font-medium">
            Don't worry! Your complaint has been saved and you can complete the payment whenever you're ready.
          </p>
        </div>

        {/* Main Status Card */}
        <Card className="animate-slide-in-up mb-8">
          {/* Header Section with Better Contrast */}
          <div className="bg-gradient-to-r from-red-500 to-orange-600 -m-8 mb-8 px-8 py-8 rounded-t-2xl text-white">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">Payment Pending</h2>
                <p className="text-amber-100 font-medium">Your complaint is saved but payment is incomplete</p>
              </div>
            </div>
          </div>

          {/* Status Information - Enhanced visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-xl border border-amber-300 animate-fade-in-scale">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-amber-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">Complaint Status</h3>
                  <p className="text-sm text-gray-700 mb-3 font-medium">Your complaint has been created and saved in our system</p>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
                    <span className="text-amber-700 font-semibold">Awaiting Payment</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-xl border border-blue-300 animate-fade-in-scale delay-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">Secure & Safe</h3>
                  <p className="text-sm text-gray-700 mb-3 font-medium">Your information is securely stored and protected</p>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-green-700 font-semibold">Data Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice - Better text contrast */}
          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-300 rounded-xl p-6 mb-8 animate-fade-in-scale delay-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-yellow-700" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Important Information
                </h4>
                <div className="space-y-2 text-yellow-900">
                  <p className="flex items-start gap-2 font-medium">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-700 flex-shrink-0" />
                    <span>Your complaint has been created but, payment is incompleted</span>
                  </p>
                  <p className="flex items-start gap-2 font-medium">
                    <Clock className="w-4 h-4 mt-0.5 text-amber-700 flex-shrink-0" />
                    <span>Payment can be completed anytime using your complaint ID</span>
                  </p>
                  <p className="flex items-start gap-2 font-medium">
                    <Mail className="w-4 h-4 mt-0.5 text-blue-700 flex-shrink-0" />
                    <span>You'll receive a confirmation email once payment is completed</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Enhanced contrast */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handlePaymentRedirect} 
              className="flex-1 animate-fade-in-scale delay-300 bg-gradient-to-r from-red-500 to-orange-600"
              variant="warning"
            >
              <CreditCard className="w-5 h-5" />
              Complete Payment Now
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              onClick={handleHomeRedirect} 
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
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default PaymentCancelPage;