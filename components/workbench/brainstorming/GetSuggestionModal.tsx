import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetPrompts } from '@/query/outline';
import { X } from 'lucide-react';
import { memo, useState } from 'react';

type Props = {
  onSubmit: (promptId: string) => void;
};

const GetSuggestionModal = ({ onSubmit }: Props) => {
  const { data: prompts } = useGetPrompts();
  const [selectedPrompt, setSelectedPrompt] = useState<string>();

  return (
    <DialogContent className='w-[964px] gap-0 rounded-lg bg-white p-8 outline-none focus:outline-none'>
      <DialogHeader className='flex-row items-center justify-between'>
        <DialogTitle className='inline-flex items-center gap-x-2 text-xl font-medium'>
          Select essay prompt
        </DialogTitle>
        <DialogClose asChild>
          <Button
            variant={'icon'}
            className='size-max border border-gray-200 p-1'
            role='button'
          >
            <X size={16} className='text-zinc-500' />
          </Button>
        </DialogClose>
      </DialogHeader>
      <DialogDescription />
      <Spacer y='24' />
      <Select value={selectedPrompt} onValueChange={setSelectedPrompt}>
        <SelectTrigger className='h-[52px] shrink-0 rounded-lg border-gray-300 bg-white px-4 text-base text-zinc-600'>
          <SelectValue placeholder='Select a prompt' />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          {prompts?.map((prompt) => (
            <SelectItem
              key={prompt.id}
              className='base-regular h-9 rounded-lg text-zinc-600 hover:bg-slate-200'
              value={prompt.id}
            >
              {prompt.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Spacer y='8' />
      {selectedPrompt && (
        <>
          <span className='rounded-lg bg-slate-50 px-2.5 py-2 text-sm leading-normal text-zinc-600'>
            {selectedPrompt
              ? prompts?.find((prompt) => prompt.id === selectedPrompt)?.content
              : ''}
          </span>
          <Spacer y='24' />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={() => onSubmit(selectedPrompt)}>
                Get Suggestions
              </Button>
            </DialogClose>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  );
};

export default memo(GetSuggestionModal);
