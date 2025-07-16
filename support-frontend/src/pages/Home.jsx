import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Zap, 
  Smartphone, 
  Search, 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  CreditCard, 
  Send,
  Star,
  Users,
  TrendingUp,
  Globe,
  Lock,
  Award,
  Clock,
  MessageCircle,
  Eye,
  Sparkles,
  ChevronRight,
  Play
} from 'lucide-react';

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Secure Reporting',
      description: 'Report copyright violations securely with verified phone authentication and end-to-end encryption',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Quick complaint processing with automated tracking system and real-time updates',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile Verified',
      description: 'Phone number verification ensures authentic complaints and prevents spam submissions',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: Search,
      title: 'Easy Tracking',
      description: 'Track your complaint status anytime with complaint number and get instant notifications',
      color: 'from-red-500 to-purple-500'
    }
  ];

  const stats = [
    { icon: Users, value: '50+', label: 'Protected Users' },
    { icon: Shield, value: '100+', label: 'Cases Resolved' },
    { icon: TrendingUp, value: '99%', label: 'Success Rate' },
    { icon: Clock, value: '24/7', label: 'Support' }
  ];

  const processSteps = [
    {
      icon: Smartphone,
      title: 'Verify Phone',
      description: 'Enter your phone number and verify it with OTP for secure authentication',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: FileText,
      title: 'Fill Details',
      description: 'Complete the complaint form with all required information and evidence',
      color: 'from-pink-600 to-purple-600'
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Make payment through your Credit/Debit Card with bank-level security',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Send,
      title: 'Submit & Track',
      description: 'Submit your complaint and track its progress with real-time updates',
      color: 'from-pink-600 to-red-600'
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
      {/* Enhanced Animated Background */}
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-purple-600/5"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 px-6 py-3 rounded-full border border-red-200/50 mb-8 shadow-lg">
                <Award className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-medium">Sri Lanka's #1 & Only IP Protection Platform</span>
                <Sparkles className="w-4 h-4 text-pink-600" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 py-2 px-3 bg-clip-text text-transparent mb-8 drop-shadow-lg leading-tight">
                MyRights LK
              </h1>
              
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">Trusted by 50+ users</span>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed font-medium max-w-5xl mx-auto">
              "MyRights" is a trusted Sri Lankan platform for protecting your intellectual property from misuse on social media. 
              Whether it's a photo, video, or any content that has been misused — you can report it with full confidence and legal backing.
            </p>
            
            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={handleComplaintSubmission}
                className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-5 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-red-500/40 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 min-w-[250px] border-2 border-red-400/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Send className="w-6 h-6" />
                  Submit Complaint
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
              
              <button
                onClick={handleTrackComplaint}
                className="group relative border-3 border-purple-600 text-purple-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-red px-10 py-5 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/40 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 min-w-[250px] bg-white/80 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 "></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Search className="w-6 h-6" />
                  Track Complaint
                  <Eye className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-red-600 group-hover:text-purple-600 transition-colors duration-300" />
                    <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white/60 backdrop-blur-lg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100/30 to-purple-100/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full border border-purple-200/50 mb-6 shadow-lg">
              <Lock className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-medium">Your Rights, Protected</span>
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-6">
              "You have the right to claim what's yours."
            </h2>
            
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
                අපගේ මෙම සේවාව මගින් සමාජ මාධ්‍යන් හී ඔබගේ බුද්ධිමය දේපල අනිසි ලෙස භාවිතා කිරීම වළක්වන අතර,
              </p>
              <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
                ඔබගේ පැමිණිලි රහසිගතව සමාලෝචනය කරන බවත්, ඒ සදහා සමාජ මාධ්‍ය නිතී මලාවට අනුකූලව ක්‍රියා කරන බවත් අපි සහතික කරමු.
              </p>
              <div className="flex items-center justify-center gap-2 text-purple-600">
                <Globe className="w-5 h-5" />
                <span className="font-semibold">Legal Compliance Guaranteed</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`group relative p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-0 bg-gradient-to-br from-white/90 to-pink-50/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-red-500/20 cursor-pointer ${
                    activeFeature === index ? 'ring-2 ring-red-400/50 scale-105' : ''
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className={`relative w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} p-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  
                  <div className="flex items-center justify-center text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Learn More</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 px-6 py-3 rounded-full border border-red-200/50 mb-6 shadow-lg">
              <Play className="w-5 h-5 text-red-600" />
              <span className="text-red-700 font-medium">Simple Process</span>
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Simple 4-step process to submit your complaint and get justice
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center group relative">
                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-red-200 to-purple-200 z-0"></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className={`relative w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} p-5 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 hover:shadow-red-500/40`}>
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <IconComponent className="w-full h-full text-white relative z-10" />
                      
                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-8">
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="text-white font-medium">24/7 Support Available</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Ready to Protect Your Rights?
            </h2>
            
            <p className="text-xl text-pink-100 mb-8 font-medium max-w-2xl mx-auto leading-relaxed">
              Start the process now and get your intellectual property protected with legal backing and expert support
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <button
                onClick={handleComplaintSubmission}
                className="group relative bg-white text-red-600 hover:bg-gray-100 hover:text-red-700 px-10 py-5 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-white/40 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 border-2 border-white/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <Send className="w-6 h-6" />
                  Get Started Now
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
              
              <button
                onClick={handleTrackComplaint}
                className="group relative border-2 border-white/50 text-white hover:bg-white/20 px-10 py-5 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-white/40 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="relative flex items-center gap-3">
                  <Search className="w-6 h-6" />
                  Track Existing Case
                </div>
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="font-medium">Legal Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-300" />
                <span className="font-medium">Data Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-300" />
                <span className="font-medium">Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
        `}
      </style>

    </div>
  );
};

export default Home;