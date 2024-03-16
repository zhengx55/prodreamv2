import InfoForm from '@/components/onboard/InfoForm';
import Progress from '@/components/onboard/Progress';
import Spacer from '@/components/root/Spacer';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

export default async function Page({
  params: { lang },
  searchParams: { name },
}: {
  params: { lang: Locale };
  searchParams: { name?: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className='flex h-full w-full flex-col items-center px-6 pt-12 sm:px-0 sm:pt-20'>
      <div className='flex w-full max-w-full flex-col items-center sm:max-w-[900px]'>
        <h1 className='text-[20px] font-medium sm:text-[42px]'>
          {dict.Onboard.Title}
        </h1>
        <p className='small-regular sm:title-regular text-center text-neutral-600 sm:text-left'>
          {dict.Onboard.SubTitle}
        </p>
      </div>
      <Spacer y='150' className='hidden sm:block' />
      <Spacer y='30' className='block sm:hidden' />
      <InfoForm name={name} dict={dict} lang={lang} />
      <Spacer y='110' />
      <Progress />
    </div>
  );
}
