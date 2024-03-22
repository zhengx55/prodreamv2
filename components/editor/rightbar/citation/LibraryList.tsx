import { useCitation } from '@/zustand/store';
import { m } from 'framer-motion';
import { MineCitationCard } from './CitationCard';
const LibraryList = () => {
  const inDocCitation = useCitation((state) => state.inDocCitation);
  return (
    <m.div
      key={'mine-intext'}
      initial={{
        y: -10,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className='flex flex-1 flex-col overflow-y-auto pt-2'
    >
      {inDocCitation.map((item, index) => {
        return (
          <MineCitationCard
            item={item as any}
            type='library'
            key={`in-doc-citation-${index}`}
          />
        );
      })}
    </m.div>
  );
};
export default LibraryList;
