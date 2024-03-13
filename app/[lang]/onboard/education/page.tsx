import Progress from '@/components/onboard/Progress';
import Spacer from '@/components/root/Spacer';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
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
              <Link passHref href={`/${lang}/onboard/language`} key={v4()}>
                <div
                  key={v4()}
                  aria-label='education option'
                  className='flex h-[420px] w-96 cursor-pointer flex-col items-center justify-between rounded-3xl border border-zinc-300 bg-white px-4 py-5 hover:bg-slate-50'
                >
                  <h2 className='text-2xl font-medium text-slate-600'>
                    {(dict.Onboard.Education as any)['Option' + (index + 1)]}
                  </h2>
                  <Image
                    src={`/onboard/education/education0${index + 1}.png`}
                    alt={
                      (dict.Onboard.Education as any)['Option' + (index + 1)]
                    }
                    className='h-auto w-40'
                    width={150}
                    height={200}
                  />
                  <p className='base-regular text-center leading-loose text-neutral-600'>
                    {
                      (dict.Onboard.Education as any)[
                        'Option' + (index + 1) + 'Description'
                      ]
                    }
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
      <Spacer y='70' />
      <Progress />
    </div>
  );
}
