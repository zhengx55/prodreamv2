'use client';
import ProfileSidebar from '@/components/root/ProfileSidebar';
import { Toaster } from '@/components/ui/toaster';
import useMount from '@/hooks/useMount';
import { refreshUserSession } from '@/query/api';
import { setUser } from '@/store/reducers/userReducer';
import { store } from '@/store/store';
import { useAppDispatch } from '@/store/storehooks';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { Provider } from 'react-redux';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token']);

  useMount(() => {
    async function refreshUserInfo() {
      const data = await refreshUserSession();
      dispatch(setUser(data));
    }
    if (!cookies.token) {
      redirect('/login');
    } else {
      refreshUserInfo();
    }
  });

  return (
    <Provider store={store}>
      <ProfileSidebar />
      <div className='flex h-full w-full flex-col overflow-x-auto md:overflow-y-hidden'>
        <Toaster />
        {children}
      </div>
    </Provider>
  );
}
