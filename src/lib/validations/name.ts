import { z } from 'zod';

export const usernameSchema = z
  .string()
  .min(6, 'Username must be at least 6 characters long')
  .max(12, 'Username must not exceed 12 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores (no special characters like @ allowed)');

export const nameSchema = z
  .string()
  .min(3, 'Full name must be at least 3 characters long')
  .max(24, 'Full name must not exceed 24 characters')
  .regex(/^[a-zA-Z\s]+$/, 'Full name must only contain letters and spaces');

export type UsernameSchema = z.infer<typeof usernameSchema>;
export type NameSchema = z.infer<typeof nameSchema>;