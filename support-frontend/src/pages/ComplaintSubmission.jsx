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
  }, []);

  const steps = [
    { number: 1, title: 'Personal Information', description: 'Enter your basic details' },
    { number: 2, title: 'Phone Verification', description: 'Verify your phone number' },
    { number: 3, title: 'Complaint Details', description: 'Provide complaint information' },
    { number: 4, title: 'Submit', description: 'Review and submit complaint' }
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
    setCurrentStep(4);
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
        return (
          <ComplaintForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onPhoneVerificationRequest={handlePhoneVerificationRequest}
            onComplaintSubmitted={handleComplaintSubmitted}
            phoneVerified={complaintData.phoneVerified}
          />
        );
      case 4:
        return (
          <Card className="p-8 max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Complaint Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">Your complaint has been received and will be processed shortly.</p>
            </div>

            {submissionResult && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Complaint Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Complaint Number:</span> {submissionResult.complaintNumber}</p>
                  <p><span className="font-medium">Complaint ID:</span> {submissionResult.complaintId}</p>
                  <p><span className="font-medium">Submission Date:</span> {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Please save your complaint number: <span className="font-bold text-blue-600">{submissionResult?.complaintNumber}</span>
              </p>
              <p className="text-sm text-gray-600">
                You can use this number to track your complaint status.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                onClick={handleBackToHome}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Back to Home
              </Button>
              <Button
                onClick={handleSubmitAnother}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium"
              >
                Submit Another Complaint
              </Button>
              <Button
                onClick={() => navigate('/track')}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium"
              >
                Track This Complaint
              </Button>
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Submit Your Complaint
          </h1>
          <p className="text-xl text-gray-600">
            Follow the steps below to submit your copyright complaint
          </p>
        </div>

        {/* Progress Steps */}
        {currentStep < 4 && (
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