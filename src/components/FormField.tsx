import React, { useState, InputHTMLAttributes } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  name: string;
  type: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
  hint?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type: initialType,
  value,
  error,
  touched,
  onChange,
  onBlur,
  hint,
  className,
  required,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const type = initialType === 'password' && showPassword ? 'text' : initialType;
  
  const isPasswordField = initialType === 'password';
  const hasError = touched && error;
  const isValid = touched && !error && value;

  return (
    <div className="mb-5">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium mb-1 dark:text-white transition-colors"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        <input
          id={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur && onBlur(name)}
          className={`
            w-full px-4 py-2.5 text-base rounded-lg 
            border-2 outline-none transition-all duration-200
            ${hasError 
              ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
              : isValid 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/10' 
                : 'border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900'
            }
            focus:ring-2 
            ${hasError 
              ? 'focus:ring-red-200 dark:focus:ring-red-900/20' 
              : 'focus:ring-blue-200 dark:focus:ring-blue-900/20 focus:border-blue-500 dark:focus:border-blue-400'
            }
            dark:text-white
            ${className || ''}
          `}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={`${name}-error ${name}-hint`}
          required={required}
          {...props}
        />
        
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        
        {hasError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle size={18} className="text-red-500" />
          </div>
        )}
        
        {isValid && !isPasswordField && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <CheckCircle2 size={18} className="text-green-500" />
          </div>
        )}
      </div>
      
      {hint && !hasError && (
        <p id={`${name}-hint`} className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
      
      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;