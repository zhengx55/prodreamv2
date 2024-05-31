import Spacer from '@/components/root/Spacer';
import { EditorDictType } from '@/types';
import { useChatbot, useUserInfo } from '@/zustand/store';
import { m } from 'framer-motion';
import { FileText, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

type Props = { t: EditorDictType };
const Starter = (props: Props) => {
  const userName = useUserInfo((state) => state.user.first_name);
  const updateChatType = useChatbot((state) => state.updateChatType);
  const updateUploadModal = useChatbot((state) => state.updateUploadModal);
  const trans = useTranslations('Editor');

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className='flex h-full w-full flex-col'
    >
      <Spacer y='14' />
      <p>👋</p>
      <Spacer y='8' />
      <h2 className='text-xl font-medium text-zinc-800'>
        {trans('Chat.Starter.Hi')}, {userName}
      </h2>
      <Spacer y='8' />
      <p className='text-sm font-normal text-zinc-600'>
        {trans('Chat.Starter.Greetings')}
      </p>
      <Spacer y='10' />
      <div className='flex gap-x-2'>
        <div
          role='button'
          onClick={() => updateChatType('research')}
          aria-label='ai-research'
          className='flex w-1/2 cursor-pointer flex-col items-center justify-between gap-y-2 rounded-lg bg-stone-50 px-3 py-2'
        >
          <Search className='text-neutral-400' size={42} />
          <h2 className='base-regular text-zinc-800'>
            {trans('Chat.Starter.AI_Research')}
          </h2>
          <p className='subtle-regular text-center text-neutral-400'>
            {trans(
              'Chat.Starter.Ask_a_research_question_and_get_supporting_sources'
            )}
          </p>
        </div>
        <div
          role='button'
          onClick={() => {
            updateChatType('pdf');
            updateUploadModal(true);
          }}
          aria-label='chat-pdf'
          className='flex w-1/2 cursor-pointer flex-col items-center justify-between gap-y-2 rounded-lg bg-stone-50 px-3 py-2'
        >
          <FileText className='text-neutral-400' size={42} />
          <h2 className='base-regular text-zinc-800'>
            {trans('Chat.Starter.Chat_PDF')}
          </h2>
          <p className='subtle-regular text-center text-neutral-400'>
            {trans(
              'Chat.Starter.Click_or_drag_to_upload_Chat_with_file_and_get_summaries'
            )}
          </p>
        </div>
      </div>
    </m.div>
  );
};
export default memo(Starter);
