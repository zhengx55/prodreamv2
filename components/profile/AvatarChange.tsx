'use client';
import { Button } from '@/components/ui/button';
import { profileResetAvatar, refreshUserSession } from '@/query/api';
import { useUserInfo } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
import { toast } from 'sonner';

const EditName = dynamic(() => import('@/components/profile/EditName'), {
  ssr: false,
});
const AvatarChange = () => {
  const t = useTranslations('Profile');
  const tError = useTranslations('Error');
  const tSuccess = useTranslations('Success');
  const { lang } = useParams();
  const isInChina = lang === 'cn';
  const setUserAvatar = useUserInfo((state) => state.setUserAvatar);
  const uploadRef = useRef<HTMLInputElement>(null);
  const userInfo = useUserInfo((state) => state.user);
  const { mutateAsync: upLoadAvatar } = useMutation({
    mutationFn: (params: { file: File }) => profileResetAvatar(params),
    onSuccess: async () => {
      const data = await refreshUserSession();
      setUserAvatar(data.avatar);
      const toastInfo = tSuccess('Avatar_has_been_reset_successfully');
      toast.success(toastInfo);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size > 200 * 1024) {
      const toastInfo = tError('File_is_larger_than_200KB');
      toast.error(toastInfo);
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
          className='relative h-[70px] w-[70px] cursor-pointer overflow-hidden rounded-full hover:opacity-50'
        >
          <Image
            alt={userInfo.last_name}
            className='h-auto w-auto'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
            priority
            placeholder='empty'
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
        <p className='subtle-regular text-shadow-100'>
          {isInChina ? null : t('Setting.Edit')}
        </p>
      </div>
      <div className='flex flex-col gap-y-2 pl-4'>
        <h2 className='title-semibold'>
          {userInfo.first_name} {userInfo.last_name}
        </h2>
        <EditName>
          <Button
            variant={'ghost'}
            role='button'
            className={`h-max p-0 ${isInChina ? 'justify-start' : 'justify-center'}`}
          >
            {t('Setting.Change_name')}
          </Button>
        </EditName>
      </div>
    </div>
  );
};
export default AvatarChange;
