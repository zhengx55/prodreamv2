import { useCitation } from '@/zustand/store';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import SearchList from './SearchList';
const CustomCitation = dynamic(() => import('./CustomCitation'));
const EditCitation = dynamic(() => import('./Edit'));
const Citation = () => {
  const showCreateCitation = useCitation((state) => state.showCreateCitation);
  const showEditCitation = useCitation((state) => state.showEditCitation);
  return showCreateCitation ? (
    <CustomCitation />
  ) : showEditCitation ? (
    <EditCitation />
  ) : (
    <SearchList />
  );
};

export default memo(Citation);
