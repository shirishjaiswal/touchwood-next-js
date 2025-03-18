import { z } from 'zod';

export const phoneSchema = z.string().regex(
  /^\+?[1-9]\d{1,14}$/, 
  'Invalid phone number format'
);

export type PhoneSchema = z.infer<typeof phoneSchema>;
