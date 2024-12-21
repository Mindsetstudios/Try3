-- Enable public access without authentication
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE music_submissions DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies since we're disabling RLS
DROP POLICY IF EXISTS "enable_insert_for_all" ON submissions;
DROP POLICY IF EXISTS "enable_select_for_all" ON submissions;
DROP POLICY IF EXISTS "enable_update_for_authenticated" ON submissions;
DROP POLICY IF EXISTS "enable_insert_for_all" ON music_submissions;
DROP POLICY IF EXISTS "enable_select_for_all" ON music_submissions;
DROP POLICY IF EXISTS "enable_update_for_authenticated" ON music_submissions;