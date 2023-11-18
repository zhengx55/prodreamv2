import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export const signUpSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name cannot exceed 50 characters' }),
  lastname: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name cannot exceed 50 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(50, { message: 'Password cannot exceed 50 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

export const forgotSchema = z.object({
  username: z.string().min(2).max(50),
});
