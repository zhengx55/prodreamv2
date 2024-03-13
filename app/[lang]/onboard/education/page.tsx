import EducationOption from '@/components/onboard/EducationOption.server';
import Progress from '@/components/onboard/Progress';
import Spacer from '@/components/root/Spacer';
import { education_info } from '@/constant';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { v4 } from 'uuid';

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
    if (res.status === 200) {
      redirect(`/${lang}/onboard/language`);
    }
  }
  return (
    <div className='flex w-full flex-col items-center pt-20'>
      <div className='flex max-w-[900px] flex-col items-center'>
        <h1 className='text-[42px] font-medium'>{dict.Onboard.Title}</h1>
        <p className='title-regular text-neutral-600'>
          {dict.Onboard.Education.Title}
        </p>
      </div>
      <Spacer y='70' />
      <div className='flex gap-x-4'>
        {Array(3)
          .fill(null)
          .map((_, index) => {
            return (
              <EducationOption
                key={v4()}
                dict={dict}
                onClick={setEducationInfo}
                index={index}
              />
            );
          })}
      </div>
      <Spacer y='70' />
      <Progress />
    </div>
  );
}
