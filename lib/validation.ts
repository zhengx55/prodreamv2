import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export const signUpSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  verification: z.string().min(2).max(50),
});

export const forgotSchema = z.object({
  username: z.string().min(2).max(50),
});
