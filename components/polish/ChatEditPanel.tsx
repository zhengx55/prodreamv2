import React from 'react';
import { Input } from '../ui/input';
import Spacer from '../root/Spacer';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';

type Props = {};

const ChatEditPanel = (props: Props) => {
  const { selectText } = useAiEditiorContext();
  return (
    <div className='relative flex min-h-full w-1/2 flex-col overflow-y-hidden'>
      <div className='flex h-full w-full flex-col overflow-y-auto px-1'></div>
      <Spacer y='10' />
      <div className='absolute bottom-1 h-14 w-full px-1'>
        <Input className='h-full shadow-xl' placeholder='Tell us to ...' />
      </div>
    </div>
  );
};

export default ChatEditPanel;
