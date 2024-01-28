import useAiEditor from '@/zustand/store';
import { MineCitationCard } from './CitationCard';
const LibraryList = () => {
  const inDocCitation = useAiEditor((state) => state.inDocCitation);
  return (
    <div className='flex flex-1 flex-col overflow-y-auto pt-2'>
      {inDocCitation.map((item, index) => {
        return (
          <MineCitationCard
            item={item as any}
            type='library'
            key={`in-doc-citation-${index}`}
          />
        );
      })}
    </div>
  );
};
export default LibraryList;
