import { useCitation } from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import SearchList from './SearchList';
const CustomCitation = dynamic(() => import('./CustomCitation'));
const Citation = () => {
  const showCreateCitation = useCitation((state) => state.showCreateCitation);
  return (
    <AnimatePresence>
      {showCreateCitation ? <CustomCitation /> : <SearchList />}
    </AnimatePresence>
  );
};

export default memo(Citation);
