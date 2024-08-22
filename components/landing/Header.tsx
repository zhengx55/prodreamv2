import Image from 'next/image';
import { Button } from '../ui/button';

type Props = {};

const Header = (props: Props) => {
  return (
    <header className='flex-center absolute top-14 w-full flex-1'>
      <div className='flex-between w-[70%]'>
        <Image
          src='/logo/Prodream.png'
          alt='logo'
          width={200}
          height={100}
          priority
          className='h-auto w-40'
        />
        <div className='flex gap-x-5'>
          <Button>Go Academic Writing</Button>
          <Button>Log in</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
