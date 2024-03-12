import GoogleSignin from '@/components/auth/GoogleSignin';
import LoginForm from '@/components/auth/LoginForm';
import Panel from '@/components/auth/Panel';
import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import Link from 'next/link';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  return (
    <Panel lang={lang}>
      <div className='flex w-full flex-col sm:w-[600px]'>
        {/* <h1 className='text-[24px] font-[500] sm:text-[28px] 2xl:text-[42px]'>
          Welcome Back!
        </h1>
        <p className='base-medium 2xl:title-medium font-[400] text-shadow-100'>
          Ready to continue crafting your unique story?
        </p> */}
        {lang === 'en' && <Spacer y='120' className='block 2xl:hidden' />}
        {lang === 'en' && <GoogleSignin label='Sign in with Google' />}
        {lang === 'en' && (
          <div className='flex-center relative my-10'>
            <Separator orientation='horizontal' className='bg-shadow-border' />
            <p className='small-regular absolute bg-white px-2 text-neutral-300'>
              Or log in with
            </p>
          </div>
        )}
        <LoginForm t={dict.Auth} lang={lang} />
        <Spacer y='20' />
        {lang === 'en' && (
          <p className='base-regular text-neutral-400'>
            Don&apos;t have an account?&nbsp;
            <Link
              href={`/${lang}/signup`}
              prefetch
              className='base-semibold text-auth-primary'
            >
              Sign up
            </Link>
          </p>
        )}
      </div>
    </Panel>
  );
}
