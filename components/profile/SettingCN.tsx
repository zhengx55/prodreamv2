'use client';
import AvatarChange from '@/components/profile/AvatarChange';
import { useTranslations } from 'next-intl';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
import { LoginData } from '../../query/type';
import { Skeleton } from '../ui/skeleton';
import { ChevronLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

const EditPhone = dynamic(() => import('@/components/profile/EditPhoneCN'), {
  ssr: false,
  loading: () => <Skeleton className='h-5 w-20 rounded' />,
});

const EditEmail = dynamic(() => import('@/components/profile/EditEmailCN'), {
  ssr: false,
  loading: () => <Skeleton className='h-5 w-20 rounded' />,
});

const EditPassword = dynamic(
  () => import('@/components/profile/EditPasswordCN'),
  { ssr: false, loading: () => <Skeleton className='h-5 w-20 rounded' /> }
);

const SettingCN = ({ userInfo }: { userInfo: LoginData }) => {
  const tProfile = useTranslations('Profile');
  const router = useRouter();
  const { lang } = useParams();

  const ToEditor = () => {
    router.push(`/${lang}/editor`);
  };

  return (
    <>
      <h1 className='title-medium'>
        <span className='flex items-center gap-x-2'>
          <ChevronLeft
            size={24}
            className='cursor-pointer'
            onClick={ToEditor}
          />
          {tProfile('Setting.My_Profile')}
        </span>
      </h1>
      <Spacer y='20' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='40' />
      <AvatarChange />
      <Spacer y='32' />
      <h2 className='flex items-center text-base font-normal text-[#202020]'>
        <span>{tProfile('Setting.Phone_number')}</span>
        <EditPhone userInfo={userInfo}>
          <div className='flex items-center gap-x-4 px-8'>
            <Button variant={'ghost'} className='h-max p-0'>
              {userInfo.phone_number
                ? tProfile('Setting.To_change')
                : tProfile('Setting.To_bind_phone_number')}
            </Button>
          </div>
        </EditPhone>
      </h2>
      <Spacer y='10' />
      <h2 className='base-regular text-shadow-100'>
        {userInfo?.phone_number ?? tProfile('Setting.Not_bind_phone_number')}
      </h2>
      <Spacer y='32' />
      <h2 className='flex items-center text-base font-normal text-[#202020]'>
        <span>{tProfile('Setting.Email_Address')}</span>
        <EditEmail userInfo={userInfo}>
          <div className='flex items-center gap-x-4 px-8'>
            <Button variant={'ghost'} className='h-max p-0'>
              {userInfo.email
                ? tProfile('Setting.To_change')
                : tProfile('Setting.To_bind_email')}
            </Button>
          </div>
        </EditEmail>
      </h2>
      <Spacer y='10' />
      <div className='flex items-center gap-x-4'>
        <h2 className='base-regular text-shadow-100'>
          <span>{userInfo?.email ?? tProfile('Setting.Not_bind_email')}</span>
        </h2>
      </div>
      <Spacer y='32' />
      <h2 className='flex items-center text-base font-normal text-[#202020]'>
        <span>{tProfile('Setting.Password')}</span>
        <EditPassword userInfo={userInfo}>
          <div className='flex items-center gap-x-4 px-8'>
            <Button variant={'ghost'} className='h-max p-0'>
              {tProfile('Setting.To_change')}
            </Button>
          </div>
        </EditPassword>
      </h2>
      <Spacer y='10' />
      <div className='flex items-center gap-x-4'>
        <h2 className='base-regular text-shadow-100'>{'**********'}</h2>
      </div>
      <Spacer y='25' />
      <Separator orientation='horizontal' className='w-2/3 bg-shadow-border' />
      <Spacer y='25' />
    </>
  );
};
export default SettingCN;
