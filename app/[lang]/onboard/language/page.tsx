import LanguageOptions from '@/components/onboard/LanguageOpts.server';
import Progress from '@/components/onboard/Progress';
import Spacer from '@/components/root/Spacer';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import Link from 'next/link';
import { v4 } from 'uuid';

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
              <Link passHref href={`/${lang}/onboard/language`} key={v4()}>
                <LanguageOptions index={index} dict={dict} />
              </Link>
            );
          })}
      </div>
      <Spacer y='70' />
      <Progress />
    </div>
  );
}
