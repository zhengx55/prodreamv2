'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { memo, useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const WelcomeCN = () => {
  const [show, setShow] = useState(false);

  const ImageCard = ({
    src,
    alt,
    description,
  }: {
    src: string;
    alt: string;
    description: string;
  }) => (
    <div className='flex-shrink-0 rounded-lg bg-[#F8F9FC] px-[20px] py-[24px] text-center'>
      <Image
        src={src}
        alt={alt}
        className='mx-auto mb-2'
        width={180}
        height={158}
      />
      <p className='mt-[24px] text-center text-sm font-normal leading-[160%] text-[#475574]'>
        {description}
      </p>
    </div>
  );

  const Footer = () => (
    <div className='text-center'>
      <Button
        className=''
        variant={'default'}
        onClick={() => {
          setShow(false);
        }}
      >
        开启ProDream写作之旅
      </Button>
    </div>
  );

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[784px] md:gap-y-0 md:rounded-lg md:p-4'
      >
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center justify-between gap-x-2'>
              <p className='text-xl font-semibold'>欢迎来到 ProDream</p>
              <DialogClose asChild className='cursor-pointer'>
                <X className='self-end text-shadow' />
              </DialogClose>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className='mb-6 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
          <ImageCard
            src='/onboard/modal/Onboard_Modal_Pic_01.png'
            alt='快速开启文书生成 续写/润写/提纲生成多项体验'
            description='快速开启文书生成 续写/润写/提纲生成多项体验'
          />
          <ImageCard
            src='/onboard/modal/Onboard_Modal_Pic_02.png'
            alt='专业学术写作 文献引用/剽窃检测均专业可靠'
            description='专业学术写作 文献引用/剽窃检测均专业可靠'
          />
          <ImageCard
            src='/onboard/modal/Onboard_Modal_Pic_03.png'
            alt='MEET JESSICA AI对话，随时答疑解惑'
            description='MEET JESSICA AI对话，随时答疑解惑'
          />
        </div>
        <Footer />
      </DialogContent>
    </Dialog>
  );
};

export default memo(WelcomeCN);
