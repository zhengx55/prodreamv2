'use client';
import { useTranslations } from 'next-intl';
import Icon from '../root/Icon';
import ResendButton from './ResendButton';
import ResendButtonCN from './ResendButtonCN';
import { useParams } from 'next/navigation';
import Spacer from '../root/Spacer';
import { Separator } from '../ui/separator';

const VerificationCN = ({
  isGoogle,
  isVerified,
}: {
  isGoogle: boolean;
  isVerified: boolean;
}) => {
  const tProfile = useTranslations('Profile');
  const { lang } = useParams();
  const isInChina = lang === 'cn';
  if (isGoogle || isVerified) return null;
  return (
    <div className='flex w-2/3 flex-col justify-evenly gap-y-0 rounded-lg'>
      <div className='flex items-center gap-x-3'>
        <Icon
          src={'/profile/secure.svg'}
          alt='secure'
          width={24}
          height={24}
          className='size-6'
        />
        <h1 className='text-base font-normal leading-normal'>
          {tProfile('Setting.Secure_Your_Account')}
        </h1>
      </div>
      <div className='flex-between flex gap-x-16 pl-9'>
        <p className='base-regular text-shadow-1000'>
          {tProfile('Setting.Secure_Account_Message')}
        </p>
        {isInChina ? <ResendButtonCN /> : <ResendButton />}
      </div>
      <Spacer y='32' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='22' />
    </div>
  );
};
export default VerificationCN;
