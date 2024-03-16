'use client';
import useMount from '@/hooks/useMount';
import { refreshUserSession } from '@/query/api';
import { useUserInfo } from '@/zustand/store';
import dynamic from 'next/dynamic';
import { redirect, useParams, usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
const DiscountModal = dynamic(
  () => import('@/components/editor/modal/Discount')
);

const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const param = useParams();
  const isEssayDetail =
    Object.keys(param).length > 0 && path.includes('/editor');

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
      <DiscountModal />
      {!isEssayDetail && <Sidebar />}
      {children}
    </>
  );
};
export default DeviceProvider;
