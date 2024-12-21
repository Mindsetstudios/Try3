import { supabase } from './supabase';

export async function uploadFile(file: File, bucket: string = 'music-submissions'): Promise<string> {
  try {
    // Validate file type
    const allowedTypes = {
      'music-submissions': ['audio/mpeg', 'audio/wav', 'audio/mp4'],
      'performance-submissions': ['audio/mpeg', 'audio/wav', 'audio/mp4', 'video/mp4']
    };

    if (!allowedTypes[bucket]?.includes(file.type)) {
      throw new Error(`Invalid file type. Allowed types: ${allowedTypes[bucket].join(', ')}`);
    }

    // Validate file size (10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 10MB limit.');
    }

    // Create unique filename with original extension
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error('Failed to upload file');
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (err) {
    console.error('File upload failed:', err);
    throw err;
  }
}

export async function getFileUrl(path: string, bucket: string = 'music-submissions'): Promise<string> {
  if (!path) throw new Error('File path is required');

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return publicUrl;
}