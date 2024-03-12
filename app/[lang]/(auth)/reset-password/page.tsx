import Panel from '@/components/auth/Panel';
import ResetForm from '@/components/auth/RestForm';
import Spacer from '@/components/root/Spacer';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Panel>
        <div className='flex w-full flex-col sm:w-[580px]'>
          <h1 className='text-[24px] font-[500] sm:text-[28px] 2xl:text-[42px]'>
            Reset Password
          </h1>
          <ResetForm t={dict.Homepage} lang={lang} />
          <p className='small-regular mt-8 self-center text-black-200'>
            Switch to&nbsp;
            <Link href={'/login'} className='text-auth-primary'>
              Log in
            </Link>
            &nbsp;or&nbsp;
            <Link href={'/signup'} className='text-auth-primary'>
              Sign up
            </Link>
          </p>
        </div>
      </Panel>
      <div className='relative hidden h-full w-1/2 bg-[#FAF9FF] sm:flex sm:flex-col sm:items-center sm:pt-20'>
        <h1 className='font-baskerville font-[400] sm:text-[40px] 2xl:text-[48px]'>
          Transform your academic <br />
          writing journey
        </h1>
        <Spacer y='80' />
        <Image
          src='/auth/auth.png'
          alt='logo'
          priority
          width={800}
          height={200}
          className='h-auto w-[75%]'
        />
      </div>
    </>
  );
}
