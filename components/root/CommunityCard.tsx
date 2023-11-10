import Image from 'next/image';
import { Button } from '../ui/button';

const CommunityCard = () => {
  return (
    <div className='absolute bottom-4 hidden h-[270px] w-[90%] items-center gap-y-3 rounded-lg border-1 border-primary-200 px-4 py-2 md:flex md:flex-col'>
      <Image
        alt='social-community'
        src='/social.png'
        className='w-auto'
        width={130}
        height={110}
        priority
      />
      <p className=''>Join our community</p>
      <Button variant={'secondary'} className='w-[130px] gap-x-1 bg-primary-50'>
        <Image
          className='h-auto w-auto object-contain'
          width={18}
          height={18}
          alt='discord'
          src='/discord.png'
        />
        Discord
      </Button>
      <Button variant={'secondary'} className='w-[130px] gap-x-1 bg-primary-50'>
        <Image
          className='h-auto w-auto object-contain'
          alt='ins'
          width={18}
          height={18}
          src='/instagram.png'
        />
        Instagram
      </Button>
    </div>
  );
};

export default CommunityCard;
