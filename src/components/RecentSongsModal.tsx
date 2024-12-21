import React, { useEffect, useState } from 'react';
import { Music } from 'lucide-react';
import { fetchApprovedMusic } from '../lib/api/music';
import type { MusicSubmissionRecord } from '../types/submissions';
import AudioPlayer from './admin/ui/AudioPlayer';

const RecentSongsModal = () => {
  const [approvedSongs, setApprovedSongs] = useState<MusicSubmissionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadApprovedSongs();
  }, []);

  const loadApprovedSongs = async () => {
    try {
      setIsLoading(true);
      const data = await fetchApprovedMusic();
      setApprovedSongs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load approved songs');
      console.error('Error loading approved songs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-white">Loading songs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (approvedSongs.length === 0) {
    return (
      <div className="text-center py-8">
        <Music className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No Approved Songs Yet</h2>
        <p className="text-gray-400">Check back later for new music!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Recently Posted Songs</h2>
      
      <div className="space-y-4">
        {approvedSongs.map((song) => (
          <div 
            key={song.id} 
            className="bg-white/10 rounded-lg p-4 space-y-3"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">{song.title}</h3>
              <p className="text-gray-400">{song.artist}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{song.genre}</span>
              <span>•</span>
              <span>{new Date(song.created_at).toLocaleDateString()}</span>
            </div>

            {song.description && (
              <p className="text-gray-300 text-sm">{song.description}</p>
            )}

            {song.audio_file && (
              <AudioPlayer 
                audioUrl={song.audio_file}
                title={`${song.title} - ${song.artist}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSongsModal;