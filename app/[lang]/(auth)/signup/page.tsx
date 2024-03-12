import GoogleSignin from '@/components/auth/GoogleSignin';
import Panel from '@/components/auth/Panel';
import SignUpForm from '@/components/auth/SignUpForm';
import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Suspense } from 'react';
export default function Page() {
  return (
    <Panel>
      <div className='flex w-full flex-col sm:w-[600px]'>
        <h1 className='text-[24px] font-[500] sm:text-[28px] 2xl:text-[42px]'>
          Create Your Account
        </h1>
        <p className='base-medium 2xl:title-medium font-[400] text-shadow-100'>
          Unlock the potential of your paper with ProDream!
        </p>
        <Spacer y='60' className='hidden 2xl:block' />
        <Spacer y='40' className='block 2xl:hidden' />
        <GoogleSignin label='Sign up with Google' />
        <Spacer y='40' />
        <div className='flex-center relative'>
          <Separator orientation='horizontal' className='bg-shadow-border' />
          <p className='small-regular absolute bg-white px-2 text-shadow-100'>
            Or sign up with
          </p>
        </div>
        <Spacer y='35' />
        <Suspense>
          <SignUpForm />
        </Suspense>
        <p className='small-regular mt-4 self-center text-black-200'>
          Already a member?&nbsp;
          <Link href={'/login'} className='small-semibold text-auth-primary'>
            Log in
          </Link>
        </p>
      </div>
    </Panel>
  );
}
