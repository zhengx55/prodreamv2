'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function resetName(formData: FormData) {}
export async function resetEmailAction(formData: FormData) {
  const token = cookies().get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/email`,
    {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(data.msg as string);
  }
  revalidatePath('/profile/setting', 'page');
}
export async function resetPasswordAction(formData: FormData) {
  const token = cookies().get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/password`,
    {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(data.msg as string);
  }
  revalidatePath('/profile/setting', 'page');
}
