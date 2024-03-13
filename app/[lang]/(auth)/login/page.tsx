import LoginForm from '@/components/auth/LoginForm';
import Panel from '@/components/auth/Panel';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import dynamic from 'next/dynamic';
import Link from 'next/link';

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
      <div className='flex w-full flex-col sm:w-[500px]'>
        <Spacer y='120' className='block md:hidden' />
        <GoogleSignin lang={lang} label={dict.Auth.Login.Google} />
        <div className='flex-center relative my-10'>
          <Separator orientation='horizontal' className='bg-shadow-border' />
          <p className='small-regular absolute bg-white px-2 text-neutral-300'>
            {dict.Auth.Login.GoogleDivider}
          </p>
        </div>
        <LoginForm t={dict.Auth} lang={lang} />
        <Spacer y='20' />
        <p className='base-regular text-neutral-400'>
          {dict.Auth.Login.NotAccount}&nbsp;
          <Link
            href={`/${lang}/signup`}
            prefetch
            className='base-semibold text-auth-primary'
          >
            {dict.Auth.Signup.Button}
          </Link>
        </p>
      </div>
    </Panel>
  );
}
