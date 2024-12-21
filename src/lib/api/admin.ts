import { supabase } from '../supabase';

export async function fetchSubmissions() {
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchMusicSubmissions() {
  const { data, error } = await supabase
    .from('music_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateSubmissionStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
  const { error } = await supabase
    .from('submissions')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
}

export async function updateMusicStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
  const { error } = await supabase
    .from('music_submissions')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
}