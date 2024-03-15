import Progress from '@/components/onboard/Progress';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({
  params: { lang },
  searchParams: { name },
}: {
  params: { lang: Locale };
  searchParams: { name?: string };
}) {
  const dict = await getDictionary(lang);
  const token = cookies().get('token')?.value;
  async function updateInfo(formData: FormData) {
    'use server';
    const nameForm = new FormData();
    const codeForm = new FormData();
    nameForm.append('first_name', formData.get('first_name') as string);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/name`,
      {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
      console.log(await code_res.json());
    }
    redirect(`/${lang}/onboard/education`);
  }

  return (
    <div className='flex w-full flex-col items-center pt-20'>
      <div className='flex max-w-[900px] flex-col items-center'>
        <h1 className='text-[42px] font-medium'>{dict.Onboard.Title}</h1>
        <p className='title-regular text-neutral-600'>
          {dict.Onboard.SubTitle}
        </p>
      </div>
      <Spacer y='150' />
      <form action={updateInfo} className='flex w-[500px] flex-col'>
        <Input
          id='name'
          required
          defaultValue={name ?? ''}
          name='first_name'
          aria-placeholder='name'
          className='title-regular h-14'
          placeholder={dict.Onboard.FormName}
        />
        <Spacer y='20' />
        <Input
          id='code'
          name='code'
          aria-placeholder='code'
          className='title-regular h-14'
          placeholder={dict.Onboard.FormCode}
        />
        <Spacer y='10' />
        <p className='subtle-regular text-neutral-400'>{dict.Onboard.Option}</p>
        <Spacer y='80' />

        <Button
          role='button'
          type='submit'
          className='title-medium h-max w-full rounded-lg py-4'
        >
          {dict.Onboard.Button}
        </Button>
      </form>
      <Spacer y='110' />
      <Progress />
    </div>
  );
}
