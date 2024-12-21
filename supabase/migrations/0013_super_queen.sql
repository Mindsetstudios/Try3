/*
  # Configure Storage Buckets

  1. Create Storage Buckets
    - music-submissions: For music file uploads
    - performance-submissions: For performance media files

  2. Security
    - Enable public read access
    - Restrict file types
    - Set size limits
*/

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('music-submissions', 'music-submissions', true, 10485760, ARRAY['audio/mpeg', 'audio/wav', 'audio/mp4']),
  ('performance-submissions', 'performance-submissions', true, 10485760, ARRAY['audio/mpeg', 'audio/wav', 'audio/mp4', 'video/mp4'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage policies for music submissions
CREATE POLICY "Public Access Music"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'music-submissions');

CREATE POLICY "Upload Access Music"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'music-submissions' AND
  (LOWER(RIGHT(name, 4)) IN ('.mp3', '.wav', '.m4a'))
);

-- Storage policies for performance submissions
CREATE POLICY "Public Access Performance"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'performance-submissions');

CREATE POLICY "Upload Access Performance"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'performance-submissions' AND
  (LOWER(RIGHT(name, 4)) IN ('.mp3', '.wav', '.m4a', '.mp4'))
);