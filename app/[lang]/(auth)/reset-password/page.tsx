import Panel from '@/components/auth/Panel';
import ResetForm from '@/components/auth/RestForm';
import Spacer from '@/components/root/Spacer';
import type { Locale } from '@/i18n-config';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  unstable_setRequestLocale(lang);
  const trans = await getTranslations('Auth');

  return (
    <Panel lang={lang}>
      <div className='flex w-full flex-col sm:w-[600px]'>
        <ResetForm />
        <Spacer y='20' />
        {lang === 'en' ? (
          <p className='base-regular text-neutral-400'>
            {trans('ResetPassword.Switch_to')}&nbsp;
            <Link href={`/${lang}/login`} className='text-violet-500'>
              {trans('ResetPassword.Log_in')}
            </Link>
            &nbsp;or&nbsp;
            <Link href={`/${lang}/signup`} className='text-violet-500'>
              {trans('ResetPassword.Sign_up')}
            </Link>
          </p>
        ) : null}
      </div>
    </Panel>
  );
}
