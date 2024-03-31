'use client';
import { Locale } from '@/i18n-config';
import { getReferralSource } from '@/lib/utils';
import { getUserInfo, googleLogin, refreshUserSession } from '@/query/api';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useCookies } from 'react-cookie';
import { isMobile } from 'react-device-detect';

const GoogleSignin = ({
  label,
  lang,
  searchParam,
}: {
  label: string;
  lang: Locale;
  searchParam?: string;
}) => {
  const [_cookies, setCookie] = useCookies(['token']);
  const router = useRouter();

  const googleAuth = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const referral = getReferralSource();
        const { access_token } = codeResponse;
        const login_data = await googleLogin({
          access_token,
          is_mobile: isMobile,
          traffic_source: searchParam ?? undefined,
          referral,
        });
        setCookie('token', login_data.access_token, {
          path: '/',
          maxAge: 604800,
          secure: true,
          sameSite: 'lax',
        });
        const user_track = await getUserInfo();
        if (Boolean(user_track)) {
          router.push(`/${lang}/editor`);
        } else {
          const name = (await refreshUserSession()).first_name;
          router.push(`/${lang}/onboard`);
        }
      } catch (error) {
        const toast = (await import('sonner')).toast;
        toast.error('Opps! Something went wrong');
      }
    },
    onError: async (errorResponse) => {
      const toast = (await import('sonner')).toast;
      toast.error(errorResponse.error);
    },
  });

  return (
    <button
      onClick={() => googleAuth()}
      className='flex-center w-full cursor-pointer gap-x-2 self-center rounded border border-gray-200 py-4 transition-transform hover:-translate-y-1'
    >
      <Image
        src='/google.svg'
        alt='google'
        width={23}
        height={23}
        priority
        className='h-auto w-auto'
      />
      <h1 className='base-medium 2xl:title-medium text-black'>{label}</h1>
    </button>
  );
};

export default memo(GoogleSignin);
