import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
type Props = { progress: number; onAbort: () => void };
const WaitingModal = ({ progress, onAbort }: Props) => {
  return (
    <Dialog open={true}>
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
        <Progress value={progress} />
        <p className='text-center text-sm font-light leading-7 text-neutral-400'>
          May take up to 5 minutes, thank you for waiting
        </p>
        <DialogFooter>
          <Button
            onClick={onAbort}
            role='button'
            variant={'ghost'}
            className='rounded-lg border border-neutral-400 text-zinc-500'
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default WaitingModal;
