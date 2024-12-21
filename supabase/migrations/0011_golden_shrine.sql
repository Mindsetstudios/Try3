/*
  # Fix Authentication Setup

  1. Create admin user and role
    - Create admin role
    - Create admin user with proper credentials
    - Set up authentication policies

  2. Security
    - Enable RLS with proper policies
    - Add necessary indexes
*/

-- Create admin role if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_catalog.pg_roles WHERE rolname = 'authenticated'
  ) THEN
    CREATE ROLE authenticated;
  END IF;
END
$$;

-- Create admin user if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM auth.users WHERE email = 'admin@thepathway.com'
  ) THEN
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
      is_super_admin
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
      true
    );
  END IF;
END
$$;

-- Enable RLS on tables
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for submissions
CREATE POLICY "Enable insert for all users"
  ON submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read for all users"
  ON submissions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable update for authenticated users"
  ON submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for music submissions
CREATE POLICY "Enable insert for all users"
  ON music_submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read for all users"
  ON music_submissions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable update for authenticated users"
  ON music_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_music_submissions_status ON music_submissions(status);