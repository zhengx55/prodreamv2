'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
const Footer = () => {
  const [email, setEmail] = useState('');
  const handleEmailSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email');
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter_subscribe`,
      {
        method: 'POST',
        body: JSON.stringify({
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      toast.success('You have successfully subscribed!!!');
    }
  };
  return (
    <footer className='relative flex w-full justify-center bg-shadow-400 py-20'>
      <div className='flex w-full max-w-[1450px] flex-col'>
        <section className='flex flex-col gap-y-4 md:flex-row md:justify-between md:gap-y-0'>
          <div className='flex flex-col gap-y-5'>
            <Image
              src='/logo/Prodream.png'
              width={1920}
              height={920}
              alt='logo'
              className='h-auto w-36'
            />
            <p className='body-regular text-[#525252]'>
              Revolutionizing college advising,
              <br /> one click at a time
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='base-medium text-black'>Newsletter</p>
            <form
              onSubmit={handleEmailSubmit}
              className='mt-3 flex items-center gap-x-4'
            >
              <input
                className='w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-[#9C2CF3] md:w-[327px]'
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type='submit' className={'submit-button'}>
                Submit
              </Button>
            </form>
          </div>
        </section>
        <section className='mt-4 flex flex-col items-center rounded-[40px] bg-[#F5F5F5] md:mt-8 md:flex-row md:justify-between md:px-5 md:py-4'>
          <p className='base-regular text-[#A3A3A3]'>© 2023 Applify AI Inc.</p>
          <div className='mt-4 flex items-center gap-x-10 md:mt-0'>
            <Link
              href={
                'https://applifyai.notion.site/applifyai/Applify-AI-Subscription-Agreement-eef0b3cfdab6496dbe0fa04a3c9a0d3e'
              }
              target='_blank'
              className='base-regular text-[#525252] hover:underline'
            >
              Terms & Conditions
            </Link>
            <Link
              href={
                'https://applifyai.notion.site/applifyai/Applify-AI-Privacy-Policy-e350e311e90c48608b4e85a8c7982e77'
              }
              target='_blank'
              className='base-regular text-[#525252] hover:underline'
            >
              Privacy Policy
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
