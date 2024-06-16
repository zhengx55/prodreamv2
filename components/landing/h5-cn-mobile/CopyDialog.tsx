'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Icon from '@/components/root/Icon';
import { memo } from 'react';
import Image from 'next/image';

const CopyDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <>
      <Dialog open={open}>
        <DialogContent
          className='block w-3/4 rounded-xl bg-white p-6 shadow sm:w-[332px]'
          onPointerDownOutside={(e) => setOpen(false)}
        >
          <Image
            src='/logo/Prodream.png'
            alt='ProDream Logo'
            width={104}
            height={16}
            className='mb-6'
          />
          <p className='text-center text-xs font-normal leading-5 tracking-tighter text-neutral-500'>
            粘贴链接到浏览器
          </p>
          <p className='text-center text-xs font-normal leading-5 tracking-tighter text-neutral-500'>
            即可立即体验ProDream全部功能
          </p>
          <div className='mx-auto mb-4 mt-[10px] flex h-6 w-60 flex-col items-center justify-center gap-2 py-0'>
            <p className='font-poppins text-xs font-normal leading-5 text-blue-500'>
              {'https://prodream.cn/'}
            </p>
          </div>
          <div
            className='mx-auto flex w-[180px] items-center justify-center gap-2 rounded-[4px] bg-[#F2FFF3] px-[12px] py-[8px]'
            onClick={() => {
              navigator.clipboard.writeText('https://prodream.cn/');
              setOpen(false);
            }}
          >
            <Icon
              alt=''
              src='/landing/h5_cn_mobile/check-circle.svg'
              width={14}
              height={14}
              className='size-[14px]'
            />
            <p className='text-xs font-normal leading-5 text-green-500'>
              复制成功
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default memo(CopyDialog);
