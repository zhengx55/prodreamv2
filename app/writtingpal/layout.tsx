'use client';
import Navbar from '@/components/root/Navbar';
import Sidebar from '@/components/root/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import useMount from '@/hooks/useMount';
import { setUser } from '@/store/reducers/userReducer';
import { store } from '@/store/store';
import { useAppDispatch } from '@/store/storehooks';
import { ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { Provider } from 'react-redux';

export default function WrittingpalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['user']);
  useMount(() => {
    if (cookies.user) {
      dispatch(setUser(cookies.user));
    }
  });

  return (
    <Provider store={store}>
      <Sidebar />
      <div className='flex h-full w-full flex-col overflow-x-auto md:overflow-y-hidden'>
        <Navbar />
        <Toaster />
        {children}
      </div>
    </Provider>
  );
}
