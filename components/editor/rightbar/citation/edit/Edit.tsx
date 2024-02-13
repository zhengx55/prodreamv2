import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { memo } from 'react';
import EditIntext from './EditIntext';

const Edit = () => {
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
        <EditIntext />
        <TabsContent value='citation'></TabsContent>
      </Tabs>
    </div>
  );
};
export default memo(Edit);
