import React from 'react';
import { Play, Pause, Volume2, VolumeX, AlertCircle, Loader2 } from 'lucide-react';
import { useAudioPlayer } from '../../../lib/hooks/useAudioPlayer';
import { formatTime } from '../../../lib/utils/time';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title }) => {
  const {
    isPlaying,
    isMuted,
    progress,
    duration,
    currentTime,
    error,
    isLoading,
    audioRef,
    togglePlay,
    toggleMute,
    seek
  } = useAudioPlayer(audioUrl);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = (x / bounds.width) * 100;
    seek(percentage);
  };

  return (
    <div className="bg-gray-700 rounded-lg p-3">
      <audio ref={audioRef} />
      
      {error ? (
        <div className="flex items-center gap-2 text-red-400 p-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      ) : isLoading ? (
        <div className="flex items-center gap-2 text-gray-400 p-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading audio...</span>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-gray-600 transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>

            <div className="flex-1">
              <div 
                className="h-2 bg-gray-600 rounded-full cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-red-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-gray-600 transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          
          <div className="mt-2 text-sm text-gray-300 truncate">
            {title}
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;