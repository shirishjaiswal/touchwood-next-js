// Register validation
import { z } from 'zod';
import { emailSchema } from '@/lib/validations/email';
import { nameSchema } from '@/lib/validations/name';
import { passwordSchema } from '@/lib/validations/password';

export const registerSchema = z.object({
  'first-name': nameSchema,
  'last-name': nameSchema,
  email: emailSchema,
  password: passwordSchema,
  'confirm-password': passwordSchema
});

export type RegisterSchema = z.infer<typeof registerSchema>;