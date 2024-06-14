'use client';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import Icon from '@/components/root/Icon';
import { memo } from 'react';
import Image from 'next/image';

const CopyDialog = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {

    return (
        <>
            <Dialog open={open}>
                <DialogContent
                    className='bg-white p-6 shadow w-3/4 rounded-xl sm:w-[332px] block'
                    onPointerDownOutside={(e) => setOpen(false)}
                >
                    <Image src="/logo/Prodream.png" alt="ProDream Logo" width={104} height={16} className="mb-6" />
                    <p className="text-neutral-500 text-center text-xs font-normal leading-5 tracking-tighter">
                        粘贴链接到浏览器
                    </p>
                    <p className="text-neutral-500 text-center text-xs font-normal leading-5 tracking-tighter">
                        即可立即体验ProDream全部功能
                    </p>
                    <div className="flex flex-col items-center justify-center w-60 h-6 py-0 gap-2 mx-auto mt-[10px] mb-4">
                        <p className='font-poppins text-xs text-blue-500 font-normal leading-5'>{'https://prodream.cn/'}</p>
                    </div>
                    <div className='flex items-center justify-center gap-2 rounded-[4px] bg-[#F2FFF3] py-[8px] px-[12px] w-[180px] mx-auto' onClick={() => {
                        navigator.clipboard.writeText('https://prodream.cn/');
                        setOpen(false);
                    }}>
                        <Icon
                            alt=''
                            src='/landing/h5_cn_mobile/check-circle.svg'
                            width={14}
                            height={14}
                            className='size-[14px]'
                        />
                        <p className='text-xs text-green-500 font-normal leading-5'>复制成功</p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default memo(CopyDialog);
