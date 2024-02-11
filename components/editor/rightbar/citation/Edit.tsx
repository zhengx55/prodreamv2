import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCitation } from '@/zustand/store';
import { memo } from 'react';

const Edit = () => {
  const updateShowEditCitation = useCitation(
    (state) => state.updateShowEditCitation
  );
  return (
    <div className='relative flex h-full w-full flex-col'>
      <Tabs
        defaultValue={'in-text'}
        className='flex flex-1 flex-col justify-start gap-y-2'
      >
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
        <TabsContent value='in-text'>
          <div className='flex flex-col rounded border border-shadow-border p-2'>
            <h1 className='font-medium'>
              What ls an MBA Degree? MBA Programs and What MBAStands For{' '}
            </h1>
          </div>
        </TabsContent>
        <TabsContent value='citation'></TabsContent>
      </Tabs>
      <div className='absolute bottom-0 flex w-full justify-end gap-x-2 border-t border-shadow-border bg-white py-1.5'>
        <Button
          className='h-max rounded border border-doc-primary text-doc-primary'
          variant={'ghost'}
          type='button'
          onClick={() => {
            updateShowEditCitation(false);
          }}
        >
          Cancel
        </Button>
        <Button type='button' role='button' className='h-max rounded'>
          Save
        </Button>
      </div>
    </div>
  );
};
export default memo(Edit);
