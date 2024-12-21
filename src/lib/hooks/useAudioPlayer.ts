import { useState, useRef, useEffect } from 'react';

interface AudioPlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  duration: number;
  currentTime: number;
  error: string | null;
  isLoading: boolean;
}

export function useAudioPlayer(audioUrl: string) {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isMuted: false,
    progress: 0,
    duration: 0,
    currentTime: 0,
    error: null,
    isLoading: true
  });
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset state when URL changes
    setState(prev => ({
      ...prev,
      isPlaying: false,
      progress: 0,
      currentTime: 0,
      error: null,
      isLoading: true
    }));

    const handleCanPlay = () => {
      setState(prev => ({ ...prev, isLoading: false, error: null }));
    };

    const handleLoadedMetadata = () => {
      setState(prev => ({
        ...prev,
        duration: audio.duration,
        error: null
      }));
    };

    const handleError = () => {
      setState(prev => ({
        ...prev,
        error: 'Failed to load audio file',
        isPlaying: false,
        isLoading: false
      }));
    };

    const handleTimeUpdate = () => {
      if (!audio.duration) return;
      setState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        progress: (audio.currentTime / audio.duration) * 100
      }));
    };

    const handleEnded = () => {
      setState(prev => ({
        ...prev,
        isPlaying: false,
        progress: 0,
        currentTime: 0
      }));
    };

    // Set audio source and load
    audio.src = audioUrl;
    audio.load();

    // Add event listeners
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || state.error) return;

    try {
      if (state.isPlaying) {
        audio.pause();
        setState(prev => ({ ...prev, isPlaying: false }));
      } else {
        await audio.play();
        setState(prev => ({ ...prev, isPlaying: true }));
      }
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Failed to play audio',
        isPlaying: false
      }));
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio || state.error) return;
    
    audio.muted = !state.isMuted;
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const seek = (percentage: number) => {
    const audio = audioRef.current;
    if (!audio || isNaN(audio.duration) || state.error) return;

    const time = (percentage / 100) * audio.duration;
    audio.currentTime = time;
  };

  return {
    ...state,
    audioRef,
    togglePlay,
    toggleMute,
    seek
  };
}