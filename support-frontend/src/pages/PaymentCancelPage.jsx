import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const PaymentCancelPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const complaintId = queryParams.get('complaintId');

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Payment Cancelled</h2>
        <p className="text-lg mb-6">You have cancelled the payment process.</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="mb-2">Your complaint has been created but payment is pending.</p>
          <p>You can complete the payment later using your complaint number.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(`/payment?complaintId=${complaintId}`)}
            className="px-6 py-2 bg-red-600 hover:bg-red-700"
          >
            Try Payment Again
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;