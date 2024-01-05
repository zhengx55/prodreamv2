import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Button } from '../ui/button';

const CommunityCard = () => {
  return (
    <div className='absolute bottom-4 flex h-[250px] w-[90%] flex-col items-center gap-y-3 rounded-lg border border-shadow-border px-4 py-2 shadow-lg'>
      <Image
        alt='community'
        src='/social.png'
        width={130}
        height={50}
        priority
        className='h-auto w-full'
      />
      <h1 className='base-semibold text-center'>Join our community</h1>

      <div className='flex items-center gap-x-2'>
        <Link
          passHref
          href={'https://discord.com/invite/h37uz8HYSH'}
          target='_blank'
        >
          <Button variant={'secondary'} className='w-max bg-primary-50'>
            <Image
              className='h-5 w-5 object-contain'
              width={18}
              height={18}
              priority
              alt='social'
              src='/discord.png'
            />
          </Button>
        </Link>
        <Link
          passHref
          href={
            'https://www.instagram.com/quickapplysuccess/?igshid=MzRlODBiNWFlZA%3D%3D'
          }
          target='_blank'
        >
          <Button variant={'secondary'} className='w-max bg-primary-50'>
            <Image
              className='h-5 w-5 object-contain'
              alt='ins'
              width={18}
              height={18}
              priority
              src='/instagram.png'
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default memo(CommunityCard);
