import { useState } from 'react';
import { ZodSchema, ZodError } from 'zod';

export function useSubmissionForm<T>(
  submitFn: (data: T) => Promise<void>,
  validationSchema?: ZodSchema<T>
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: T) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      // Validate data if schema is provided
      if (validationSchema) {
        try {
          validationSchema.parse(data);
        } catch (validationError) {
          if (validationError instanceof ZodError) {
            const firstError = validationError.errors[0];
            throw new Error(firstError.message);
          }
          throw validationError;
        }
      }
      
      await submitFn(data);
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Submission failed:', err);
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    showSuccess,
    error,
    handleSubmit
  };
}