/*
  # Disable RLS and Remove Authentication Requirements
  
  1. Disable RLS on all tables
  2. Drop existing policies
  3. Add performance indexes
*/

-- Disable RLS on all tables
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE music_submissions DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for all users" ON submissions;
DROP POLICY IF EXISTS "Enable read for all users" ON submissions;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON music_submissions;
DROP POLICY IF EXISTS "Enable read for all users" ON music_submissions;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON music_submissions;

-- Add performance indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_music_submissions_created_at ON music_submissions(created_at DESC);