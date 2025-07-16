import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Shield, 
  AlertCircle,
  RefreshCw,
  FileText,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  Info,
  Sparkles,
  Award
} from 'lucide-react';

const RefundPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const refundScenarios = [
    {
      icon: CheckCircle,
      title: 'Eligible for Full Refund',
      description: 'Service not delivered within 10 days of payment',
      color: 'from-green-500 to-green-600',
      borderColor: 'border-green-200'
    },
    {
      icon: CheckCircle,
      title: 'Eligible for Full Refund',
      description: 'Technical error preventing complaint submission',
      color: 'from-green-500 to-green-600',
      borderColor: 'border-green-200'
    },
    {
      icon: AlertCircle,
      title: 'Partial Refund Available',
      description: 'Complaint rejected due to insufficient evidence',
      color: 'from-red-500 to-orange-600',
      borderColor: 'border-red-200'
    },
    {
      icon: XCircle,
      title: 'No Refund',
      description: 'Complaint successfully processed and submitted',
      color: 'from-red-500 to-red-600',
      borderColor: 'border-red-200'
    }
  ];

  const timelineSteps = [
    {
      step: '1',
      title: 'Request Submission',
      description: 'Submit refund request through our email',
      time: 'Day 1'
    },
    {
      step: '2',
      title: 'Initial Review',
      description: 'Our team reviews your refund request',
      time: '2-3 Days'
    },
    {
      step: '3',
      title: 'Verification',
      description: 'Verify payment and service delivery status',
      time: '3-5 Days'
    },
    {
      step: '4',
      title: 'Processing',
      description: 'Refund processed to original payment method',
      time: '5-7 Days'
    }
  ];

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
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 px-6 py-3 rounded-full border border-red-200/50 mb-8 shadow-lg">
                <CreditCard className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-medium">Refund Policy</span>
                <Sparkles className="w-4 h-4 text-pink-600" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 py-2 px-3 bg-clip-text text-transparent mb-6">
                Fair & Transparent
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 font-medium max-w-3xl mx-auto leading-relaxed">
                At MyRights LK, we believe in transparent refund policies. Learn about our refund process and 
                conditions to ensure you understand your rights as our valued customer.
              </p>
              
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-white/50 shadow-lg">
                <Info className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700 font-medium">Updated: January 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refund Scenarios Section */}
      <section className="py-20 bg-white/60 backdrop-blur-lg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100/30 to-purple-100/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-6">
              Refund Scenarios
            </h2>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Understanding when refunds are available for your complaint submissions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {refundScenarios.map((scenario, index) => {
              const IconComponent = scenario.icon;
              return (
                <div 
                  key={index}
                  className={`group relative p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${scenario.borderColor} overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${scenario.color} p-4 shadow-lg flex-shrink-0`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {scenario.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {scenario.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full border border-purple-200/50 mb-6 shadow-lg">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-medium">Refund Timeline</span>
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-6">
              How Long Does It Take?
            </h2>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Our transparent refund process timeline from request to completion
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {timelineSteps.map((step, index) => (
                <div key={index} className="text-center group relative">
                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-red-200 to-purple-200 z-0"></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-purple-600 p-5 shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent text-sm font-bold mb-2">
                      {step.time}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Policy Section */}
      <section className="py-20 bg-white/60 backdrop-blur-lg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100/30 to-purple-100/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Detailed Policy
              </h2>
            </div>
            
            <div className="space-y-8">
              {/* Policy Cards */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-3">
                    <DollarSign className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Refund Conditions</h3>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <p>• Refunds are processed within 7-10 business days after approval</p>
                  <p>• All refunds are processed to the original payment method</p>
                  <p>• Processing fees (if any) are non-refundable</p>
                  <p>• Refund amount depends on the stage of complaint processing</p>
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3">
                    <FileText className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Required Documentation</h3>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <p>• Original payment receipt or transaction ID</p>
                  <p>• Complaint reference number</p>
                  <p>• Detailed reason for refund request</p>
                  <p>• Supporting evidence (if applicable)</p>
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-xl p-3">
                    <Calendar className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Time Limits</h3>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <p>• Refund requests must be submitted within 30 days of payment</p>
                  <p>• Requests after 30 days will be reviewed case-by-case</p>
                  <p>• Emergency refunds may be processed faster upon review</p>
                  <p>• All refund decisions are final and binding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-8">
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Need Help?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Questions About Refunds?
            </h2>
            
            <p className="text-xl text-pink-100 mb-8 font-medium max-w-2xl mx-auto">
              Our support team is here to help you understand our refund policy and process your requests
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <Mail className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Email Support</h3>
                <p className="text-pink-100">support@myrightslk.com</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <Phone className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Phone Support</h3>
                <p className="text-pink-100">+94 71 685 3350</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
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

export default RefundPolicy;