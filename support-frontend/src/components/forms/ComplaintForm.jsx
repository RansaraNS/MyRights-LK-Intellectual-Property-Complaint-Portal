import React, { useState } from 'react';
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

const ComplaintForm = ({ onSubmissionSuccess }) => {
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
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Sri Lankan phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.originalWorkTypes) {
      newErrors.originalWorkTypes = 'Original work type is required';
    }

    if (!formData.originalWorkUrl.trim()) {
      newErrors.originalWorkUrl = 'Original work URL is required';
    }

    if (formData.copyrightWorkTypes.length === 0) {
      newErrors.copyrightWorkTypes = 'At least one copyright work type is required';
    }

    if (!formData.copyrightWorkUrl.trim()) {
      newErrors.copyrightWorkUrl = 'Copyright work URL is required';
    }

    if (!formData.reportReason) {
      newErrors.reportReason = 'Report reason is required';
    }

    if (!phoneVerified) {
      newErrors.phoneVerified = 'Phone number must be verified';
    }

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const res = await complaintsAPI.submitComplaint(formData);
      if (res.success) {
        setMessage({ type: 'success', text: 'Submitted!' });

        // ✅ Reset form on success
        resetForm();

        if (typeof onSubmissionSuccess === 'function') {
          onSubmissionSuccess(res);
        }
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Submit Your Complaint</h2>
          <p className="text-gray-600">
            Please fill out all required fields to submit your copyright infringement complaint.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name *" name="fullName" value={formData.fullName} onChange={handleInputChange} error={errors.fullName} placeholder="Enter your full name" />
              <Input label="Email Address *" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} placeholder="Enter your email address" />
            </div>
            <div className="mt-6">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Input label="Phone Number *" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} error={errors.phoneNumber} placeholder="07XXXXXXXX or 94XXXXXXXXX" disabled={phoneVerified} />
                </div>
                <div className="flex-shrink-0">
                  {!phoneVerified ? (
                    <Button type="button" onClick={handleSendOTP} disabled={loading || !formData.phoneNumber} className="h-13 bg-gradient-to-r from-red-500 to-red-800">
                      {loading ? <LoadingSpinner size="sm" /> : 'Verify Phone'}
                    </Button>
                  ) : (
                    <div className="flex items-center h-13 px-5 bg-green-200 text-green-800 rounded-lg">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>
              </div>
              {errors.phoneVerified && <p className="text-red-600 text-sm mt-1">{errors.phoneVerified}</p>}
            </div>
            <div className="mt-6">
              <TextArea label="Address *" name="address" value={formData.address} onChange={handleInputChange} error={errors.address} placeholder="Enter your full address" rows={3} />
            </div>
          </div>

          {/* Original Work Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b">Original Work Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Original Work Type *" name="originalWorkTypes" value={formData.originalWorkTypes} onChange={handleInputChange} error={errors.originalWorkTypes} options={ORIGINAL_WORK_TYPES} />
              <TextArea label="Original Work URL *" name="originalWorkUrl" value={formData.originalWorkUrl} onChange={handleInputChange} error={errors.originalWorkUrl} placeholder="https://example.com/original-work" />
            </div>
          </div>

          {/* Copyright */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b">Copyright Work Information</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Copyright Work Types *</label>
              <div className="space-y-2">
                {COPYRIGHT_WORK_TYPES.map(type => (
                  <label key={type.value} className="flex items-center">
                    <input type="checkbox" value={type.value} checked={formData.copyrightWorkTypes.includes(type.value)} onChange={handleCopyrightWorkTypeChange} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">{type.label}</span>
                  </label>
                ))}
              </div>
              {errors.copyrightWorkTypes && <p className="text-red-600 text-sm mt-1">{errors.copyrightWorkTypes}</p>}
            </div>
            <TextArea label="Copyright Work URL *" name="copyrightWorkUrl" value={formData.copyrightWorkUrl} onChange={handleInputChange} error={errors.copyrightWorkUrl} placeholder="https://example.com/copyright-work" />
          </div>

          {/* Report */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b">Report Information</h3>
            <div className="space-y-6">
              <Select label="Report Reason *" name="reportReason" value={formData.reportReason} onChange={handleInputChange} error={errors.reportReason} options={REPORT_REASONS} />
              <TextArea label="Additional Description" name="description" value={formData.description} onChange={handleInputChange} error={errors.description} placeholder="Provide any additional details about your complaint (optional)" rows={4} />
            </div>
          </div>

          {/* Messages */}
          {message.text && (
            <div className="mt-4">
              {message.type === 'error' ? <ErrorMessage message={message.text} /> : <SuccessMessage message={message.text} />}
            </div>
          )}

          {/* Submit */}
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
