import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email format');

export type EmailSchema = z.infer<typeof emailSchema>;