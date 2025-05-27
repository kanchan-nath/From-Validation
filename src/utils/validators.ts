export type ValidationResult = {
  valid: boolean;
  message: string;
};

// Email validation with detailed error messages
export const validateEmail = (value: string): ValidationResult => {
  if (!value) {
    return { valid: false, message: 'Email is required' };
  }
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    return { valid: false, message: 'Please enter a valid email address' };
  }
  
  return { valid: true, message: '' };
};

// Phone number validation
export const validatePhone = (value: string): ValidationResult => {
  if (!value) {
    return { valid: false, message: 'Phone number is required' };
  }
  
  // Allow various formats with optional country codes
  const phoneRegex = /^(\+\d{1,3}[-\s]?)?\(?(\d{3})\)?[-\s]?(\d{3})[-\s]?(\d{4})$/;
  if (!phoneRegex.test(value)) {
    return { 
      valid: false, 
      message: 'Please enter a valid phone number (e.g., 555-123-4567 or +1 555-123-4567)' 
    };
  }
  
  return { valid: true, message: '' };
};

// Password validation with strength requirements
export const validatePassword = (value: string): ValidationResult => {
  if (!value) {
    return { valid: false, message: 'Password is required' };
  }
  
  if (value.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
  const missingCriteria = [];
  if (!hasUpper) missingCriteria.push('uppercase letter');
  if (!hasLower) missingCriteria.push('lowercase letter');
  if (!hasNumber) missingCriteria.push('number');
  if (!hasSpecial) missingCriteria.push('special character');
  
  if (missingCriteria.length > 0) {
    return { 
      valid: false, 
      message: `Password must include at least one ${missingCriteria.join(', ')}` 
    };
  }
  
  return { valid: true, message: '' };
};

// Password strength calculation (0-100)
export const calculatePasswordStrength = (value: string): number => {
  if (!value) return 0;
  
  let strength = 0;
  
  // Length contribution (up to 25 points)
  strength += Math.min(25, value.length * 2);
  
  // Character variety (up to 75 points)
  if (/[A-Z]/.test(value)) strength += 15;
  if (/[a-z]/.test(value)) strength += 15;
  if (/\d/.test(value)) strength += 15;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength += 15;
  
  // Additional complexity points
  if (/[A-Z].*[A-Z]/.test(value)) strength += 5; // Multiple uppercase
  if (/\d.*\d/.test(value)) strength += 5; // Multiple numbers
  if (/[!@#$%^&*(),.?":{}|<>].*[!@#$%^&*(),.?":{}|<>]/.test(value)) strength += 5; // Multiple special chars
  
  return Math.min(100, strength);
};

// Username validation
export const validateUsername = (value: string): ValidationResult => {
  if (!value) {
    return { valid: false, message: 'Username is required' };
  }
  
  if (value.length < 4) {
    return { valid: false, message: 'Username must be at least 4 characters long' };
  }
  
  // Alphanumeric with underscores and hyphens only
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(value)) {
    return { 
      valid: false, 
      message: 'Username can only contain letters, numbers, underscores and hyphens' 
    };
  }
  
  return { valid: true, message: '' };
};

// Required field validation
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value.trim()) {
    return { valid: false, message: `${fieldName} is required` };
  }
  
  return { valid: true, message: '' };
};

// URL validation
export const validateUrl = (value: string): ValidationResult => {
  if (!value) {
    return { valid: true, message: '' }; // URLs might be optional
  }
  
  try {
    new URL(value);
    return { valid: true, message: '' };
  } catch {
    return { valid: false, message: 'Please enter a valid URL (e.g., https://example.com)' };
  }
};