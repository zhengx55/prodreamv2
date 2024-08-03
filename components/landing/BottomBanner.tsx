import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const BottomBanner = () => {
  const tEditor = useTranslations('Editor');

  return (
    <section className='relative flex w-full justify-center bg-gray-50 py-10 sm:py-20'>
      <div className='flex-center w-full flex-col gap-y-3 px-5 sm:w-[1200px] sm:px-0'>
        <div className='relative flex w-full flex-col gap-y-4 overflow-hidden rounded-3xl bg-violet-500 py-[22px] sm:rounded-[32px] sm:py-12'>
          <Image
            alt='background'
            src='/landing/banner/Background.png'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
          />
          <h2 className='sm:h2-bold text-center text-[22px] font-[600] text-white'>
            {tEditor('BottomBanner.You_have_come_this_far')}
            <br />
            <span className=' font-baskerville'>
              {tEditor('BottomBanner.Let_s_make_your_essay_unforgettable')}
            </span>
          </h2>
          <Spacer y='14' />
          <Link href={'/signup'} passHref className='z-[100] self-center'>
            <Button
              className='self-center rounded-xl border border-white bg-transparent text-white'
              variant={'ghost'}
            >
              {tEditor('BottomBanner.Start_Writing_Now')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default BottomBanner;
