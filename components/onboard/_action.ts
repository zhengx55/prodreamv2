'use server';

import { SampleEssay } from '@/constant/enum';
import type { Locale } from '@/i18n-config';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { RedirectType, redirect } from 'next/navigation';

export async function setOnboardNameAndCode(formData: FormData, lang: Locale) {
  const token = cookies().get('token')?.value;
  const transError = await getTranslations('Error');
  const nameForm = new FormData();
  const codeForm = new FormData();
  nameForm.append('first_name', formData.get('first_name') as string);
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/name`, {
      method: 'POST',
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
      if (data.code !== 0) {
        const errorMsg = transError('Invalid_referral_code_Please_try_again');
        return {
          error: errorMsg,
        };
      } else {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/auxiliary_info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify({
              field: 'has_referral_code',
              data: 'true',
            }),
          }
        );
      }
    }
  } catch (error: any) {
    return { error: error.msg };
  }
  redirect(`/${lang}/onboard/education`);
}

export async function toDocument() {
  'use server';
  const token = cookies().get('token')?.value;
  const transError = await getTranslations('Error');
  const docData = new FormData();
  docData.append('content', SampleEssay.TEXT);
  docData.append('title', SampleEssay.TITLE);
  let doc_id: string = '';
  try {
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
    doc_id = (await new_doc_res.json()).data;
  } catch (error) {
    const errorMsg = transError('An_error_occurred_while_setting_language_info_Please_try_again');
    throw new Error(
      errorMsg
    );
  }
  redirect(`/editor/${doc_id}`, RedirectType.replace);
}
