import LoadingDot from '@/components/root/LoadingDot';
import Spacer from '@/components/root/Spacer';
import { Copilot } from '@/components/root/SvgComponents';
import { Separator } from '@/components/ui/separator';
import { Surface } from '@/components/ui/surface';
import useClickOutside from '@/hooks/useClickOutside';
import useScrollIntoView from '@/hooks/useScrollIntoView';
import { getSelectedText } from '@/lib/tiptap/utils';
import { ButtonTrack } from '@/query/api';
import {
  useMembershipInfo,
  useMutateTrackInfo,
  useUserTrackInfo,
} from '@/query/query';
import { useAIEditor } from '@/zustand/store';
import type { Editor } from '@tiptap/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Fragment, cloneElement, memo, useCallback, useRef } from 'react';
import { v4 } from 'uuid';
import { useEditorCommand } from '../hooks/useEditorCommand';
import CustomPrompt from './CustomPrompt';
import { useAiOptions } from './hooks/useAiOptions';
import useAiResponse from './hooks/useAiResponse';
const RemainUsages = dynamic(() => import('./RemainUsages'));
const StreamText = dynamic(() => import('./StreamText'));

type Props = { editor: Editor };
const AiMenu = ({ editor }: Props) => {
  const { options, operations } = useAiOptions();
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const { data: track } = useUserTrackInfo();
  const { data: usage } = useMembershipInfo();
  const copilotRect = useAIEditor((state) => state.copilotRect);
  const updateCopilotMenu = useAIEditor((state) => state.updateCopilotMenu);
  const promptRef = useRef<HTMLInputElement>(null);
  const tool = useRef<string | null>(null);
  const { replaceText, insertNext } = useEditorCommand(editor);
  const elRef = useScrollIntoView();

  const {
    hoverItem,
    setHoverItem,
    generating,
    handleAsk,
    handleCopilot,
    aiResult,
    currentResult,
    setCurrentResult,
    showTyping,
    toogleTyping,
  } = useAiResponse(tool);

  const hasAiResult = aiResult.length > 0;
  useClickOutside(elRef, () => {
    updateCopilotMenu(false);
  });

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

  const handleCustomPrompt = useCallback(async () => {
    const toast = (await import('sonner')).toast;
    const selectedText = getSelectedText(editor);
    const words = selectedText.match(/\b\w+\b/g);
    if ((words?.length ?? 0) > 160) {
      return toast.warning('Selected text should not exceed 160 words');
    }
    if (promptRef.current && !promptRef.current.value.trim())
      return toast.error('please enter a custom prompt');

    await handleAsk({
      instruction: promptRef.current?.value!,
      text: selectedText,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const handleDiscard = () => {
    updateCopilotMenu(false);
  };

  const handleRegenerate = async () => {
    const selectedText = getSelectedText(editor);
    setCurrentResult((prev) => prev + 1);
    if (!tool.current) return;
    await handleCopilot({ tool: tool.current, text: selectedText });
  };

  const handleReplace = () => {
    const { selection } = editor.state;
    const { from, to } = selection;
    replaceText(from, to, aiResult[currentResult]);
    updateCopilotMenu(false);
  };

  const handleInsert = () => {
    const { selection } = editor.state;
    const { to } = selection;
    insertNext(to, aiResult[currentResult]);
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
      style={{ top: `${copilotRect - 54}px` }}
      className='absolute -left-12 z-20 flex w-full justify-center overflow-visible '
    >
      <div
        ref={elRef as React.RefObject<HTMLDivElement>}
        className='relative flex w-[600px] flex-col bg-transparent'
      >
        {!generating ? (
          hasAiResult ? (
            <div className='flex min-h-12 w-full flex-col justify-center rounded-t border border-shadow-border bg-white p-2 shadow-lg'>
              {showTyping ? (
                <p className='small-regular px-2'>
                  <StreamText
                    toogleTyping={toogleTyping}
                    generatedResult={aiResult[currentResult]}
                  />
                </p>
              ) : (
                <p className='small-regular px-2'>{aiResult[currentResult]}</p>
              )}
              {!showTyping && (
                <div className='flex w-full items-center justify-end gap-x-0.5'>
                  <ChevronLeft
                    className='cursor-pointer text-doc-font'
                    size={18}
                    onClick={() =>
                      setCurrentResult((prev) => (prev === 0 ? 0 : prev - 1))
                    }
                  />
                  <p className='small-regular text-doc-font'>
                    {currentResult + 1} of {aiResult.length}
                  </p>
                  <ChevronRight
                    className='cursor-pointer text-doc-font'
                    size={18}
                    onClick={() =>
                      setCurrentResult((prev) =>
                        prev === aiResult.length - 1
                          ? aiResult.length - 1
                          : prev + 1
                      )
                    }
                  />
                </div>
              )}
            </div>
          ) : (
            <CustomPrompt
              ref={promptRef}
              editor={editor}
              submit={handleCustomPrompt}
            />
          )
        ) : (
          <div className='flex h-12 w-full items-center gap-x-2 rounded-t border border-shadow-border bg-white p-2 shadow-lg'>
            <Copilot size='24' />
            <p className='base-semibold text-doc-primary'>
              Al is writing <LoadingDot label='' />
            </p>
          </div>
        )}
        {usage?.subscription === 'basic' && <RemainUsages />}
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
                      } ${showTyping && 'pointer-events-none'} group flex cursor-pointer items-center justify-between rounded px-2 py-1.5`}
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
