import GoogleSignin from '@/components/auth/GoogleSignin';
import Panel from '@/components/auth/Panel';
import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
const SignUpForm = dynamic(() => import('@/components/auth/SignUpForm'), {
  ssr: false,
});
export default function Page() {
  return (
    <>
      <Panel>
        <div className='flex w-full flex-col sm:w-[600px]'>
          <h1 className='self-center text-[24px] font-[500] sm:text-[28px] 2xl:text-[42px]'>
            Create Your Account
          </h1>
          <p className='base-semibold 2xl:title-semibold text-center font-[400] text-shadow-100'>
            Unlock the potential of your personal statement with Prodream!
          </p>
          <Spacer y='100' className='hidden 2xl:block' />
          <Spacer y='40' className='blocl 2xl:block' />
          <GoogleSignin label='Sign up with Google' />
          <div className='flex-center relative my-10'>
            <Separator orientation='horizontal' className='bg-shadow-border' />
            <p className='small-regular absolute bg-white px-2 text-shadow-100'>
              Or Sign up with email
            </p>
          </div>
          <SignUpForm />
          <p className='small-regular mt-4 self-center text-black-200'>
            Already a member?&nbsp;
            <Link href={'/login'} className='small-semibold text-auth-primary'>
              Log in
            </Link>
          </p>
        </div>
      </Panel>
      <div className='relative hidden h-full w-1/2 bg-white sm:flex'>
        <Image
          src='/auth/auth.png'
          alt='logo'
          fill
          sizes='(max-width: 600px) 100vw, 50vw'
        />
      </div>
    </>
  );
}
