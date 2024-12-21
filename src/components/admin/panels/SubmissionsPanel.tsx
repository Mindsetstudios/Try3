import React, { useEffect, useState } from 'react';
import { Check, X, FileText } from 'lucide-react';
import { fetchSubmissions, updateSubmissionStatus } from '../../../lib/api/admin';
import type { Submission } from '../../../types/submissions';
import { StatusBadge } from '../ui/StatusBadge';
import { ActionButton } from '../ui/ActionButton';
import SubmissionDetails from '../ui/SubmissionDetails';

const SubmissionsPanel = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setIsLoading(true);
      const data = await fetchSubmissions();
      setSubmissions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load submissions');
      console.error('Error loading submissions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateSubmissionStatus(id, status);
      await loadSubmissions();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
  };

  if (isLoading) {
    return <div className="text-white">Loading submissions...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Performance Applications</h2>
      
      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="bg-gray-800 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-semibold">
                  {submission.first_name} {submission.last_name}
                </h3>
                <p className="text-gray-400 text-sm">{submission.role}</p>
              </div>
              <StatusBadge status={submission.status} />
            </div>
            
            <div className="text-sm text-gray-300">
              <p>{submission.email}</p>
              <p>{submission.phone}</p>
            </div>

            <div className="flex gap-2">
              <ActionButton
                icon={<FileText className="w-4 h-4" />}
                onClick={() => handleViewDetails(submission)}
                color="blue"
              />
              <ActionButton
                icon={<Check className="w-4 h-4" />}
                onClick={() => handleStatusUpdate(submission.id, 'approved')}
                color="green"
                disabled={submission.status === 'approved'}
              />
              <ActionButton
                icon={<X className="w-4 h-4" />}
                onClick={() => handleStatusUpdate(submission.id, 'rejected')}
                color="red"
                disabled={submission.status === 'rejected'}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left text-white">Name</th>
                <th className="px-6 py-3 text-left text-white">Role</th>
                <th className="px-6 py-3 text-left text-white">Email</th>
                <th className="px-6 py-3 text-left text-white">Status</th>
                <th className="px-6 py-3 text-left text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-t border-gray-700">
                  <td className="px-6 py-4 text-white">
                    {submission.first_name} {submission.last_name}
                  </td>
                  <td className="px-6 py-4 text-white">{submission.role}</td>
                  <td className="px-6 py-4 text-white">{submission.email}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={submission.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <ActionButton
                        icon={<FileText className="w-4 h-4" />}
                        onClick={() => handleViewDetails(submission)}
                        color="blue"
                      />
                      <ActionButton
                        icon={<Check className="w-4 h-4" />}
                        onClick={() => handleStatusUpdate(submission.id, 'approved')}
                        color="green"
                        disabled={submission.status === 'approved'}
                      />
                      <ActionButton
                        icon={<X className="w-4 h-4" />}
                        onClick={() => handleStatusUpdate(submission.id, 'rejected')}
                        color="red"
                        disabled={submission.status === 'rejected'}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedSubmission && (
        <SubmissionDetails
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};

export default SubmissionsPanel;