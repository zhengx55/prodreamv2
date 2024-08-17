import GoogleSignin from '@/components/auth/GoogleSignin';
import Panel from '@/components/auth/Panel';
import SignUpForm from '@/components/auth/SignUpForm';
import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import type { Locale } from '@/i18n-config';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Page({
  params: { lang },
  searchParams: { from },
}: {
  params: { lang: Locale };
  searchParams: { from: string };
}) {
  unstable_setRequestLocale(lang);

  const transAuth = await getTranslations('Auth');

  return (
    <Panel lang={lang}>
      <div className='flex h-full w-full flex-col justify-center sm:w-[500px]'>
        <Spacer y='120' className='block md:hidden' />
        <GoogleSignin
          searchParam={from}
          lang={lang}
          label={transAuth('Signup.Google')}
        />
        <div className='flex-center relative my-10'>
          <Separator orientation='horizontal' className='bg-gray-300' />
          <p className='small-regular absolute bg-white px-2 text-neutral-300'>
            {transAuth('Login.GoogleDivider')}
          </p>
        </div>
        <Suspense fallback={<div>{'Loading...'}</div>}>
          <SignUpForm />
        </Suspense>
        <p className='base-regular mt-4 text-neutral-400'>
          {transAuth('Signup.AlreadyLogged')}&nbsp;
          <Link
            href={`/${lang}/login`}
            className='base-semibold text-violet-500 hover:underline'
          >
            {transAuth('Login.Button')}&nbsp;
          </Link>
        </p>
      </div>
    </Panel>
  );
}
