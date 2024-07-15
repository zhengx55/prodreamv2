'use client';
import useMount from '@/hooks/useMount';
import { Locale } from '@/i18n-config';
import { refreshUserSession } from '@/query/api';
import { useUserInfo } from '@/zustand/store';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

const DeviceProvider = ({
  children,
  lang,
}: {
  children: ReactNode;
  lang: Locale;
}) => {
  const path = usePathname();
  const param = useParams();
  const isEssayDetail = param['id'] && path.includes('/editor');
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

  return (
    <>
      {!isEssayDetail && <Sidebar />}
      {children}
    </>
  );
};
export default DeviceProvider;
