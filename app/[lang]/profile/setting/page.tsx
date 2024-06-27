import Membership from '@/components/profile/Membership';
import MembershipCN from '@/components/profile/MembershipCN';
import Setting from '@/components/profile/Setting';
import SettingCN from '@/components/profile/SettingCN';
import Verification from '@/components/profile/Verification';
import VerificationCN from '@/components/profile/VerificationCN';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { LoginData } from '@/query/type';
import LogoutLinkCN from '@/components/profile/LogoutLinkCN';
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
  unstable_setRequestLocale(params.lang);

  const t = await getTranslations('Homepage');
  const userInfo: LoginData = await getUserInfo();
  const memberInfo: ISubscription = await getMembership();
  const dict = (await getDictionary(params.lang)).Editor;

  const isInChina = params.lang === 'cn';

  return (
    <main className='flex h-full w-full flex-col overflow-y-auto px-10 py-5'>
      {isInChina ? <SettingCN userInfo={userInfo} /> : <Setting userInfo={userInfo} />}
      {isInChina ? <MembershipCN lang={params.lang} t={dict} membership={memberInfo} /> : <Membership lang={params.lang} t={dict} membership={memberInfo} />}
      {isInChina ? <VerificationCN isGoogle={userInfo.is_google} isVerified={userInfo.is_verified} /> : <Verification isGoogle={userInfo.is_google} isVerified={userInfo.is_verified} />}
      {isInChina ? <LogoutLinkCN /> : null}
    </main>
  );
}
