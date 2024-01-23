import Spacer from '@/components/root/Spacer';
import { Book } from '@/components/root/SvgComponents';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/citation-drawer';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { MutableRefObject } from 'react';
type Props = { container: MutableRefObject<any> };

const Mine = ({ container }: Props) => {
  return (
    <Drawer modal={false}>
      <DrawerTrigger asChild>
        <span className='flex-center absolute bottom-10 right-4 h-7 w-6 cursor-pointer rounded-t bg-doc-primary'>
          <ChevronsUp size={18} className='text-white' />
        </span>
      </DrawerTrigger>
      <DrawerContent
        onInteractOutside={(e) => e.preventDefault()}
        container={container.current}
        className='flex h-[calc(100%_-(169px))] w-[calc(500px_-24px)] flex-col rounded-none border-none bg-white'
      >
        <Spacer y='28' />
        <DrawerClose asChild>
          <span className='flex-center absolute -top-0 right-4 h-7 w-6 cursor-pointer rounded-t bg-doc-primary'>
            <ChevronsDown size={18} className='text-white' />
          </span>
        </DrawerClose>

        <div className='flex-center h-10 w-full gap-x-2 border-t border-shadow-border bg-white'>
          <Book />
          <p className='text-doc-primary'>My Citation</p>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default Mine;
