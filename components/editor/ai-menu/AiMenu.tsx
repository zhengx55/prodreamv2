'use client';
import LoadingDot from '@/components/root/LoadingDot';
import Spacer from '@/components/root/Spacer';
import { Copilot } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Surface } from '@/components/ui/surface';
import useClickOutside from '@/hooks/useClickOutside';
import { copilot } from '@/query/api';
import useAiEditor from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Editor } from '@tiptap/react';
import { AlertTriangle, ChevronRight, Frown, Smile } from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  ChangeEvent,
  KeyboardEvent,
  cloneElement,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import { useAiOptions } from './hooks/useAiOptions';
const Typed = dynamic(() => import('react-typed'), { ssr: false });

type Props = { editor: Editor };
export const AiMenu = ({ editor }: Props) => {
  const copilotRect = useAiEditor((state) => state.copilotRect);
  const updateCopilotMenu = useAiEditor((state) => state.updateCopilotMenu);
  const selectedText = useAiEditor((state) => state.selectedText);
  const { options, operations } = useAiOptions();
  const [hoverItem, setHoverItem] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [istTyping, setIsTyping] = useState(false);
  const [prompt, setPrompt] = useState('');
  const elRef = useRef<HTMLDivElement>(null);

  const hasAiResult = aiResult !== '';

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

  const { mutateAsync: handleCopilot } = useMutation({
    mutationFn: (params: { tool: string; text: string }) => copilot(params),
    onMutate: () => {
      setGenerating(true);
    },
    onSuccess: async (data: ReadableStream, variables) => {
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        handleStreamData(value);
      }
    },
    onSettled: () => {
      setGenerating(false);
    },

    onError: (error) => {},
  });

  const handleStreamData = (value: string | undefined) => {
    if (!value) return;
    const lines = value.split('\n');
    const dataLines = lines.filter((line) => line.startsWith('data:'));
    const eventData = dataLines.map((line) =>
      line.slice('data:'.length).trimEnd()
    );
    let result = '';
    eventData.forEach((word) => {
      const leadingSpaces = word.match(/^\s*/);
      const spacesLength = leadingSpaces ? leadingSpaces[0].length : 0;
      if (spacesLength === 2) {
        result += ` ${word.trim()}`;
      } else {
        if (/^\d/.test(word.trim())) {
          result += ` ${word.trim()}`;
        }
        result += word.trim();
      }
    });
    setAiResult((prev) => (prev += result));
  };

  const handleEditTools = async (tool: string) => {
    if (!selectedText) return;
    await handleCopilot({ tool, text: selectedText });
  };

  const handleCustomPrompt = async () => {
    if (!prompt.trim()) return toast.error('please enter a custom prompt');
  };

  const handleCopilotOptions = async (tool: string) => {};

  const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleCustomPrompt();
    }
  };

  const handleDiscard = () => {
    updateCopilotMenu(false);
  };
  const handleReplace = () => {
    const { selection } = editor.state;
    const { from, to } = selection;
    editor
      .chain()
      .deleteRange({ from, to })
      .insertContentAt(from, aiResult)
      .setTextSelection({ from, to: aiResult.length + from })
      .run();
    updateCopilotMenu(false);
  };
  const handleInsert = () => {
    const { selection } = editor.state;
    const { to } = selection;
    editor
      .chain()
      .blur()
      .insertContentAt(to, ` ${aiResult}`, {
        parseOptions: { preserveWhitespace: 'full' },
      })
      .setTextSelection({
        from: to,
        to: ` ${aiResult}`.length + to,
      })
      .run();
    updateCopilotMenu(false);
  };

  const handleOperation = (idx: number) => {
    switch (idx) {
      case 0:
        handleReplace();
        break;
      case 1:
        handleInsert();
        break;
      case 2:
        break;
      case 3:
        handleDiscard();
        break;
      default:
        break;
    }
  };

  if (!copilotRect) return null;
  return (
    <section
      style={{ top: `${copilotRect - 54}px` }}
      className='absolute -left-20 flex w-full justify-center overflow-visible '
    >
      <div
        ref={elRef}
        className='relative flex w-[600px] flex-col bg-transparent'
      >
        {!generating ? (
          hasAiResult ? (
            <div className='flex min-h-12 w-full items-center rounded-t border border-shadow-border bg-white p-2 shadow-lg'>
              <Typed strings={[aiResult]} className='px-2' typeSpeed={5} />
            </div>
          ) : (
            <div className='flex-between h-12 w-full gap-x-2 rounded-t border border-shadow-border bg-white p-2 shadow-lg'>
              <Copilot size='24' />
              <Input
                type='text'
                value={prompt}
                autoFocus
                onKeyDown={handleKeyEnter}
                onChange={handlePromptChange}
                id='ai-prompt'
                className='small-regular h-8 border-none px-0 py-0 shadow-none focus-visible:right-0 focus-visible:ring-0'
                placeholder='Ask Al to edit or generate...'
              />
              <Button
                onClick={handleCustomPrompt}
                disabled={!istTyping}
                className='h-7 rounded bg-doc-primary disabled:bg-doc-shadow'
              >
                Enter
              </Button>
            </div>
          )
        ) : (
          <div className='flex h-12 w-full items-center gap-x-2 rounded-t border border-shadow-border bg-white p-2 shadow-lg'>
            <Copilot size='24' />
            <p className='base-semibold text-doc-primary'>
              Al is writing <LoadingDot label='' />
            </p>
          </div>
        )}
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
          {!hasAiResult
            ? options.map((item, idx) => {
                return (
                  <div
                    className={` ${
                      hoverItem === idx ? 'bg-doc-secondary' : ''
                    } group flex cursor-pointer items-center justify-between rounded px-2 py-1`}
                    onClick={() => {
                      if (idx === 0) {
                        return;
                      }
                      handleCopilotOptions('');
                    }}
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
                        className='absolute left-[250px] rounded px-1 py-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
                      >
                        {item.submenu.map((subitem) => (
                          <div
                            onClick={() => {
                              idx !== 2 && handleEditTools(subitem.lable);
                            }}
                            className='relative z-50 flex cursor-pointer items-center gap-x-2 rounded px-3 py-1 hover:bg-doc-secondary hover:text-doc-primary'
                            key={subitem.id}
                          >
                            <p className='small-regular'>{subitem.name}</p>
                          </div>
                        ))}
                      </Surface>
                    )}
                  </div>
                );
              })
            : generating
              ? null
              : operations.map((item, idx) => {
                  return (
                    <div
                      className={` ${
                        hoverItem === idx ? 'bg-doc-secondary' : ''
                      } group flex cursor-pointer items-center justify-between rounded px-2 py-1`}
                      key={item.id}
                      onMouseEnter={() => setHoverItem(idx)}
                      onMouseLeave={() => setHoverItem(null)}
                      onClick={() => handleOperation(idx)}
                    >
                      <div className='flex items-center gap-x-2'>
                        {hoverItem === idx
                          ? cloneElement(item.icon, { color: '#774EBB' })
                          : cloneElement(item.icon)}
                        <p className='small-regular group-hover:text-doc-primary'>
                          {item.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
        </Surface>
      </div>
    </section>
  );
};
