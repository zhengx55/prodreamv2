'use client';
import { googleLogin } from '@/query/api';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';

const GoogleSignin = () => {
  const [_cookies, setCookie] = useCookies(['token']);
  const router = useRouter();
  const googleAuth: () => void = useGoogleLogin({
    flow: 'implicit',
    onSuccess: async (codeResponse) => {
      const { access_token } = codeResponse;
      const loginData = await googleLogin({ access_token });
      setCookie('token', loginData.access_token, {
        path: '/',
        maxAge: 604800,
      });
      router.push('/writtingpal/polish');
      toast.success('Successfully Login');
    },
    onError: (errorResponse) => {
      toast.error(errorResponse.error);
    },
  });
  return (
    <button
      onClick={googleAuth}
      className='flex-center w-64 cursor-pointer gap-x-2 self-center rounded-2xl border border-shadow-border py-2 transition-transform hover:-translate-y-1'
    >
      <Image
        src='/google.svg'
        alt='google'
        width={23}
        height={23}
        priority
        className='h-auto w-auto'
      />
      <h1 className='small-semibold text-black-200'>Google</h1>
    </button>
  );
};

export default memo(GoogleSignin);
