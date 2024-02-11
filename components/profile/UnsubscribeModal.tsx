import { ReactNode } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const UnsubscribeModal = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='bg-white md:w-[600px] md:rounded-lg'>
        <DialogTitle className='h3-semibold'>
          Are you sure you want to leave?
        </DialogTitle>
        <DialogDescription className='base-regular text-doc-font'>
          Your Unlimited plan offers comprehensive support for unlimited AI
          prompts, smart generations, citations, grammar and originality
          checks-all in one package. Reconsider to keep enhancing your writing
          effortlessly.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              role='button'
              variant={'ghost'}
              className='h-max border border-doc-primary py-1.5'
            >
              Continue with Unsubscription
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button role='button' className='h-max py-1.5'>
              Stay Subscribed
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default UnsubscribeModal;
