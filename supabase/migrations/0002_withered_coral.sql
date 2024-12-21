/*
  # Add missing indexes and constraints

  1. Changes
    - Add indexes for frequently queried columns
    - Add status check constraints
    - Add created_at index for sorting
*/

-- Add check constraints for status values
DO $$ BEGIN
  ALTER TABLE submissions
    ADD CONSTRAINT submissions_status_check
    CHECK (status IN ('pending', 'approved', 'rejected'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE music_submissions
    ADD CONSTRAINT music_submissions_status_check
    CHECK (status IN ('pending', 'approved', 'rejected'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Add indexes for performance
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'submissions' AND indexname = 'submissions_status_idx'
  ) THEN
    CREATE INDEX submissions_status_idx ON submissions(status);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'submissions' AND indexname = 'submissions_created_at_idx'
  ) THEN
    CREATE INDEX submissions_created_at_idx ON submissions(created_at DESC);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'music_submissions' AND indexname = 'music_submissions_status_idx'
  ) THEN
    CREATE INDEX music_submissions_status_idx ON music_submissions(status);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'music_submissions' AND indexname = 'music_submissions_created_at_idx'
  ) THEN
    CREATE INDEX music_submissions_created_at_idx ON music_submissions(created_at DESC);
  END IF;
END $$;