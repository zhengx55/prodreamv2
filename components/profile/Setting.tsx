'use client';
import AvatarChange from '@/components/profile/AvatarChange';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUserInfo } from '@/zustand/store';
import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';
const EditEmail = dynamic(() => import('@/components/profile/EditEmail'), {
  ssr: false,
  loading: () => <Skeleton className='h-5 w-20 rounded' />,
});

const EditPassword = dynamic(
  () => import('@/components/profile/EditPassword'),
  { ssr: false, loading: () => <Skeleton className='h-5 w-20 rounded' /> }
);

const Setting = () => {
  const userInfo = useUserInfo((state) => state.user);
  return (
    <>
      <h1 className='title-medium'>My Profile</h1>
      <Spacer y='20' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='40' />
      <AvatarChange />
      <Spacer y='32' />
      <h2 className='title-semibold'>Email Address</h2>
      <Spacer y='10' />
      <div className='flex items-center gap-x-4'>
        <h2 className='base-regular text-shadow-100'>{userInfo.email}</h2>
        <EditEmail>
          <Button variant={'ghost'} className='h-max p-0'>
            Change email
          </Button>
        </EditEmail>
      </div>
      <Spacer y='32' />
      <h2 className='title-semibold'>Password</h2>
      <Spacer y='10' />
      <div className='flex items-center gap-x-4'>
        <h2 className='base-regular text-shadow-100'>
          ***********************
        </h2>
        <EditPassword>
          <Button variant={'ghost'} className='h-max p-0'>
            Change password
          </Button>
        </EditPassword>
      </div>
      <Spacer y='32' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='40' />
    </>
  );
};
export default Setting;
