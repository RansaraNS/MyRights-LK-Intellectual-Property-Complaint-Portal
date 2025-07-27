import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

const PaymentAlreadyDone = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const complaintId = new URLSearchParams(location.search).get('complaintId');

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="mb-6">
          <svg 
            className="w-16 h-16 mx-auto text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Payment Already Completed</h2>
        <p className="text-lg mb-6">
          Your payment for this complaint has already been processed successfully.
        </p>
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={() => navigate(`/track-complaint`)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-lg"
          >
            View Complaint Status
          </Button>
          <Button 
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-lg"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentAlreadyDone;