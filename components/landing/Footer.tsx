import Image from 'next/image';
import Link from 'next/link';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const Footer = () => {
  return (
    <footer className='flex-1 select-none bg-slate-50'>
      <CallToActionSection />
      <MainFooterContent />
    </footer>
  );
};

const CallToActionSection = () => {
  return (
    <section className='relative flex h-[500px] w-full flex-col items-center gap-y-6 overflow-hidden bg-indigo-500 pt-20 2xl:h-[622px]'>
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
      <BackgroundImages />
      <Image
        priority
        className='absolute -bottom-[25vh] left-[28%] z-30 h-auto w-[42%]'
        src='/landing/footer/characters.png'
        alt='agents'
        width={1920}
        height={1080}
      />
    </section>
  );
};

const BackgroundImages = () => (
  <>
    <div className='absolute left-0 top-0 z-0 h-full w-1/2'>
      <Image
        fill
        src='/landing/footer/background.png'
        sizes='(max-width: 768px) 100vw, 33vw'
        className='scale-x-[-1]'
        alt='line'
      />
    </div>
    <div className='absolute right-0 top-0 z-0 h-full w-1/2'>
      <Image
        fill
        src='/landing/footer/background.png'
        sizes='(max-width: 768px) 100vw, 33vw'
        alt='line'
      />
    </div>
  </>
);

const MainFooterContent = () => {
  return (
    <section className='mx-auto w-[85%] flex-1 py-8 font-poppin 2xl:w-[70%]'>
      <div className='flex justify-between'>
        <FooterColumn title={null}>
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
        </FooterColumn>

        <FooterColumn title='Resources'>
          <FooterLink href='/'>Blog</FooterLink>
          <FooterLink href='/'>Feedback</FooterLink>
          <FooterLink href='/'>FAQs</FooterLink>
        </FooterColumn>

        <FooterColumn title='Legal'>
          <FooterLink href='/'>Privacy Policy</FooterLink>
          <FooterLink href='/'>Terms of Service</FooterLink>
        </FooterColumn>

        <FooterColumn title='Contact us'>
          <FooterLink href='mailto:support@prodream.ai'>
            support@prodream.ai
          </FooterLink>
        </FooterColumn>
      </div>
      <Spacer y='32' />
      <Separator orientation='horizontal' className='bg-black/10' />
      <Spacer y='8' />
      <p className='text-sm'>© 2024 Applify Al Inc.</p>
    </section>
  );
};

const FooterColumn = ({
  title,
  children,
}: {
  title: string | null;
  children: React.ReactNode;
}) => (
  <div className='flex flex-col gap-y-1'>
    {title && <h3 className='text-base font-semibold'>{title}</h3>}
    {children}
  </div>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link className='text-sm' href={href}>
    {children}
  </Link>
);

export default Footer;
