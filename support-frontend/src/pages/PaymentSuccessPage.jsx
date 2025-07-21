import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { complaintsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/ui/Button';

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
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6">
        <ErrorMessage message={error} />
        <Button 
          onClick={() => navigate('/')} 
          className="mt-4 w-full"
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-lg mb-6">Your complaint has been successfully submitted.</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="mb-2"><span className="font-semibold">Complaint Number:</span> {complaint.number}</p>
          <p className="mb-2"><span className="font-semibold">Amount Paid:</span> LKR {complaint.amount.toFixed(2)}</p>
          <p><span className="font-semibold">Date:</span> {new Date(complaint.date).toLocaleString()}</p>
        </div>

        <p className="mb-6">
          A confirmation email has been sent to your registered email address with all the details.
        </p>

        <Button
          onClick={() => navigate('/')}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;