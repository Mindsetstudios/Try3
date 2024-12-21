import React, { useEffect, useState } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { fetchApprovedMusic } from '../../lib/api/music';
import AudioPlayer from './ui/AudioPlayer';
import type { MusicSubmissionRecord } from '../../types/submissions';

const ApprovedMusicPanel = () => {
  const [approvedMusic, setApprovedMusic] = useState<MusicSubmissionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  useEffect(() => {
    loadApprovedMusic();
  }, []);

  const loadApprovedMusic = async () => {
    try {
      setIsLoading(true);
      const data = await fetchApprovedMusic();
      setApprovedMusic(data);
      setError(null);
    } catch (err) {
      setError('Failed to load approved music');
      console.error('Error loading approved music:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading approved music...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (approvedMusic.length === 0) {
    return (
      <div className="text-center py-12">
        <Music className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No Approved Music Yet</h2>
        <p className="text-gray-400">Check back later for new approved submissions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Recently Approved Music</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {approvedMusic.map((track) => (
          <div 
            key={track.id} 
            className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition"
          >
            <div className="aspect-square bg-gray-700 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
                <Music className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-white text-lg mb-1">{track.title}</h3>
              <p className="text-gray-400 mb-2">{track.artist}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{track.genre}</span>
                <button
                  onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
                  className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition"
                >
                  {playingTrack === track.id ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            {playingTrack === track.id && track.audio_file && (
              <div className="p-4 border-t border-gray-700">
                <AudioPlayer
                  audioUrl={track.audio_file}
                  title={`${track.title} - ${track.artist}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedMusicPanel;