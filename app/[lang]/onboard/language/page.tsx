import Progress from '@/components/onboard/Progress';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className='flex w-full flex-col items-center pt-20'>
      <div className='flex max-w-[900px] flex-col items-center'>
        <h1 className='text-[42px] font-medium'>{dict.Onboard.Title}</h1>
        <p className='title-regular text-neutral-600'>
          {dict.Onboard.SubTitle}
        </p>
      </div>
      <Spacer y='150' />
      <div className='flex w-[500px] flex-col'>
        <Input
          id='name'
          aria-placeholder='name'
          className='title-regular h-14'
          placeholder={dict.Onboard.FormName}
        />
        <Spacer y='20' />
        <Input
          id='code'
          aria-placeholder='code'
          className='title-regular h-14'
          placeholder={dict.Onboard.FormCode}
        />
        <Spacer y='10' />
        <p className='subtle-regular text-neutral-400'>{dict.Onboard.Option}</p>
        <Spacer y='80' />
        <Button role='button' className='title-medium h-max rounded-lg py-4'>
          {dict.Onboard.Button}
        </Button>
      </div>
      <Spacer y='110' />
      <Progress />
    </div>
  );
}
