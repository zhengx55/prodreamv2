import LoginForm from '@/components/auth/LoginForm';
import Panel from '@/components/auth/Panel';
import Spacer from '@/components/root/Spacer';
import type { Locale } from '@/i18n-config';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  unstable_setRequestLocale(lang);

  return (
    <Panel lang={lang}>
      <div className='flex w-full flex-col justify-center sm:w-[500px]'>
        <Image
          priority
          width={500}
          height={100}
          className='h-[60px] w-3/4'
          alt='prodream'
          src='/logo/Prodream.png'
        />
        <Spacer y='50' />
        <LoginForm />
      </div>
    </Panel>
  );
}
