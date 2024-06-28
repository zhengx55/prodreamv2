import { useTranslations } from 'next-intl';
import Icon from '../root/Icon';
import ResendButton from './ResendButton';

const Verification = ({
  isGoogle,
  isVerified,
}: {
  isGoogle: boolean;
  isVerified: boolean;
}) => {
  const tProfile = useTranslations('Profile');
  if (isGoogle || isVerified) return null;
  return (
    <div className='flex h-[140px] w-[700px] flex-col justify-evenly gap-y-0 rounded-lg bg-shadow-50 p-4'>
      <div className='flex items-center gap-x-3'>
        <Icon
          src={'/profile/secure.svg'}
          alt='secure'
          width={24}
          height={24}
          className='size-6'
        />
        <h1 className='title-semibold'>
          {tProfile('Setting.Secure_Your_Account')}
        </h1>
      </div>
      <div className='flex-between flex gap-x-16 pl-9'>
        <p className='base-regular text-shadow-100'>
          {tProfile('Setting.Secure_Account_Message')}
        </p>
        <ResendButton />
      </div>
    </div>
  );
};
export default Verification;
