import Panel from '@/components/auth/Panel';
import ResetForm from '@/components/auth/RestForm';
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
        {/* <h1 className='text-[24px] font-[500] sm:text-[28px] 2xl:text-[42px]'>
          Reset Password
        </h1> */}
        <ResetForm t={dict.Homepage} lang={lang} />
        <p className='small-regular mt-8 self-center text-black-200'>
          Switch to&nbsp;
          <Link href={`/${lang}/login`} className='text-auth-primary'>
            Log in
          </Link>
          &nbsp;or&nbsp;
          <Link href={`/${lang}/signup`} className='text-auth-primary'>
            Sign up
          </Link>
        </p>
      </div>
    </Panel>
  );
}
