import LoginForm from '@/components/auth/LoginForm';
import Panel from '@/components/auth/Panel';
import type { Locale } from '@/i18n-config';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

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
      <div className='flex w-full flex-col justify-center sm:w-[500px]'>
        <LoginForm />
      </div>
    </Panel>
  );
}
