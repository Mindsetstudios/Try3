import React from 'react';
import { X, Link as LinkIcon, FileAudio } from 'lucide-react';
import { Submission } from '../../../types/submissions';
import { StatusBadge } from './StatusBadge';
import AudioPlayer from './AudioPlayer';

interface SubmissionDetailsProps {
  submission: Submission;
  onClose: () => void;
}

const SubmissionDetails: React.FC<SubmissionDetailsProps> = ({ submission, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Application Details</h2>

        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Status</span>
            <StatusBadge status={submission.status} />
          </div>

          {/* Personal Information */}
          <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
            <h3 className="text-lg font-semibold text-white">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400 block text-sm">Name</span>
                <span className="text-white">{submission.first_name} {submission.last_name}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-sm">Role</span>
                <span className="text-white">{submission.role}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-sm">Email</span>
                <span className="text-white">{submission.email}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-sm">Phone</span>
                <span className="text-white">{submission.phone}</span>
              </div>
            </div>
          </div>

          {/* Performance Dates */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Selected Dates</h3>
            <div className="space-y-1">
              {submission.selected_dates.map((date, index) => (
                <div key={index} className="text-white">
                  {date}
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio & Media */}
          <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
            <h3 className="text-lg font-semibold text-white">Portfolio & Media</h3>
            
            {submission.portfolio && (
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-blue-400" />
                <a 
                  href={submission.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View Portfolio
                </a>
              </div>
            )}

            {submission.media_file && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <FileAudio className="w-4 h-4" />
                  <span>Media File</span>
                </div>
                <AudioPlayer 
                  audioUrl={submission.media_file}
                  title={`${submission.first_name} ${submission.last_name} - ${submission.role}`}
                />
              </div>
            )}
          </div>

          {/* Submission Date */}
          <div className="text-sm text-gray-400">
            Submitted on: {new Date(submission.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails;