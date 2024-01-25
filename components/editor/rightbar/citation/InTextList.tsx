import useAiEditor from '@/zustand/store';
import { MineCitationCard } from './CitationCard';

const InTextList = () => {
  const inTextCitation = useAiEditor((state) => state.inTextCitation);
  return (
    <div className='flex flex-1 flex-col overflow-y-auto pt-2'>
      {inTextCitation.map((item, index) => {
        return (
          <MineCitationCard
            type='inText'
            item={item as any}
            key={`in-doc-citation-${index}`}
          />
        );
      })}
    </div>
  );
};
export default InTextList;
