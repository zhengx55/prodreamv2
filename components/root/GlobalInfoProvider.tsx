'use client';
import { initialUsage } from '@/constant';
import useMount from '@/hooks/useMount';
import { getUserInfo, refreshUserSession } from '@/query/api';
import { setUsage } from '@/store/reducers/usageSlice';
import { setUser } from '@/store/reducers/userSlice';
import { useAppDispatch } from '@/store/storehooks';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { useCookies } from 'react-cookie';

const GlobalInfoProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [_cookies, setCookie] = useCookies(['token']);

  useMount(() => {
    async function refreshUserInfo() {
      try {
        const data = await refreshUserSession();
        const user_usage = await getUserInfo(data.email);
        /**
         * 获取用户经历信息
         * 用于检查是否是第一次登录 或是 第一次使用某些功能
         **/
        dispatch(setUser(data));
        if (user_usage) dispatch(setUsage(user_usage));
        else dispatch(setUsage(initialUsage));
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
