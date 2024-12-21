interface BaseSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  portfolio: string;
  status: 'pending' | 'approved' | 'rejected';
  selectedDates: string[];
  mediaFile?: string;
}

export type { BaseSubmission };