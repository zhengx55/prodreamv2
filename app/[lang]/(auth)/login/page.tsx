import GoogleSignin from '@/components/auth/GoogleSignin';
import LoginForm from '@/components/auth/LoginForm';
import Panel from '@/components/auth/Panel';
import CNPanel from '@/components/auth/cn/CnPanel';
import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { getIpAddress } from '@/query/api';
import Link from 'next/link';

export default async function Page({
  params: { lang },
  searchParams: { from },
}: {
  params: { lang: Locale };
  searchParams: { from: string };
}) {
  const dict = await getDictionary(lang);
  const cn_dict = await getDictionary('cn');
  const isInChina = await getIpAddress();

  if (!isInChina)
    return (
      <Panel lang={lang}>
        <div className='flex w-full flex-col sm:w-[500px]'>
          <Spacer y='120' className='block md:hidden' />
          <GoogleSignin
            searchParam={from}
            lang={lang}
            label={dict.Auth.Login.Google}
          />
          <div className='flex-center relative my-10'>
            <Separator orientation='horizontal' className='bg-shadow-border' />
            <p className='small-regular absolute bg-white px-2 text-neutral-300'>
              {dict.Auth.Signup.GoogleDivider}
            </p>
          </div>
          <LoginForm t={dict.Auth} lang={lang} />
          <Spacer y='20' />
          <p className='base-regular text-neutral-400'>
            {dict.Auth.Login.NotAccount}&nbsp;
            <Link
              href={`/${lang}/signup`}
              prefetch
              className='base-semibold text-violet-500'
            >
              {dict.Auth.Signup.Button}
            </Link>
          </p>
        </div>
      </Panel>
    );
  return (
    <CNPanel>
      <div className='flex w-full flex-col sm:w-[500px]'>
        <LoginForm t={cn_dict.Auth} lang={'cn'} />
      </div>
    </CNPanel>
  );
}
