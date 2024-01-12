'use client';
import Spacer from '@/components/root/Spacer';
import { Copilot } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Surface } from '@/components/ui/surface';
import useClickOutside from '@/hooks/useClickOutside';
import useRootStore from '@/zustand/store';
import { Editor } from '@tiptap/react';
import { AlertTriangle, ChevronRight, Frown, Smile } from 'lucide-react';
import { ChangeEvent, cloneElement, memo, useRef, useState } from 'react';
import { useAiOptions } from './hooks/useAiOptions';

type Props = { editor: Editor };
const AiMenu = ({ editor }: Props) => {
  const copilotRect = useRootStore((state) => state.copilotRect);
  const updateCopilotMenu = useRootStore((state) => state.updateCopilotMenu);
  const options = useAiOptions();
  const [hoverItem, setHoverItem] = useState<number | null>(null);
  const [istTyping, setIsTyping] = useState(false);
  const [prompt, setPrompt] = useState('');
  const elRef = useRef<HTMLDivElement>(null);
  useClickOutside(elRef, () => {
    updateCopilotMenu(false);
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
        <div className='flex-between h-11 w-[600px] rounded-t border border-shadow-border bg-white p-2 shadow-lg'>
          <Copilot size='24' />
          <Input
            type='text'
            value={prompt}
            autoFocus
            onChange={handlePromptChange}
            id='ai-prompt'
            className='small-regular h-full border-none py-0 shadow-none focus-visible:right-0 focus-visible:ring-0'
            placeholder='Ask Al to edit or generate...'
          />
          <Button
            disabled={!istTyping}
            className='h-7 rounded bg-doc-primary disabled:bg-doc-shadow'
          >
            Enter
          </Button>
        </div>
        <div className='flex-between w-[600px] rounded-b bg-border-50 px-2 py-1'>
          <div className='flex gap-x-2'>
            <AlertTriangle className='text-shadow' size={15} />
            <p className='subtle-regular text-shadow'>
              Al responses can be inaccurate or misleading.
            </p>
          </div>
          <div className='flex gap-x-2'>
            <Smile
              className='cursor-pointer text-shadow hover:opacity-50'
              size={15}
            />
            <Frown
              className='cursor-pointer text-shadow hover:opacity-50'
              size={15}
            />
          </div>
        </div>
        <Spacer y='5' />
        <Surface className='w-[256px] rounded px-1 py-2' withBorder>
          {options.map((item, idx) => {
            return (
              <div
                className={` ${
                  hoverItem === idx ? 'bg-doc-secondary' : ''
                } group flex cursor-pointer items-center justify-between rounded px-2 py-1`}
                key={item.id}
                onMouseEnter={() => setHoverItem(idx)}
                onMouseLeave={() => setHoverItem(null)}
              >
                <div className='flex items-center gap-x-2'>
                  {hoverItem === idx
                    ? cloneElement(item.icon, { color: '#774EBB' })
                    : cloneElement(item.icon)}
                  <p className='small-regular group-hover:text-doc-primary'>
                    {item.name}
                  </p>
                </div>
                {item.submenu ? <ChevronRight size={18} /> : null}
                {item.submenu && hoverItem === idx && (
                  <Surface
                    style={{ top: `${idx * 27 + 80}px` }}
                    withBorder
                    data-state={hoverItem === idx ? 'open' : 'closed'}
                    className='absolute left-[250px] w-[200px] rounded px-1 py-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
                  >
                    {item.submenu.map((subitem) => (
                      <div
                        className='relative z-50 flex cursor-pointer items-center gap-x-2 rounded px-2 py-1 hover:bg-doc-secondary hover:text-doc-primary'
                        key={subitem.id}
                      >
                        <p className='small-regular'>{subitem.name}</p>
                      </div>
                    ))}
                  </Surface>
                )}
              </div>
            );
          })}
        </Surface>
      </div>
    </section>
  );
};
export default memo(AiMenu);
