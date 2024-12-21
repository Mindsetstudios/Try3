import React, { useState } from 'react';
import { Music, Upload, Check, AlertCircle } from 'lucide-react';
import { submitMusic } from '../lib/api/music-submissions';
import { GENRES } from './forms/constants';
import type { MusicSubmission } from '../types/submissions';
import AudioPlayer from './admin/ui/AudioPlayer';

interface MusicSubmissionFormProps {
  onSubmit: (data: FormData) => void;
}

export default function MusicSubmissionForm({ onSubmit }: MusicSubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const formData = new FormData(e.currentTarget);
      const submission: MusicSubmission = {
        title: formData.get('title') as string,
        artist: formData.get('artist') as string,
        genre: formData.get('genre') as string,
        description: formData.get('description') as string,
        audioFile: selectedFile
      };

      await submitMusic(submission);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // Reset form
      e.currentTarget.reset();
      setSelectedFile(null);
      setPreviewUrl(null);
      
      // Call parent onSubmit
      onSubmit(formData);
    } catch (err) {
      console.error('Submission failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit music');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous preview URL to avoid memory leaks
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      // Create new preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    }
  };

  // Cleanup preview URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Submit Your Music</h2>

      {success && (
        <div className="bg-green-500/20 text-green-300 p-4 rounded-lg flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Music submitted successfully!</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 text-red-300 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <input
        type="text"
        name="title"
        placeholder="Song Title"
        className="w-full p-3 rounded-lg border-0"
        required
      />

      <input
        type="text"
        name="artist"
        placeholder="Artist Name"
        className="w-full p-3 rounded-lg border-0"
        required
      />

      <select 
        name="genre" 
        className="w-full p-3 rounded-lg border-0"
        required
      >
        <option value="">Select Genre</option>
        {GENRES.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <textarea
        name="description"
        placeholder="Description (optional)"
        className="w-full p-3 rounded-lg border-0 h-24"
      />

      <div className="border-2 border-dashed rounded-lg p-6 text-center">
        <input
          type="file"
          id="audio-file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        <label
          htmlFor="audio-file"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <Upload className="w-8 h-8 text-gray-400" />
          <span className="text-white">
            {selectedFile ? selectedFile.name : 'Drop your audio file here or click to browse'}
          </span>
          <span className="text-sm text-gray-400">
            Supported formats: MP3, WAV, AAC (max 10MB)
          </span>
        </label>
      </div>

      {previewUrl && selectedFile && (
        <div className="mt-4">
          <h3 className="text-white font-medium mb-2">Preview</h3>
          <AudioPlayer 
            audioUrl={previewUrl}
            title={selectedFile.name}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !selectedFile}
        className={`w-full bg-white text-red-600 font-semibold py-3 rounded-lg transition ${
          isSubmitting || !selectedFile ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Music'}
      </button>
    </form>
  );
}