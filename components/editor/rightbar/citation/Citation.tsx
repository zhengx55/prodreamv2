import useAiEditor from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import SearchList from './SearchList';
const CustomCitation = dynamic(() => import('./CustomCitation'));
export const Citation = memo(() => {
  const showCreateCitation = useAiEditor((state) => state.showCreateCitation);
  return (
    <AnimatePresence>
      {showCreateCitation ? <CustomCitation /> : <SearchList />}
    </AnimatePresence>
  );
});

Citation.displayName = 'Citation';
