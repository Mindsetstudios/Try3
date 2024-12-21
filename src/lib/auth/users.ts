interface AdminUser {
  username: string;
  password: string;
}

export const ADMIN_USERS: AdminUser[] = [
  {
    username: 'Sam',
    password: 'theman'
  },
  {
    username: 'Adrian',
    password: 'theman'
  }
];

export function validateAdminCredentials(username: string, password: string): boolean {
  return ADMIN_USERS.some(
    user => user.username === username && user.password === password
  );
}