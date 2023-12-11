'use client';
import Navbar from '@/components/root/Navbar';
import Sidebar from '@/components/root/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import MaxChatProvider from '@/context/MaxChateProvider';
import useMount from '@/hooks/useMount';
import { refreshUserSession } from '@/query/api';
import { setUser } from '@/store/reducers/userSlice';
import { store } from '@/store/store';
import { useAppDispatch } from '@/store/storehooks';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { Provider } from 'react-redux';

const TutorialSheet = dynamic(() => import('@/components/tutorial'), {
  ssr: false,
});

export default function WrittingpalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [cookies, setCookie] = useCookies(['token']);

  useMount(() => {
    async function refreshUserInfo() {
      const data = await refreshUserSession();
      dispatch(setUser(data));
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
    <Provider store={store}>
      <MaxChatProvider>
        <Sidebar />
      </MaxChatProvider>
      <>
        <div className='relative hidden h-full w-full flex-col overflow-x-auto sm:flex sm:overflow-y-hidden'>
          <Navbar />
          <Toaster />
          <TutorialSheet />
          {children}
        </div>
        {/* TODO: Mobile */}
        <div className='flex sm:hidden'></div>
      </>
    </Provider>
  );
}
