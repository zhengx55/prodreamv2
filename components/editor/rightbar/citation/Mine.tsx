import Spacer from '@/components/root/Spacer';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/citation-drawer';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { MutableRefObject, useState } from 'react';
import InTextList from './InTextList';
import LibraryList from './LibraryList';
type Props = { container: MutableRefObject<any> };

const Mine = ({ container }: Props) => {
  const [selected, setSelected] = useState(0);
  const [show, setShow] = useState(true);
  return (
    <Drawer open={show} onOpenChange={setShow} modal={false}>
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
        <div className='flex-between h-10 w-full shrink-0 gap-x-2 border-t border-shadow-border bg-white'>
          <div className='flex items-center gap-x-2'>
            <Book />
            <p className='text-doc-primary'>My Citation</p>
          </div>
          <div className='flex items-center gap-x-2'>
            <Button
              onClick={() => setSelected(0)}
              variant={'ghost'}
              className={`${selected === 0 ? 'bg-doc-primary/20 text-doc-primary' : 'bg-doc-shadow/20 text-doc-shadow'} h-max rounded px-2 py-1`}
            >
              Library
            </Button>
            <Button
              onClick={() => setSelected(1)}
              variant={'ghost'}
              className={`${selected === 1 ? 'bg-doc-primary/20 text-doc-primary' : 'bg-doc-shadow/20 text-doc-shadow'} h-max rounded px-2 py-1`}
            >
              In this doc
            </Button>
          </div>
        </div>
        {selected === 0 ? <LibraryList /> : <InTextList />}
      </DrawerContent>
    </Drawer>
  );
};
export default Mine;
