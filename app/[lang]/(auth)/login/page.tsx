import LoginForm from '@/components/auth/LoginForm';
import Panel from '@/components/auth/Panel';
import Spacer from '@/components/root/Spacer';
import type { Locale } from '@/i18n-config';
import Image from 'next/image';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <Panel lang={lang}>
      <div className='flex w-full flex-col justify-center sm:w-[500px]'>
        <Image
          priority
          width={500}
          height={100}
          className='h-[60px] w-3/4'
          alt='prodream'
          src='/logo/prodreamxl.png'
        />
        <Spacer y='50' />
        <LoginForm />
      </div>
    </Panel>
  );
}
