export interface PerformanceSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  portfolio?: string;
  selectedDates: string[];
  mediaFile?: File;
}

export interface MusicSubmission {
  title: string;
  artist: string;
  genre: string;
  description?: string;
  audioFile?: File;
}

export interface Submission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  portfolio?: string;
  status: 'pending' | 'approved' | 'rejected';
  selected_dates: string[];
  media_file?: string;
  created_at: string;
}

export interface MusicSubmissionRecord {
  id: string;
  title: string;
  artist: string;
  genre: string;
  description?: string;
  audio_file?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}