import { supabase } from '../supabase';

const BUCKET_NAME = 'music-submissions';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/aac'];

export async function uploadFile(file: File): Promise<string> {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 10MB limit');
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Please upload MP3, WAV, or AAC files.');
    }

    // Create unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    // Upload file
    const { data, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        contentType: file.type,
        upsert: false
      });

    if (uploadError) throw uploadError;
    if (!data?.path) throw new Error('Upload failed - no path returned');

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (err) {
    console.error('File upload failed:', err);
    throw err instanceof Error ? err : new Error('Failed to upload file');
  }
}