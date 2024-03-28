'use client';

import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { toDocument } from './_action';

type Props = {
  dict: Awaited<ReturnType<typeof getDictionary>>;
};
const Navbar = ({ dict }: Props) => {
  const pathName = usePathname();
  const isBaseOnboard = pathName.split('/').pop() === 'onboard';
  return (
    <nav className='flex-between h-14 w-full shrink-0 bg-slate-100 px-4 sm:h-20'>
      <Image
        src='/logo/Prodream.png'
        width={140}
        height={30}
        alt='logo'
        className='h-auto w-28 sm:w-40'
        priority
      />
      {!isBaseOnboard && (
        <Button
          role='link'
          onClick={async () => await toDocument()}
          className='bg-transparent'
          variant={'ghost'}
        >
          {dict.Onboard.SkipButton}
        </Button>
      )}
    </nav>
  );
};
export default Navbar;
