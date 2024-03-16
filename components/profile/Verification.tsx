import { Secure } from '../root/SvgComponents';
import ResendButton from './ResendButton';

const Verification = ({
  isGoogle,
  isVerified,
}: {
  isGoogle: boolean;
  isVerified: boolean;
}) => {
  if (isGoogle || isVerified) return null;
  return (
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
        <ResendButton />
      </div>
    </div>
  );
};
export default Verification;
