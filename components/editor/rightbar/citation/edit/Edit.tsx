import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCitation } from '@/zustand/store';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { memo } from 'react';
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
    <div className='relative flex h-full w-full flex-col overflow-hidden'>
      <Tabs defaultValue={'in-text'} className='flex-1 overflow-y-auto'>
        <TabsList className='gap-x-2 self-start'>
          <TabsTrigger
            value='in-text'
            className='rounded-lg border border-shadow-border px-2 py-1 text-doc-font data-[state=active]:border-transparent data-[state=active]:bg-doc-primary/20 data-[state=active]:text-doc-primary'
          >
            Edit in-text
          </TabsTrigger>
          <TabsTrigger
            className='rounded-lg border border-shadow-border px-2 py-1 text-doc-font data-[state=active]:border-transparent data-[state=active]:bg-doc-primary/20 data-[state=active]:text-doc-primary'
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
