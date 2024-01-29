import GoogleSignin from '@/components/auth/GoogleSignin';
import Panel from '@/components/auth/Panel';
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
        <div className='flex max-w-[600px] flex-col'>
          <h1 className='self-center text-[28px] font-[500] sm:text-[42px]'>
            Create Your Account
          </h1>
          <p className='title-semibold mb-[30px] self-start text-left font-[400] text-[#525252] sm:mb-[60px] sm:text-[18px]'>
            Unlock the potential of your personal statement with Prodream!
          </p>
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
