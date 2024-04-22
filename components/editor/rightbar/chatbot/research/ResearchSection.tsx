import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import { memo, useEffect, useRef } from 'react';
import ResearchInput from './ResearchInput';
import ResearchMessageItem from './ResearchMessageItem';

type Props = { t: EditorDictType };
const ResearchSection = ({ t }: Props) => {
  const researchList = useChatbot((state) => state.researchList);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [researchList]);
  return (
    <div className='flex h-[calc(100%_-58px)] flex-col justify-between pb-4'>
      <div className='flex h-full flex-col gap-y-16 overflow-y-auto'>
        {researchList.map((message, index) => {
          return (
            <ResearchMessageItem
              t={t}
              key={message.id}
              index={index}
              message={message}
            />
          );
        })}
      </div>
      <div ref={endOfMessagesRef} />
      <ResearchInput t={t} />
    </div>
  );
};
export default memo(ResearchSection);
