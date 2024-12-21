import { supabase } from './supabase';

export async function initSupabase() {
  try {
    // Sign in as service role for public access
    const { data: { session }, error } = await supabase.auth.signUp({
      email: crypto.randomUUID() + '@temp.com',
      password: crypto.randomUUID()
    });
    
    if (error) {
      console.error('Error initializing Supabase:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to initialize Supabase:', err);
    return false;
  }
}