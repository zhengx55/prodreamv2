import LanguageOptions from '@/components/onboard/LanguageOpts.server';
import Progress from '@/components/onboard/Progress';
import Spacer from '@/components/root/Spacer';
import { languange_info } from '@/constant';
import { getTranslations } from 'next-intl/server';
import { SampleEssay } from '@/constant/enum';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  const trans = await getTranslations('Onboard');

  const token = cookies().get('token')?.value;

  const errorMessage = trans('An_error_occurred_while_setting_language_info');

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
        if (!doc_id) throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error(errorMessage);
    }
    redirect(`/${lang}/editor/${doc_id}`, RedirectType.replace);
  }

  return (
    <div className='flex h-full w-full flex-col items-center px-6 pt-12 sm:px-0 sm:pt-20'>
      <div className='flex w-full max-w-full flex-col items-center sm:max-w-[900px]'>
        <h1 className='text-[20px] font-medium sm:text-[42px]'>
          {trans('Title')}
        </h1>
        <p className='small-regular sm:base-regular text-center text-neutral-600 sm:text-center'>
          {trans('Language.Title')}
        </p>
      </div>
      <Spacer y='50' className='hidden sm:block' />
      <Spacer y='30' className='block sm:hidden' />
      <div className='flex w-full flex-col gap-y-4 sm:w-max sm:flex-row sm:gap-x-4'>
        {Array(2)
          .fill(null)
          .map((_, index) => {
            return (
              <LanguageOptions
                onClick={setLanguageInfo}
                key={`language-${index}`}
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
