import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

type Props = { isAuth: boolean };

const Header = ({ isAuth }: Props) => {
  return (
    <header className='flex-center absolute top-14 z-40 w-full flex-1'>
      <div className='flex-between w-[85%] 2xl:w-[70%]'>
        <Image
          src='/logo/Prodream.png'
          alt='logo'
          width={200}
          height={100}
          priority
          className='h-auto w-40'
        />
        <div className='flex gap-x-5'>
          <Button variant={'header'} size={'lg'}>
            Go Academic Writing
          </Button>
          <Link href={isAuth ? '/chat' : '/login'}>
            <Button variant={'header'} size={'lg'}>
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
