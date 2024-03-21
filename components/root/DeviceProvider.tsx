'use client';
import useMount from '@/hooks/useMount';
import { refreshUserSession } from '@/query/api';
import { useUserInfo } from '@/zustand/store';
import { redirect, useParams, usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const param = useParams();
  const isEssayDetail = param['id'] && path.includes('/editor');
  const updateUserInfo = useUserInfo((state) => state.setUser);
  useMount(() => {
    async function refreshUserInfo() {
      try {
        const data = await refreshUserSession();
        updateUserInfo(data);
      } catch (error) {
        redirect('/login');
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
