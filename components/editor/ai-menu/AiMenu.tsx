import LoadingDot from '@/components/root/LoadingDot';
import Spacer from '@/components/root/Spacer';
import { Copilot } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Surface } from '@/components/ui/surface';
import useClickOutside from '@/hooks/useClickOutside';
import useScrollIntoView from '@/hooks/useScrollIntoView';
import { getSelectedText } from '@/lib/tiptap/utils';
import { ButtonTrack, ask, copilot } from '@/query/api';
import {
  useMembershipInfo,
  useMutateTrackInfo,
  useUserTrackInfo,
} from '@/query/query';
import useAiEditor from '@/zustand/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Editor } from '@tiptap/react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  cloneElement,
  memo,
  useRef,
  useState,
} from 'react';
import { v4 } from 'uuid';
import { useEditorCommand } from '../hooks/useEditorCommand';
import { useAiOptions } from './hooks/useAiOptions';

const Typed = dynamic(() => import('react-typed'), { ssr: false });

type Props = { editor: Editor };
const AiMenu = ({ editor }: Props) => {
  const { options, operations } = useAiOptions();
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const { data: track } = useUserTrackInfo();
  const { data: usage } = useMembershipInfo();
  const copilotRect = useAiEditor((state) => state.copilotRect);
  const queryClient = useQueryClient();
  const updateCopilotMenu = useAiEditor((state) => state.updateCopilotMenu);
  const updatePaymentModal = useAiEditor((state) => state.updatePaymentModal);
  const promptRef = useRef<HTMLInputElement>(null);
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [istTyping, setIsTyping] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);
  const tool = useRef<string | null>(null);
  const { replaceText, insertNext } = useEditorCommand(editor);
  const ref = useScrollIntoView();

  const hasAiResult = aiResult !== '';
  useClickOutside(elRef, () => {
    updateCopilotMenu(false);
  });

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      tool.current = variables.tool;
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setHoverItem('copilot-operation-01');
          break;
        }
        handleStreamData(value);
      }
    },
    onSettled: () => {
      setGenerating(false);
    },

    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });

  const { mutateAsync: handleAsk } = useMutation({
    mutationFn: (params: { instruction: string; text: string }) => ask(params),
    onMutate: () => {
      setGenerating(true);
    },
    onSuccess: async (data: ReadableStream) => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setHoverItem('copilot-operation-01');
          break;
        }
        handleStreamData(value);
      }
    },
    onSettled: () => {
      setGenerating(false);
    },

    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });

  const handleStreamData = (value: string | undefined) => {
    if (!value) return;
    const lines = value.split('\n');
    const dataLines = lines.filter(
      (line, index) =>
        line.startsWith('data:') &&
        lines.at(index - 1)?.startsWith('event: data')
    );
    const eventData = dataLines.map((line) =>
      JSON.parse(line.slice('data:'.length))
    );
    let result = '';
    eventData.forEach((word) => {
      result += word;
    });
    setAiResult((prev) => (prev += result));
  };

  const handleEditTools = async (tool: string) => {
    const toast = (await import('sonner')).toast;
    const selectedText = getSelectedText(editor);
    const words = selectedText.match(/\b\w+\b/g);
    if ((words?.length ?? 0) > 160) {
      return toast.warning('Selected text should not exceed 160 words');
    }
    if (!track?.ai_copilot_task) {
      await updateTrack({
        field: 'ai_copilot_task',
        data: true,
      });
      await ButtonTrack('ai_copilot_task_completed');
    }
    await handleCopilot({ tool, text: selectedText });
  };

  const handleCustomPrompt = async () => {
    const toast = (await import('sonner')).toast;
    const selectedText = getSelectedText(editor);
    const words = selectedText.match(/\b\w+\b/g);
    if ((words?.length ?? 0) > 160) {
      return toast.warning('Selected text should not exceed 160 words');
    }
    if (promptRef.current && !promptRef.current.value.trim())
      return toast.error('please enter a custom prompt');
    if (!track?.ai_copilot_task) {
      await updateTrack({
        field: 'ai_copilot_task',
        data: true,
      });
      await ButtonTrack('ai_copilot_task_completed');
    }
    await handleAsk({
      instruction: promptRef.current?.value!,
      text: selectedText,
    });
  };

  const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleCustomPrompt();
    }
  };

  const handleDiscard = () => {
    updateCopilotMenu(false);
  };

  const handleRegenerate = async () => {
    const selectedText = getSelectedText(editor);
    if (!tool.current) return;
    await handleCopilot({ tool: tool.current, text: selectedText });
  };

  const handleReplace = () => {
    const { selection } = editor.state;
    const { from, to } = selection;
    replaceText(from, to, aiResult);
    updateCopilotMenu(false);
  };

  const handleInsert = () => {
    const { selection } = editor.state;
    const { to } = selection;
    insertNext(to, aiResult);
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
        handleRegenerate();
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
      ref={ref}
      style={{ top: `${copilotRect - 54}px` }}
      className='absolute -left-12 z-20 flex w-full justify-center overflow-visible '
    >
      <div
        ref={elRef}
        className='relative flex w-[600px] flex-col bg-transparent'
      >
        {!generating ? (
          hasAiResult ? (
            <div className='flex min-h-12 w-full items-center rounded-t border border-shadow-border bg-white p-2 shadow-lg'>
              <Typed
                strings={[aiResult]}
                className='small-regular px-2'
                typeSpeed={2}
              />
            </div>
          ) : (
            <div className='flex-between h-12 w-full gap-x-2 rounded-t border border-shadow-border bg-white p-2 shadow-lg'>
              <Copilot size='24' />
              <Input
                type='text'
                ref={promptRef}
                autoFocus
                onChange={handlePromptChange}
                onKeyDown={handleKeyEnter}
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
        {usage?.subscription === 'basic' && (
          <div className='flex-between w-[600px] rounded-b bg-border-50 px-2 py-1'>
            <div className='flex items-center gap-x-2'>
              <AlertTriangle className='text-shadow' size={15} />
              <p className='subtle-regular text-shadow'>
                {usage?.free_times_detail.Copilot}/20 weekly AI prompts
                used;&nbsp;
                <Button
                  onClick={() => {
                    updatePaymentModal(true);
                  }}
                  role='button'
                  variant={'ghost'}
                  className='subtle-regular h-max w-max cursor-pointer bg-transparent p-0 text-doc-primary'
                >
                  Go unlimited
                </Button>
              </p>
            </div>
          </div>
        )}
        <Spacer y='5' />
        {generating ? null : (
          <Surface className='w-[256px] rounded py-2' withBorder>
            {!hasAiResult
              ? options.map((item, index) => {
                  return (
                    <Fragment key={v4()}>
                      {index !== 0 && (
                        <>
                          <Spacer y='5' />
                          <Separator
                            orientation='horizontal'
                            className=' bg-shadow-border'
                          />
                          <Spacer y='5' />
                        </>
                      )}
                      <Spacer y='5' />
                      <h3 className='small-semibold px-2.5 text-doc-font'>
                        {item.format}
                      </h3>
                      <Spacer y='5' />
                      {item.options.map((option, option_idx) => {
                        return (
                          <div
                            className={` ${
                              hoverItem === option.id ? 'bg-border-50' : ''
                            } group flex cursor-pointer items-center justify-between rounded px-2.5 py-1.5`}
                            key={option.id}
                            onClick={() => {
                              !option.submenu && handleEditTools(option.label);
                            }}
                            onMouseEnter={() => setHoverItem(option.id)}
                            onMouseLeave={() => setHoverItem(null)}
                          >
                            <div className='flex items-center gap-x-2'>
                              {cloneElement(option.icon)}
                              <p className='small-regular'>{option.name}</p>
                            </div>
                            {option.submenu ? <ChevronRight size={18} /> : null}
                            {option.submenu && hoverItem === option.id && (
                              <Surface
                                style={{ top: `${option_idx * 40 + 70}px` }}
                                withBorder
                                data-state={
                                  hoverItem === option.id ? 'open' : 'closed'
                                }
                                className='absolute left-[250px] rounded px-1 py-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
                              >
                                {option.submenu.map((subitem) => (
                                  <div
                                    onClick={() => {
                                      handleEditTools(subitem.label);
                                    }}
                                    className='relative z-50 flex cursor-pointer items-center gap-x-2 rounded px-3 py-1 hover:bg-border-50'
                                    key={subitem.id}
                                  >
                                    <p className='small-regular'>
                                      {subitem.name}
                                    </p>
                                  </div>
                                ))}
                              </Surface>
                            )}
                          </div>
                        );
                      })}
                    </Fragment>
                  );
                })
              : operations.map((item, idx) => {
                  return (
                    <div
                      className={` ${
                        hoverItem === item.id ? 'bg-doc-secondary' : ''
                      } group flex cursor-pointer items-center justify-between rounded px-2 py-1.5`}
                      key={item.id}
                      onMouseEnter={() => setHoverItem(item.id)}
                      onMouseLeave={() => setHoverItem(null)}
                      onClick={() => handleOperation(idx)}
                    >
                      <div className='flex items-center gap-x-2'>
                        {hoverItem === item.id
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
        )}
      </div>
    </section>
  );
};

export default memo(AiMenu);
