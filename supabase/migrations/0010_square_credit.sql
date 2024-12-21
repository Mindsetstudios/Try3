/*
  # Create admin authentication

  1. Create admin users table
  2. Add initial admin user
  3. Set up RLS policies

  This migration creates a secure admin authentication system.
*/

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create admin user in auth.users if not exists
DO $$ 
BEGIN
  -- First check if the user already exists
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@thepathway.com'
  ) THEN
    -- Insert the admin user
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
      raw_user_meta_data
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
      '{"provider":"email","providers":["email"]}',
      '{}'
    );
  END IF;
END $$;

-- Add admin user to admin_users table if not exists
INSERT INTO admin_users (email)
SELECT 'admin@thepathway.com'
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users WHERE email = 'admin@thepathway.com'
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin users
CREATE POLICY "Allow authenticated users to read admin_users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);