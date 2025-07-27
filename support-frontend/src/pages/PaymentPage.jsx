//new

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { complaintsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/ui/Button';

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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Pay Complaint Fee</h2>
        
        <div className="mb-6">
          <p className="text-lg mb-2">Complaint Number: <span className="font-semibold">{complaintNumber}</span></p>
          <p className="text-lg">Amount: <span className="font-semibold">LKR 2,500.00</span></p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You will be redirected to PayHere payment gateway to complete your payment securely.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleProceedToPayment}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-lg"
          disabled={!paymentData}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;