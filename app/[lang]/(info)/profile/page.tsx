'use client';

import { logout } from '@/components/info/profile/server_actions';
import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserSession } from '@/query/session';
import { Mail } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const ResetEmail = dynamic(
  () => import('@/components/info/profile/modal/ResetEmail'),
  { ssr: false, loading: () => <Skeleton className='h-5 w-14 rounded-lg' /> }
);
const ResetPassword = dynamic(
  () => import('@/components/info/profile/modal/ResetPassword'),
  { ssr: false, loading: () => <Skeleton className='h-5 w-14 rounded-lg' /> }
);

const ResetName = dynamic(
  () => import('@/components/info/profile/modal/ResetName'),
  { ssr: false, loading: () => <Skeleton className='size-6 rounded-lg' /> }
);

export default function Page() {
  const { data, isPending } = useUserSession();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className='w-[600px]'>
      <h1 className='text-xl font-semibold text-zinc-800'>Profile</h1>
      <Spacer y='8' />
      <Separator orientation='horizontal' className='bg-gray-200' />
      <Spacer y='16' />
      <div className='flex gap-x-4 rounded-lg border border-gray-200 bg-white px-4 py-3'>
        <div className='space-y-2'>
          {isPending ? (
            <Skeleton className='size-[72px] rounded-full' />
          ) : (
            <Image
              alt='avatar'
              src={data!.avatar}
              width={100}
              height={100}
              priority
              className='size-[72px] rounded-full'
            />
          )}
          <Button variant={'ghost'} className='p-0'>
            Chage Avatar
          </Button>
        </div>
        <div className='flex flex-1 items-center gap-x-4'>
          {isPending ? (
            <Skeleton className='h-5 w-10 rounded-lg' />
          ) : (
            <p className='base-medium text-zinc-800'>{data?.name}</p>
          )}

          <ResetName />
        </div>
      </div>
      <Spacer y='16' />
      <Separator orientation='horizontal' className='bg-gray-200' />{' '}
      <Spacer y='16' />
      <h2 className='base-normal'>Binding method display and modification</h2>
      <Spacer y='16' />
      <div className='flex-between rounded-lg border border-gray-200 bg-white px-4 py-2.5'>
        <div className='flex items-center gap-x-4'>
          <span className='flex-center size-8 rounded-full bg-indigo-500'>
            <Mail size={16} className='fill-white text-indigo-500' />
          </span>
          <h3 className='small-regular'>Mail</h3>
        </div>
        <ResetEmail />
      </div>
      <Spacer y='16' />
      <Separator orientation='horizontal' className='bg-gray-200' />
      <Spacer y='16' />
      <h2 className='base-normal'>Password display and modification</h2>
      <Spacer y='16' />
      <div className='flex-between rounded-lg border border-gray-200 bg-white px-4 py-2.5'>
        <h3 className='small-regular'>Password</h3>
        <ResetPassword />
      </div>
      <Spacer y='16' />
      <Button
        onClick={handleLogout}
        className='w-full bg-gray-200 text-zinc-600 hover:bg-gray-300 active:bg-gray-300'
      >
        <Icon
          alt='logout'
          src='/info/logout.svg'
          width={24}
          height={24}
          priority
          className='size-6'
        />
        Logout
      </Button>
    </div>
  );
}
