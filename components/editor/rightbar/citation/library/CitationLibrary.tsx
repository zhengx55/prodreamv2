import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditorDictType } from '@/types';
import { useCitation } from '@/zustand/store';
import { memo } from 'react';
import Empty from './Empty';
import InTextList from './InTextList';
import LibraryList from './LibraryList';

const CitationLibrary = ({ t }: { t: EditorDictType }) => {
  const IndocCitationIds = useCitation((state) => state.inDocCitationIds);
  const InTextCitationIds = useCitation((state) => state.inTextCitationIds);
  const showEmpty =
    IndocCitationIds.length === 0 && InTextCitationIds.length === 0;
  return (
    <div className='flex h-full w-full flex-col'>
      <Tabs defaultValue='library' className='h-full w-full'>
        <TabsList className='w-full justify-start gap-x-2 border-b border-gray-200 p-0'>
          <TabsTrigger
            value='library'
            className='border-b-[3px] border-transparent data-[state=active]:border-violet-500 data-[state=active]:text-violet-500'
          >
            {t.Citation.my_library}
          </TabsTrigger>
          <TabsTrigger
            value='doc'
            className='border-b-[3px] border-transparent data-[state=active]:border-violet-500 data-[state=active]:text-violet-500'
          >
            {t.Citation.in_this_doc}
          </TabsTrigger>
        </TabsList>
        {showEmpty ? (
          <Empty />
        ) : (
          <>
            <TabsContent className='h-[calc(100%_-60px)]' value='library'>
              <LibraryList />
            </TabsContent>
            <TabsContent className='h-[calc(100%_-60px)]' value='doc'>
              <InTextList />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};
export default memo(CitationLibrary);
