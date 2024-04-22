import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditorDictType } from '@/types';
import { useCitation } from '@/zustand/store';
import { ChevronLeft } from 'lucide-react';
import { memo } from 'react';
import Book from './form/Book';
import Journal from './form/Journal';
import Website from './form/Website';

const CustomCitation = ({ t }: { t: EditorDictType }) => {
  const updateShowCreateCitation = useCitation(
    (state) => state.updateShowCreateCitation
  );
  return (
    <section className='relative flex h-full w-full flex-col overflow-hidden'>
      <div className='flex items-center gap-x-2'>
        <Button
          role='button'
          variant={'icon'}
          onClick={() => updateShowCreateCitation(false)}
          className='size-max p-0.5'
        >
          <ChevronLeft size={20} />
        </Button>
        <h2 className='title-medium'>Add Customzied Citaitons</h2>
      </div>
      <Spacer y='20' />
      <Tabs defaultValue='Website' className='h-full w-full overflow-y-auto'>
        <TabsList className='h-8 w-full justify-start gap-x-2 rounded-none border-b border-gray-200 p-0'>
          <TabsTrigger
            className='border-b-[3px] border-transparent data-[state=active]:border-violet-500 data-[state=active]:text-violet-500'
            value='Website'
          >
            Website
          </TabsTrigger>
          <TabsTrigger
            className='border-b-[3px] border-transparent data-[state=active]:border-violet-500 data-[state=active]:text-violet-500'
            value='Book'
          >
            Book
          </TabsTrigger>
          <TabsTrigger
            className='border-b-[3px] border-transparent data-[state=active]:border-violet-500 data-[state=active]:text-violet-500'
            value='Journal'
          >
            Journal
          </TabsTrigger>
        </TabsList>
        <TabsContent value='Website'>
          <Website />
        </TabsContent>
        <TabsContent value='Book'>
          <Book />
        </TabsContent>
        <TabsContent value='Journal'>
          <Journal />
        </TabsContent>
      </Tabs>
    </section>
  );
};
export default memo(CustomCitation);
