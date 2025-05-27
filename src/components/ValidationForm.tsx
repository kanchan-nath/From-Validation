import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import FormField from './FormField';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import useForm from '../hooks/useForm';
import { 
  validateEmail, 
  validatePassword, 
  validatePhone, 
  validateUsername,
  validateRequired,
  validateUrl
} from '../utils/validators';

const ValidationForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { 
    formState, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    resetForm,
    isSubmitting 
  } = useForm({
    username: { 
      value: '', 
      validator: validateUsername 
    },
    fullName: { 
      value: '', 
      validator: (value) => validateRequired(value, 'Full name') 
    },
    email: { 
      value: '', 
      validator: validateEmail 
    },
    phone: { 
      value: '', 
      validator: validatePhone 
    },
    password: { 
      value: '', 
      validator: validatePassword 
    },
    website: { 
      value: '', 
      validator: validateUrl 
    }
  });

  const onSubmit = async (values: Record<string, string>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted with values:', values);
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full mx-auto transition-all duration-300">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Submission Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for completing the form. Your information has been validated and submitted successfully.
          </p>
          <button
            onClick={() => {
              resetForm();
              setFormSubmitted(false);
            }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                       transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full mx-auto transition-all duration-300">
      <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
        Account Information
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Please fill in the form with valid information
      </p>
      
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}
        noValidate
        className="space-y-1"
      >
        <FormField
          label="Username"
          name="username"
          type="text"
          value={formState.username.value}
          error={formState.username.error}
          touched={formState.username.touched}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="johndoe"
          hint="Username must be at least 4 characters"
          autoComplete="username"
        />
        
        <FormField
          label="Full Name"
          name="fullName"
          type="text"
          value={formState.fullName.value}
          error={formState.fullName.error}
          touched={formState.fullName.touched}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="John Doe"
          autoComplete="name"
        />
        
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={formState.email.value}
          error={formState.email.error}
          touched={formState.email.touched}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="john@example.com"
          autoComplete="email"
        />
        
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formState.phone.value}
          error={formState.phone.error}
          touched={formState.phone.touched}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="(555) 123-4567"
          autoComplete="tel"
        />
        
        <FormField
          label="Password"
          name="password"
          type="password"
          value={formState.password.value}
          error={formState.password.error}
          touched={formState.password.touched}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="••••••••"
          autoComplete="new-password"
        />
        
        {formState.password.value && (
          <PasswordStrengthMeter password={formState.password.value} />
        )}
        
        <FormField
          label="Website (Optional)"
          name="website"
          type="url"
          value={formState.website.value}
          error={formState.website.error}
          touched={formState.website.touched}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://yourwebsite.com"
          autoComplete="url"
        />
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                       transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-blue-600
                       flex items-center justify-center gap-2
                       dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Submit Form
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ValidationForm;