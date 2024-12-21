import { supabase } from './supabase';

export async function signInAsAdmin(email: string, password: string) {
  try {
    // First sign out any existing session
    await supabase.auth.signOut();

    // Sign in with credentials
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      throw error;
    }

    if (!data.session) {
      throw new Error('No session created');
    }

    return data.session;
  } catch (err) {
    console.error('Authentication failed:', err);
    throw err;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Sign out failed:', err);
    throw err;
  }
}

export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (err) {
    console.error('Get session failed:', err);
    return null;
  }
}