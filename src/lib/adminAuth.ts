// Simple password check for admin access
const ADMIN_PASSWORD = 'admin123'; // In production, use an environment variable

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}