'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '../ui/button';
const Footer = () => {
  const tError = useTranslations('Error');
  const tSuccess = useTranslations('Success');
  const tFooter = useTranslations('Footer');
  const [email, setEmail] = useState('');
  const handleEmailSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      const toastError = tError('Please_enter_a_valid_email');
      toast.error(toastError);
      return;
    }
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/newsletter_subscribe`,
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       email,
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );
    // if (response.ok) {
    //   const toastInfo = tSuccess('You_have_successfully_subscribed');
    //   toast.success(toastInfo);
    // }
  };
  return (
    <footer className='relative flex w-full justify-center px-4 py-5 sm:px-0 sm:py-20'>
      <div className='flex w-full max-w-[1200px] flex-col'>
        <section className='flex flex-col gap-y-4 md:flex-row md:justify-between md:gap-y-0'>
          <div className='flex flex-col gap-y-5'>
            <Image
              src='/logo/Prodream.png'
              width={218}
              height={40}
              alt='logo'
              className='h-auto w-52'
            />
            <p className='body-regular '>
              {tFooter('Shape_your_academic_future')}
              <br />
              {tFooter('masterful_writing_from_application_to_graduation')}
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='base-medium text-black '>{tFooter('Newsletter')}</p>
            <form
              onSubmit={handleEmailSubmit}
              className='mt-3 flex items-center gap-x-4'
            >
              <input
                className='h-11 w-full rounded border border-gray-200 px-4 py-2 outline-none focus-visible:ring-2 sm:rounded-xl sm:py-3 md:w-[327px]'
                type='email'
                id='email'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type='submit'
                className={
                  'submit-button h-11 rounded bg-violet-500 hover:bg-violet-500'
                }
              >
                {tFooter('Submit')}
              </Button>
            </form>
          </div>
        </section>
        <section className='mt-4 flex flex-row items-center bg-[#f8f9fc] sm:rounded-[40px] md:mt-8 md:flex-row md:justify-between md:px-5 md:py-4'>
          <p className='sm:base-regular text-[12px]  sm:text-[#A3A3A3]'>
            © 2024 Applify AI Inc.
          </p>
          <div className='ml-[10px] flex items-center gap-x-2 sm:mt-4 sm:gap-x-10 md:mt-0'>
            <Link
              href={
                'https://applifyai.notion.site/applifyai/Applify-AI-Subscription-Agreement-eef0b3cfdab6496dbe0fa04a3c9a0d3e'
              }
              target='_blank'
              className='sm:base-regular text-[12px] hover:underline'
            >
              {tFooter('Terms_Conditions')}
            </Link>
            <Link
              href={
                'https://applifyai.notion.site/applifyai/Applify-AI-Privacy-Policy-e350e311e90c48608b4e85a8c7982e77'
              }
              target='_blank'
              className='sm:base-regular text-[12px] hover:underline'
            >
              {tFooter('Privacy_Policy')}
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
