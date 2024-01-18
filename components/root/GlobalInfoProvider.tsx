'use client';
import useMount from '@/hooks/useMount';
import { refreshUserSession } from '@/query/api';
import { useUserInfo } from '@/zustand/store';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { useCookies } from 'react-cookie';

const GlobalInfoProvider = ({ children }: { children: ReactNode }) => {
  const updateUserInfo = useUserInfo((state) => state.setUser);
  const [_cookies, setCookie] = useCookies(['token']);
  useMount(() => {
    async function refreshUserInfo() {
      try {
        const data = await refreshUserSession();
        /**
         * 获取用户经历信息
         * 用于检查是否是第一次登录 或是 第一次使用某些功能
         **/
        updateUserInfo(data);
        setCookie('token', data.access_token, {
          path: '/',
          maxAge: 604800,
        });
      } catch (error) {
        redirect('/login');
      }
    }

    refreshUserInfo();
  });

  return children;
};
export default GlobalInfoProvider;
