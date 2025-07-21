import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import Card from '../ui/Card';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import LoadingSpinner from '../common/LoadingSpinner';
import OTPVerification from './OTPVerification';
import { validateEmail, validatePhoneNumber } from '../../utils/validation';
import { ORIGINAL_WORK_TYPES, COPYRIGHT_WORK_TYPES, REPORT_REASONS } from '../../utils/constants';
import { complaintsAPI } from '../../services/api';

const ComplaintForm = ({
  onSubmissionSuccess,
  currentStep,
  setCurrentStep,
  phoneVerified: externalPhoneVerified
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    originalWorkTypes: '',
    originalWorkUrl: '',
    copyrightWorkTypes: [],
    copyrightWorkUrl: '',
    reportReason: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(externalPhoneVerified || false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    setPhoneVerified(externalPhoneVerified || false);
  }, [externalPhoneVerified]);

  const updateStepByField = (fieldName) => {
    const stepMap = {
      fullName: 1,
      email: 1,
      phoneNumber: 2,
      address: 1,
      originalWorkTypes: 3,
      originalWorkUrl: 3,
      copyrightWorkTypes: 3,
      copyrightWorkUrl: 3,
      reportReason: 3,
      description: 3
    };
    const step = stepMap[fieldName] || 1;
    if (step > currentStep) {
      setCurrentStep(step);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateStepByField(name);

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCopyrightWorkTypeChange = (e) => {
    updateStepByField('copyrightWorkTypes');
    const value = e.target.value;
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      copyrightWorkTypes: checked
        ? [...prev.copyrightWorkTypes, value]
        : prev.copyrightWorkTypes.filter(type => type !== value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Enter valid email';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!validatePhoneNumber(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.originalWorkTypes) newErrors.originalWorkTypes = 'Original work type is required';
    if (!formData.originalWorkUrl.trim()) newErrors.originalWorkUrl = 'Original work URL is required';
    if (formData.copyrightWorkTypes.length === 0)
      newErrors.copyrightWorkTypes = 'Select at least one copyright type';
    if (!formData.copyrightWorkUrl.trim())
      newErrors.copyrightWorkUrl = 'Copyright URL is required';
    if (!formData.reportReason) newErrors.reportReason = 'Report reason is required';
    if (!phoneVerified) newErrors.phoneVerified = 'Verify phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrors({ phoneNumber: 'Enter valid Sri Lankan phone number' });
      return;
    }
    try {
      setLoading(true);
      const res = await complaintsAPI.sendOTP(formData.phoneNumber);
      if (res.success) {
        setMessage({ type: 'success', text: 'OTP sent!' });
        setShowOTPModal(true);
        setCurrentStep(2);
      } else {
        setMessage({ type: 'error', text: res.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerificationSuccess = () => {
    setPhoneVerified(true);
    setShowOTPModal(false);
    setMessage({ type: 'success', text: 'Phone number verified successfully!' });
    setCurrentStep(3);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      originalWorkTypes: '',
      originalWorkUrl: '',
      copyrightWorkTypes: [],
      copyrightWorkUrl: '',
      reportReason: '',
      description: ''
    });
    setErrors({});
    setPhoneVerified(false);
    setShowOTPModal(false);
    setMessage({ type: '', text: '' });
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await complaintsAPI.submitComplaint(formData);
      if (res.success) {
        setMessage({ type: 'success', text: 'Submitted! Redirecting to payment...' });
        
        // Redirect to payment page
        navigate('/payment', { state: { complaintId: res.complaintId } });
      } else {
        setMessage({ type: 'error', text: res.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name *" name="fullName" value={formData.fullName} onChange={handleInputChange} error={errors.fullName} />
              <Input label="Email Address *" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
            </div>
            <div className="mt-6">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Input label="Phone Number *" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} error={errors.phoneNumber} disabled={phoneVerified} />
                </div>
                <div className="flex-shrink-0 h-13">
                  {!phoneVerified ? (
                    <Button type="button" onClick={handleSendOTP} disabled={loading || !formData.phoneNumber}
                    className="h-13 bg-gradient-to-r from-red-500 to-red-800"
                    >
                      {loading ? <LoadingSpinner size="sm" /> : 'Verify Phone'}
                    </Button>
                  ) : (
                    <div className="bg-green-200 text-green-800 px-4 py-2 rounded-lg">Verified</div>
                  )}
                </div>
              </div>
              {errors.phoneVerified && <p className="text-red-600 text-sm mt-1">{errors.phoneVerified}</p>}
            </div>
            <div className="mt-6">
              <TextArea label="Address *" name="address" value={formData.address} onChange={handleInputChange} error={errors.address} rows={3} />
            </div>
          </div>

          {/* Original Work */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b">Original Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Original Work Type *" name="originalWorkTypes" value={formData.originalWorkTypes} onChange={handleInputChange} error={errors.originalWorkTypes} options={ORIGINAL_WORK_TYPES} />
              <TextArea label="Original Work URL *" name="originalWorkUrl" value={formData.originalWorkUrl} onChange={handleInputChange} error={errors.originalWorkUrl} />
            </div>
          </div>

          {/* Copyright */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b">Copyright</h3>
            <div className="space-y-2">
              {COPYRIGHT_WORK_TYPES.map(type => (
                <label key={type.value} className="flex items-center">
                  <input type="checkbox" value={type.value} checked={formData.copyrightWorkTypes.includes(type.value)} onChange={handleCopyrightWorkTypeChange} className="mr-2" />
                  {type.label}
                </label>
              ))}
              {errors.copyrightWorkTypes && <p className="text-red-600 text-sm">{errors.copyrightWorkTypes}</p>}
            </div>
            <TextArea label="Copyright Work URL *" name="copyrightWorkUrl" value={formData.copyrightWorkUrl} onChange={handleInputChange} error={errors.copyrightWorkUrl} />
          </div>

          {/* Report */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b">Report</h3>
            <Select label="Report Reason *" name="reportReason" value={formData.reportReason} onChange={handleInputChange} error={errors.reportReason} options={REPORT_REASONS} />
            <TextArea label="Description" name="description" value={formData.description} onChange={handleInputChange} error={errors.description} rows={4} />
          </div>

          {message.text && (
            <div className="mt-4">
              {message.type === 'error' ? <ErrorMessage message={message.text} /> : <SuccessMessage message={message.text} />}
            </div>
          )}

          <div className="pt-6 border-t">
            <Button type="submit" className="w-full md:w-2xl px-8 py-3 text-lg bg-gradient-to-r from-red-500 to-red-700" disabled={loading || !phoneVerified}>
              {loading ? <LoadingSpinner size="sm" /> : 'Submit Complaint'}
            </Button>
          </div>
        </form>
      </Card>

      {/* OTP Modal */}
      {showOTPModal && (
        <OTPVerification
          phoneNumber={formData.phoneNumber}
          onVerificationSuccess={handleOTPVerificationSuccess}
          onCancel={() => setShowOTPModal(false)}
        />
      )}
    </div>
  );
};

export default ComplaintForm;
