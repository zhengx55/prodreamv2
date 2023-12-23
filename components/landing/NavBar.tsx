import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

const NavBar = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  return (
    <section className='z-50 flex h-16 w-full justify-center py-3'>
      <nav className='flex-between w-full max-w-[1450px]'>
        <div className='flex items-center gap-x-10'>
          <Image
            src='/logo/Prodream.png'
            width={1920}
            height={920}
            alt='logo'
            className='h-auto w-36'
            priority
          />
          <Link href={'https://quickapply.app/blog'} passHref target='_blank'>
            <Button variant={'ghost'}>Blogs</Button>
          </Link>
        </div>
        <div className='flex items-center gap-x-8'>
          <Link href={!token ? '/login' : '/writtingpal/polish'} passHref>
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
