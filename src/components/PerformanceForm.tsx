import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { submitPerformanceApplication } from '../lib/api/submissions';
import { PERFORMANCE_DATES, ROLES } from './forms/constants';
import type { PerformanceSubmission } from '../types/submissions';

interface PerformanceFormProps {
  onSubmit: (data: FormData) => void;
}

const PerformanceForm: React.FC<PerformanceFormProps> = ({ onSubmit }) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const form = e.currentTarget;
      const formData = new FormData(form);

      const submission: PerformanceSubmission = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        role: formData.get('role') as string,
        portfolio: formData.get('portfolio') as string,
        selectedDates,
        mediaFile: selectedFile || undefined
      };

      await submitPerformanceApplication(submission);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Reset form
      form.reset();
      setSelectedDates([]);
      setSelectedFile(null);

      // Call parent onSubmit
      onSubmit(formData);
    } catch (err) {
      console.error('Submission failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDate = (date: string) => {
    setSelectedDates(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Apply to Perform</h2>
      
      {showSuccess && (
        <div className="bg-green-500/20 text-green-300 p-4 rounded-lg flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Application submitted successfully!</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 text-red-300 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <select 
          name="role" 
          className="w-full p-3 rounded-lg border-0"
          required
        >
          <option value="">Select Role</option>
          {ROLES.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <p className="text-white font-medium">Available Dates</p>
        {PERFORMANCE_DATES.map(date => (
          <label key={date} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedDates.includes(date)}
              onChange={() => toggleDate(date)}
              className="rounded border-gray-300"
            />
            <span className="text-white">{date}</span>
          </label>
        ))}
      </div>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        className="w-full p-3 rounded-lg border-0"
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="w-full p-3 rounded-lg border-0"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-3 rounded-lg border-0"
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        className="w-full p-3 rounded-lg border-0"
        required
      />

      <input
        type="url"
        name="portfolio"
        placeholder="Link to portfolio (optional if uploading media)"
        className="w-full p-3 rounded-lg border-0"
      />

      <div>
        <label className="block text-white font-medium mb-2">
          Upload Media (Optional if providing portfolio)
        </label>
        <input
          type="file"
          accept="audio/*,video/*"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="w-full text-white"
        />
        <p className="text-sm text-white/80 mt-1">Max file size: 10 MB</p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-white text-red-600 font-semibold py-3 rounded-lg transition ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
};

export default PerformanceForm;