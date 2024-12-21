import { z } from 'zod';

export const musicSubmissionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist name is required"),
  genre: z.string().min(1, "Genre is required"),
  description: z.string().optional(),
  audioFile: z.string().optional()
});

export const performanceSubmissionSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  role: z.string().min(1, "Role is required"),
  portfolio: z.string().optional(),
  selectedDates: z.array(z.string()).min(1, "Select at least one date"),
  mediaFile: z.string().optional()
}).refine(data => {
  // Allow either portfolio or mediaFile to be empty, but at least one must be provided
  return data.portfolio?.length > 0 || data.mediaFile?.length > 0;
}, {
  message: "Either a portfolio URL or media file must be provided",
  path: ["portfolio"]
});