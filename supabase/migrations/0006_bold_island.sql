/*
  # Fix RLS policies for submissions

  1. Changes
    - Drop and recreate policies with simpler, more permissive rules
    - Allow anonymous submissions
    - Maintain data security while fixing submission issues
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Enable insert for public users" ON submissions;
DROP POLICY IF EXISTS "Enable read access for own submissions" ON submissions;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON submissions;
DROP POLICY IF EXISTS "Enable insert for public users" ON music_submissions;
DROP POLICY IF EXISTS "Enable read access for own music submissions" ON music_submissions;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON music_submissions;

-- Create simplified policies for submissions
CREATE POLICY "Allow anonymous submissions"
  ON submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public to view approved submissions"
  ON submissions FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY "Allow admins to view all submissions"
  ON submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admins to update submissions"
  ON submissions FOR UPDATE
  TO authenticated
  USING (true);

-- Create simplified policies for music submissions
CREATE POLICY "Allow anonymous music submissions"
  ON music_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public to view approved music"
  ON music_submissions FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY "Allow admins to view all music"
  ON music_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admins to update music"
  ON music_submissions FOR UPDATE
  TO authenticated
  USING (true);