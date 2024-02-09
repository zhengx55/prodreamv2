'use client';
import { Button } from '@/components/ui/button';
import { profileResetAvatar, refreshUserSession } from '@/query/api';
import { useUserInfo } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
import { toast } from 'sonner';

const EditName = dynamic(() => import('@/components/profile/EditName'), {
  ssr: false,
});
const AvatarChange = () => {
  const setUserAvatar = useUserInfo((state) => state.setUserAvatar);
  const uploadRef = useRef<HTMLInputElement>(null);
  const userInfo = useUserInfo((state) => state.user);
  const { mutateAsync: upLoadAvatar } = useMutation({
    mutationFn: (params: { file: File }) => profileResetAvatar(params),
    onSuccess: async () => {
      const data = await refreshUserSession();
      setUserAvatar(data.avatar);
      toast.success('avatar has been reset successfully!');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size > 200 * 1024) {
      toast.error('File is larger than 200KB');
      return;
    }
    if (file) {
      await upLoadAvatar({ file });
    }
  };

  return (
    <div className='flex items-center gap-x-4'>
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
            placeholder='empty'
            height={70}
            src={
              userInfo.avatar
                ? userInfo.avatar
                : 'https://quickapply.blob.core.windows.net/avatar/default.jpg'
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
        <EditName>
          <Button variant={'ghost'}>Change name</Button>
        </EditName>
      </div>
    </div>
  );
};
export default AvatarChange;
