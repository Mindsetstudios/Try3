import React from 'react';
import { Check, X, FileText, ChevronRight } from 'lucide-react';
import { BaseSubmission } from './types';

interface SubmissionCardProps {
  submission: BaseSubmission;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (submission: BaseSubmission) => void;
}

const SubmissionCard = ({
  submission,
  onApprove,
  onReject,
  onViewDetails
}: SubmissionCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">
            {submission.firstName} {submission.lastName}
          </h3>
          <p className="text-gray-400">{submission.role}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${
          submission.status === 'approved' ? 'bg-green-500/20 text-green-300' :
          submission.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
          'bg-yellow-500/20 text-yellow-300'
        }`}>
          {submission.status}
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-300">
        <p>{submission.email}</p>
        <p>{submission.phone}</p>
        <p>Selected dates: {submission.selectedDates.join(', ')}</p>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-2">
          <button
            onClick={() => onApprove(submission.id)}
            className="p-1 rounded-full hover:bg-green-500/20"
            title="Approve"
          >
            <Check className="w-5 h-5 text-green-400" />
          </button>
          <button
            onClick={() => onReject(submission.id)}
            className="p-1 rounded-full hover:bg-red-500/20"
            title="Reject"
          >
            <X className="w-5 h-5 text-red-400" />
          </button>
          <button
            onClick={() => onViewDetails(submission)}
            className="p-1 rounded-full hover:bg-gray-700"
            title="View Details"
          >
            <FileText className="w-5 h-5 text-gray-300" />
          </button>
        </div>
        <button
          onClick={() => onViewDetails(submission)}
          className="text-gray-400 hover:text-white flex items-center gap-1"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SubmissionCard;