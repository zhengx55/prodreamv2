import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

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
          <Link href={'https://quickapply.app/blog'} passHref target='_blank'>
            <Button className='hidden sm:block' variant={'ghost'}>
              Blogs
            </Button>
          </Link>
        </div>
        <div className='hidden items-center gap-x-8 sm:flex'>
          <Link href={'/writtingpal/polish'} passHref>
            <Button variant={'ghost'} className='text-primary-200'>
              Login
            </Button>
          </Link>
          <Link href={'/signup'} passHref>
            <Button>Sign Up For FREE</Button>
          </Link>
        </div>
      </nav>
    </section>
  );
};
export default NavBar;
