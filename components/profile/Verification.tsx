import { Secure } from '../root/SvgComponents';
import { Button } from '../ui/button';

type Props = {};
const Verification = (props: Props) => {
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
        <Button role='button' className='h-max rounded-lg px-4'>
          Resend Link
        </Button>
      </div>
    </div>
  );
};
export default Verification;
