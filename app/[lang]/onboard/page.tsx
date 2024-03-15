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
    <div className='flex w-full flex-col items-center pt-20'>
      <div className='flex max-w-[900px] flex-col items-center'>
        <h1 className='text-[42px] font-medium'>{dict.Onboard.Title}</h1>
        <p className='title-regular text-neutral-600'>
          {dict.Onboard.SubTitle}
        </p>
      </div>
      <Spacer y='150' />
      <InfoForm name={name} dict={dict} lang={lang} />
      <Spacer y='110' />
      <Progress />
    </div>
  );
}
