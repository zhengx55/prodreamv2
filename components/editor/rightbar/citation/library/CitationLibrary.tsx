import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserTrackInfo } from '@/query/query';
import { useCitation } from '@/zustand/store';
import { memo } from 'react';
import Empty from './Empty';
import InTextList from './InTextList';
import LibraryList from './LibraryList';

const CitationLibrary = () => {
  const IndocCitationIds = useCitation((state) => state.inDocCitationIds);
  const InTextCitationIds = useCitation((state) => state.inTextCitationIds);
  const { data: track } = useUserTrackInfo();
  const showEmpty =
    !track?.citation_empty_check &&
    IndocCitationIds.length === 0 &&
    InTextCitationIds.length === 0;
  return (
    <div className='flex h-full w-full flex-col'>
      <Tabs defaultValue='library' className='h-full w-full'>
        <TabsList className='flex-1 gap-x-2'>
          <TabsTrigger
            value='library'
            className='hover:bg-border-200 rounded border border-gray-200 bg-zinc-100 p-2 data-[state=active]:bg-doc-primary/20 data-[state=active]:text-doc-primary hover:bg-gray-200'
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value='doc'
            className='hover:bg-border-200 rounded border border-gray-200 bg-zinc-100 p-2 data-[state=active]:bg-doc-primary/20 data-[state=active]:text-doc-primary hover:bg-gray-200'
          >
            In this doc
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
