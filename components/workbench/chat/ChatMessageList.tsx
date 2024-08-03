import { useUserSession } from '@/query/session/query';
import { memo } from 'react';

type Props = {};

const ChatMessageList = (props: Props) => {
  const { data } = useUserSession();
  return <div className='flex flex-1 overflow-y-auto px-4 pb-4 pt-6'></div>;
};

export default memo(ChatMessageList);
