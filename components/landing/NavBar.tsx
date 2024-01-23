import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const NavBar = () => {
  return (
    <section className='z-50 flex h-16 w-full justify-center py-3'>
      <nav className='flex-between w-full px-4 sm:max-w-[1450px] sm:px-0'>
        <div className='flex items-center gap-x-10'>
          <Image
            src='/logo/Prodream.png'
            width={160}
            height={30}
            alt='logo'
            className='h-auto w-40 sm:w-36'
            priority
          />
          <div className='flex'>
            <Link href={'https://quickapply.app/blog'} passHref target='_blank'>
              <Button className='text-[#3B3A40] hidden sm:block' variant={'ghost'}>
              About Us
              </Button>
            </Link>
            <Link href={'https://quickapply.app/blog'} passHref target='_blank'>
              <Button className='text-[#3B3A40] hidden sm:block' variant={'ghost'}>
                Blogs
              </Button>
            </Link>
          </div>
        </div>
        <div className='hidden items-center gap-x-8 sm:flex'>
          <Link href={'/writtingpal/polish'} passHref>
            <Button variant={'ghost'} className='text-primary-200'>
              Login
            </Button>
          </Link>
          <Link href={'/signup'} passHref>
            <Button><strong>Start Writing!</strong>It&apos;s Free</Button>
          </Link>
        </div>
        <div className='sm:hidden items-center gap-x-8 sm:flex'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M4 6.5H20M4 12.5H20M4 18.5H20" stroke="#171717" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        {/* <Drawer>
        <DrawerTrigger asChild>
        <div className='sm:hidden items-center gap-x-8 sm:flex'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M4 6.5H20M4 12.5H20M4 18.5H20" stroke="#171717" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        </DrawerTrigger>
        <DrawerContent
          side='top'
          position='top'
          align='center'
          sideOffset={2}
          className='bg-white'
        >
          <div className="mx-auto w-full py-6 max-w-sm">
            <div className='items-center gap-y-4 flex flex-col'>
              <Link href={'/writtingpal/polish'} passHref>
                <Button variant={'ghost'} className='text-primary-200 border-[#9C2CF3] border-[2px] w-[340px]'>
                  Log in
                </Button>
              </Link>

              <Link href={'/signup'} passHref>
                <Button className='w-[340px]'><strong>Start Writing!</strong>It&apos;s Free</Button>
              </Link>
            </div>
          </div>
        </DrawerContent>
      </Drawer> */}
      </nav>
    </section>
  );
};
export default NavBar;
