export const ORIGINAL_WORK_TYPES = [
  { value: 'Photo', label: 'Photo' },
  { value: 'Video', label: 'Video' },
  { value: 'Text', label: 'Text' },
  { value: 'Other', label: 'Other' }
];

export const COPYRIGHT_WORK_TYPES = [
  { value: 'Photo_Video_or_Post', label: 'Photo, Video or Post' },
  { value: 'Ad', label: 'Advertisement' },
  { value: 'Other', label: 'Other' }
];

export const REPORT_REASONS = [
  { value: 'This_content_copies_my_work', label: 'This content copies my work' },
  { value: 'I_appear_in_this_content', label: 'I appear in this content' },
  { value: 'This_content_uses_my_name', label: 'This content uses my name' }
];

export const FORM_STEPS = {
  PERSONAL_INFO: 'personal_info',
  PHONE_VERIFICATION: 'phone_verification',
  COMPLAINT_DETAILS: 'complaint_details',
  REVIEW_SUBMIT: 'review_submit'
};

export const VALIDATION_RULES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PHONE: 'Please enter a valid phone number (10-13 digits)',
  URL: 'Please enter a valid URL',
  MAX_LENGTH: (max) => `Must be less than ${max} characters`,
  MIN_LENGTH: (min) => `Must be at least ${min} characters`,
};