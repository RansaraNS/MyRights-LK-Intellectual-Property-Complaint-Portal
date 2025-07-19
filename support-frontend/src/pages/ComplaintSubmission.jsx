import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  ArrowRight, 
  ShieldAlert, 
  Phone, 
  Mail, 
  FileText, 
  CreditCard,
  Send,
  ChevronRight,
  Loader2,
  X,
  AlertCircle,
  User // Added missing User icon import
} from 'lucide-react';
import ComplaintForm from '../components/forms/ComplaintForm';
import OTPVerification from '../components/forms/OTPVerification';
import { FormSteps } from '../components/forms/FormSteps';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import SuccessMessage from '../components/common/SuccessMessage';
import ErrorMessage from '../components/common/ErrorMessage';

const ComplaintSubmission = () => {
  const navigate = useNavigate();
  const {
    complaintData,
    setPhoneVerified,
    setPhoneNumber,
    setOtpVerified,
    resetComplaintData,
    error,
    success,
    clearMessages
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    resetComplaintData();
    clearMessages();
  }, [resetComplaintData, clearMessages]);

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Enter your details', icon: <User className="w-5 h-5" /> },
    { number: 2, title: 'Phone Verify', description: 'Verify your number', icon: <Phone className="w-5 h-5" /> },
    { number: 3, title: 'Complaint', description: 'Provide details', icon: <FileText className="w-5 h-5" /> },
    { number: 4, title: 'Payment', description: 'Make payment', icon: <CreditCard className="w-5 h-5" /> },
    { number: 5, title: 'Submit', description: 'Review & submit', icon: <Send className="w-5 h-5" /> }
  ];

  const handlePhoneVerificationRequest = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
    setShowOTPModal(true);
  };

  const handleOTPVerified = () => {
    setOtpVerified(true);
    setPhoneVerified(true);
    setShowOTPModal(false);
    setCurrentStep(3);
  };

  const handleComplaintSubmitted = (result) => {
    setSubmissionResult(result);
    setCurrentStep(5);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSubmitAnother = () => {
    resetComplaintData();
    setSubmissionResult(null);
    setCurrentStep(1);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
      case 2:
      case 3:
      case 4:
        return (
          <ComplaintForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onPhoneVerificationRequest={handlePhoneVerificationRequest}
            onSubmissionSuccess={handleComplaintSubmitted}
            phoneVerified={complaintData.phoneVerified}
          />
        );
      case 5:
        return (
          <Card className="p-8 max-w-3xl mx-auto text-center bg-gradient-to-br from-white/95 to-green-50/95 backdrop-blur-lg shadow-2xl border-0 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl"></div>
            <div className="relative">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 transition-all duration-300">
                  <Check className="w-12 h-12 text-white" strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-emerald-800 bg-clip-text text-transparent mb-3">
                  Complaint Submitted!
                </h2>
                <div className="flex items-center justify-center gap-2 text-emerald-600 mb-4">
                  <Mail className="w-5 h-5" />
                  <p className="text-gray-600 font-medium">Check your email for confirmation</p>
                </div>
                
                <div className="bg-gray-50/50 rounded-xl p-4 max-w-md mx-auto mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">Complaint ID:</span>
                    <span className="font-bold text-gray-900">{submissionResult?.complaintNumber || 'FB1000/240707'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold">
                      Submitted
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  onClick={handleBackToHome}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                >
                  Back to Home
                </Button>
                <Button
                  onClick={handleSubmitAnother}
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                >
                  Submit Another
                </Button>
                <Button
                  onClick={() => navigate('/track-complaint')}
                  variant="outline"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white px-6 py-3 rounded-xl font-medium shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                >
                  Track Complaint
                </Button>
              </div>
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-12 relative overflow-hidden font-inter">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-red-300/10 to-purple-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 animate-float">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-32 left-32 animate-float delay-1000">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl shadow-lg mb-6">
            <ShieldAlert className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 drop-shadow-lg leading-tight">
            Submit Your Complaint
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Follow the steps to submit your copyright infringement complaint
          </p>
        </div>

        {/* Progress Steps */}
        {currentStep < 5 && (
          <div className="mb-12">
            <FormSteps steps={steps} currentStep={currentStep} />
          </div>
        )}

        {/* Messages */}
        {error && (
          <div className="mb-8 max-w-3xl mx-auto">
            <ErrorMessage 
              message={error} 
              onClose={clearMessages}
              icon={<AlertCircle className="w-5 h-5" />}
            />
          </div>
        )}

        {success && (
          <div className="mb-8 max-w-3xl mx-auto">
            <SuccessMessage 
              message={success} 
              onClose={clearMessages}
              icon={<Check className="w-5 h-5" />}
            />
          </div>
        )}

        {/* Main Form */}
        <div className="max-w-3xl mx-auto">
          {renderCurrentStep()}
        </div>

        {/* OTP Modal */}
        {showOTPModal && (
          <OTPVerification
            phoneNumber={complaintData.phoneNumber}
            onVerified={handleOTPVerified}
            onClose={() => setShowOTPModal(false)}
          />
        )}
      </div>

      {/* Custom Styles for animations */}
      <style jsx="true">{` // Changed to jsx="true" to fix the warning
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default ComplaintSubmission;