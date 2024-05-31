import Membership from '@/components/profile/Membership';
import Setting from '@/components/profile/Setting';
import Verification from '@/components/profile/Verification';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { LoginData } from '@/query/type';
import { ISubscription } from '@/types';
import { cookies } from 'next/headers';

async function getUserInfo() {
  const token = cookies().get('token')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.data;
}

async function getMembership() {
  const token = cookies().get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/balance`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await res.json();
  if (data.code !== 0) {
    throw data.msg;
  }
  return data.data;
}

export default async function Page({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const t = await getTranslations('Homepage');
  const userInfo: LoginData = await getUserInfo();
  const memberInfo: ISubscription = await getMembership();
  const dict = (await getDictionary(params.lang)).Editor;

  return (
    <main className='flex h-full w-full flex-col overflow-y-auto px-10 py-5'>
      <Setting userInfo={userInfo} />
      <Membership lang={params.lang} t={dict} membership={memberInfo} />
      <Verification
        isGoogle={userInfo.is_google}
        isVerified={userInfo.is_verified}
      />
    </main>
  );
}
