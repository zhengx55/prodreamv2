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
            body: docData,
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
    <div className='flex h-full w-full flex-col items-center px-6 pt-12 sm:px-0 sm:pt-20'>
      <div className='flex w-full max-w-full flex-col items-center sm:max-w-[900px]'>
        <h1 className='text-[20px] font-medium sm:text-[42px]'>
          {dict.Onboard.Title}
        </h1>
        <p className='small-regular sm:title-regular text-center text-neutral-600 sm:text-left'>
          {dict.Onboard.Language.Title}
        </p>
      </div>
      <Spacer y='50' className='hidden sm:block' />
      <Spacer y='30' className='block sm:hidden' />
      <div className='flex w-full flex-col gap-y-4 sm:flex-row sm:gap-x-4'>
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
