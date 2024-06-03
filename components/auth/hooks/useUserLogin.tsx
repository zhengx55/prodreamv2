import { LocaleType } from '@/i18n';
import { userLogin } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

export default function useUserLogin(lang: LocaleType) { 
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['token']);
  return useMutation({
    mutationFn: (param: { username: string; password: string }) =>
      userLogin(param),
    onSuccess: async (data) => {
      const toast = (await import('sonner')).toast;
      toast.success('Successfully Login');
      setCookie('token', data.access_token, {
        path: '/',
        maxAge: 604800,
        secure: true,
        sameSite: 'lax',
      });
      router.push(`/${lang}/editor`);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
}
