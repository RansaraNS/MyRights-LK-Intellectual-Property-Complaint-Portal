import React, { useState } from 'react';
import {
  Search,
  Loader2,
  User,
  Mail,
  Phone,
  Clipboard,
  CheckCircle,
  XCircle,
  Info,
  FileText,
  BadgeCheck,
  ArrowRight,
  Sparkles,
  Clock,
  RefreshCw,
  ShieldAlert,
  CircleDashed,
  Calendar
} from 'lucide-react';
import { complaintsAPI } from '../services/api';

// UI Components (updated to match your style)
const Card = ({ children, className }) => (
  <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className, ...props }) => (
  <button
    className={`group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-red-500/40 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 ${className}`}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative flex items-center justify-center gap-2">
      {children}
    </div>
  </button>
);

const Input = ({ className, ...props }) => (
  <input
    className={`w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-400 ${className}`}
    {...props}
  />
);

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };
  return <Loader2 className={`${sizeClasses[size]} animate-spin text-white`} />;
};

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center gap-2 animate-fade-in">
    <XCircle className="w-5 h-5" />
    <span className="block sm:inline">{message}</span>
  </div>
);

const TrackComplaint = () => {
  const [complaintNumber, setComplaintNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [complaintData, setComplaintData] = useState(null);

  const handleTrackComplaint = async (e) => {
    e.preventDefault();
    if (!complaintNumber.trim()) {
      setError('Please enter a complaint number');
      return;
    }

    setIsLoading(true);
    setError('');
    setComplaintData(null);

    try {
      const response = await complaintsAPI.trackComplaint(complaintNumber);
      if (response.success) {
        setComplaintData(response.data);
      } else {
        setError('Complaint not found.');
      }
    } catch (err) {
      setError(err.message || 'Failed to track complaint. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Status configuration
  const statusConfig = {
    'Pending': { color: 'bg-amber-500', icon: <Clock className="w-4 h-4" /> },
    'In Progress': { color: 'bg-blue-500', icon: <RefreshCw className="w-4 h-4" /> },
    'Resolved': { color: 'bg-emerald-500', icon: <CheckCircle className="w-4 h-4" /> },
    'Rejected': { color: 'bg-rose-500', icon: <ShieldAlert className="w-4 h-4" /> }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 relative overflow-hidden font-inter">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-red-300/10 to-purple-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 animate-float">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-32 left-32 animate-float delay-1000">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto py-16 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl shadow-lg mb-6">
            <Search className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 py-2 px-3 bg-clip-text text-transparent mb-4 drop-shadow-lg leading-tight">
            Track Your Complaint
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Enter your unique complaint number to check the current status and updates
          </p>
        </div>

        {/* Search Card */}
        <Card className="animate-slide-in-up">
          <form onSubmit={handleTrackComplaint} className="space-y-7">
            <div className="space-y-3">
              <label htmlFor="complaintNumber" className="block text-base font-semibold text-gray-700 mb-2 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-red-600" />
                Complaint Number
              </label>
              <div className="relative">
                <Input
                  id="complaintNumber"
                  type="text"
                  placeholder="e.g. FB1000/240707"
                  value={complaintNumber}
                  onChange={(e) => setComplaintNumber(e.target.value)}
                  className="pl-12 pr-4 py-3"
                  disabled={isLoading}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <p className="mt-2 text-sm text-gray-500 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                Check your confirmation email for the complaint number
              </p>
            </div>

            {error && <ErrorMessage message={error} />}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Tracking...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Track Complaint
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Complaint Details */}
        {complaintData && (
          <Card className="mt-12 animate-fade-in-scale">
            <div className="p-6">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <FileText className="w-7 h-7 text-red-600" />
                    Complaint Details
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    Last updated: {complaintData.lastUpdate}
                  </p>
                </div>
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white shadow-md ${statusConfig[complaintData.status]?.color || 'bg-gray-500'}`}>
                  {statusConfig[complaintData.status]?.icon}
                  <span className="ml-1.5">{complaintData.status}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
                      <User className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p className="text-base font-semibold text-gray-900">{complaintData.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="text-base font-semibold text-gray-900">{complaintData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p className="text-base font-semibold text-gray-900">{complaintData.phoneNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
                      <Clipboard className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Complaint Number</h3>
                      <p className="text-base font-semibold text-gray-900">{complaintData.complaintNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Submitted On</h3>
                      <p className="text-base font-semibold text-gray-900">
                        {complaintData.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center">
                  <CircleDashed className="h-5 w-5 mr-2 text-red-600 animate-spin" />
                  Status Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-semibold text-gray-900">Complaint Submitted : </p>
                        <span className="ml-auto text-xs text-gray-500">{ complaintData.createdAt}</span>
                      </div>
                      <p className="text-sm text-gray-500">Your complaint has been received</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <RefreshCw className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-semibold text-gray-900">Under Review</p>
                        <span className="ml-auto text-xs text-gray-500">{complaintData.lastUpdate}</span>
                      </div>
                      <p className="text-sm text-gray-500">Our team is reviewing your case</p>
                    </div>
                  </div>

                  {complaintData.status === 'Resolved' ? (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-semibold text-gray-900">Resolved</p>
                          <span className="ml-auto text-xs text-gray-500">{complaintData.lastUpdate}</span>
                        </div>
                        <p className="text-sm text-gray-500">{complaintData.resolutionDetails || 'Your complaint has been resolved'}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start opacity-50">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-semibold text-gray-900">Resolution</p>
                          <span className="ml-auto text-xs text-gray-400">Pending</span>
                        </div>
                        <p className="text-sm text-gray-400">Your complaint will be resolved soon</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Coming Soon Section */}
        {!complaintData && (
          <Card className="mt-12 text-center animate-fade-in-up">
            <div className="py-8">
              <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <BadgeCheck className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
                Enhanced Tracking Coming Soon!
              </h3>
              <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
                We're working on advanced features for real-time complaint tracking with detailed status updates.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <Mail className="w-5 h-5 text-pink-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Email Notifications</h4>
                  <p className="text-xs text-gray-500">Instant updates on status changes</p>
                </div>
                
                <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <RefreshCw className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Real-time Updates</h4>
                  <p className="text-xs text-gray-500">Live tracking of progress</p>
                </div>
                
                <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <Calendar className="w-5 h-5 text-red-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Estimated Resolution</h4>
                  <p className="text-xs text-gray-500">Know when to expect a solution</p>
                </div>
              </div>

              <div className="mt-8">
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full text-base font-semibold shadow-lg hover:shadow-red-500/40 transform hover:-translate-y-1 transition-all duration-300">
                  <Sparkles className="w-5 h-5" />
                  Get Notified
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        )}
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
          }

          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-scale {
            animation: fadeInScale 0.8s ease-out forwards;
            animation-delay: 0.4s;
          }
        `}
      </style>
    </div>
  );
};

export default TrackComplaint;