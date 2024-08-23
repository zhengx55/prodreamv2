import Image from 'next/image';
import Link from 'next/link';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const Footer = () => {
  return (
    <footer className='flex-1 select-none bg-slate-50'>
      <div className='relative flex h-[500px] w-full flex-col items-center gap-y-6 overflow-hidden bg-indigo-500 pt-20 2xl:h-[622px]'>
        <h2 className='z-20 text-[40px] font-semibold text-white'>
          Start Your ProDream Journey NOW
        </h2>
        <Button variant='header' className='z-20 text-indigo-500' size='lg'>
          Contact Us
        </Button>
        <Image
          priority
          src='/landing/footer/text.png'
          alt='logo'
          width={1920}
          height={622}
          className='absolute -bottom-[12vh] z-10 h-auto w-full'
        />
        <Image
          src='/landing/footer/shadow.png'
          className='z-[9]'
          fill
          alt='shadow'
        />
        <Image
          priority
          src='/landing/footer/background.png'
          alt='line'
          width={1920}
          height={10}
          className='absolute left-0 top-0 z-0 h-full w-auto scale-x-[-1]'
        />
        <Image
          priority
          src='/landing/footer/background.png'
          alt='line'
          width={1920}
          height={10}
          className='absolute right-0 top-0 z-0 h-full w-auto'
        />
        <Image
          priority
          className='absolute -bottom-[25vh] left-[28%] z-30 h-auto w-[42%]'
          src={'/landing/footer/characters.png'}
          alt={'agents'}
          width={1920}
          height={1080}
        />
      </div>
      <div className='mx-auto w-[85%] flex-1 py-8 font-poppin 2xl:w-[70%]'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-y-1'>
            <Image
              className='h-auto w-40'
              alt='logo'
              src='/logo/Prodream.png'
              width={200}
              height={50}
            />
            <p className='text-sm text-black/50'>
              Holistic support of entire student lifecycle,
              <br /> from high school to early career
            </p>
          </div>
          <div className='flex flex-col gap-y-1'>
            <h3 className='text-base font-semibold'>Resources</h3>
            <Link className='text-sm' href='/'>
              Blog
            </Link>
            <Link className='text-sm' href='/'>
              Feedback
            </Link>
            <Link className='text-sm' href='/'>
              FAQs
            </Link>
          </div>
          <div className='flex flex-col gap-y-1'>
            <h3 className='text-base font-semibold'>Legal</h3>
            <Link className='text-sm' href='/'>
              Privacy Policy
            </Link>
            <Link className='text-sm' href='/'>
              Terms of Service
            </Link>
          </div>
          <div className='flex flex-col gap-y-1'>
            <h3 className='text-base font-semibold'>Contact us</h3>
            <Link className='text-sm' href='/' type='email'>
              support@prodream.ai
            </Link>
          </div>
        </div>
        <Spacer y='32' />
        <Separator orientation='horizontal' className='bg-black/10' />
        <Spacer y='8' />
        <p className='text-sm'>© 2024 Applify Al Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
