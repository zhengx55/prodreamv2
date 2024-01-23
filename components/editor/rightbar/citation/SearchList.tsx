import Spacer from '@/components/root/Spacer';
import { Book } from '@/components/root/SvgComponents';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useStatefulRef } from '@bedrock-layout/use-stateful-ref';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import SearchBar from './SearchBar';

const SearchList = () => {
  const container = useStatefulRef(null);

  return (
    <section
      ref={container}
      className='relative flex flex-1 flex-col overflow-visible'
    >
      <Spacer y='10' />
      <SearchBar />
      <Spacer y='10' />
      <div className='flex h-[calc(100%_-2.5rem)] w-full flex-col overflow-y-auto'></div>
      <div className='flex-center absolute bottom-0 h-10 w-full gap-x-2 border-t border-shadow-border bg-white'>
        <Book />
        <p className='text-doc-primary'>My Citation</p>
      </div>
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
    </section>
  );
};
export default SearchList;
