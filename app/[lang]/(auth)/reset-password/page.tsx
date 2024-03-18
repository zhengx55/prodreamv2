import Panel from '@/components/auth/Panel';
import ResetForm from '@/components/auth/RestForm';
import Spacer from '@/components/root/Spacer';
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
      <div className='flex w-full flex-col sm:w-[500px]'>
        <ResetForm t={dict.Auth} lang={lang} />
        <Spacer y='20' />
        {lang === 'en' ? (
          <p className='base-regular text-neutral-400'>
            Switch to&nbsp;
            <Link href={`/${lang}/login`} className='text-auth-primary'>
              Log in
            </Link>
            &nbsp;or&nbsp;
            <Link href={`/${lang}/signup`} className='text-auth-primary'>
              Sign up
            </Link>
          </p>
        ) : (
          <p className='base-medium text-neutral-400'>
            已有账号&nbsp;
            <Link href={`/${lang}/login`} className='text-auth-primary'>
              马上登陆
            </Link>
          </p>
        )}
      </div>
    </Panel>
  );
}
