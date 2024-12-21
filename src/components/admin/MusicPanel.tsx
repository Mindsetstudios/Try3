import React, { useEffect } from 'react';
import { Play, Check, X } from 'lucide-react';
import { useStore } from '../../lib/store';

const MusicPanel = () => {
  const musicSubmissions = useStore((state) => state.musicSubmissions);
  const fetchMusicSubmissions = useStore((state) => state.fetchMusicSubmissions);
  const updateMusicStatus = useStore((state) => state.updateMusicStatus);

  useEffect(() => {
    fetchMusicSubmissions();
  }, [fetchMusicSubmissions]);

  const handleApprove = async (id: string) => {
    try {
      await updateMusicStatus(id, 'approved');
    } catch (err) {
      console.error('Failed to approve music:', err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateMusicStatus(id, 'rejected');
    } catch (err) {
      console.error('Failed to reject music:', err);
    }
  };

  if (musicSubmissions.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No Music Submissions Yet</h2>
        <p className="text-gray-400">Music submissions will appear here once submitted.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Music Submissions</h2>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Artist</th>
              <th className="px-6 py-3 text-left">Genre</th>
              <th className="px-6 py-3 text-left">Submitted</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {musicSubmissions.map((submission) => (
              <tr key={submission.id} className="border-t border-gray-700">
                <td className="px-6 py-4">{submission.title}</td>
                <td className="px-6 py-4">{submission.artist}</td>
                <td className="px-6 py-4">{submission.genre}</td>
                <td className="px-6 py-4">
                  {new Date(submission.created_at).toLocaleDateString()}
                </td>
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
                    <button className="p-1 rounded-full hover:bg-gray-700">
                      <Play className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleApprove(submission.id)}
                      className="p-1 rounded-full hover:bg-green-500/20"
                    >
                      <Check className="w-5 h-5 text-green-400" />
                    </button>
                    <button
                      onClick={() => handleReject(submission.id)}
                      className="p-1 rounded-full hover:bg-red-500/20"
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
    </div>
  );
};

export default MusicPanel;