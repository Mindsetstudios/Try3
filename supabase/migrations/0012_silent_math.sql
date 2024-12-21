/*
  # Fix Authentication System

  1. Reset auth configuration
  2. Create proper admin user
  3. Set up correct policies
*/

-- First, ensure we have the auth schema
CREATE SCHEMA IF NOT EXISTS auth;

-- Reset the admin user
DELETE FROM auth.users WHERE email = 'admin@thepathway.com';

-- Create the admin user with proper configuration
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmed_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@thepathway.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "admin"}',
  true,
  now()
);

-- Disable RLS temporarily to allow setup
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE music_submissions DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for all users" ON submissions;
DROP POLICY IF EXISTS "Enable read for all users" ON submissions;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON music_submissions;
DROP POLICY IF EXISTS "Enable read for all users" ON music_submissions;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON music_submissions;

-- Re-enable RLS with simpler configuration
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_submissions ENABLE ROW LEVEL SECURITY;

-- Create simplified policies
CREATE POLICY "submissions_policy"
  ON submissions
  USING (true)
  WITH CHECK (true);

CREATE POLICY "music_submissions_policy"
  ON music_submissions
  USING (true)
  WITH CHECK (true);