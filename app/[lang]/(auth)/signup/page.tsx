import GoogleSignin from '@/components/auth/GoogleSignin';
import Panel from '@/components/auth/Panel';
import SignUpForm from '@/components/auth/SignUpForm';
import CNPanel from '@/components/auth/cn/CnPanel';
import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { getIpAddress } from '@/query/api';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Page({
  params: { lang },
  searchParams: { from },
}: {
  params: { lang: Locale };
  searchParams: { from: string };
}) {
  const dict = await getDictionary(lang);
  const cn_dict = await getDictionary('cn');
  const isInChina = await getIpAddress();
  if (!isInChina)
    return (
      <Panel lang={lang}>
        <div className='flex w-full flex-col sm:w-[500px]'>
          <Spacer y='120' className='block md:hidden' />
          <GoogleSignin
            searchParam={from}
            lang={lang}
            label={dict.Auth.Signup.Google}
          />
          <div className='flex-center relative my-10'>
            <Separator orientation='horizontal' className='bg-shadow-border' />
            <p className='small-regular absolute bg-white px-2 text-neutral-300'>
              {dict.Auth.Login.GoogleDivider}
            </p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpForm t={dict.Auth} lang={lang} />
          </Suspense>
          <p className='base-regular mt-4 text-neutral-400'>
            {dict.Auth.Signup.AlreadyLogged}&nbsp;
            <Link
              href={`/${lang}/login`}
              className='base-semibold text-violet-500 hover:underline'
            >
              {dict.Auth.Login.Button}&nbsp;
            </Link>
          </p>
        </div>
      </Panel>
    );
  return (
    <CNPanel>
      <div className='flex w-full flex-col sm:w-[500px]'>
        <Suspense fallback={<div>Loading...</div>}>
          <SignUpForm t={cn_dict.Auth} lang={'cn'} />
        </Suspense>
      </div>
    </CNPanel>
  );
}
