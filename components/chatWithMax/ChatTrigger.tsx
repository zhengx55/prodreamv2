import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight, Plus, X } from 'lucide-react';

const ChatTrigger = () => {
  return (
    <div className='ml-[2.5%] mt-8 flex h-[120px] w-[95%] justify-between gap-x-3 rounded-xl border border-shadow-border p-2.5'>
      <div className='relative flex-[0.25]'>
        <Image
          alt='max'
          src='/max.png'
          className='object-contain'
          fill
          sizes='(max-width: 768px) 100vw, 33vw'
        />
      </div>
      {/* max avatar */}
      <div className='flex h-full flex-[0.75] flex-col justify-between'>
        <h1 className='small-medium'>Hi! I&apos;m Max Tang</h1>
        <p className='subtle-regular text-shadow-100'>
          Specialize in transfer admissions
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={'outline'}
              size={'sm'}
              className='subtle-medium h-7 gap-x-1 border-primary-200 text-primary-200 hover:-translate-y-1 hover:transition-transform'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 17 16'
                fill='none'
              >
                <path
                  d='M8.50914 1.99902C4.84361 1.99902 1.84247 4.66636 1.84247 7.99902C1.84247 9.08102 2.16521 10.129 2.75914 11.0404C2.85407 11.1864 2.93627 11.5164 2.88414 11.8324C2.83014 12.159 2.65974 12.4784 2.32167 12.6657C2.21641 12.7244 1.84554 12.887 1.84247 13.3324C1.83934 13.7777 2.22287 13.997 2.50914 13.999C3.18594 14.0044 7.34447 13.999 8.50914 13.999C12.1745 13.999 15.1758 11.3317 15.1758 7.99902C15.1758 4.66636 12.1745 1.99902 8.50914 1.99902ZM8.50914 3.33236C11.4711 3.33236 13.8425 5.44036 13.8425 7.99902C13.8425 10.5577 11.4711 12.6657 8.50914 12.6657C7.62381 12.6657 5.59174 12.6657 4.00914 12.6657C4.31514 12.0304 4.2926 11.0217 3.86327 10.3117C3.43234 9.59835 3.17581 8.81836 3.17581 7.99902C3.17581 5.44036 5.54727 3.33236 8.50914 3.33236ZM5.84247 5.99902C5.47427 5.99902 5.17581 6.29769 5.17581 6.66569C5.17581 7.03369 5.47427 7.33236 5.84247 7.33236H11.1758C11.5438 7.33236 11.8425 7.03369 11.8425 6.66569C11.8425 6.29769 11.5438 5.99902 11.1758 5.99902H5.84247ZM5.84247 8.66569C5.47427 8.66569 5.17581 8.96436 5.17581 9.33236C5.17581 9.70036 5.47427 9.99902 5.84247 9.99902H9.17581C9.54381 9.99902 9.84247 9.70036 9.84247 9.33236C9.84247 8.96436 9.54381 8.66569 9.17581 8.66569H5.84247Z'
                  fill='#9C2CF3'
                />
              </svg>
              Start chatting
            </Button>
          </DialogTrigger>
          <DialogContent className='flex p-0 md:h-[700px] md:w-[900px]'>
            <div className='flex w-[70%] flex-col items-center gap-y-2 pt-[100px]'>
              <div className='flex-center h-16 w-16 rounded-[47px] rounded-bl-none bg-primary-50'>
                <Image
                  alt='max'
                  src='/max.png'
                  className='h-auto w-auto'
                  width={26}
                  height={34}
                />
              </div>
              <h1 className='h2-bold '>
                Hi, I&apos;m Max. How can I help you ?
              </h1>
              <p className='base-regular text-shadow-100'>
                Ask me questions on the following aspects
              </p>
              <div className='flex-between mt-12 w-[80%] cursor-pointer rounded-xl border border-shadow-border p-4 hover:bg-primary-50'>
                <div className='flex items-center gap-x-2'>
                  <div className='flex-center h-14 w-14 rounded-xl bg-[#9068D033]'>
                    <Image
                      src={'/school-chat.svg'}
                      width={32}
                      height={32}
                      alt='school-chat'
                    />
                  </div>
                  <p className='title-semibold'> School selection</p>
                </div>
                <ArrowRight className='text-shadow-100' />
              </div>
              <div className='flex-between mt-2 w-[80%] cursor-pointer rounded-xl border border-shadow-border p-4 hover:bg-primary-50'>
                <div className='flex items-center gap-x-2'>
                  <div className='flex-center h-14 w-14 rounded-xl bg-[#F6DACE]'>
                    <Image
                      src={'/colleage-chat.svg'}
                      width={32}
                      height={32}
                      alt='college-chat'
                    />
                  </div>
                  <p className='title-semibold'> College application</p>
                </div>
                <ArrowRight className='text-shadow-100' />
              </div>
            </div>
            <div className='flex w-[30%] flex-col rounded-r-[20px] bg-shadow-200 p-3'>
              <div className='flex self-end'>
                <X />
              </div>

              <Button className='mt-auto'>
                <Plus /> New chat
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ChatTrigger;
