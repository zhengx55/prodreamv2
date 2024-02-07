'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

const NavBar = () => {
  return (
    <section className='z-50 flex h-16 w-full justify-center bg-white py-3'>
      <nav className='flex-between w-full px-4 sm:max-w-[1200px] sm:px-0'>
        <div className='flex items-center gap-x-10'>
          <Image
            src='/logo/Prodream.png'
            width={160}
            height={30}
            alt='logo'
            className='h-auto w-40 sm:w-36'
            priority
          />
          <Link href={'https://www.prodream.ai/blog'} passHref target='_blank'>
            <Button
              className='hidden text-[#3B3A40] sm:block'
              variant={'ghost'}
            >
              Blogs
            </Button>
          </Link>
        </div>
        <div className='hidden items-center gap-x-8 sm:flex'>
          <Link href={'/login'} passHref>
            <Button variant={'ghost'} className='text-doc-primary'>
              Log in
            </Button>
          </Link>
          <Link href={'/signup'} passHref>
            <Button className='bg-doc-primary hover:bg-doc-primary'>
              <strong>Start Writing!</strong>It&apos;s Free
            </Button>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='z-[999] flex items-center gap-x-8 sm:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='none'
              >
                <path
                  d='M4 6.5H20M4 12.5H20M4 18.5H20'
                  stroke='#171717'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='center'
            sideOffset={0}
            className='h-[100vh] w-[100vw] border-none bg-[#000]/25 p-0'
          >
            <div className='w-[100vw] bg-[#fff] py-6 pt-[45px]'>
              <div className='flex flex-col items-center gap-y-4'>
                <Link href={'/login'} passHref>
                  <Button
                    variant={'ghost'}
                    className='w-[340px] border-[2px] border-doc-primary text-doc-primary'
                  >
                    Log in
                  </Button>
                </Link>

                <Link href={'/signup'} passHref>
                  <Button className='w-[340px] bg-doc-primary hover:bg-doc-primary'>
                    <strong>Start Writing!</strong>It&apos;s Free
                  </Button>
                </Link>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </section>
  );
};
export default NavBar;
