'use client';

import { Locale } from '@/i18n-config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

type Props = {};
const SwitchTab = ({ lang }: { lang: Locale }) => {
  const path = usePathname();
  const isSignup = path.includes('signup');
  const isLogin = path.includes('login');
  return (
    <div className='flex items-center gap-x-6 sm:w-[600px]'>
      <Button
        role='link'
        disabled={isLogin}
        className={`${isLogin ? 'border-doc-primary' : 'border-transparent'} h-max w-max rounded-none border-b-[4px] px-0.5 py-1 text-xl font-medium text-doc-font disabled:opacity-100 sm:text-[32px]`}
        variant={'ghost'}
      >
        <Link href={`/${lang}/login`}>登录</Link>
      </Button>

      <Button
        role='link'
        disabled={isSignup}
        className={`${isSignup ? ' border-doc-primary' : 'border-transparent'} h-max w-max rounded-none border-b-[4px] px-0.5 py-1 text-xl font-medium text-doc-font disabled:opacity-100 sm:text-[32px]`}
        variant={'ghost'}
      >
        <Link href={`/${lang}/signup`}>注册</Link>
      </Button>
    </div>
  );
};
export default SwitchTab;
