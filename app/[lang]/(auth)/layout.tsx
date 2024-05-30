import Spacer from '@/components/root/Spacer';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { getIpAddress } from '@/query/api';
import { useTranslations } from 'next-intl';
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
  const isInChina = await getIpAddress();
  const t = useTranslations('Auth');

  return isInChina ? (
    <div className='relative flex h-full w-full overflow-auto sm:min-h-[800px] sm:flex-row'>
      {children}
      <div className='relative hidden h-full w-1/2 justify-center bg-slate-50 sm:flex sm:flex-col sm:items-center'>
        <h1
          className={`w-[85%] font-custom font-[400] sm:text-[40px] 2xl:text-[64px]`}
        >
          {t('Slogan')}
        </h1>
        <Spacer y='80' />
        <Image
          src={'/auth/auth_cn.png'}
          alt='logo'
          priority
          width={800}
          height={200}
          className='h-auto w-[85%]'
        />
      </div>
    </div>
  ) : (
    <div className='relative flex h-full w-full overflow-auto sm:min-h-[800px] sm:flex-row'>
      {children}
      <div className='relative hidden h-full w-1/2 justify-center bg-slate-50 sm:flex sm:flex-col sm:items-center'>
        <h1
          className={`w-[85%] ${lang === 'en' ? 'font-baskerville 2xl:text-[48px]' : 'font-custom 2xl:text-[64px]'} font-[400] sm:text-[40px]`}
        >
          {t('Slogan')}
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
