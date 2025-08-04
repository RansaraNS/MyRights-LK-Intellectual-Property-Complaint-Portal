import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Home,
  ArrowRight,
  Shield,
  AlertTriangle,
  FileText,
  DollarSign,
  Lock,
  CheckCircle,
  Info,
  Clock,
  Sparkles,
  Eye,
  RefreshCw
} from 'lucide-react';
import { complaintsAPI } from '../services/api';

// UI Components matching your style
const Card = ({ children, className }) => (
  <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className, variant = 'primary', disabled, ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-green-500/40',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 shadow-gray-500/20 border border-gray-300',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-amber-500/40'
  };
  
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100 hover:-translate-y-0' : '';
  
  return (
    <button
      className={`group relative px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 ${variants[variant]} ${disabledClass} ${className}`}
      disabled={disabled}
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
        <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
        <div className="absolute inset-0 border-4 border-transparent border-r-blue-400 rounded-full animate-ping"></div>
      </div>
      <p className="text-gray-600 font-medium">Preparing payment gateway...</p>
    </div>
  );
};

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100/80 backdrop-blur-sm border border-red-400/50 text-red-700 px-6 py-4 rounded-xl relative flex items-center gap-3 animate-fade-in shadow-lg">
    <div className="flex-shrink-0 w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
      <AlertTriangle className="w-5 h-5 text-red-600" />
    </div>
    <span className="block font-medium">{message}</span>
  </div>
);

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [complaintId, setComplaintId] = useState(null);
  const [complaintNumber, setComplaintNumber] = useState(null);

  useEffect(() => {
    // Load PayHere script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const complaintId = queryParams.get('complaintId') || location.state?.complaintId;
    
    if (!complaintId) {
      setError('No complaint ID provided');
      setLoading(false);
      return;
    }

    setComplaintId(complaintId);
    checkPaymentStatus(complaintId);
  }, [location]);

  const checkPaymentStatus = async (id) => {
    try {
      setLoading(true);
      const statusResponse = await complaintsAPI.getPaymentStatus(id);
      
      if (statusResponse.success) {
        if (statusResponse.paymentStatus === 'PAID') {
          // Redirect to already paid page if payment is completed
          navigate(`/payment/already-paid?complaintId=${id}`);
          return;
        }
        
        // Only prepare payment if status is not PAID
        await preparePayment(id);
      } else {
        setError(statusResponse.message || 'Failed to check payment status');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const preparePayment = async (id) => {
    try {
      setLoading(true);
      
      const baseUrl = window.location.origin;
      const notifyUrl = `${baseUrl}/api/payment/notify`;
      const returnUrl = `${baseUrl}/payment/success?complaintId=${id}`;
      const cancelUrl = `${baseUrl}/payment/cancel?complaintId=${id}`;

      const response = await complaintsAPI.preparePayment(id, notifyUrl, returnUrl, cancelUrl);
      
      if (response.success) {
        setPaymentData(response.paymentData);
        setComplaintNumber(response.paymentData.order_id);
      } else {
        setError(response.message || 'Failed to prepare payment');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (status, paymentId, amount) => {
    try {
      await complaintsAPI.updatePaymentStatus({
        complaintNumber,
        paymentStatus: status,
        paymentId,
        amount
      });
    } catch (err) {
      console.error("Failed to update payment status:", err);
      // Even if this fails, we'll still redirect but log the error
    }
  };

  const handleProceedToPayment = () => {
    if (!paymentData || !window.payhere) {
      setError('Payment initialization failed. Please try again.');
      return;
    }

    // Configure PayHere callbacks
    window.payhere.onCompleted = async function(orderId, paymentId) {
      console.log("Payment completed. OrderID:" + orderId);
      
      // Update payment status via our new API
      await updatePaymentStatus("PAID", paymentId, "2500.00");
      
      navigate(`/payment/success?complaintId=${complaintId}`);
    };

    window.payhere.onDismissed = function() {
      console.log("Payment dismissed");
      navigate(`/payment/cancel?complaintId=${complaintId}`);
    };

    window.payhere.onError = function(error) {
      console.log("Error:" + error);
      setError('Payment error: ' + error);
    };

    // Start payment
    window.payhere.startPayment(paymentData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden font-inter">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-4">
                Payment Error
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden font-inter">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-300/10 to-purple-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 animate-float">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-32 left-32 animate-float delay-1000">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-60"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-16 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
            <CreditCard className="w-14 h-14 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-2 px-3 bg-clip-text text-transparent mb-4 drop-shadow-lg leading-tight">
            Complete Your Payment
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Secure payment processing for your complaint submission fee
          </p>
        </div>

        {/* Payment Details Card */}
        <Card className="animate-slide-in-up mb-8">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 -m-8 mb-8 px-8 py-8 rounded-t-2xl text-white">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">Payment Details</h2>
                <p className="text-blue-100">Review your complaint fee information</p>
              </div>
            </div>
          </div>

          {/* Payment Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 animate-fade-in-scale">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Complaint Number</p>
                  <p className="text-lg font-bold text-gray-900 font-mono">{complaintNumber}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 animate-fade-in-scale delay-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Amount Due</p>
                  <p className="text-lg font-bold text-gray-900">LKR 2,500.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8 animate-fade-in-scale delay-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Secure Payment Gateway
                </h4>
                <div className="space-y-2 text-amber-800">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>You will be redirected to PayHere payment gateway</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Shield className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>All transactions are secured with 256-bit SSL encryption</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Lock className="w-4 h-4 mt-0.5 text-purple-600 flex-shrink-0" />
                    <span>Your payment information is never stored on our servers</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handleProceedToPayment}
            className="w-full animate-fade-in-scale delay-300"
            disabled={!paymentData}
          >
            <CreditCard className="w-5 h-5" />
            {!paymentData ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Preparing Payment...
              </>
            ) : (
              <>
                Proceed to Payment Gateway
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </Button>
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
        `}
      </style>
    </div>
  );
};

export default PaymentPage;