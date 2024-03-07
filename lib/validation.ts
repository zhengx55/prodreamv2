import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export const signUpSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(50, { message: 'Password cannot exceed 50 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  first_name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name cannot exceed 50 characters' }),
});

export const resetSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(50, { message: 'Password cannot exceed 50 characters' }),
    confirm: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(50, { message: 'Password cannot exceed 50 characters' }),
    verification_code: z.string().min(6).max(6, {
      message: 'Verification code must be a 6-digit',
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

export const resetEmail = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(2).max(50),
});

export const resetPass = z.object({
  new_password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50, { message: 'Password cannot exceed 50 characters' }),
  old_password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50, { message: 'Password cannot exceed 50 characters' }),
});

export const resetName = z.object({
  firstname: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name cannot exceed 50 characters' }),
  lastname: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name cannot exceed 50 characters' }),
});

export const generateOutlineSchema = z.object({
  area: z.string().min(1, { message: 'Area must be at least 1 character' }),
  idea: z
    .string()
    .min(1, { message: 'Description must be at least 1 character' }),
});
