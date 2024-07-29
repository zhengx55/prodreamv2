'use client';
import useMount from '@/hooks/useMount';
import { Locale } from '@/i18n-config';
import { refreshUserSession } from '@/query/api';
import { useUserInfo } from '@/zustand/store';
import { useRouter } from 'next/navigation';

const GlobalInfo = ({ lang }: { lang: Locale }) => {
  const router = useRouter();
  const updateUserInfo = useUserInfo((state) => state.setUser);

  useMount(() => {
    async function refreshUserInfo() {
      try {
        const data = await refreshUserSession();
        updateUserInfo(data);
      } catch (error) {
        router.replace(`/${lang}/login`);
      }
    }
    refreshUserInfo();
  });

  return null;
};
export default GlobalInfo;
