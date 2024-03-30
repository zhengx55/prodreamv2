import EducationOption from '@/components/onboard/EducationOption.server';
import Progress from '@/components/onboard/Progress';
import Spacer from '@/components/root/Spacer';
import { education_info } from '@/constant';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  const token = cookies().get('token')?.value;
  async function setEducationInfo(index: number) {
    'use server';
    const formData = new FormData();
    formData.append('educational_background', education_info[index]);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/educational_background`,
        {
          method: 'PUT',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      throw new Error(
        'An error occurred while setting education info. Please try again.'
      );
    }
    redirect(`/${lang}/onboard/language`);
  }
  return (
    <div className='flex w-full flex-col items-center px-6 pt-12 sm:px-0 sm:pt-20'>
      <div className='flex w-full max-w-full flex-col items-center sm:max-w-[900px]'>
        <h1 className='text-[20px] font-medium sm:text-[42px]'>
          {dict.Onboard.Title}
        </h1>
        <p className='small-regular sm:base-regular text-center text-neutral-600'>
          {dict.Onboard.Education.Title}
        </p>
      </div>
      <Spacer y='70' className='hidden sm:block' />
      <Spacer y='30' className='block sm:hidden' />

      <div className='flex w-full flex-col gap-y-4 sm:grid sm:w-[900px] sm:grid-cols-2 sm:gap-4'>
        {Array(4)
          .fill(null)
          .map((_, index) => {
            return (
              <EducationOption
                key={`education-${index}`}
                dict={dict}
                onClick={setEducationInfo}
                index={index}
              />
            );
          })}
      </div>
      <Spacer y='70' />
      <Progress />
      <Spacer y='20' className='block sm:hidden' />
    </div>
  );
}
