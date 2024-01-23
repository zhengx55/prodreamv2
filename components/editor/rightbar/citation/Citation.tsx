import useAiEditor from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import CustomCitation from './CustomCitation';
import SearchList from './SearchList';

type Props = {};
export const Citation = memo((props: Props) => {
  const showCreateCitation = useAiEditor((state) => state.showCreateCitation);

  return (
    <AnimatePresence>
      {showCreateCitation ? <CustomCitation /> : <SearchList />}
    </AnimatePresence>
  );
});

Citation.displayName = 'Citation';
