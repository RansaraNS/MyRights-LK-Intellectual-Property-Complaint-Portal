import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Database, 
  Globe, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight,
  Sparkles,
  Award,
  UserCheck,
  Server,
  Trash2,
  Settings,
  Bell,
  Key,
  HeartHandshake,
  Scale
} from 'lucide-react';

const PrivacyPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('information-collection');

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer to update active section based on scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -60% 0px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[id^="information-"], [id^="data-"], [id^="sharing-"], [id^="user-"], [id^="contact-"]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120; // Account for sticky navigation
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setActiveSection(sectionId);
  };

  const sections = [
    {
      id: 'information-collection',
      title: 'Information Collection',
      icon: Database,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'information-usage',
      title: 'How We Use Information',
      icon: Settings,
      color: 'from-pink-500 to-purple-500'
    },
    {
      id: 'data-protection',
      title: 'Data Protection',
      icon: Shield,
      color: 'from-purple-500 to-red-500'
    },
    {
      id: 'sharing-disclosure',
      title: 'Information Sharing',
      icon: Users,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'cookies-tracking',
      title: 'Cookies & Tracking',
      icon: Eye,
      color: 'from-pink-500 to-purple-500'
    },
    {
      id: 'user-rights',
      title: 'Your Rights',
      icon: UserCheck,
      color: 'from-purple-500 to-red-500'
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      icon: Phone,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const dataTypes = [
    { icon: Users, title: 'Personal Information', description: 'Name, Email, Phone Number, Address' },
    { icon: FileText, title: 'Complaint Details', description: 'Original Work, Copyrighted Work' },
    { icon: Globe, title: 'Technical Data', description: 'Both Original and Copyrighted Links' },
    { icon: Clock, title: 'Usage Data', description: 'Report Reason, Description' }
  ];

  const protectionMeasures = [
    { icon: Lock, title: 'Encryption', description: 'End-to-end encryption for all sensitive data' },
    { icon: Server, title: 'Secure Storage', description: 'Bank-level security for data storage' },
    { icon: Key, title: 'Access Control', description: 'Strict access controls and authentication' },
    { icon: Shield, title: 'Regular Audits', description: 'Continuous security monitoring and updates' }
  ];

  const userRights = [
    { icon: Eye, title: 'Access Rights', description: 'View all personal data we hold about you' },
    { icon: Settings, title: 'Correction Rights', description: 'Request corrections to inaccurate information' },
    { icon: Trash2, title: 'Deletion Rights', description: 'Request deletion of your personal data' },
    { icon: FileText, title: 'Portability Rights', description: 'Export your data in a readable format' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-red-300/10 to-purple-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-purple-600/5"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 px-6 py-3 rounded-full border border-red-200/50 mb-8 shadow-lg">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-medium">Your Privacy Matters</span>
                <Sparkles className="w-4 h-4 text-pink-600" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 py-2 px-3 bg-clip-text text-transparent mb-6 drop-shadow-lg">
                Privacy Policy
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium max-w-3xl mx-auto">
                Learn how MyRights LK protects your personal information and respects your privacy rights
              </p>
              
              <div className="flex items-center justify-center gap-2 text-purple-600 mb-8">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Last Updated: January 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white/60 backdrop-blur-lg relative sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-white/80 text-gray-700 hover:bg-red-50'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Information Collection */}
          <div id="information-collection" className="mb-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
                    Information We Collect
                  </h2>
                  <p className="text-gray-600 mt-2">The types of information we gather to provide our services</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {dataTypes.map((type, index) => (
                  <div key={index} className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{type.title}</h3>
                        <p className="text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200/50">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Collection Methods
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Directly from you when you submit complaints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Automatically through your use of our platform and services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Through phone verification and payment processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>From evidence you provide for complaints</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information Usage */}
          <div id="information-usage" className="mb-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
                    How We Use Your Information
                  </h2>
                  <p className="text-gray-600 mt-2">The purposes for which we process your personal data</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Primary Uses</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Process Complaints</h4>
                        <p className="text-gray-600 text-sm">Handle IP violation reports and take appropriate action</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Identity Verification</h4>
                        <p className="text-gray-600 text-sm">Verify your identity through phone authentication</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Communication</h4>
                        <p className="text-gray-600 text-sm">Send updates about your complaint status</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Secondary Uses</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Service Improvement</h4>
                        <p className="text-gray-600 text-sm">Analyze usage patterns to enhance our platform</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Legal Compliance</h4>
                        <p className="text-gray-600 text-sm">Meet regulatory requirements and legal obligations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Security</h4>
                        <p className="text-gray-600 text-sm">Protect against fraud and unauthorized access</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div id="data-protection" className="mb-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
                    Data Protection & Security
                  </h2>
                  <p className="text-gray-600 mt-2">How we safeguard your personal information</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {protectionMeasures.map((measure, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <measure.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{measure.title}</h3>
                        <p className="text-gray-600">{measure.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div id="sharing-disclosure" className="mb-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
                    Information Sharing & Disclosure
                  </h2>
                  <p className="text-gray-600 mt-2">When and how we share your information</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200/50">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-red-600" />
                  Our Commitment
                </h3>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We only share information in the following limited circumstances:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Scale className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Legal Requirements:</strong> When required by law or legal process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Service Providers:</strong> With trusted partners who help us operate our platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Social Media Platforms:</strong> Necessary information to process IP violation reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Emergency Situations:</strong> To protect rights, property, or safety</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cookies & Tracking */}
          <div id="cookies-tracking" className="mb-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
                    Cookies & Tracking
                  </h2>
                  <p className="text-gray-600 mt-2">How we use cookies and tracking technologies</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200/50">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-pink-600" />
                  Cookie Usage
                </h3>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our platform:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Essential Cookies:</strong> Required for basic site functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Performance Cookies:</strong> Help us analyze site usage and improve performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Functional Cookies:</strong> Remember your preferences and settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Analytics Cookies:</strong> Understand how visitors interact with our site</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* User Rights */}
          <div id="user-rights" className="mb-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
                    Your Rights & Choices
                  </h2>
                  <p className="text-gray-600 mt-2">Control how your information is used and processed</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {userRights.map((right, index) => (
                  <div key={index} className="bg-gradient-to-br from-red-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <right.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{right.title}</h3>
                        <p className="text-gray-600">{right.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div id="contact-info" className="mb-16">
            <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-3xl p-8 shadow-2xl text-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Contact Us
                  </h2>
                  <p className="text-pink-100 mt-2">Get in touch about privacy concerns or questions</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-6 h-6 text-white" />
                    <h3 className="text-lg font-semibold">Email</h3>
                  </div>
                  <p className="text-pink-100">support@myrightslk.com</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-6 h-6 text-white" />
                    <h3 className="text-lg font-semibold">Phone</h3>
                  </div>
                  <p className="text-pink-100">+94 71 685 3350</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-6 h-6 text-white" />
                    <h3 className="text-lg font-semibold">Address</h3>
                  </div>
                  <p className="text-pink-100">Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;