import useAiEditor from '@/zustand/store';
import { m } from 'framer-motion';
import { MineCitationCard } from './CitationCard';

const InTextList = () => {
  const inTextCitation = useAiEditor((state) => state.inTextCitation);
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
      exit={{
        y: -10,
        opacity: 0,
      }}
      className='flex flex-1 flex-col overflow-y-auto pt-2'
    >
      {inTextCitation.map((item, index) => {
        return (
          <MineCitationCard
            type='inText'
            item={item as any}
            key={`in-doc-citation-${index}`}
          />
        );
      })}
    </m.div>
  );
};
export default InTextList;
