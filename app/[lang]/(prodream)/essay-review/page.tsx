import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { ReviewReasons, ReviewSteps } from '@/constant';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

const Modal = dynamic(() => import('@/components/review/Modal'));

export default async function Page({params}: {params: {lang: string}}) {
  unstable_setRequestLocale(params.lang);

  const trans = await getTranslations('Homepage');
  const token = cookies().get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/redeem/essay_review`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  const isFree = data.code === 0;

  return (
    <main className='flex h-full w-full justify-center overflow-y-auto'>
      <div className='flex w-[900px] flex-col'>
        <Spacer y='24' />
        <div className='relative h-[360px] w-full shrink-0 rounded-2xl bg-indigo-500'>
          <Image
            alt=''
            src='/review/Ellipse.png'
            width={330}
            height={330}
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
            width={320}
            height={288}
            priority
            className='absolute -right-4 bottom-0 h-auto w-[320px]'
          />
          <h1 className='absolute left-10 top-16 text-2xl font-semibold capitalize leading-normal text-white'>
            Elevate your writing with
            <br />
            personalized feedback and
            <br />
            <span className='text-yellow-400'>professional</span>&nbsp; Editing
          </h1>
          {isFree ? (
            <Modal>
              <Button
                role='button'
                variant={'ghost'}
                className='absolute bottom-16 left-10 h-max rounded-lg border-none bg-white py-3'
              >
                Claim Your Free Review
              </Button>
            </Modal>
          ) : (
            <Link href={'https://tally.so/r/wAdBro'} target='_black' passHref>
              <Button
                role='button'
                variant={'ghost'}
                className='absolute bottom-16 left-10 h-max rounded-lg border-none bg-white py-3'
              >
                Get Started
              </Button>
            </Link>
          )}
        </div>
        <Spacer y='30' />
        <div className='flex-between'>
          <div className='flex-between relative h-[515px] w-[40%] shrink-0 flex-col rounded-2xl bg-zinc-100 pt-4'>
            <span className='absolute left-8 top-[30%] size-6 rotate-45 bg-yellow-400' />
            <Image
              alt=''
              src='/review/RectandCircle.png'
              width={58}
              height={50}
              priority
              className='absolute right-5 top-[30%] z-10 w-auto'
            />
            <Image
              alt='shield'
              src='/review/shield_bg.png'
              className='absolute bottom-10 z-0 w-auto'
              width={190}
              height={260}
              priority
            />
            <h2 className='text-center text-2xl font-medium capitalize leading-[42px] text-zinc-800'>
              Our Comprehensive <br /> Services
            </h2>
            <Image
              alt='Trust&'
              src='/review/Review.png'
              width={230}
              height={220}
              className='z-10 h-auto w-auto'
              priority
            />
          </div>
          <div className='flex h-[515px] w-[58%] flex-col justify-between rounded-2xl pt-4'>
            <div className='flex items-start gap-x-4'>
              <Icon src='/review/chat.svg' width={24} height={24} priority />
              <div className='flex flex-col gap-y-2'>
                <h3 className='title-medium capitalize !leading-none text-zinc-600'>
                  Tailored Essay Reviews
                </h3>
                <p className='small-regular capitalize text-zinc-600'>
                  Receive in-depth critiques on structure, argumentation,
                  clarity, and style across various writing types and subjects,
                  from academic essays to personal statements.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-x-4'>
              <Icon src='/review/shield.svg' width={24} height={24} priority />
              <div className='flex flex-col gap-y-2'>
                <h3 className='title-medium capitalize !leading-none text-zinc-600'>
                  Professional Editing
                </h3>
                <p className='small-regular capitalize text-zinc-600'>
                  Beyond review, we offer a editing service to implement
                  suggested edits, enhance readability, and ensure your essay
                  meets the highest standards. Ideal for those seeking not just
                  feedback but a polished, submission-ready piece.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-x-4'>
              <Icon src='/review/global.svg' width={24} height={24} priority />
              <div className='flex flex-col gap-y-2'>
                <h3 className='title-medium capitalize !leading-none text-zinc-600'>
                  Wide Subject Range
                </h3>
                <p className='small-regular capitalize text-zinc-600'>
                  Our experts cover diverse disciplines from Business to STEM,
                  ensuring knowledgeable feedback and revisions no matter your
                  field of study.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-x-4'>
              <Icon src='/review/lock.svg' width={24} height={24} priority />
              <div className='flex flex-col gap-y-2'>
                <h3 className='title-medium capitalize !leading-none text-zinc-600'>
                  Absolute Confidentiality
                </h3>
                <p className='small-regular capitalize text-zinc-600'>
                  Your work and identity are guarded with strict confidentiality
                  protocols, ensuring privacy and security at every step.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Spacer y='30' />
        {isFree ? (
          <Modal>
            <Button role='button' className='h-max rounded-lg py-3'>
              Claim Your Free Review
            </Button>
          </Modal>
        ) : (
          <Link href={'https://tally.so/r/wAdBro'} target='_black' passHref>
            <Button role='button' className='h-max w-full rounded-lg py-3'>
              Get Started
            </Button>
          </Link>
        )}

        <Spacer y='40' />
        <h2 className='text-[28px] font-medium  text-zinc-800'>
          Get Your Expert Essay Review in 3 Easy Steps
        </h2>
        <Spacer y='25' />
        <div className='relative flex h-10 w-full shrink-0'>
          <Icon
            src='/review/journal.svg'
            width={40}
            height={40}
            priority
            className='absolute left-0'
          />
          <Icon
            src='/review/headset.svg'
            width={40}
            height={40}
            priority
            className='absolute left-1/3'
          />
          <Icon
            src='/review/file.svg'
            className='absolute left-2/3'
            width={40}
            height={40}
            priority
          />
        </div>
        <Spacer y='24' />
        <span className='relative h-[3px] w-full shrink-0 bg-indigo-500'>
          <span className='flex-center absolute -top-2  left-0 size-5 rounded-full border-2 border-indigo-500 bg-white'>
            <span className='size-2.5 rounded-full bg-indigo-500 ' />
          </span>
          <span className='flex-center absolute -top-2 left-1/3 size-5 rounded-full border-2 border-indigo-500 bg-white'>
            <span className='size-2.5 rounded-full bg-indigo-500 ' />
          </span>
          <span className='flex-center absolute -top-2 left-2/3 size-5 rounded-full border-2 border-indigo-500 bg-white'>
            <span className='size-2.5 rounded-full bg-indigo-500 ' />
          </span>
        </span>
        <Spacer y='24' />
        <div className='relative flex w-full shrink-0'>
          {ReviewSteps.map((item, index) => (
            <div
              key={`review-${index}`}
              className={`flex w-1/3 flex-col px-2 `}
            >
              <h3 className='small-regular capitalize text-indigo-500'>
                {`step ${index + 1}:`}
              </h3>
              <h2 className='base-semibold text-indigo-500'>{item.title}</h2>
              <Spacer y='5' />
              <p className='small-regular text-zinc-600'>{item.description}</p>
            </div>
          ))}
        </div>
        <Spacer y='60' />
        <h2 className='text-[28px] font-medium text-zinc-800'>Why Us?</h2>
        <Spacer y='25' />
        <div className='flex w-full flex-col gap-y-5'>
          {ReviewReasons.map((item, index) => (
            <div key={`reason-${index}`} className='flex items-start gap-x-4'>
              <Icon src={item.icon} width={24} height={24} priority />
              <div className='block space-y-3'>
                <h3 className='text-xl font-medium capitalize !leading-none text-zinc-800'>
                  {item.title}
                </h3>
                <p className='text-sm font-normal capitalize leading-snug text-zinc-600'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
          <Spacer y='100' />
        </div>
      </div>
    </main>
  );
}
