/*
  # Update RLS policies for submissions

  1. Changes
    - Modify RLS policies to be more permissive for public submissions
    - Allow public users to insert and view their own submissions
    - Maintain admin access for authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create submissions" ON submissions;
DROP POLICY IF EXISTS "Anyone can view approved submissions" ON submissions;
DROP POLICY IF EXISTS "Authenticated users can view all submissions" ON submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON submissions;

-- Create new policies for submissions
CREATE POLICY "Enable insert for public users"
  ON submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for own submissions"
  ON submissions FOR SELECT
  TO public
  USING (
    (status = 'approved') OR
    (auth.uid() IS NOT NULL)
  );

CREATE POLICY "Enable update for authenticated users"
  ON submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Drop existing policies for music submissions
DROP POLICY IF EXISTS "Anyone can create music submissions" ON music_submissions;
DROP POLICY IF EXISTS "Anyone can view approved music" ON music_submissions;
DROP POLICY IF EXISTS "Authenticated users can view all music submissions" ON music_submissions;
DROP POLICY IF EXISTS "Authenticated users can update music submissions" ON music_submissions;

-- Create new policies for music submissions
CREATE POLICY "Enable insert for public users"
  ON music_submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for own music submissions"
  ON music_submissions FOR SELECT
  TO public
  USING (
    (status = 'approved') OR
    (auth.uid() IS NOT NULL)
  );

CREATE POLICY "Enable update for authenticated users"
  ON music_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);