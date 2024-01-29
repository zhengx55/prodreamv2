import LazyMotionProvider from '@/components/root/LazyMotionProvider';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function WelcomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-1 flex-col'>
      <nav className='flex-center h-32 w-full shrink-0 bg-[#F6F4FF]'>
        <div className='flex-between w-[1000px]'>
          <Image
            src='/logo/Prodream.png'
            width={160}
            height={30}
            alt='logo'
            className='h-auto w-40 sm:w-36'
            priority
          />
          <Link passHref href={'/writtingpal/polish'}>
            <Button
              role='button'
              variant={'ghost'}
              className='text-auth-primary'
            >
              Skip for now
            </Button>
          </Link>
        </div>
      </nav>
      <LazyMotionProvider>{children}</LazyMotionProvider>
    </div>
  );
}
