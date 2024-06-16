'use client';
import { Locale } from '@/i18n-config';
import { getReferralSource } from '@/lib/utils';
import { getUserInfo, googleLogin, refreshUserSession } from '@/query/api';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { useCookies } from 'react-cookie';
import { isMobile } from 'react-device-detect';

const GoogleSignin = ({
  label,
  lang,
  searchParam,
  minimalStyle = false,
}: {
  label?: string;
  lang: Locale;
  searchParam?: string;
  minimalStyle?: boolean;
}) => {
  const [_cookies, setCookie] = useCookies(['token']);
  const router = useRouter();
  const trans = useTranslations('Error');

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
        const toastInfo = trans('Something_went_wrong');
        toast.error(toastInfo);
      }
    },
    onError: async (errorResponse) => {
      const toast = (await import('sonner')).toast;
      toast.error(errorResponse.error);
    },
  });

  const buttonClass = minimalStyle
    ? 'flex-center w-12 h-12 rounded-full border-none'
    : 'flex-center w-full cursor-pointer gap-x-2 self-center rounded border border-gray-200 py-4 transition-transform hover:-translate-y-1';

  return (
    <button onClick={() => googleAuth()} className={buttonClass}>
      <Image
        src='/auth/google.svg'
        alt='google'
        width={23}
        height={23}
        priority
        className='h-auto w-auto'
      />
      {label && (
        <h1 className='base-medium 2xl:title-medium text-black'>{label}</h1>
      )}
    </button>
  );
};

export default memo(GoogleSignin);
