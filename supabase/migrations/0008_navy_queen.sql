/*
  # Final RLS policy fix

  1. Changes
    - Simplify policies to minimum required set
    - Enable anonymous submissions without authentication
    - Fix policy ordering and precedence
*/

-- Drop existing policies
DROP POLICY IF EXISTS "submissions_insert_policy" ON submissions;
DROP POLICY IF EXISTS "submissions_select_policy" ON submissions;
DROP POLICY IF EXISTS "submissions_update_policy" ON submissions;
DROP POLICY IF EXISTS "music_submissions_insert_policy" ON music_submissions;
DROP POLICY IF EXISTS "music_submissions_select_policy" ON music_submissions;
DROP POLICY IF EXISTS "music_submissions_update_policy" ON music_submissions;

-- Create simplified policies for submissions
CREATE POLICY "enable_insert_for_all"
  ON submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "enable_select_for_all"
  ON submissions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "enable_update_for_authenticated"
  ON submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create simplified policies for music submissions
CREATE POLICY "enable_insert_for_all"
  ON music_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "enable_select_for_all"
  ON music_submissions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "enable_update_for_authenticated"
  ON music_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);