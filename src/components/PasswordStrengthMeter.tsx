import React from 'react';
import { calculatePasswordStrength } from '../utils/validators';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const strength = calculatePasswordStrength(password);
  
  // Determine strength level and label
  let strengthLabel = '';
  let barColor = '';
  
  if (strength === 0) {
    strengthLabel = '';
    barColor = 'bg-gray-300 dark:bg-gray-700';
  } else if (strength < 30) {
    strengthLabel = 'Weak';
    barColor = 'bg-red-500';
  } else if (strength < 60) {
    strengthLabel = 'Fair';
    barColor = 'bg-yellow-500';
  } else if (strength < 80) {
    strengthLabel = 'Good';
    barColor = 'bg-blue-500';
  } else {
    strengthLabel = 'Strong';
    barColor = 'bg-green-500';
  }

  // Don't show if no password
  if (!password) return null;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <p className="text-xs text-gray-600 dark:text-gray-400">Password Strength</p>
        {strengthLabel && (
          <p className={`text-xs font-medium ${
            strength < 30 
              ? 'text-red-500' 
              : strength < 60 
                ? 'text-yellow-500' 
                : strength < 80 
                  ? 'text-blue-500' 
                  : 'text-green-500'
          }`}>
            {strengthLabel}
          </p>
        )}
      </div>
      
      <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${strength}%` }}
          role="progressbar"
          aria-valuenow={strength}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;