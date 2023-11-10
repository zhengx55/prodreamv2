'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const RotbotLoader = ({
  label,
  labelClass,
}: {
  label: string;
  labelClass: string;
}) => {
  const dots = ['.', '.', '.']; // 三个点
  const [dotElements, setDotElements] = useState<any>([]);

  useEffect(() => {
    const dotsWithAnimation = dots.map((dot, index) => (
      <span
        key={index}
        className='fading-dot'
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        {dot}
      </span>
    ));

    setDotElements(dotsWithAnimation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='flex-center relative h-full w-full flex-col gap-y-2'>
      <Image
        src='/RobotLoading.svg'
        alt='robot'
        width={50}
        height={50}
        className='absolute animate-ping'
      />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='116'
        height='116'
        viewBox='0 0 116 116'
        fill='none'
        className=' animate-spin'
      >
        <g clipPath='url(#clip0_333_22926)'>
          <path
            d='M57.999 112.998C50.7763 112.998 43.6243 111.575 36.9514 108.811C30.2785 106.047 24.2154 101.996 19.1081 96.8889C14.0009 91.7817 9.94966 85.7185 7.18565 79.0456C4.42164 72.3727 2.99902 65.2207 2.99902 57.998C2.99902 50.7753 4.42164 43.6234 7.18565 36.9505C9.94966 30.2775 14.0009 24.2144 19.1082 19.1072C24.2154 13.9999 30.2785 9.94868 36.9514 7.18467C43.6244 4.42066 50.7763 2.99805 57.999 2.99805C65.2217 2.99805 72.3737 4.42067 79.0466 7.18468C85.7195 9.94869 91.7827 14 96.8899 19.1072C101.997 24.2144 106.048 30.2776 108.812 36.9505C111.576 43.6234 112.999 50.7754 112.999 57.9981C112.999 65.2208 111.576 72.3727 108.812 79.0457C106.048 85.7186 101.997 91.7817 96.8899 96.8889C91.7827 101.996 85.7195 106.047 79.0466 108.811C72.3737 111.575 65.2217 112.998 57.999 112.998L57.999 112.998Z'
            stroke='#E8E8E8'
            strokeWidth='6'
          />
          <path
            d='M26.658 12.8033C35.5969 6.60444 46.1733 3.1955 57.0496 3.00755C67.926 2.8196 78.6138 5.86109 87.7616 11.7474C96.9094 17.6337 104.106 26.1004 108.442 36.0769C112.778 46.0535 114.058 57.0917 112.12 67.7957'
            stroke='url(#paint1_linear_333_22926)'
            strokeWidth='6'
          />
          <circle
            cx='26.5704'
            cy='12.6761'
            r='3'
            transform='rotate(-79.74 26.5704 12.6761)'
            fill='#B641BC'
          />
          <circle
            cx='112.12'
            cy='67.7952'
            r='3'
            transform='rotate(-79.74 112.12 67.7952)'
            fill='#8003F4'
          />
        </g>
        <defs>
          <linearGradient
            id='paint0_linear_333_22926'
            x1='22'
            y1='58'
            x2='94'
            y2='58'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#C451AF' />
            <stop offset='1' stopColor='#7E00F7' />
          </linearGradient>
          <linearGradient
            id='paint1_linear_333_22926'
            x1='0.927367'
            y1='47.6687'
            x2='115.072'
            y2='68.33'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#C24FB0' />
            <stop offset='1' stopColor='#7F01F6' />
          </linearGradient>
          <clipPath id='clip0_333_22926'>
            <rect width='116' height='116' fill='white' />
          </clipPath>
        </defs>
      </svg>
      <div
        id='fading-dots'
        className={cn(labelClass, 'absolute top-[calc(50%_+_60px)]')}
      >
        {label}
        {dotElements}
      </div>
    </div>
  );
};

export default RotbotLoader;
