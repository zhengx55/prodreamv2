'use client';
import Navbar from '@/components/root/Navbar';
import ProfileSidebar from '@/components/root/ProfileSidebar';
import Sidebar from '@/components/root/Sidebar';
import { initialUsage } from '@/constant';
import useMount from '@/hooks/useMount';
import { getUserInfo, refreshUserSession } from '@/query/api';
import { setUsage } from '@/store/reducers/usageSlice';
import { setUser } from '@/store/reducers/userSlice';
import { useAppDispatch } from '@/store/storehooks';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { useCookies } from 'react-cookie';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const [cookies, setCookie] = useCookies(['token']);

  useMount(() => {
    async function refreshUserInfo() {
      const data = await refreshUserSession();
      const user_usage = await getUserInfo(data.email);
      dispatch(setUser(data));
      if (user_usage) dispatch(setUsage(user_usage));
      else dispatch(setUsage(initialUsage));
      setCookie('token', data.access_token, {
        path: '/',
        maxAge: 604800,
      });
    }
    if (!cookies.token) {
      redirect('/login');
    } else {
      refreshUserInfo();
    }
  });

  return (
    <>
      <Sidebar />
      <div className='hidden h-full w-full flex-col overflow-x-auto sm:flex md:overflow-y-hidden'>
        <Navbar />
        <main className='flex flex-1'>
          <ProfileSidebar />
          {children}
        </main>
      </div>
    </>
  );
}
