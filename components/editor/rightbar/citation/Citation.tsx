import { EdtitorDictType } from '@/types';
import { useCitation } from '@/zustand/store';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import SearchList from './SearchList';
const CustomCitation = dynamic(() => import('./CustomCitation'));
const EditCitation = dynamic(() => import('./edit/Edit'));
const Citation = ({ t }: { t: EdtitorDictType }) => {
  const showCreateCitation = useCitation((state) => state.showCreateCitation);
  const showEditCitation = useCitation((state) => state.showEditCitation);
  return showCreateCitation ? (
    <CustomCitation />
  ) : showEditCitation ? (
    <EditCitation />
  ) : (
    <SearchList t={t} />
  );
};

export default memo(Citation);
