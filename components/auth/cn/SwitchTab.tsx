'use client';

import { Locale } from '@/i18n-config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../../ui/button';

const SwitchTab = ({ lang }: { lang: Locale }) => {
  const path = usePathname();
  const isSignup = path.includes('signup');
  const isLogin = path.includes('login');
  return (
    <div className='flex w-full items-center gap-x-6 sm:w-[500px]'>
      <Button
        role='link'
        disabled={isLogin}
        className={`${isLogin ? 'border-violet-500' : 'border-transparent'} h-max w-max rounded-none border-b-[4px] px-0.5 py-1 text-xl font-medium text-neutral-400 disabled:opacity-100 sm:text-[32px]`}
        variant={'ghost'}
      >
        <Link href={`/${lang}/login`}>登录</Link>
      </Button>

      <Button
        role='link'
        disabled={isSignup}
        className={`${isSignup ? ' border-violet-500' : 'border-transparent'} h-max w-max rounded-none border-b-[4px] px-0.5 py-1 text-xl font-medium text-neutral-400 disabled:opacity-100 sm:text-[32px]`}
        variant={'ghost'}
      >
        <Link href={`/${lang}/signup`}>注册</Link>
      </Button>
    </div>
  );
};
export default SwitchTab;
