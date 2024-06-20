import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const BottomBannerCN = () => {
  const t = useTranslations('Editor');

  return (
    <section className='relative flex w-full justify-center py-10 sm:py-20'>
      <div className='flex-center w-full flex-col gap-y-3 px-5 sm:w-[1200px] sm:px-0'>
        <div
          className='relative flex w-full flex-col gap-y-4 overflow-hidden rounded-3xl py-[22px] sm:rounded-[32px] sm:py-12'
          style={{
            background: 'linear-gradient(263deg, #CE66FF 0%, #855DFF 82.84%)',
          }}
        >
          <Image
            alt='background'
            src='/landing/banner/Background.png'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
          />
          <h2 className='sm:h2-bold text-center leading-[72px] text-white md:text-[48px] md:font-[500]'>
            {'ProDream AI'}
            <br />
            <span className='font-baskerville text-[32px]'>
              {'让写作和留学更简单'}
            </span>
          </h2>
          <Spacer y='14' />
          <Link href={'/signup'} passHref className='z-[100] self-center'>
            <Button
              className='self-center rounded-xl border border-white bg-transparent px-8 py-4 text-white'
              variant={'ghost'}
            >
              {'免费使用'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default BottomBannerCN;
