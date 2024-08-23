import { StoriesInfo } from '@/constant/landing';
import Image from 'next/image';
import Icon from '../root/Icon';
import { Button } from '../ui/button';

type Props = {};

const Stories = (props: Props) => {
  return (
    <section className='flex-center flex-1 py-32'>
      <div className='grid-row-2 relative grid h-[567px] w-[85%] grid-cols-3 rounded-[30px] 2xl:w-[70%]'>
        <Image
          alt=''
          src='/landing/stories/container.png'
          fill
          sizes='(min-width: 808px) 50vw, 100vw'
        />
        <div className='z-50 col-span-2 row-span-1 flex h-[300px] flex-col justify-between rounded-bl-[30px] rounded-tr-[30px] p-12'>
          <h2 className='text-[40px] font-semibold leading-[48px]'>
            {StoriesInfo.section1.heading}
          </h2>
          <p className='text-base font-medium text-black/50'>
            {StoriesInfo.section1.description}
          </p>
          <Button variant={'landing'} className='w-max' size={'expand'}>
            {StoriesInfo.section1.button}
          </Button>
        </div>
        <div className='row-span-1 flex h-[300px] items-center gap-x-5 pl-8'>
          <Image
            alt={StoriesInfo.section2.columns[0].title}
            src={StoriesInfo.section2.columns[0].icon}
            width={100}
            height={100}
            className='size-[60px]'
          />
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>
              {StoriesInfo.section2.columns[0].title}
            </h3>
            <p className='font-medium text-black/50'>
              {StoriesInfo.section2.columns[0].description}
            </p>
          </div>
        </div>
        <div className='row-span-1 flex h-[267px] items-center gap-x-5 pr-8'>
          <Image
            alt={StoriesInfo.section2.columns[1].title}
            src={StoriesInfo.section2.columns[1].icon}
            width={100}
            height={100}
            className='size-[60px]'
          />
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>
              {StoriesInfo.section2.columns[1].title}
            </h3>
            <p className='font-medium text-black/50'>
              {StoriesInfo.section2.columns[1].description}
            </p>
          </div>
        </div>
        <div className='row-span-1 flex h-[267px] items-center gap-x-5 pr-8'>
          <Image
            alt={StoriesInfo.section2.columns[2].title}
            src={StoriesInfo.section2.columns[2].icon}
            width={100}
            height={100}
            className='size-[60px]'
          />
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>
              {StoriesInfo.section2.columns[2].title}
            </h3>
            <p className='font-medium text-black/50'>
              {StoriesInfo.section2.columns[2].description}
            </p>
          </div>
        </div>
        <div className='flex-center relative row-span-1 h-[267px]'>
          <Icon
            alt='stars'
            src={StoriesInfo.section1.starImg}
            className='absolute -top-4 right-20 h-auto w-10'
            width={80}
            height={80}
          />
          <Icon
            alt='clock'
            src={StoriesInfo.section1.clockImg}
            className='absolute left-14 top-10 h-auto w-16'
            width={80}
            height={80}
          />
          <Image
            alt=''
            className='absolute bottom-0 h-[315px] w-auto'
            src={StoriesInfo.section1.coverImg}
            width={350}
            height={350}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Stories;
