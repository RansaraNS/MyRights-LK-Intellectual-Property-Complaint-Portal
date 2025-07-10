import React, { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

const TrackComplaint = () => {
  const [complaintNumber, setComplaintNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [complaintData, setComplaintData] = useState(null)

  const handleTrackComplaint = async (e) => {
    e.preventDefault()
    if (!complaintNumber.trim()) {
      setError('Please enter a complaint number')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // This would be implemented when you add the tracking backend
      // const response = await api.trackComplaint(complaintNumber)
      // setComplaintData(response.data)
      
      // For now, show a message that this feature is coming soon
      setTimeout(() => {
        setIsLoading(false)
        setError('Complaint tracking feature is coming soon. Please check back later.')
      }, 1000)
    } catch (err) {
      setIsLoading(false)
      setError('Failed to track complaint. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Complaint
          </h1>
          <p className="text-lg text-gray-600">
            Enter your complaint number to check the status of your submission
          </p>
        </div>

        <Card className="animate-slide-in">
          <form onSubmit={handleTrackComplaint} className="space-y-6">
            <div>
              <label htmlFor="complaintNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Complaint Number
              </label>
              <Input
                id="complaintNumber"
                type="text"
                placeholder="Enter your complaint number (e.g., FB1000/240707)"
                value={complaintNumber}
                onChange={(e) => setComplaintNumber(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
              <p className="mt-1 text-sm text-gray-500">
                You can find your complaint number in the confirmation email we sent you
              </p>
            </div>

            {error && <ErrorMessage message={error} />}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Tracking...</span>
                </div>
              ) : (
                'Track Complaint'
              )}
            </Button>
          </form>
        </Card>

        {/* Coming Soon Section */}
        <Card className="mt-8 text-center animate-fade-in">
          <div className="py-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Real-time Tracking Coming Soon
            </h3>
            <p className="text-gray-600 mb-4">
              We're working on implementing real-time complaint tracking with detailed status updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Email notifications
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Status updates
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Progress timeline
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default TrackComplaint