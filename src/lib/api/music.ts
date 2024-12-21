import { supabase } from '../supabase';
import type { MusicSubmissionRecord } from '../../types/submissions';

export async function fetchApprovedMusic() {
  try {
    const { data, error } = await supabase
      .from('music_submissions')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data as MusicSubmissionRecord[];
  } catch (err) {
    console.error('Error fetching approved music:', err);
    throw err;
  }
}