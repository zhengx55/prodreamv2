import Panel from '@/components/auth/Panel';
import SignUpForm from '@/components/auth/SignUpForm';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';

// Dynamically import components used only for specific locales
const GoogleSignin = dynamic(() => import('@/components/auth/GoogleSignin'));
const Spacer = dynamic(() => import('@/components/root/Spacer'));
const Separator = dynamic(() =>
  import('@/components/ui/separator').then((mod) => ({
    default: mod.Separator,
  }))
);

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  return (
    <Panel lang={lang}>
      <div className='flex w-full flex-col sm:w-[600px]'>
        {lang === 'en' && (
          <>
            <Spacer y='120' className='block 2xl:hidden' />
            <GoogleSignin label='Sign up with Google' />
            <div className='flex-center relative my-10'>
              <Separator
                orientation='horizontal'
                className='bg-shadow-border'
              />
              <p className='small-regular absolute bg-white px-2 text-neutral-300'>
                Or sign up with
              </p>
            </div>
          </>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <SignUpForm t={dict.Auth} lang={lang} />
        </Suspense>
        {lang === 'en' && (
          <p className='base-regular mt-4 text-neutral-400'>
            Already a member?{' '}
            <Link
              href={`/${lang}/login`}
              className='base-semibold text-auth-primary'
            >
              Log in
            </Link>
          </p>
        )}
      </div>
    </Panel>
  );
}
