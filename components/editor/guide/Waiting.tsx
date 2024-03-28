import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogOverlay,
} from '@/components/ui/dialog';
import { useUserTask } from '@/zustand/store';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';

const Waiting = () => {
  const open = useUserTask((state) => state.show_outline_loading_dialog);
  const setOpen = useUserTask((state) => state.updateShowOutlineLoadingDialog);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className='bg-black/50 backdrop-blur-sm' />
      <DialogContent
        className='bg-white p-6 shadow md:w-[448px] md:rounded-2xl'
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className='flex-center'>
          <Image
            alt='waiting'
            src='/editor/Loading.png'
            width={180}
            height={180}
            className='size-44 self-center'
          />
        </div>
        <p className='text-center text-sm font-light leading-7 text-zinc-600'>
          AI is processing your outline.
        </p>
        <DialogFooter className='sm:justify-center'>
          <Loader2 className='animate-spin text-violet-500' />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default memo(Waiting);
