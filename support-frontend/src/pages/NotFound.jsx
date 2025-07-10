import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center animate-fade-in">
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl font-bold text-white">404</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/home">
            <Button className="w-full">
              Go to Home
            </Button>
          </Link>
          <Link to="/submit-complaint">
            <Button variant="outline" className="w-full">
              Submit a Complaint
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Contact our support team</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound