/*
  # Add missing indexes and constraints
  
  1. Changes
    - Add indexes for performance optimization if they don't exist
    - Add check constraints for status values if they don't exist
  
  2. Safety
    - Uses IF NOT EXISTS checks to prevent errors
    - Wraps ALTER TABLE statements in DO blocks to handle existing constraints
*/

-- Add check constraints for status values if they don't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'submissions_status_check'
  ) THEN
    ALTER TABLE submissions
      ADD CONSTRAINT submissions_status_check
      CHECK (status IN ('pending', 'approved', 'rejected'));
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'music_submissions_status_check'
  ) THEN
    ALTER TABLE music_submissions
      ADD CONSTRAINT music_submissions_status_check
      CHECK (status IN ('pending', 'approved', 'rejected'));
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Add indexes for performance if they don't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'submissions' AND indexname = 'idx_submissions_email'
  ) THEN
    CREATE INDEX idx_submissions_email ON submissions(email);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'music_submissions' AND indexname = 'idx_music_submissions_artist'
  ) THEN
    CREATE INDEX idx_music_submissions_artist ON music_submissions(artist);
  END IF;
END $$;