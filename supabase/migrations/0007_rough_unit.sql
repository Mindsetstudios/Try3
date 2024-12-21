/*
  # Final RLS policy fix

  1. Changes
    - Simplify policies to minimum required set
    - Ensure anonymous submissions work correctly
    - Fix policy ordering and precedence
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous submissions" ON submissions;
DROP POLICY IF EXISTS "Allow public to view approved submissions" ON submissions;
DROP POLICY IF EXISTS "Allow admins to view all submissions" ON submissions;
DROP POLICY IF EXISTS "Allow admins to update submissions" ON submissions;
DROP POLICY IF EXISTS "Allow anonymous music submissions" ON music_submissions;
DROP POLICY IF EXISTS "Allow public to view approved music" ON music_submissions;
DROP POLICY IF EXISTS "Allow admins to view all music" ON music_submissions;
DROP POLICY IF EXISTS "Allow admins to update music" ON music_submissions;

-- Basic insert policies
CREATE POLICY "submissions_insert_policy"
  ON submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "music_submissions_insert_policy"
  ON music_submissions FOR INSERT
  WITH CHECK (true);

-- Read policies
CREATE POLICY "submissions_select_policy"
  ON submissions FOR SELECT
  USING (
    status = 'approved' OR
    (auth.role() = 'authenticated')
  );

CREATE POLICY "music_submissions_select_policy"
  ON music_submissions FOR SELECT
  USING (
    status = 'approved' OR
    (auth.role() = 'authenticated')
  );

-- Update policies for authenticated users
CREATE POLICY "submissions_update_policy"
  ON submissions FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "music_submissions_update_policy"
  ON music_submissions FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');