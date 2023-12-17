'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handleWelcomeSubmit = async (formData: FormData) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const firstname = formData.get('firstname');
  const lastname = formData.get('lastname');
  if (!firstname || !lastname) {
    return;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/name?last_name=${lastname}&first_name=${firstname}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  if (data.code === 0) redirect('/welcome/features');
};
