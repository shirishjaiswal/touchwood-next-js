import { z } from 'zod';
import { emailSchema } from '@/lib/validations/email';
import { passwordSchema } from '@/lib/validations/password';

// Login validation
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// TypeScript types
export type LoginSchema = z.infer<typeof loginSchema>;
