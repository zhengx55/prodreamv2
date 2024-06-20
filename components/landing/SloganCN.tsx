import { HomePageDicType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import CaptureProvider from './CaptureProvider';
import { useTranslations } from 'next-intl';


const SloganCN = ({
  lang,
}: HomePageDicType & { search_param: string }) => {
  const transHomepage = useTranslations('Homepage');

  return (
    <section className='relative flex w-full justify-center px-4 sm:mt-0 sm:px-0'>
      <div className='absolute -z-10 hidden h-full w-full sm:block'>
        <Image
          draggable='false'
          alt='gradient-bg'
          priority
          className='absolute top-10 h-[80%] w-full'
          width={1000}
          height={500}
          loading='eager'
          src='/landing/heros/Mask_group.png'
        />
      </div>
      <CaptureProvider event='ScreenI'>
        <div className='sm:flex-center flex h-full w-full flex-col py-10 sm:w-[1200px] sm:py-20'>
          <h1 className='text-center md:text-[72px] font-[600] leading-[1.6] sm:text-center sm:text-[48px]'>
            {"一站式 AI 服务平台"}
          </h1>
          <h2 className='text-center md:text-[72px] font-[200] leading-[1.6] sm:text-center sm:text-[48px]'>{'智能写作   轻松留学'}</h2>
          <p className='text-neutral-400 text-center text-[22px] font-[400] leading-[1.7] pt-[36px] sm:text-center sm:text-[22px]'>{'与 ProDream 同行，塑造学术未来'}</p>
          <Spacer y='40' />
          <div className='relative flex w-full flex-col items-center justify-center gap-x-0 gap-y-4 pl-2 sm:flex-row sm:items-start sm:gap-x-6 sm:gap-y-0'>
            <Link
              prefetch={false}
              passHref
              href={`/${lang}/signup?from=cn`}
            >
              <Button className='rounded-lg py-3 px-8 text-sm font-medium'>
                <p>{"免费使用"}</p>
              </Button>
            </Link>
          </div>
          <Spacer y='90' className='hidden sm:block' />
          <Spacer y='20' className='block sm:hidden' />
          <Image
            draggable='false'
            alt='gradient-bg'
            priority
            className='top-10 w-full rounded-lg border-8 border-f8f9fc bg-white'
            width={1180}
            height={720}
            loading='eager'
            src='/Mobile.png'
          />
        </div>
      </CaptureProvider>
    </section>
  );
};

export default SloganCN;
