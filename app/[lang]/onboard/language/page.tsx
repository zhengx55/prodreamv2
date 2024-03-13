import LanguageOptions from '@/components/onboard/LanguageOpts.server';
import Progress from '@/components/onboard/Progress';
import Spacer from '@/components/root/Spacer';
import { languange_info } from '@/constant';
import { SampleEssay } from '@/constant/enum';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';
import { v4 } from 'uuid';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  const token = cookies().get('token')?.value;
  async function setLanguageInfo(index: number) {
    'use server';
    const formData = new FormData();
    formData.append('language_background', languange_info[index]);
    let doc_id: string = '';
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/language_background`,
        {
          method: 'PUT',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const docData = new FormData();
        docData.append('content', SampleEssay.TITLE);
        docData.append('title', SampleEssay.TEXT);
        const new_doc_res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}v0/editor/document`,
          {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
              contentType: 'multipart/form-data',
            },
          }
        );
        doc_id = (await new_doc_res.json()).data;
        if (!doc_id)
          throw new Error(
            'An error occurred while setting language info. Please try again.'
          );
      }
    } catch (error) {
      throw new Error(
        'An error occurred while setting language info. Please try again.'
      );
    }
    redirect(`/editor/${doc_id}`, RedirectType.replace);
  }

  return (
    <div className='flex w-full flex-col items-center pt-20'>
      <div className='flex max-w-[900px] flex-col items-center'>
        <h1 className='text-[42px] font-medium'>{dict.Onboard.Title}</h1>
        <p className='text-center text-lg text-neutral-600'>
          {dict.Onboard.Language.Title}
        </p>
      </div>
      <Spacer y='50' />
      <div className='flex gap-x-4'>
        {Array(2)
          .fill(null)
          .map((_, index) => {
            return (
              <LanguageOptions
                onClick={setLanguageInfo}
                key={v4()}
                index={index}
                dict={dict}
              />
            );
          })}
      </div>
      <Spacer y='70' />
      <Progress />
    </div>
  );
}
