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
    <Panel>
      <div className='flex w-full flex-col sm:w-[600px]'>
        <h1 className='text-[24px] font-[500] sm:text-[28px] 2xl:text-[42px]'>
          Welcome Back!
        </h1>
        <p className='base-medium 2xl:title-medium font-[400] text-shadow-100'>
          Ready to continue crafting your unique story?
        </p>
        <Spacer y='100' className='hidden 2xl:block' />
        <Spacer y='40' className='block 2xl:hidden' />
        <GoogleSignin label='Sign in with Google' />
        <div className='flex-center relative my-10'>
          <Separator orientation='horizontal' className='bg-shadow-border' />
          <p className='small-regular absolute bg-white px-2 text-shadow-100'>
            Or log in with
          </p>
        </div>
        <LoginForm t={dict.Homepage} lang={lang} />
        <Spacer y='20' />
        <p className='small-regular self-center text-black-200'>
          Don&apos;t have an account?&nbsp;
          <Link
            href={`/${lang}/signup`}
            prefetch
            className='small-semibold text-auth-primary'
          >
            Sign up
          </Link>
        </p>
      </div>
    </Panel>
  );
}
