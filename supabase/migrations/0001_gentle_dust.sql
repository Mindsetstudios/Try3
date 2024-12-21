/*
  # Initial Schema Setup

  1. New Tables
    - `submissions` - Stores performance applications
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `role` (text)
      - `portfolio` (text)
      - `selected_dates` (text[])
      - `media_file` (text)
      - `status` (text)
      - `created_at` (timestamptz)

    - `music_submissions` - Stores music submissions
      - `id` (uuid, primary key)
      - `title` (text)
      - `artist` (text)
      - `genre` (text)
      - `description` (text)
      - `audio_file` (text)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  role text NOT NULL,
  portfolio text NOT NULL,
  selected_dates text[] NOT NULL,
  media_file text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create music_submissions table
CREATE TABLE IF NOT EXISTS music_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  genre text NOT NULL,
  description text,
  audio_file text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for submissions
CREATE POLICY "Anyone can create submissions"
  ON submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view approved submissions"
  ON submissions
  FOR SELECT
  TO public
  USING (status = 'approved');

CREATE POLICY "Authenticated users can view all submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for music_submissions
CREATE POLICY "Anyone can create music submissions"
  ON music_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view approved music"
  ON music_submissions
  FOR SELECT
  TO public
  USING (status = 'approved');

CREATE POLICY "Authenticated users can view all music submissions"
  ON music_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update music submissions"
  ON music_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);