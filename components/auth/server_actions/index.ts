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

export const loginIn = actionClient
  .schema(loginSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve),
  })
  .action(async ({ parsedInput: { username, password } }) => {
    console.log('username', username);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}/user/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.message);
    }
    revalidateTag('materials');
    revalidateTag('drafts');
    revalidateTag('outlines');
    const cookie = cookies();
    cookie.set('token', data.access_token, {
      httpOnly: true,
      sameSite: 'lax',
    });
  });
