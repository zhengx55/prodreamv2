import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCitation } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import Title from '../../Title';
import Empty from './Empty';
import LibraryList from './LibraryList';

const InTextList = dynamic(() => import('./InTextList'));

const CitationLibrary = () => {
  const trans = useTranslations('Editor');
  const IndocCitationIds = useCitation((state) => state.inDocCitationIds);
  const InTextCitationIds = useCitation((state) => state.inTextCitationIds);
  return (
    <div className='flex h-full w-full flex-col'>
      <Title />
      <Tabs defaultValue='library' className='h-full w-full'>
        <TabsList className='h-8 w-full justify-start gap-x-2 rounded-none border-b border-gray-200 p-0'>
          <TabsTrigger
            value='library'
            className='border-b-[3px] border-transparent data-[state=active]:border-violet-500 data-[state=active]:text-violet-500'
          >
            {trans('Citation.all')}
          </TabsTrigger>
          <TabsTrigger
            value='doc'
            className='border-b-[3px] border-transparent data-[state=active]:border-violet-500 data-[state=active]:text-violet-500'
          >
            {trans('Citation.in_this_doc')}
          </TabsTrigger>
        </TabsList>

        <TabsContent className='h-[calc(100%_-60px)]' value='library'>
          {IndocCitationIds.length === 0 ? <Empty /> : <LibraryList />}
        </TabsContent>

        <TabsContent className='h-[calc(100%_-60px)]' value='doc'>
          {InTextCitationIds.length === 0 ? <Empty /> : <InTextList />}
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default memo(CitationLibrary);
