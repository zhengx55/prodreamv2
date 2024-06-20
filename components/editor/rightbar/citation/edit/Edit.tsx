import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCitation } from '@/zustand/store';
import { ChevronLeft } from 'lucide-react';
import { memo } from 'react';
import { useUnmount } from 'react-use';
import EditCitation from './EditCitation';
import EditIntext from './EditIntext';

const Edit = () => {
  const updateShowEditCitation = useCitation(
    (state) => state.updateShowEditCitation
  );
  const updateCurrentInline = useCitation((state) => state.updateCurrentInline);
  useUnmount(() => {
    updateShowEditCitation(false);
    updateCurrentInline(null);
  });
  return (
    <div className='relative flex h-full min-h-screen w-full flex-col overflow-hidden'>
      <div className='flex items-center gap-x-2'>
        <Button
          role='button'
          variant={'icon'}
          onClick={() => updateShowEditCitation(false)}
          className='size-max p-0.5'
        >
          <ChevronLeft size={20} />
        </Button>
        <h2 className='title-medium'>Edit Citaitons</h2>
      </div>
      <Spacer y='20' />
      <Tabs defaultValue={'in-text'} className='flex-1 overflow-y-auto'>
        <TabsList className='gap-x-2 self-start'>
          <TabsTrigger
            value='in-text'
            className='rounded-lg border border-gray-200 px-2 py-1 text-neutral-400 data-[state=active]:border-transparent data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-500'
          >
            Edit in-text
          </TabsTrigger>
          <TabsTrigger
            className='rounded-lg border border-gray-200 px-2 py-1 text-neutral-400 data-[state=active]:border-transparent data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-500'
            value='citation'
          >
            Edit Citation
          </TabsTrigger>
        </TabsList>
        <EditIntext />
        <EditCitation />
      </Tabs>
    </div>
  );
};
export default memo(Edit);
