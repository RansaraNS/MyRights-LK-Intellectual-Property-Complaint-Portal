import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    // Reset complaint data when component mounts
    resetComplaintData();
    clearMessages();
  }, [resetComplaintData, clearMessages]); // Added dependencies to useEffect

  const steps = [
    { number: 1, title: 'Personal Information', description: 'Enter your basic details' },
    { number: 2, title: 'Phone Verification', description: 'Verify your phone number' },
    { number: 3, title: 'Complaint Details', description: 'Provide complaint information' },
    { number: 4, title: 'Payment', description: 'Make the payment' },
    { number: 5, title: 'Submit', description: 'Review and submit complaint' }
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

  // --- FIX ---
  // This function should set the current step to 5 to show the success screen.
  const handleComplaintSubmitted = (result) => {
    setSubmissionResult(result);
    setCurrentStep(5); // Changed from 4 to 5
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
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-emerald-800 bg-clip-text text-transparent mb-2">Complaint Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6 font-medium">Please check your email for confirmation.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
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
                  Submit Another Complaint
                </Button>
                <Button
                  onClick={() => navigate('/track-complaint')}
                  variant="outline"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-red px-6 py-3 rounded-xl font-medium shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                >
                  Track This Complaint
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-red-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-br from-pink-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Submit Your Complaint
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Follow the steps below to submit your copyright complaint
          </p>
        </div>

        {/* Progress Steps */}
        {/* --- FIX --- */}
        {/* Changed condition to show steps until the final success screen */}
        {currentStep < 5 && (
          <div className="mb-8">
            <FormSteps steps={steps} currentStep={currentStep} />
          </div>
        )}

        {/* Messages */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onClose={clearMessages} />
          </div>
        )}

        {success && (
          <div className="mb-6">
            <SuccessMessage message={success} onClose={clearMessages} />
          </div>
        )}

        {/* Main Form */}
        <div className="max-w-4xl mx-auto">
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
    </div>
  );
};

export default ComplaintSubmission;