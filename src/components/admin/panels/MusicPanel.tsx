import React, { useEffect, useState } from 'react';
import { Check, X, Music } from 'lucide-react';
import { fetchMusicSubmissions, updateMusicStatus } from '../../../lib/api/music-submissions';
import type { MusicSubmissionRecord } from '../../../types/submissions';
import AudioPlayer from '../ui/AudioPlayer';

const MusicPanel = () => {
  const [submissions, setSubmissions] = useState<MusicSubmissionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setIsLoading(true);
      const data = await fetchMusicSubmissions();
      setSubmissions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load music submissions');
      console.error('Error loading music submissions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateMusicStatus(id, status);
      await loadSubmissions();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading music submissions...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Music Submissions</h2>
      
      <div className="grid gap-4">
        {submissions.map((submission) => (
          <div 
            key={submission.id}
            className="bg-gray-800 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{submission.title}</h3>
                <p className="text-gray-400">{submission.artist}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                submission.status === 'approved' ? 'bg-green-500/20 text-green-300' :
                submission.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                {submission.status}
              </span>
            </div>

            <div className="text-sm text-gray-300">
              <p>Genre: {submission.genre}</p>
              {submission.description && (
                <p className="mt-1">{submission.description}</p>
              )}
            </div>

            {submission.audio_file && (
              <AudioPlayer 
                audioUrl={submission.audio_file}
                title={`${submission.title} - ${submission.artist}`}
              />
            )}

            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleStatusUpdate(submission.id, 'approved')}
                disabled={submission.status === 'approved'}
                className="p-2 rounded-full hover:bg-green-500/20 text-green-400 disabled:opacity-50"
              >
                <Check className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleStatusUpdate(submission.id, 'rejected')}
                disabled={submission.status === 'rejected'}
                className="p-2 rounded-full hover:bg-red-500/20 text-red-400 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {submissions.length === 0 && (
          <div className="text-center py-12">
            <Music className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">No Music Submissions Yet</h3>
            <p className="text-gray-400 mt-2">Music submissions will appear here once submitted.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPanel;