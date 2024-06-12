'use client';
import { Locale } from '@/i18n-config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../../ui/button';

// This is only for CN login/signup
const SwitchTab = ({ lang }: { lang: Locale }) => {
  const path = usePathname();
  const isSignup = path.includes('signup');
  const isLogin = path.includes('login');

  return (
    <div className='flex w-full items-center gap-x-8 border-b-[2px] border-neutral-200 relative sm:w-[600px]'>
      <Button
        role='link'
        disabled={isLogin}
        className={`${isLogin ? 'border-violet-500 text-violet-500' : 'border-neutral-200 text-neutral-400'} cursor-pointer no-underline hover:no-underline h-max w-max rounded-none border-b-[2px] px-0.5 py-1 text-xl font-medium disabled:opacity-100 pb-4 sm:text-[24px] relative z-10 -mb-[2px]`}
        variant={'ghost'}
      >
        <Link className="" href={`/${lang}/login`}>{'验证码登录'}</Link>
      </Button>

      <Button
        role='link'
        disabled={isSignup}
        className={`${isSignup ? ' border-violet-500 text-violet-500' : 'border-neutral-200 text-neutral-400'} cursor-pointer no-underline hover:no-underline h-max w-max rounded-none border-b-[2px] px-0.5 py-1 text-xl font-medium disabled:opacity-100 pb-4 sm:text-[24px] relative z-10 -mb-[2px]`}
        variant={'ghost'}
      >
        <Link href={`/${lang}/signup`}>{'密码登录'}</Link>
      </Button>
    </div>
  );
};
export default SwitchTab;
