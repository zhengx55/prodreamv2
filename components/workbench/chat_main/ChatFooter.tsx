import { Button } from '@/components/ui/button';
import { Layers } from 'lucide-react';
import { memo } from 'react';
import ChatInputField from './ChatInputField';

const ChatFooter = () => {
  return (
    <footer className='w-[800px] space-y-2.5 self-center'>
      <Button role='button' className='px-1 text-xs' variant='outline'>
        <Layers size={20} className='text-indigo-500' />
        Common guidance
      </Button>
      <ChatInputField />
    </footer>
  );
};

export default memo(ChatFooter);
