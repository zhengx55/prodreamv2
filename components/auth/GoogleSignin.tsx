'use client';
import { Locale } from '@/i18n-config';
import { getUserInfo, googleLogin, refreshUserSession } from '@/query/api';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { memo } from 'react';
import { useCookies } from 'react-cookie';

const GoogleSignin = ({ label, lang }: { label: string; lang: Locale }) => {
  const posthog = usePostHog();
  const [_cookies, setCookie] = useCookies(['token']);
  const router = useRouter();
  const googleAuth = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { access_token } = codeResponse;
        const login_data = await googleLogin({ access_token });
        setCookie('token', login_data.access_token, {
          path: '/',
          maxAge: 604800,
          secure: true,
          sameSite: 'lax',
        });

        const user_id = JSON.parse(atob(login_data.access_token.split('.')[1]))
          .subject.user_id;
        posthog.identify(user_id);
        const user_track = await getUserInfo();
        if (Boolean(user_track)) {
          router.push('/editor');
        } else {
          const name = (await refreshUserSession()).first_name;
          // const new_doc_id = await createDoc(
          //   SampleEssay.TEXT,
          //   SampleEssay.TITLE
          // );
          // router.push(`/editor/${new_doc_id}`);
          router.push(`/${lang}/onboard?name=${name}`);
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
      className='flex-center w-full cursor-pointer gap-x-2 self-center rounded border border-shadow-border py-4 transition-transform hover:-translate-y-1'
    >
      <Image
        src='/google.svg'
        alt='google'
        width={23}
        height={23}
        priority
        className='h-auto w-auto'
      />
      <h1 className='base-medium 2xl:title-medium text-black-200'>{label}</h1>
    </button>
  );
};

export default memo(GoogleSignin);
