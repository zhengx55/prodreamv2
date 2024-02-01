'use client';
import { googleLogin } from '@/query/api';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { memo } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';

const GoogleSignin = ({ label }: { label: string }) => {
  const posthog = usePostHog();
  const [_cookies, setCookie] = useCookies(['token']);
  const router = useRouter();
  const googleAuth = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const { access_token } = codeResponse;
      const login_data = await googleLogin({ access_token });
      setCookie('token', login_data.access_token, {
        path: '/',
        maxAge: 604800,
      });
      const user_id = JSON.parse(atob(login_data.access_token.split('.')[1]))
        .subject.user_id;
      posthog.identify(user_id);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/auxiliary_info`,
        {
          headers: {
            Authorization: `Bearer ${login_data.access_token}`,
          },
        }
      );
      const data = (await res.json()).data;
      if (data && data.document_dialog) {
        router.push('/writtingpal/polish');
      } else {
        router.push('/welcome/education');
      }
      toast.success('Successfully Login');
    },
    onError: (errorResponse) => {
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
