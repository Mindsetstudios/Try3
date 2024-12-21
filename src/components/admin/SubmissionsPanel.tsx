import React, { useEffect } from 'react';
import { Check, X, FileText } from 'lucide-react';
import { useStore } from '../../lib/store';
import SubmissionCard from './SubmissionCard';
import { BaseSubmission } from './types';

const SubmissionsPanel = () => {
  const [view, setView] = React.useState<'table' | 'cards'>('cards');
  const submissions = useStore((state) => state.submissions);
  const fetchSubmissions = useStore((state) => state.fetchSubmissions);
  const updateSubmissionStatus = useStore((state) => state.updateSubmissionStatus);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleApprove = async (id: string) => {
    try {
      await updateSubmissionStatus(id, 'approved');
    } catch (err) {
      console.error('Failed to approve submission:', err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateSubmissionStatus(id, 'rejected');
    } catch (err) {
      console.error('Failed to reject submission:', err);
    }
  };

  const handleViewDetails = (submission: BaseSubmission) => {
    console.log('Viewing details:', submission);
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No Submissions Yet</h2>
        <p className="text-gray-400">Performance applications will appear here once submitted.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Performance Applications</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView('cards')}
            className={`px-3 py-1 rounded-lg ${
              view === 'cards' ? 'bg-red-600' : 'bg-gray-700'
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setView('table')}
            className={`px-3 py-1 rounded-lg ${
              view === 'table' ? 'bg-red-600' : 'bg-gray-700'
            } hidden md:block`}
          >
            Table
          </button>
        </div>
      </div>
      
      {view === 'cards' && (
        <div className="grid gap-4">
          {submissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onApprove={handleApprove}
              onReject={handleReject}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {view === 'table' && (
        <div className="hidden md:block bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-t border-gray-700">
                  <td className="px-6 py-4">
                    {submission.firstName} {submission.lastName}
                  </td>
                  <td className="px-6 py-4">{submission.role}</td>
                  <td className="px-6 py-4">{submission.email}</td>
                  <td className="px-6 py-4">{submission.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      submission.status === 'approved' ? 'bg-green-500/20 text-green-300' :
                      submission.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(submission)}
                        className="p-1 rounded-full hover:bg-gray-700"
                        title="View Details"
                      >
                        <FileText className="w-5 h-5 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleApprove(submission.id)}
                        className="p-1 rounded-full hover:bg-green-500/20"
                        title="Approve"
                      >
                        <Check className="w-5 h-5 text-green-400" />
                      </button>
                      <button
                        onClick={() => handleReject(submission.id)}
                        className="p-1 rounded-full hover:bg-red-500/20"
                        title="Reject"
                      >
                        <X className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmissionsPanel;