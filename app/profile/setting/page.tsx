'use client';
import AvatarChange from '@/components/profile/AvatarChange';
import Spacer from '@/components/root/Spacer';
import { Secure } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUserInfo } from '@/zustand/store';
import dynamic from 'next/dynamic';
const EditEmail = dynamic(() => import('@/components/profile/EditEmail'), {
  ssr: false,
});

const EditPassword = dynamic(
  () => import('@/components/profile/EditPassword'),
  { ssr: false }
);

export default function Page() {
  const userInfo = useUserInfo((state) => state.user);
  return (
    <main className='flex h-[calc(100vh_-var(--top-nav-bar-height))] w-full flex-col overflow-y-auto px-10 py-5'>
      <h1 className='title-medium'>My Profile</h1>
      <Spacer y='20' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='40' />
      <AvatarChange />
      <Spacer y='32' />
      <h2 className='title-semibold'>Email Address</h2>
      <div className='flex items-center gap-x-4'>
        <h2 className='base-regular text-shadow-100'>{userInfo.email}</h2>
        <EditEmail>
          <Button variant={'ghost'}>Change email</Button>
        </EditEmail>
      </div>
      <Spacer y='32' />
      <h2 className='title-semibold'>Password</h2>
      <div className='flex items-center gap-x-4'>
        <h2 className='base-regular text-shadow-100'>
          ***********************
        </h2>
        <EditPassword>
          <Button variant={'ghost'}>Change password</Button>
        </EditPassword>
      </div>
      <Spacer y='32' />
      <Separator orientation='horizontal' className=' bg-shadow-border' />
      <Spacer y='40' />
      <div className='flex h-[140px] w-[700px] flex-col justify-evenly gap-y-0 rounded-lg bg-shadow-50 p-4'>
        <div className='flex gap-x-6'>
          <Secure />
          <h1 className='title-semibold'>Secure Your Account</h1>
        </div>
        <div className='flex-between flex gap-x-16 pl-12'>
          <p className='base-regular text-shadow-100'>
            To secure your account, please verify via the link we sent to your
            email address
          </p>
          <Button>Resend Link</Button>
        </div>
      </div>
    </main>
  );
}
