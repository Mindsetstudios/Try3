/*
  # Update schema to make portfolio and media fields optional

  1. Changes
    - Make portfolio field optional in submissions table
    - Make audio_file field optional in music_submissions table (already optional)
    - Add validation to ensure at least one contact method is provided

  2. Security
    - No changes to RLS policies required
*/

-- Make portfolio field optional in submissions table
ALTER TABLE submissions 
ALTER COLUMN portfolio DROP NOT NULL;

-- Add check constraint to ensure either portfolio or media_file is provided
ALTER TABLE submissions
ADD CONSTRAINT submissions_media_check
CHECK (
  COALESCE(portfolio, '') != '' OR 
  COALESCE(media_file, '') != ''
);