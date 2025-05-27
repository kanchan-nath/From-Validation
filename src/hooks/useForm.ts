import { useState, useCallback } from 'react';
import { ValidationResult } from '../utils/validators';

export type FieldValidator = (value: string) => ValidationResult;

export type FormField = {
  value: string;
  error: string;
  touched: boolean;
  validator: FieldValidator;
};

export type FormState = {
  [key: string]: FormField;
};

export type FormErrors = {
  [key: string]: string;
};

const useForm = (initialState: Record<string, { value: string; validator: FieldValidator }>) => {
  // Transform initial state into form state with errors and touched flags
  const transformedInitialState: FormState = Object.entries(initialState).reduce(
    (acc, [fieldName, { value, validator }]) => {
      acc[fieldName] = {
        value,
        error: '',
        touched: false,
        validator,
      };
      return acc;
    },
    {} as FormState
  );

  const [formState, setFormState] = useState<FormState>(transformedInitialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate a single field
  const validateField = useCallback((name: string, value: string, touched = true): string => {
    const field = formState[name];
    if (!field) return '';

    const result = field.validator(value);
    return result.valid ? '' : result.message;
  }, [formState]);

  // Handle field change
  const handleChange = useCallback((name: string, value: string) => {
    setFormState(prev => {
      const error = validateField(name, value, prev[name]?.touched);
      
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
          error,
        },
      };
    });
  }, [validateField]);

  // Handle field blur (mark as touched)
  const handleBlur = useCallback((name: string) => {
    setFormState(prev => {
      const field = prev[name];
      if (!field) return prev;

      const error = validateField(name, field.value, true);
      
      return {
        ...prev,
        [name]: {
          ...field,
          touched: true,
          error,
        },
      };
    });
  }, [validateField]);

  // Validate all fields
  const validateForm = useCallback((): FormErrors => {
    const errors: FormErrors = {};
    let isValid = true;

    Object.entries(formState).forEach(([name, field]) => {
      const result = field.validator(field.value);
      
      if (!result.valid) {
        errors[name] = result.message;
        isValid = false;
      }
    });

    // Update form state with all errors
    setFormState(prev => {
      const updated = { ...prev };
      
      Object.entries(prev).forEach(([name, field]) => {
        const error = errors[name] || '';
        updated[name] = {
          ...field,
          error,
          touched: true,
        };
      });
      
      return updated;
    });

    return errors;
  }, [formState]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (
      onSubmit: (values: Record<string, string>) => Promise<void> | void,
      onError?: (errors: FormErrors) => void
    ) => {
      setIsSubmitting(true);
      
      const errors = validateForm();
      const hasErrors = Object.keys(errors).length > 0;
      
      if (hasErrors) {
        onError?.(errors);
        setIsSubmitting(false);
        return;
      }

      // Transform form state to values object
      const values = Object.entries(formState).reduce(
        (acc, [name, field]) => {
          acc[name] = field.value;
          return acc;
        },
        {} as Record<string, string>
      );

      try {
        await onSubmit(values);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, validateForm]
  );

  // Reset the form to initial state
  const resetForm = useCallback(() => {
    setFormState(transformedInitialState);
    setIsSubmitted(false);
  }, [transformedInitialState]);

  return {
    formState,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isSubmitting,
    isSubmitted,
    validateField,
    validateForm,
  };
};

export default useForm;