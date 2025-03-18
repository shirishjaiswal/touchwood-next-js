import { z } from 'zod';
import { emailSchema } from '@/lib/validations/email';
import { nameSchema } from '@/lib/validations/name';
import { passwordSchema } from '@/lib/validations/password';

// Login validation
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Register validation
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: nameSchema,
  fullName: nameSchema,
});

// TypeScript types
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
