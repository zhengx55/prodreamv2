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
    <footer className='relative flex w-full justify-center bg-[#000] px-4 py-5 sm:px-0 sm:py-20'>
      <div className='flex w-full max-w-[1450px] flex-col'>
        <section className='flex flex-col gap-y-4 md:flex-row md:justify-between md:gap-y-0'>
          <div className='flex flex-col gap-y-5'>
            <Image
              src='/logo/ProdreamWhite.png'
              width={120}
              height={20}
              alt='logo'
              className='h-auto w-36'
            />
            <p className='body-regular text-[#fff]'>
              Revolutionizing college advising,
              <br /> one click at a time
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='base-medium text-[#fff] text-black'>Newsletter</p>
            <form
              onSubmit={handleEmailSubmit}
              className='mt-3 flex items-center gap-x-4'
            >
              <input
                className='w-full sm:rounded-[8px] rounded-[4px] border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-[#9C2CF3] md:w-[327px] sm:h-[46px]'
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type='submit' className={'submit-button sm:h-[46px] bg-[#8551F3] hover:bg-[#8551F3]'}>
                Submit
              </Button>
            </form>
          </div>
        </section>
        <section className='mt-4 flex flex-row items-center sm:rounded-[40px] sm:bg-[#3B3A40] md:mt-8 md:flex-row md:justify-between md:px-5 md:py-4'>
          <p className='sm:base-regular text-[12px] sm:text-[#A3A3A3] text-[#fff]'>© 2023 Applify AI Inc.</p>
          <div className='sm:mt-4 flex items-center sm:gap-x-10 gap-x-2 ml-[10px] md:mt-0'>
            <Link
              href={
                'https://applifyai.notion.site/applifyai/Applify-AI-Subscription-Agreement-eef0b3cfdab6496dbe0fa04a3c9a0d3e'
              }
              target='_blank'
              className='sm:base-regular text-[12px] text-[#A3A3A3] hover:underline'
            >
              Terms & Conditions
            </Link>
            <Link
              href={
                'https://applifyai.notion.site/applifyai/Applify-AI-Privacy-Policy-e350e311e90c48608b4e85a8c7982e77'
              }
              target='_blank'
              className='sm:base-regular text-[12px] text-[#A3A3A3] hover:underline'
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
