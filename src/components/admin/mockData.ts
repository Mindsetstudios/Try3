import { BaseSubmission } from './types';

export const MOCK_SUBMISSIONS: BaseSubmission[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    role: 'Singer',
    portfolio: 'https://portfolio.example.com/john',
    status: 'pending',
    selectedDates: ['Saturday January 25th', 'Saturday Feb 22nd'],
    mediaFile: 'demo.mp3'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '(555) 987-6543',
    role: 'Band',
    portfolio: 'https://portfolio.example.com/jane',
    status: 'approved',
    selectedDates: ['Saturday March 29th', 'Saturday April 26th'],
    mediaFile: 'band-demo.mp3'
  }
];