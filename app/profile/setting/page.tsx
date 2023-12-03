/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { profileResetAvatar, refreshUserSession } from '@/query/api';
import { selectUser } from '@/store/reducers/userReducer';
import { useAppSelector } from '@/store/storehooks';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
const EditEmail = dynamic(() => import('@/components/profile/EditEmail'));
const EditName = dynamic(() => import('@/components/profile/EditName'));
const EditPassword = dynamic(() => import('@/components/profile/EditPassword'));

export default function Page() {
  const userInfo = useAppSelector(selectUser);
  const uploadRef = useRef<HTMLInputElement>(null);
  const [IsEditEmail, setEditEmail] = useState(false);
  const [IsEditPassword, setEditPassword] = useState(false);
  const [IsEditName, setEditName] = useState(false);
  const { toast } = useToast();
  const toogleEmailModal = useCallback(() => {
    setEditEmail((prev) => !prev);
  }, []);

  const { mutateAsync: upLoadAvatar } = useMutation({
    mutationFn: (params: { file: File }) => profileResetAvatar(params),
    onSuccess: async () => {
      toast({
        variant: 'default',
        description: 'Email has been reset successfully!',
      });
      const data = await refreshUserSession();
      console.log('🚀 ~ file: page.tsx:37 ~ onSuccess: ~ data:', data);
    },

    onError: (error) => {
      toast({
        variant: 'destructive',
        description: error.message,
      });
    },
  });

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size > 200 * 1024) {
      toast({
        variant: 'destructive',
        description: 'File is larger than 200KB',
      });
      return;
    }
    if (file) {
      await upLoadAvatar({ file });
    }
  };

  const togglePassModal = useCallback(() => {
    setEditPassword((prev) => !prev);
  }, []);

  const toggleNameModal = useCallback(() => {
    setEditName((prev) => !prev);
  }, []);
  return (
    <main className='flex flex-1 flex-col md:px-16 md:py-10'>
      <EditName isActive={IsEditName} toogleActive={toggleNameModal} />
      <EditEmail isActive={IsEditEmail} toogleActive={toogleEmailModal} />
      <EditPassword isActive={IsEditPassword} toogleActive={togglePassModal} />
      <h1 className='h2-bold'>Profile</h1>
      <Separator orientation='horizontal' className='mt-7 bg-shadow-border' />
      <div className='mt-7 flex items-center gap-x-4'>
        <div className='flex w-max flex-col items-center gap-y-2'>
          <div
            onClick={() => {
              uploadRef.current?.click();
            }}
            className='flex-center relative h-[70px] w-[70px] cursor-pointer overflow-hidden rounded-full bg-[rgba(152,34,245,.25)] hover:opacity-50'
          >
            <Image
              alt={userInfo.last_name}
              className='h-auto w-auto'
              width={70}
              height={70}
              src={
                !userInfo.avatar
                  ? '/max.png'
                  : `${process.env.NEXT_PUBLIC_API_STATIC_URL}${userInfo.avatar}`
              }
            />
            <input
              ref={uploadRef}
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
            />
          </div>
          <p className='subtle-regular text-shadow-100'>Edit</p>
        </div>
        <div className='flex flex-col'>
          <h2 className='title-semibold pl-4'>
            {userInfo.first_name} {userInfo.last_name}
          </h2>
          <Button
            onClick={toggleNameModal}
            className='text-primary-200 '
            variant={'ghost'}
          >
            Change name
          </Button>
        </div>
      </div>
      <h2 className='title-semibold mt-12'>Email Address</h2>
      <div className='flex items-center gap-x-4'>
        <h2 className='base-regular text-shadow-100'>{userInfo.email}</h2>
        <Button
          onClick={toogleEmailModal}
          className='text-primary-200 '
          variant={'ghost'}
        >
          Change email
        </Button>
      </div>
      <h2 className='title-semibold mt-12'>Password</h2>
      <div className='flex items-center gap-x-4'>
        <h2 className='base-regular text-shadow-100'>
          ***********************
        </h2>
        <Button
          className='text-primary-200'
          onClick={togglePassModal}
          variant={'ghost'}
        >
          Change password
        </Button>
      </div>
      <Separator orientation='horizontal' className='mt-7 bg-shadow-border' />
      <div className='mt-7 flex h-[140px] w-[750px] flex-col justify-evenly gap-y-0 rounded-lg bg-shadow-50 p-4'>
        <div className='flex gap-x-6'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='23'
            height='24'
            viewBox='0 0 23 24'
            fill='none'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12.9375 1L2.875 5V11C2.875 16.55 7.16833 21.74 12.9375 23C18.7067 21.74 23 16.55 23 11V5L12.9375 1ZM10.7014 17.0001L6.22917 13.0001L7.80562 11.5901L10.7014 14.1701L18.0694 7.58008L19.6458 9.00008L10.7014 17.0001Z'
              fill='#E46C6C'
            />
          </svg>
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
