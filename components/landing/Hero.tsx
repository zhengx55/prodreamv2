'use client';
import { HeroInfo, HeroMainInfo } from '@/constant';
import { staggerContainer, textVariant } from '@/constant/motion';
import useInviewCapture from '@/hooks/useInViewCapture';
import useLocalization from '@/hooks/useLocalization';
import {
  usePostABTest,
  usePostABTestByToken,
  usePostABTestPagePoint,
  usePostABTestPagePointByToken,
} from '@/query/query';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { m } from 'framer-motion';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import useTypewriter from 'react-typewriter-hook';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import './animation.css';

const HeroCarousel = dynamic(
  () => import('./LandingCarousel').then((mod) => mod.HeroCarousel),
  {
    ssr: false,
  }
);

const Hero = () => {
  const [selected, setSelected] = useState<number>(0);

  const [autoSwitchInterval, setAutoSwitchInterval] = useState<number | null>(
    null
  );
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const { ref } = useInviewCapture('ScreenI');
  const { t, getCurrentLanguage } = useLocalization();
  const [isMobile, setIsMobile] = useState(false);

  const [flag, setFlag] = useState('v3');

  const posthog = usePostHog();

  // const { mutateAsync: handleAbTestPoint } = usePostABTestPagePoint();
  // const { mutateAsync: handleAbTestByTokenPoint } =
  //   usePostABTestPagePointByToken();
  // const { mutateAsync: handleAbTest } = usePostABTest();
  // const { mutateAsync: handleAbTestByToken } = usePostABTestByToken();

  const [currentTitleNode, setCurrentTitleNode] = useState<ReactNode>(
    <V3Title />
  );

  const memoSetSelected = useCallback((index: number) => {
    setSelected(index);
  }, []);

  const handleMouseEnter = (index: number) => {
    setSelected(index);
    setIsMouseOver(true);
    if (autoSwitchInterval) {
      clearInterval(autoSwitchInterval);
      setAutoSwitchInterval(null);
    }
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  // useEffect(() => {
  //   // console.log(
  //   //   'posthog:',
  //   //   posthog.getFeatureFlag(process.env.NEXT_PUBLIC_POSTHOG_EXPERIMENT ?? '')
  //   // );
  //   if (posthog) {
  //     setFlag(
  //       `${posthog.getFeatureFlag(process.env.NEXT_PUBLIC_POSTHOG_EXPERIMENT ?? '')}`
  //     );
  //     abTest(flag);
  //   }
  // }, []);

  useUpdateEffect(() => {
    // console.log('flag', flag);
    if (flag && flag !== 'undefined') {
      if (flag === 'v2') {
        setCurrentTitleNode(<V3Title />);
      } else {
        setCurrentTitleNode(<V2Title />);
      }
    }
  }, [flag]);

  const startAutoSwitch = useCallback(() => {
    if (!autoSwitchInterval) {
      const intervalId = setInterval(() => {
        setSelected((prevSelected) => (prevSelected + 1) % HeroInfo.length);
      }, 3000) as unknown as number;
      setAutoSwitchInterval(intervalId);
    }
  }, [autoSwitchInterval]);

  useEffect(() => {
    // 只有在非手机设备上才启用自动切换
    if (
      typeof window !== 'undefined' &&
      window.innerWidth > 768 &&
      !isMouseOver
    ) {
      startAutoSwitch();
    }

    return () => {
      if (autoSwitchInterval) {
        clearInterval(autoSwitchInterval);
      }
    };
  }, [isMouseOver, startAutoSwitch]);

  // useEffect(() => {
  //   const initialDelay = 2000; // 初始延迟 2 秒
  //   const interval = 2000; // 间隔时间为 2 秒
  //   const maxDelay = 16000; // 最大延迟 16 秒
  //   let delay = initialDelay;
  //   let param = 0;

  //   const timer = setTimeout(() => {
  //     abTestPoint(param);
  //     param += 2; // 参数递增
  //   }, initialDelay);

  //   const intervalTimer = setInterval(() => {
  //     if (delay >= maxDelay) {
  //       clearInterval(intervalTimer);
  //       return;
  //     }
  //     abTestPoint(param);
  //     param *= 2; // 参数乘以 2
  //     delay *= 2; // 延迟乘以 2
  //   }, interval);

  //   // 在组件卸载时清除定时器
  //   return () => {
  //     clearTimeout(timer);
  //     clearInterval(intervalTimer);
  //   };
  // }, []); // 仅在组件挂载时执行

  // async function abTestPoint(duration: number) {
  //   const token = Cookies.get('token');
  //   const pageName = 'Hero';

  //   if (token) {
  //     await handleAbTestByTokenPoint({
  //       page: pageName,
  //       duration: duration,
  //     });
  //   } else {
  //     await handleAbTestPoint({
  //       page: pageName,
  //       duration: duration,
  //     });
  //   }
  // }

  // async function abTest(flag: string) {
  //   const token = Cookies.get('token');

  //   if (token) {
  //     await handleAbTestByToken(flag);
  //   } else {
  //     await handleAbTest(flag);
  //   }
  // }

  return (
    <m.section
      ref={ref}
      variants={staggerContainer()}
      initial='hidden'
      whileInView='show'
      viewport={{
        once: true,
      }}
      className='relative flex w-full justify-center px-4 sm:mt-0 sm:px-0'
    >
      <m.div
        variants={textVariant(0.3)}
        className='absolute -z-10 hidden h-full w-full sm:block'
      >
        <Image
          draggable='false'
          alt='gardient-bg'
          priority
          className='absolute top-10 h-[80%] w-full'
          width={10}
          height={10}
          loading='eager'
          src='/landing/heros/Mask_group.png'
        />
      </m.div>
      <m.div
        variants={textVariant(0)}
        className='sm:flex-center flex h-full w-full flex-col py-10 sm:w-[1200px] sm:flex-col sm:py-20'
      >
        {getCurrentLanguage() === 'en' ? (
          // 英文
          // <h1 className='text-center font-baskerville text-[32px] font-[400] leading-normal sm:text-center sm:text-[48px]'>
          //   <span  className='relative inline-block before:absolute before:-inset-1 before:top-[18px] before:z-[-1] before:block before:h-[40%] before:-skew-y-0 before:bg-[#D2DFFF] sm:before:top-[36px] sm:before:h-[40%]'>
          //   {t("transform")}
          //   </span>{' '}
          //   {t('your')}
          //   <br className='sm:hidden' /> {t('academic')}
          //   <br className='hidden sm:block' /> {t('writing')}
          //   <br className='sm:hidden' /> {t('journey')}
          // </h1>
          currentTitleNode
        ) : (
          // 中文
          <h1
            style={{ fontFamily: 'XiQuejuzhenti' }}
            className='text-center font-baskerville font-[400] leading-normal text-[32lpx] sm:text-center sm:text-[48px]'
          >
            {t('transform')}
            <br /> {t('your')}
            {t('academic')}
            {t('writing')}
            {t('journey')}
          </h1>
        )}

        {/* <Spacer y='20' />
        {
          // 英文
           getCurrentLanguage() === 'en'? 
           <p className='text-center text-[14px] leading-relaxed tracking-normal text-[#64626A] sm:text-center sm:text-[18px]'>
            {t('experience_the')}{' '}
            <span className='text-doc-primary'>{t('one_stop')}</span>
            <br className='hidden sm:block' /> {t('that_enhances_writing')}&nbsp;
            <span className='text-doc-primary'>{t('efficiency')}</span> {t('and_elevates')}
            {t('paper')} <span className='text-doc-primary'>{t('quality')}</span>
          </p>
          :
          // 中文
          <p className='text-center text-[14px] leading-relaxed tracking-normal text-[#64626A] sm:text-center sm:text-[18px]'>
            {t('experience_the')}{' '}<br/>{t('one_stop')}{t('that_enhances_writing')}{t('efficiency')}{t('and_elevates')}{t('quality')}{t('paper')}
          </p>
        } */}

        <Spacer y='40' />
        <div className='relative flex w-full flex-col items-center justify-center gap-x-0 gap-y-4 pl-2 sm:flex-row sm:items-start sm:gap-x-6 sm:gap-y-0'>
          <Link passHref href={'/signup'}>
            <Button
              role='button'
              className='h-max w-52 rounded-lg bg-doc-primary px-5 sm:w-max sm:px-8 sm:py-2.5'
            >
              <strong>{t('start_writing')}</strong>
              {t('It_s_free')}
            </Button>
          </Link>
          <Link href={'https://discord.gg/xXSFXv5kPd'} passHref target='_blank'>
            <Button
              className='h-max w-52 rounded-lg border border-doc-primary text-doc-primary sm:w-max sm:px-8 sm:py-2.5'
              variant={'ghost'}
              role='button'
            >
              {t('join_community')}
            </Button>
          </Link>
        </div>
        <Spacer y='90' className='hidden sm:block' />
        <Spacer y='20' className='block sm:hidden' />
        {isMobile && <HeroCarousel clickCallback={memoSetSelected} />}
        <div className='hidden w-full justify-between gap-x-4 sm:flex'>
          {HeroInfo.map((item, index) => {
            return (
              <span
                className={`${selected === index ? 'border border-doc-primary/20 ' : 'bg-doc-primary/5'} flex cursor-pointer flex-col gap-y-2 rounded-[20px] p-5 sm:w-1/4`}
                key={item.id}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  alt={item.title}
                  width={28}
                  height={28}
                  src={item.icon}
                  loading='eager'
                  priority
                />
                <h2 className='title-regular 2xl:h3-regular'>
                  {t(`HeroInfo_title_${index + 1}`)}
                </h2>
                <p className='text-[12px] leading-relaxed text-shadow-100 2xl:text-regular'>
                  {t(`HeroInfo_text_${index + 1}`)}
                </p>
              </span>
            );
          })}
        </div>
        <Spacer y='40' />
        <div className='relative h-[270px] w-full overflow-hidden sm:h-[800px]'>
          {HeroMainInfo.map((item, index) => (
            <div
              key={index}
              className={`absolute left-0 top-0 h-full w-full transition-opacity duration-500 ${
                index === selected ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                alt={'prodream.ai'}
                src={item.image}
                fill
                loading='eager'
                priority
                sizes='(max-width: 768px) 50vw, 100vw'
                className='h-full w-full object-cover'
              />
            </div>
          ))}
        </div>
      </m.div>
    </m.section>
  );
};

export const V2Title: React.FC = () => {
  const { t } = useLocalization();

  return (
    <>
      <h1 className='text-center font-baskerville text-[32px] font-[400] leading-normal sm:text-center sm:text-[48px]'>
        {'Say Goodbye to'} <br className='sm:hidden' />
        <span className='relative inline-block before:absolute before:-inset-1 before:top-[28px] before:z-[-1] before:block before:h-[40%] before:-skew-y-0 before:bg-[#D2DFFF] sm:before:top-[36px] sm:before:h-[40%]'>
          <TypeWriterAnimation
            texts={[
              'Brain Fog',
              'Plagiarism Risks',
              'Grammar Issues',
              'AI Concerns',
              'Quality Worries',
            ]}
          />{' '}
          <span className='cursor'></span>
          {/* <TextAnimation texts={["Brain Fog","Plagiarism Risks","Grammer Issues","AI Concerns","Quality Worries"]} classN='containerV2' /> */}
        </span>
        <span className='sm:block'>{'    '}</span>
        <br className='sm:hidden' /> {'in Academic Writing'}
      </h1>
      <Spacer y='30' />
      <p className='text-center text-[18px] leading-relaxed tracking-normal text-[#64626A] sm:text-center sm:text-[18px]'>
        {`ProDream's`}{' '}
        <span className='font-bold'>{t('one_stop_solution')}</span>{' '}
        {t('helps_you_write')} <span className='font-bold'>{t('better')}</span>{' '}
        {t('and')} <span className='font-bold'>{t('faster')}</span>{' '}
        {t('with_confidence')}
      </p>
    </>
  );
};

export const V3Title: React.FC = () => {
  const { t } = useLocalization();
  return (
    <>
      <h1 className='text-center font-baskerville text-[32px] font-[400] leading-normal sm:text-center sm:text-[48px]'>
        {'Generate a Strong Paper'}
        <br />{' '}
        <span className='relative inline-block before:absolute before:-inset-1 before:top-[38px] before:z-[-1] before:block before:h-[40%] before:-skew-y-0 before:bg-[#D2DFFF] sm:before:top-[36px] sm:before:h-[40%]'>
          <TypeWriterAnimation
            texts={[
              'Outline',
              'Introduction',
              'Summary',
              'Conclusion',
              'Citation List',
            ]}
          />{' '}
          <span className='cursor'></span>
          {/* <TextAnimation texts={["Outline","Introduction","Summary","Conclusion","Citation List"]} classN={"containerV3"} /> */}
        </span>{' '}
        <br className='sm:hidden' /> {` in Minutes!`}
      </h1>
      <Spacer y='30' />
      <p className='text-center text-[18px] leading-relaxed tracking-normal text-[#64626A] sm:text-center sm:text-[18px]'>
        {t('discover_the')}{' '}
        <span className='font-bold'>{t('ultimate_solution')}</span>{' '}
        {t('for_your_academic_paper_requirements_with_pro_dream')}{' '}
      </p>
    </>
  );
};

export const TextAnimation = (props: { texts: string[]; classN: string }) => {
  const { texts, classN } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTextIndex, setVisibleTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleTextIndex((prev) => (prev === texts.length - 1 ? 0 : prev + 1)); // 切换显示的文本索引
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === texts.length - 1 ? 0 : prev + 1)); // 切换当前文本索引
      }, 1500); // 在当前文本隐藏后1.5秒再次切换到下一个文本
    }, 3000); // 5000毫秒切换一次

    return () => clearInterval(interval);
  }, [texts]);

  return (
    <span className={classN ?? 'container'} style={{ display: 'inline-block' }}>
      {texts.map((text, index) => (
        <span
          key={index}
          className={`text ${index === visibleTextIndex ? 'slide-in-top' : 'slide-in-bottom'}`}
          style={{ zIndex: index === visibleTextIndex ? 1 : 0, width: '100%' }}
        >
          {text}
        </span>
      ))}
    </span>
  );
};

export const TypeWriterAnimation = (props: { texts: string[] }) => {
  const { texts } = props;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [texts]);

  const typewriterText = useTypewriter(texts[index]);

  return typewriterText;
};

export default Hero;
