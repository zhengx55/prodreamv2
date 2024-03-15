'use server';

import { SampleEssay } from '@/constant/enum';
import type { Locale } from '@/i18n-config';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

export async function setOnboardNameAndCode(formData: FormData, lang: Locale) {
  const token = cookies().get('token')?.value;

  const nameForm = new FormData();
  const codeForm = new FormData();
  nameForm.append('first_name', formData.get('first_name') as string);
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/name`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (formData.get('code')) {
      codeForm.append('referral_code', formData.get('code') as string);
      const code_res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/referral_code`,
        {
          method: 'PUT',
          body: codeForm,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await code_res.json();
      console.log(data);
    }
  } catch (error: any) {
    return { error: error.msg };
  }
  redirect(`/${lang}/onboard/education`);
}

export async function toDocument() {
  'use server';
  const token = cookies().get('token')?.value;

  const docData = new FormData();
  docData.append('content', SampleEssay.TITLE);
  docData.append('title', SampleEssay.TEXT);
  const new_doc_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v0/editor/document`,
    {
      method: 'POST',
      body: docData,
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: 'multipart/form-data',
      },
    }
  );
  const doc_id = (await new_doc_res.json()).data;
  console.log('🚀 ~ toDocument ~ doc_id:', doc_id);
  if (!doc_id)
    throw new Error(
      'An error occurred while setting language info. Please try again.'
    );
  redirect(`/editor/${doc_id}`, RedirectType.replace);
}
