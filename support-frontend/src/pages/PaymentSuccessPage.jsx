import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Home,
  Calendar,
  CreditCard,
  FileText,
  Mail,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  User,
  Phone,
  BadgeCheck,
  Download,
  Eye
} from 'lucide-react';
import { complaintsAPI } from '../services/api';

// UI Components matching your style
const Card = ({ children, className }) => (
  <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-green-500/40',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 shadow-gray-500/20 border border-gray-300'
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

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };
  
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-green-200 border-t-green-600 rounded-full animate-spin`}></div>
        <div className="absolute inset-0 border-4 border-transparent border-r-green-400 rounded-full animate-ping"></div>
      </div>
      <p className="text-gray-600 font-medium">Verifying payment status...</p>
    </div>
  );
};

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100/80 backdrop-blur-sm border border-red-400/50 text-red-700 px-6 py-4 rounded-xl relative flex items-center gap-3 animate-fade-in shadow-lg">
    <div className="flex-shrink-0 w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
      <ArrowLeft className="w-5 h-5 text-red-600" />
    </div>
    <span className="block font-medium">{message}</span>
  </div>
);

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const complaintId = queryParams.get('complaintId');

    if (!complaintId) {
      setError('No complaint ID provided');
      setLoading(false);
      return;
    }

    checkPaymentStatus(complaintId);
  }, [location]);

  const checkPaymentStatus = async (complaintId) => {
    try {
      setLoading(true);
      const response = await complaintsAPI.getPaymentStatus(complaintId);

      if (response.success) {
        if (response.paymentStatus === 'PAID') {
          setComplaint({
            number: response.complaintNumber,
            amount: response.paymentAmount,
            date: response.paymentDate
          });
        } else {
          setError('Payment not completed. Please try again.');
        }
      } else {
        setError(response.message || 'Failed to verify payment status');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden font-inter">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-300/10 to-teal-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 flex justify-center items-center min-h-screen">
          <Card className="animate-fade-in-scale">
            <LoadingSpinner size="lg" />
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 relative overflow-hidden font-inter">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-rose-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
          <div className="max-w-md w-full">
            <Card className="animate-fade-in-scale text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <ArrowLeft className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-4">
                Payment Verification Failed
              </h2>
              <ErrorMessage message={error} />
              <Button 
                onClick={() => navigate('/')} 
                className="mt-8 w-full"
                variant="secondary"
              >
                <Home className="w-5 h-5" />
                Back to Home
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden font-inter">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-300/10 to-teal-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 animate-float">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-32 left-32 animate-float delay-1000">
          <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-green-400 rounded-full opacity-60"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-16 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
            <CheckCircle className="w-14 h-14 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 py-2 px-3 bg-clip-text text-transparent mb-4 drop-shadow-lg leading-tight">
            Payment Successful!
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Your complaint has been successfully submitted and payment processed. Thank you for using our service.
          </p>
        </div>

        {/* Success Card */}
        <Card className="animate-slide-in-up mb-8">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 -m-8 mb-8 px-8 py-8 rounded-t-2xl text-white">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <BadgeCheck className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">Transaction Confirmed</h2>
                <p className="text-green-100">Your payment has been processed successfully</p>
              </div>
            </div>
          </div>

          {/* Payment Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 animate-fade-in-scale">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Complaint Number</p>
                  <p className="text-lg font-bold text-gray-900 font-mono">{complaint.number}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200 animate-fade-in-scale delay-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Amount Paid</p>
                  <p className="text-lg font-bold text-gray-900">LKR {complaint.amount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-green-50 p-6 rounded-xl border border-teal-200 animate-fade-in-scale delay-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Date & Time</p>
                  <p className="text-sm font-bold text-gray-900">{new Date(complaint.date).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8 animate-fade-in-scale delay-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Confirmation Email Sent
                </h4>
                <p className="text-blue-800 mb-3">
                  A detailed confirmation email has been sent to your registered email address with all transaction details, complaint information, and tracking instructions.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Shield className="w-4 h-4" />
                  <span>Secure transaction completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => navigate('/')} 
              className="flex-1 animate-fade-in-scale delay-400"
            >
              <Home className="w-5 h-5" />
              Back to Home
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              onClick={() => navigate('/track-complaint')} 
              className="flex-1 animate-fade-in-scale delay-500"
              variant="secondary"
            >
              <Eye className="w-5 h-5" />
              Track Complaint
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </Card>

        {/* What's Next Section */}
        <Card className="animate-fade-in-scale delay-600">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
              What Happens Next?
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Your complaint is now in our system and our team will begin processing it according to our standard procedures.
            </p>
          </div>

          

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Use your complaint number <span className="font-mono font-bold text-gray-700">{complaint.number}</span> for all future references
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Shield className="w-4 h-4" />
              <span>Your information is secure and confidential</span>
            </div>
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

export default PaymentSuccessPage;