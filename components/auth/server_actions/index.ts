'use server';

import { actionClient } from '@/lib/actions/client';
import { flattenValidationErrors } from 'next-safe-action';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const loginSchema = zfd.formData({
  username: zfd.text(
    z.string().email({ message: 'Email must be a valid email address' })
  ),
  password: zfd.text(
    z.string().min(8, { message: 'Password must be at least 8 characters' })
  ),
});

const resetPasswordSchema = zfd
  .formData({
    email: zfd.text(
      z.string().email({ message: 'Email must be a valid email address' })
    ),
    password: zfd.text(
      z.string().min(8, { message: 'Password must be at least 8 characters' })
    ),
    confirm: zfd.text(
      z.string().min(8, { message: 'Password must be at least 8 characters' })
    ),
    verification_code: zfd.text(
      z.string().min(6, { message: 'Verification code must be a 6-digit' })
    ),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

const sendVerificationEmailSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email address' }),
});

export const loginIn = actionClient
  .schema(loginSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve),
  })
  .action(async ({ parsedInput: { username, password } }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}user/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg);
    }
    revalidateTag('materials');
    revalidateTag('drafts');
    revalidateTag('outlines');
    const cookie = cookies();
    cookie.set('token', data.data.access_token, {
      sameSite: 'lax',
      secure: true,
      maxAge: 604800,
    });
  });

export const resetPassword = actionClient
  .schema(resetPasswordSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve),
  })
  .action(async ({ parsedInput }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}user/password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: parsedInput.email,
          password: parsedInput.password,
          verification_code: parsedInput.verification_code,
        }),
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg);
    }
  });

export const sendVerificationEmail = actionClient
  .schema(sendVerificationEmailSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve),
  })
  .action(async ({ parsedInput }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}user/verification_code`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: parsedInput.email,
        }),
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.msg);
    }
  });
