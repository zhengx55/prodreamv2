"use client"
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

const EditEmail = dynamic(() => import('@/components/profile/EditEmail'), {
  ssr: false,
  loading: () => <Skeleton className='h-5 w-20 rounded' />,
});

const EditPassword = dynamic(
  () => import('@/components/profile/EditPassword'),
  { ssr: false, loading: () => <Skeleton className='h-5 w-20 rounded' /> }
);

const Setting = ({ userInfo }: { userInfo: LoginData }) => {
  const t = useTranslations('Profile');
  const router = useRouter();
  const { lang } = useParams();

  const ToEditor = () => {
    router.push(`/${lang}/editor`);
  }

  return (
    <>
      <h1 className='title-medium'>
        <span className='flex items-center gap-x-2'>
          <ChevronLeft size={24} className='cursor-pointer' onClick={ToEditor} />
          {t('Setting.My_Profile')}
        </span>
      </h1>
      <Spacer y='20' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='40' />
      <AvatarChange />
      <Spacer y='32' />
      <h2 className='title-semibold'>{t('Setting.Email_Address')}</h2>
      <Spacer y='10' />
      <div className='flex items-center gap-x-4'>
        <h2 className='base-regular text-shadow-100'>{userInfo.email}</h2>
        <EditEmail>
          <Button variant={'ghost'} className='h-max p-0'>
            {t('Setting.Change_email')}
          </Button>
        </EditEmail>
      </div>
      <Spacer y='32' />
      <h2 className='title-semibold'>{t('Setting.Password')}</h2>
      <Spacer y='10' />
      <div className='flex items-center gap-x-4'>
        <h2 className='base-regular text-shadow-100'>
          ***********************
        </h2>
        <EditPassword>
          <Button variant={'ghost'} className='h-max p-0'>
            {t('Setting.Change_password')}
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
