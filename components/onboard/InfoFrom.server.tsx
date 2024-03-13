'use client';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Locale } from '@/i18n-config';
import type { getDictionary } from '@/lib/get-dictionary';
import Link from 'next/link';

type Props = { dict: Awaited<ReturnType<typeof getDictionary>>; lang: Locale };
const InfoFrom = ({ dict, lang }: Props) => {
  return (
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

      <Link passHref href={`/${lang}/onboard/education`}>
        <Button
          role='button'
          className='title-medium h-max w-full rounded-lg py-4'
        >
          {dict.Onboard.Button}
        </Button>
      </Link>
    </div>
  );
};
export default InfoFrom;
