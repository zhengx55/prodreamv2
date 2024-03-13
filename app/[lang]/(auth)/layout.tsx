import Spacer from '@/components/root/Spacer';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
import { ReactNode } from 'react';

export default async function AuthLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  const ip = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/utils/ip_country`
  );
  const ip_data = (await ip.json()).data;
  // if (ip_data === 'China' && lang !== 'cn') {
  //   redirect('/cn/login');
  // }
  return (
    <div className='relative flex h-full w-full overflow-auto sm:flex-row'>
      {children}
      <div className='relative hidden h-full w-1/2 justify-center bg-[#FAF9FF] sm:flex sm:flex-col sm:items-center'>
        <h1
          className={`w-[85%] ${lang === 'en' ? 'font-baskerville 2xl:text-[48px]' : 'font-custom 2xl:text-[64px]'} font-[400] sm:text-[40px]`}
        >
          {dict.Auth.Slogan}
        </h1>
        <Spacer y='80' />
        <Image
          src={lang === 'en' ? '/auth/auth.png' : '/auth/auth_cn.png'}
          alt='logo'
          priority
          width={800}
          height={200}
          className='h-auto w-[85%]'
        />
      </div>
    </div>
  );
}
