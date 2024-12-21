import { create } from 'zustand';
import { supabase } from './supabase';
import { BaseSubmission } from '../components/admin/types';

interface Store {
  submissions: BaseSubmission[];
  musicSubmissions: any[];
  error: string | null;
  fetchSubmissions: () => Promise<void>;
  fetchMusicSubmissions: () => Promise<void>;
  addSubmission: (submission: Omit<BaseSubmission, 'id' | 'status'>) => Promise<void>;
  updateSubmissionStatus: (id: string, status: BaseSubmission['status']) => Promise<void>;
  addMusicSubmission: (submission: any) => Promise<void>;
  updateMusicStatus: (id: string, status: string) => Promise<void>;
  clearError: () => void;
}

export const useStore = create<Store>((set) => ({
  submissions: [],
  musicSubmissions: [],
  error: null,
  clearError: () => set({ error: null }),

  fetchSubmissions: async () => {
    try {
      console.log('Fetching submissions...');
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        throw error;
      }

      console.log('Fetched submissions:', data);

      const formattedSubmissions = data.map(sub => ({
        id: sub.id,
        firstName: sub.first_name,
        lastName: sub.last_name,
        email: sub.email,
        phone: sub.phone,
        role: sub.role,
        portfolio: sub.portfolio || '',
        status: sub.status,
        selectedDates: sub.selected_dates || [],
        mediaFile: sub.media_file
      }));

      set({ submissions: formattedSubmissions });
    } catch (err) {
      console.error('Error in fetchSubmissions:', err);
      set({ error: 'Failed to fetch submissions' });
    }
  },

  fetchMusicSubmissions: async () => {
    try {
      console.log('Fetching music submissions...');
      const { data, error } = await supabase
        .from('music_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching music submissions:', error);
        throw error;
      }

      console.log('Fetched music submissions:', data);
      set({ musicSubmissions: data || [] });
    } catch (err) {
      console.error('Error in fetchMusicSubmissions:', err);
      set({ error: 'Failed to fetch music submissions' });
    }
  },

  // ... rest of the store implementation remains the same
}));