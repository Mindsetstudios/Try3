import { supabase } from '../supabase';
import type { PerformanceSubmission, MusicSubmission } from '../../types/submissions';
import { uploadFile } from '../storage';

export async function submitPerformanceApplication(data: PerformanceSubmission) {
  try {
    let mediaFileUrl = '';
    
    // If there's a media file, upload it first
    if (data.mediaFile) {
      mediaFileUrl = await uploadFile(data.mediaFile, 'performance-submissions');
    }

    const { error } = await supabase
      .from('submissions')
      .insert([{
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        role: data.role,
        portfolio: data.portfolio,
        selected_dates: data.selectedDates,
        media_file: mediaFileUrl || null,
        status: 'pending'
      }]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error submitting performance application:', error);
    throw error;
  }
}

export async function submitMusicApplication(data: MusicSubmission) {
  try {
    let audioFileUrl = '';
    
    // Upload audio file if provided
    if (data.audioFile) {
      audioFileUrl = await uploadFile(data.audioFile, 'music-submissions');
    }

    const { error } = await supabase
      .from('music_submissions')
      .insert([{
        title: data.title,
        artist: data.artist,
        genre: data.genre,
        description: data.description,
        audio_file: audioFileUrl || null,
        status: 'pending'
      }]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error submitting music application:', error);
    throw error;
  }
}