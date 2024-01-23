import { AnimatePresence } from 'framer-motion';
import { memo, useCallback, useState } from 'react';
import CustomCitation from './CustomCitation';
import SearchList from './SearchList';

type Props = {};
export const Citation = memo((props: Props) => {
  const [showForm, setShowForm] = useState(false);
  const memoToggle = useCallback(() => {
    setShowForm((prev) => !prev);
  }, []);
  return (
    <AnimatePresence>
      {showForm ? <CustomCitation /> : <SearchList createCustom={memoToggle} />}
    </AnimatePresence>
  );
});

Citation.displayName = 'Citation';
