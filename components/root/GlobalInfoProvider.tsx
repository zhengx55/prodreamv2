'use client';
import useMount from '@/hooks/useMount';
import { refreshUserSession } from '@/query/api';
import { useUserInfo } from '@/zustand/store';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const GlobalInfoProvider = ({ children }: { children: ReactNode }) => {
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
  return children;
};
export default GlobalInfoProvider;
