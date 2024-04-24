import Spacer from '@/components/root/Spacer';
import { emojis } from '@/constant';
import { useRecommandQs } from '@/query/query';
import { EditorDictType } from '@/types';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo } from 'react';
import useResearchChat from '../hooks/useResearchChat';
import ResearchInput from './ResearchInput';

type Props = { t: EditorDictType };
const ResearchCover = ({ t }: Props) => {
  const { id } = useParams();
  const { data, isPending, isError } = useRecommandQs(id as string);
  const { aiResearchChat, aiChatSending } = useResearchChat();
  const handleRecommendClick = async (question: string) => {
    await aiResearchChat({
      query: question,
      session_id: null,
      document_id: id as string,
    });
  };
  return (
    <div className='flex flex-1 flex-col gap-y-2'>
      <ResearchInput t={t} />
      <Spacer y='16' />
      {isError ? null : isPending || aiChatSending ? (
        <div className='flex-center flex-1 items-center'>
          <Loader2 size={30} className='animate-spin text-violet-500' />
        </div>
      ) : (
        data.map((item, index) => {
          return (
            <div
              role='button'
              onClick={() => {
                handleRecommendClick(item);
              }}
              key={`question-${index}`}
              className='w-full cursor-pointer rounded border border-gray-200 p-2 duration-200 animate-in fade-in-0 hover:bg-stone-50'
            >
              <p className='small-regular text-zinc-600'>
                {emojis[index]}&nbsp;
                {item}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};
export default memo(ResearchCover);
