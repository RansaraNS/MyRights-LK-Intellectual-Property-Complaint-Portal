import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🛡️',
      title: 'Secure Reporting',
      description: 'Report copyright violations securely with verified phone authentication'
    },
    {
      icon: '⚡',
      title: 'Fast Processing',
      description: 'Quick complaint processing with automated tracking system'
    },
    {
      icon: '📱',
      title: 'Mobile Verified',
      description: 'Phone number verification ensures authentic complaints'
    },
    {
      icon: '🔍',
      title: 'Easy Tracking',
      description: 'Track your complaint status anytime with complaint number'
    }
  ];

  const handleComplaintSubmission = () => {
    navigate('/submit-complaint');
  };

  const handleTrackComplaint = () => {
    navigate('/track-complaint');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-pink-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-purple-600/5"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div >
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 py-2 px-3 bg-clip-text text-transparent mb-8 drop-shadow-lg">
                MyRights LK
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
              "MyRights" is a trusted Sri Lankan platform for protecting your intellectual property from misuse on social media. 
              Whether it's a photo, video if it has been misused — you can report it with full confidence.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-">
              <Button
                onClick={handleComplaintSubmission}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-red-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 min-w-[00px] border-2 border-red-400/30"
              >
                🚀 Submit Complaint
              </Button>
              <Button
                onClick={handleTrackComplaint}
                variant="outline"
                className="border-3 border-purple-600 text-purple-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-red-600 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 min-w-[200px] bg-white/80 backdrop-blur-sm"
              >
                🔍 Track Complaint
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-0 bg-white/60 backdrop-blur-lg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100/20 to-purple-100/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-6">“You have the right to claim what's yours.”</h2>
            <p className="text-2xl font-bold text-gray-700 max-w-3xl mx-auto font-medium">
              අපගේ මෙම සේවාව මගින් සමාජ මාධ්‍යන් හී ඔබගේ බුද්ධිමය දේපල <br />
              අනිසි ලෙස භාවිතා කිරීම වළක්වන අතර, <br />
              ඔබගේ පැමිණිලි රහසිගතව සමාලෝචනය කරන බවත්, <br />
              ඒ සදහා සමාජ මාධ්‍ය නිතී මලාවට අනුකූලව ක්‍රියා කරන බවත් අපි සහතික කරමු. <br />
              ***
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-0 bg-gradient-to-br from-white/90 to-pink-50/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-red-500/20 group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-4">How It Works</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Simple 4-step process to submit your complaint
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 hover:shadow-red-500/40">
                1
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-3">Verify Phone</h3>
              <p className="text-gray-600">Enter your phone number and verify it with OTP</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 hover:shadow-pink-500/40">
                2
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-3">Fill Details</h3>
              <p className="text-gray-600">Complete the complaint form with all required information</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 hover:shadow-pink-500/40">
                3
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-3">Payment</h3>
              <p className="text-gray-600">Make the Payement through your Credit or Debit Card</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 hover:shadow-purple-500/40">
                4
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-3">Submit & Track</h3>
              <p className="text-gray-600">Submit your complaint and track its progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Ready to Submit Your Complaint?</h2>
            <p className="text-xl text-pink-100 mb-8 font-medium">
              Start the process now and get your intellectual property protected
            </p>
            <Button
              onClick={handleComplaintSubmission}
              className="bg-white text-red-600 hover:bg-gray-100 hover:text-red-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 border-2 border-white/20"
            >
              Get Started Now →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;