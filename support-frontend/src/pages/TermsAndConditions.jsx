import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  FileText, 
  Scale, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft, 
  Users, 
  Lock, 
  Globe, 
  Gavel, 
  Eye, 
  Clock,
  UserCheck,
  AlertTriangle,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Award,
  ChevronRight,
  ScrollText,
  BookOpen,
  Info
} from 'lucide-react';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('acceptance');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: [
        {
          title: 'Agreement to Terms',
          text: 'By accessing and using MyRights LK, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          title: 'Modifications',
          text: 'MyRights LK reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of the service constitutes acceptance of the modified terms.'
        },
        {
          title: 'Legal Capacity',
          text: 'You must be at least 14 years old and have the legal capacity to enter into this agreement. If you are under 14, you must have parental or guardian consent to use our services.'
        }
      ]
    },
    {
      id: 'services',
      title: 'Service Description',
      icon: Globe,
      content: [
        {
          title: 'Platform Purpose',
          text: 'MyRights LK is a Sri Lankan platform designed to protect intellectual property rights by enabling users to report copyright violations and misuse of their content on social media platforms including Facebook and Instagram.'
        },
        {
          title: 'Service Scope',
          text: 'We provide secure complaint submission, phone verification and case tracking services for intellectual property protection. Our team reviews each complaint and takes appropriate action based on applicable laws.'
        },
        {
          title: 'Legal Compliance',
          text: 'All services are provided in accordance with Meta Platform law and international intellectual property regulations. We ensure compliance with social media platform policies and legal requirements.'
        }
      ]
    },
    {
      id: 'user-obligations',
      title: 'User Obligations',
      icon: UserCheck,
      content: [
        {
          title: 'Account Information',
          text: 'You must provide accurate, complete, and current information when submitting complaints. You are responsible for maintaining the confidentiality of your information.'
        },
        {
          title: 'Truthful Reporting',
          text: 'All complaints must be truthful and accurate. You must have legitimate ownership or rights to the intellectual property you are reporting.'
        },
        {
          title: 'Prohibited Activities',
          text: 'You agree not to use our service for any unlawful purpose, to harass others, submit false complaints, attempt to breach our security, or engage in any activity that could damage our reputation or service.'
        }
      ]
    },
    {
      id: 'payment-terms',
      title: 'Payment Terms',
      icon: CreditCard,
      content: [
        {
          title: 'Service Fees',
          text: 'MyRights LK charges fees for complaint processing services. All fees are clearly displayed before payment and are non-refundable except as specified in our Refund Policy.'
        },
        {
          title: 'Payment Methods',
          text: 'We accept major credit cards and debit cards through secure payment processors. All transactions are encrypted and processed with bank-level security measures.'
        },
        {
          title: 'Billing and Charges',
          text: 'You authorize us to charge your payment method for all fees incurred. In case of payment failure, we may suspend services until payment is resolved.'
        }
      ]
    },
    {
      id: 'privacy-data',
      title: 'Privacy & Data Protection',
      icon: Lock,
      content: [
        {
          title: 'Data Collection',
          text: 'We collect personal information necessary to provide our services, including contact details, complaint information, and evidence materials. All data is handled according to our Privacy Policy.'
        },
        {
          title: 'Data Security',
          text: 'We implement industry-standard security measures to protect your personal information. This includes encryption, secure servers, and regular security audits.'
        },
        {
          title: 'Data Retention',
          text: 'We retain your data for the duration necessary to provide services and comply with legal obligations. You may request data deletion subject to our legal and regulatory requirements.'
        }
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: Shield,
      content: [
        {
          title: 'Platform Rights',
          text: 'MyRights LK, its logo, design, and content are protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.'
        },
        {
          title: 'User Content',
          text: 'You retain rights to your submitted content but grant us a license to use, process, and share it as necessary to provide our services and pursue legal actions on your behalf.'
        },
        {
          title: 'Third-Party Rights',
          text: 'We respect third-party intellectual property rights and expect users to do the same. We will respond to valid takedown notices and may terminate accounts of repeat infringers.'
        }
      ]
    },
    {
      id: 'liability-disclaimers',
      title: 'Liability & Disclaimers',
      icon: AlertTriangle,
      content: [
        {
          title: 'Service Disclaimer',
          text: 'Our services are provided "as is" without warranties of any kind. We do not guarantee specific outcomes for complaint submissions or legal actions.'
        },
        {
          title: 'Limitation of Liability',
          text: 'MyRights LK shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services, except as required by law.'
        },
        {
          title: 'Indemnification',
          text: 'You agree to indemnify and hold harmless MyRights LK from any claims, damages, or expenses arising from your use of our services or violation of these terms.'
        }
      ]
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: AlertCircle,
      content: [
        {
          title: 'Account Termination',
          text: 'Either party may terminate this agreement at any time. MyRights LK may terminate accounts for violations of these terms or for any reason with or without notice.'
        },
        {
          title: 'Effect of Termination',
          text: 'Upon termination, your right to use the service ceases immediately. Provisions regarding liability, indemnification, and dispute resolution survive termination.'
        },
        {
          title: 'Data After Termination',
          text: 'We may retain certain data after termination as required by law or legitimate business purposes. You may request data deletion subject to legal requirements.'
        }
      ]
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: Mail,
      content: [
        {
          title: 'Customer Support',
          text: 'For questions about these terms or our services, please contact our customer support team. We are available 24/7 to assist with your inquiries.'
        },
        {
          title: 'Legal Inquiries',
          text: 'For legal matters or formal notices, please contact our team. All legal notices must be sent to our email.'
        },
        {
          title: 'Updates and Notifications',
          text: 'We will notify users of significant changes to these terms through email or platform notifications. Please ensure your contact information is up to date.'
        }
      ]
    }
  ];

  const handleScrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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

      {/* Header Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-purple-600/5"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 px-6 py-3 rounded-full border border-red-200/50 mb-8 shadow-lg">
                <Scale className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-medium">Legal Agreement</span>
                <Sparkles className="w-4 h-4 text-pink-600" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
                Terms & Conditions
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium max-w-3xl mx-auto">
                Please read these terms and conditions carefully before using MyRights LK services. 
                By using our platform, you agree to be bound by these terms.
              </p>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>Last Updated: July 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-red-600" />
                  <span>Version 1.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-8 bg-white/60 backdrop-blur-lg relative border-y border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full border border-purple-200/50">
              <ScrollText className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 font-medium text-sm">Quick Navigation</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => handleScrollToSection(section.id)}
                  className={`group relative p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                    activeSection === section.id 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                      : 'bg-white/80 hover:bg-white text-gray-700 hover:text-red-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="text-center">
                    <IconComponent className={`w-6 h-6 mx-auto mb-2 ${
                      activeSection === section.id ? 'text-white' : 'text-red-600'
                    }`} />
                    <div className="text-sm font-medium leading-tight">
                      {section.title}
                    </div>
                  </div>
                  
                  {activeSection === section.id && (
                    <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          {sections.map((section, sectionIndex) => {
            const IconComponent = section.icon;
            return (
              <div key={section.id} id={section.id} className="mb-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                  {/* Section Header */}
                  <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium opacity-90 mb-1">
                          Section {sectionIndex + 1}
                        </div>
                        <h2 className="text-3xl font-bold">
                          {section.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="p-8">
                    <div className="space-y-8">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="group">
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                              {itemIndex + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-3">
                                {item.title}
                              </h3>
                              <p className="text-gray-700 leading-relaxed text-lg">
                                {item.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Important Notice Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-8">
              <Info className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Important Notice</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Agreement Confirmation
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-300" />
                <span className="text-xl font-semibold text-white">By using MyRights LK, you agree to these terms</span>
              </div>
              <p className="text-pink-100 leading-relaxed text-lg">
                These terms constitute a legally binding agreement between you and MyRights LK. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-white/90">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-300" />
                <span className="font-medium">Legal Protection</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-yellow-300" />
                <span className="font-medium">Quality Service</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-green-300" />
                <span className="font-medium">User Rights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Contact Section */}
      <section className="py-12 bg-white/60 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full border border-purple-200/50 mb-6">
              <Mail className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-medium">Need Help?</span>
            </div>
            
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Questions About These Terms?
            </h3>
            
            <p className="text-gray-600 mb-8">
              Our legal team is available to clarify any questions about these terms and conditions.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/80 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Mail className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Email Support</h4>
                <p className="text-sm text-gray-600">support@myrightslk.com</p>
              </div>
              
              <div className="bg-white/80 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Phone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Phone Support</h4>
                <p className="text-sm text-gray-600">+94 71 685 3350</p>
              </div>
              
              <div className="bg-white/80 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <MapPin className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Office Address</h4>
                <p className="text-sm text-gray-600">Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;