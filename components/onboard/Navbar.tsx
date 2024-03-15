'use client';

import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

type Props = {
  dict: Awaited<ReturnType<typeof getDictionary>>;
};
const Navbar = ({ dict }: Props) => {
  const pathName = usePathname();
  const isBaseOnboard = pathName.split('/').pop() === 'onboard';
  return (
    <nav className='flex-between h-20 w-full shrink-0 bg-doc-secondary px-4'>
      <Image
        src='/logo/Prodream.png'
        width={140}
        height={30}
        alt='logo'
        className='h-auto w-40'
        priority
      />
      {!isBaseOnboard && (
        <Button className='bg-transparent' variant={'ghost'}>
          {dict.Onboard.SkipButton}
        </Button>
      )}
    </nav>
  );
};
export default Navbar;
