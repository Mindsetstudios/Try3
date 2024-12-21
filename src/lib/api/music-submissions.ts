import { supabase } from '../supabase';
import { uploadFile } from './storage';
import type { MusicSubmission } from '../../types/submissions';

export async function submitMusic(data: MusicSubmission) {
  try {
    let audioFileUrl = '';

    // Upload audio file if provided
    if (data.audioFile) {
      audioFileUrl = await uploadFile(data.audioFile);
    }

    // Insert record with file URL
    const { error } = await supabase
      .from('music_submissions')
      .insert([{
        title: data.title,
        artist: data.artist,
        genre: data.genre,
        description: data.description || '',
        audio_file: audioFileUrl,
        status: 'pending'
      }]);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Error submitting music:', err);
    throw err;
  }
}

export async function fetchMusicSubmissions() {
  try {
    const { data, error } = await supabase
      .from('music_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching music submissions:', err);
    throw err;
  }
}

export async function updateMusicStatus(id: string, status: 'approved' | 'rejected') {
  try {
    const { error } = await supabase
      .from('music_submissions')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Error updating music status:', err);
    throw err;
  }
}