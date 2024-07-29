import { LocaleType } from '@/i18n';
import { userLogin } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

export default function useUserLogin(lang: LocaleType) {
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['token']);
  const transSuccess = useTranslations('Success');
  return useMutation({
    mutationFn: (param: { username: string; password: string }) =>
      userLogin(param),
    onSuccess: async (data) => {
      const toast = (await import('sonner')).toast;
      const successInfo = transSuccess('Successfully_logged_in');
      toast.success(successInfo);
      setCookie('token', data.access_token, {
        path: '/',
        maxAge: 604800,
        secure: true,
        sameSite: 'lax',
      });
      router.push(`/${lang}/brainstorming`);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
}
