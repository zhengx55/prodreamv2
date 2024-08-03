import { useUserSession } from '@/query/session/query';
import { memo } from 'react';
import Message from './ChatMessageItem';

type Props = {};

const ChatMessageList = (props: Props) => {
  const { data } = useUserSession();
  return (
    <div className='flex flex-1 flex-col gap-y-8 overflow-y-auto px-4 pb-4 pt-6'>
      <Message.Agent />
      <Message.User />
    </div>
  );
};

export default memo(ChatMessageList);
