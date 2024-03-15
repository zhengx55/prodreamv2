import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { ReviewReasons, ReviewSteps } from '@/constant';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { v4 } from 'uuid';

const Modal = dynamic(() => import('@/components/review/Modal'));

export default function Page() {
  return (
    <main className='flex h-full w-full justify-center overflow-y-auto'>
      <div className='flex w-[1100px] flex-col'>
        <Spacer y='24' />
        <div className='relative h-[400px] w-full shrink-0 rounded-2xl bg-indigo-500'>
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
            Elevate your writing with
            <br />
            personalized feedback and
            <br />
            <span className='text-yellow-400'>personalized</span>&nbsp; Editing
          </h1>
          <Modal>
            <Button
              role='button'
              className='absolute bottom-16 left-20 h-max rounded-lg bg-amber-500 py-3'
            >
              Claim Your Free Review
            </Button>
          </Modal>
        </div>
        <Spacer y='30' />
        <div className='flex-between'>
          <div className='flex-between h-[450px] w-[48%] shrink-0 flex-col rounded-2xl bg-zinc-100 pt-4'>
            <h2 className='text-2xl font-medium capitalize leading-[50px] tracking-tight text-zinc-800'>
              Our Comprehensive Services
            </h2>
            <Image
              alt='Trust&'
              src='/review/Review.png'
              width={300}
              height={220}
              className='h-auto w-auto'
              priority
            />
          </div>
          <div className='flex h-[450px] w-[48%] flex-col justify-between rounded-2xl pt-4'>
            <div className='flex items-start gap-x-4'>
              <Icon src='/review/chat.svg' width={24} height={24} priority />
              <div className='flex flex-col gap-y-1'>
                <h3 className='title-medium capitalize !leading-none text-zinc-600'>
                  Tailored Essay Reviews
                </h3>
                <p className='small-regular capitalize leading-snug'>
                  Receive in-depth critiques on structure, argumentation,
                  clarity, and style across various writing types and subjects,
                  from academic essays to personal statements.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-x-4'>
              <Icon src='/review/shield.svg' width={24} height={24} priority />
              <div className='flex flex-col gap-y-1'>
                <h3 className='title-medium capitalize !leading-none text-zinc-600'>
                  Professional Rewriting
                </h3>
                <p className='small-regular capitalize leading-snug'>
                  Beyond review, we offer a rewriting service to implement
                  suggested edits, enhance readability, and ensure your essay
                  meets the highest standards. Ideal for those seeking not just
                  feedback but a polished, submission-ready piece.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-x-4'>
              <Icon src='/review/global.svg' width={24} height={24} priority />
              <div className='flex flex-col gap-y-1'>
                <h3 className='title-medium capitalize !leading-none text-zinc-600'>
                  Wide Subject Range
                </h3>
                <p className='small-regular capitalize leading-snug'>
                  Our experts cover disciplines from Literature to STEM,
                  ensuring knowledgeable feedback and revisions no matter your
                  field of study.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-x-4'>
              <Icon src='/review/lock.svg' width={24} height={24} priority />
              <div className='flex flex-col gap-y-1'>
                <h3 className='title-medium capitalize !leading-none text-zinc-600'>
                  Absolute Confidentiality
                </h3>
                <p className='small-regular capitalize leading-snug'>
                  Your work and identity are guarded with strict confidentiality
                  protocols, ensuring privacy and security at every step.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Spacer y='30' />
        <Modal>
          <Button role='button' className='h-max rounded-lg bg-amber-500 py-3'>
            Claim Your Free Review
          </Button>
        </Modal>

        <Spacer y='40' />
        <h2 className='text-[28px] font-medium tracking-tight text-zinc-800'>
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
            <div key={v4()} className={`flex w-1/3 flex-col px-2 `}>
              <h3 className='small-regular capitalize text-indigo-500'>
                {`step ${index + 1}:`}
              </h3>
              <h2 className='title-semibold text-indigo-500'>{item.title}</h2>
              <Spacer y='5' />
              <p className=' text-zinc-600'>{item.description}</p>
            </div>
          ))}
        </div>
        <Spacer y='60' />
        <h2 className='text-[28px] font-medium tracking-tight text-zinc-800'>
          Why Us?
        </h2>
        <Spacer y='25' />
        <div className='flex w-full flex-col gap-y-4'>
          {ReviewReasons.map((item) => (
            <div key={v4()} className='flex items-start gap-x-4'>
              <Icon src={item.icon} width={24} height={24} priority />
              <div className='block space-y-2'>
                <h3 className='text-xl font-medium capitalize !leading-none tracking-tight text-zinc-800'>
                  {item.title}
                </h3>

                <p className='text-sm font-normal capitalize leading-snug tracking-tight text-zinc-600'>
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
