import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='flex h-full w-full justify-center overflow-y-auto py-6'>
      <div className='flex w-[1100px] flex-col'>
        <div className='relative h-[397px] w-full rounded-2xl bg-indigo-500'>
          <Image
            alt=''
            src='/review/Ellipse.png'
            width={343}
            height={343}
            priority
            className='absolute bottom-0 left-0'
          />
          <Image
            alt=''
            src='/review/Circle.png'
            width={82}
            height={82}
            className='absolute bottom-40 left-96'
          />
          <Image
            alt=''
            src='/review/ReviewBanner.png'
            width={395}
            height={356}
            priority
            className='absolute bottom-0 right-4'
          />
          <h1 className='absolute left-20 top-16 text-4xl font-semibold capitalize leading-snug text-white'>
            Academic <br />
            <span className='text-yellow-400'>paper help</span>&nbsp; for
            <br /> every student
          </h1>
          <p className='small-regular absolute bottom-16 left-20 leading-snug text-white'>
            Hire an expert for your paper.
            <br />
            Right here. Right now.
          </p>
        </div>
        <Spacer y='30' />
        <div className='flex-between'>
          <div className='flex-between h-[280px] w-[48%] flex-col rounded-2xl bg-zinc-100 pt-4'>
            <h2 className='text-2xl font-medium capitalize leading-[50px] tracking-tight text-zinc-800'>
              Trusted & Transparent
            </h2>
            <Image
              alt='Trust&'
              src='/review/Review.png'
              width={250}
              height={180}
              className='h-auto w-auto'
              priority
            />
          </div>
          <div className='flex h-[280px] w-[48%] flex-col justify-between rounded-2xl  pt-4'>
            <div className='flex items-start gap-x-4'>
              <Icon
                src='/review/lock-fill.svg'
                width={24}
                height={24}
                priority
              />
              <div className='flex flex-col gap-y-1'>
                <h3 className='title-regular capitalize text-zinc-600'>
                  Stay Anonymous
                </h3>
                <p className='small-regular capitalize leading-snug'>
                  We value your privacy and take it seriously.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-x-4'>
              <Icon
                src='/review/shield-shaded.svg'
                width={24}
                height={24}
                priority
              />
              <div className='flex flex-col gap-y-1'>
                <h3 className='title-regular capitalize text-zinc-600'>
                  Stay safe
                </h3>
                <p className='small-regular capitalize leading-snug'>
                  We verify your paper using the same tools as your professors,
                  ensuring genuine quality.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-x-4'>
              <Icon
                src='/review/emoji-smile-fill.svg'
                width={24}
                height={24}
                priority
              />
              <div className='flex flex-col gap-y-1'>
                <h3 className='title-regular capitalize text-zinc-600'>
                  Trust Matters
                </h3>
                <p className='small-regular capitalize leading-snug'>
                  Hear from other students just like you who’ve trusted P ro
                  Dream for their assignments.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Spacer y='100' />
        <Button role='button' className='bg-amber-500'>
          Get Expert Help
        </Button>
      </div>
    </main>
  );
}
