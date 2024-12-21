import { supabase } from '../supabase';
import type { Submission } from '../../types/submissions';

export async function fetchApprovedArtists() {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Submission[];
  } catch (err) {
    console.error('Error fetching approved artists:', err);
    throw err;
  }
}