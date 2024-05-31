import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { getRecommendQs } from '@/query/api';
import { EditorDictType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Loader2, RefreshCcw } from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo } from 'react';
import useResearchChat from '../hooks/useResearchChat';
import { useTranslations } from 'next-intl';
import ResearchInput from './ResearchInput';

type Props = { t: EditorDictType };
const ResearchCover = ({ t }: Props) => {
  const { id } = useParams();
  const trans = useTranslations('Editor');
  const { data, isPending, isError, refetch, isRefetching } = useQuery({
    queryKey: ['airesearch-recommand', id],
    queryFn: () => getRecommendQs(id as string),
    staleTime: Infinity,
  });
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
      <div className='flex-between'>
        <div className='flex items-center gap-x-1'>
          <Icon
            alt=''
            src={'/editor/chatbot/recommend.svg'}
            width={20}
            height={20}
            className='size-5'
          />
          <h3 className='text-sm text-zinc-700 '>
            {trans('Chat.ChatInput.Try_these')}
          </h3>
        </div>
        <Button
          role='button'
          onClick={async () => await refetch()}
          variant={'icon'}
          className='size-max p-1'
        >
          <RefreshCcw size={18} className='text-zinc-600' />
        </Button>
      </div>

      {isError ? null : isPending || isRefetching || aiChatSending ? (
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
              <p className='small-regular text-zinc-600'>{item}</p>
            </div>
          );
        })
      )}
    </div>
  );
};
export default memo(ResearchCover);
