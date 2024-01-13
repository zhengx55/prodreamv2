'use client';
import Spacer from '@/components/root/Spacer';
import { Input } from '@/components/ui/input';
import { Surface } from '@/components/ui/surface';
import useClickOutside from '@/hooks/useClickOutside';
import useRootStore from '@/zustand/store';
import { Editor } from '@tiptap/react';
import { Search } from 'lucide-react';
import { ChangeEvent, memo, useRef, useState } from 'react';

type Props = { editor: Editor };

export const CitiationMenu = memo(({ editor }: Props) => {
  const copilotRect = useRootStore((state) => state.copilotRect);
  const updateCitationMenu = useRootStore((state) => state.updateCitationMenu);
  const [istTyping, setIsTyping] = useState(false);
  const [prompt, setPrompt] = useState('');
  const elRef = useRef<HTMLDivElement>(null);
  useClickOutside(elRef, () => {
    updateCitationMenu(false);
  });

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrompt(value);
    if (value.trim() !== '') {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  if (!copilotRect) return null;
  return (
    <section
      style={{ top: `${copilotRect - 44}px` }}
      className='absolute -left-20 flex w-full justify-center overflow-visible '
    >
      <div ref={elRef} className='relative flex flex-col bg-transparent'>
        <div className='flex-between h-11 w-[600px] gap-x-2 rounded-t border border-shadow-border bg-white p-2 shadow-lg'>
          <Search className='text-primary-doc' size={20} />
          <Input
            type='text'
            value={prompt}
            autoFocus
            onChange={handlePromptChange}
            id='citiation-search'
            className='small-regular h-full border-none px-0 py-0 shadow-none focus-visible:right-0 focus-visible:ring-0'
            placeholder='enter your text...'
          />
        </div>

        <Spacer y='5' />
        <Surface className='w-[600px] rounded px-1 py-2' withBorder></Surface>
      </div>
    </section>
  );
});

CitiationMenu.displayName = 'CitiationMenu';
