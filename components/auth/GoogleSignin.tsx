'use client';
import { SampleEssay } from '@/constant/enum';
import { createDoc, getUserInfo, googleLogin } from '@/query/api';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { memo } from 'react';
import { useCookies } from 'react-cookie';

const GoogleSignin = ({ label }: { label: string }) => {
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
        });
        const user_id = JSON.parse(atob(login_data.access_token.split('.')[1]))
          .subject.user_id;
        posthog.identify(user_id);
        const user_track = await getUserInfo();
        if (Boolean(user_track)) {
          router.push('/editor');
        } else {
          const new_doc_id = await createDoc(
            SampleEssay.TEXT,
            SampleEssay.TITLE
          );
          router.push(`/editor/${new_doc_id}`);
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
  const login = () => {
    googleAuth();
  };

  return (
    <button
      onClick={login}
      className='flex-center w-full cursor-pointer gap-x-2 self-center rounded border border-shadow-border py-2 transition-transform hover:-translate-y-1'
    >
      <Image
        src='/google.svg'
        alt='google'
        width={23}
        height={23}
        priority
        className='h-auto w-auto'
      />
      <h1 className='small-semibold 2xl:base-semibold text-black-200'>
        {label}
      </h1>
    </button>
  );
};

export default memo(GoogleSignin);
