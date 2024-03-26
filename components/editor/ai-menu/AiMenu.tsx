import LoadingDot from '@/components/root/LoadingDot';
import Spacer from '@/components/root/Spacer';
import { Copilot } from '@/components/root/SvgComponents';
import { Separator } from '@/components/ui/separator';
import { Surface } from '@/components/ui/surface';
import { word_regex } from '@/constant';
import { OperationType } from '@/constant/enum';
import useScrollIntoView from '@/hooks/useScrollIntoView';
import { getSelectedText } from '@/lib/tiptap/utils';
import {
  useButtonTrack,
  useMembershipInfo,
  useMutateTrackInfo,
  useUserTrackInfo,
} from '@/query/query';
import { DocPageDicType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import type { Editor } from '@tiptap/react';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  Fragment,
  cloneElement,
  memo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useEditorCommand } from '../hooks/useEditorCommand';
import CustomPrompt from './CustomPrompt';
import StreamText from './StreamText';
import { useAiOptions } from './hooks/useAiOptions';
import useAiResponse from './hooks/useAiResponse';

const RemainUsages = dynamic(() => import('./RemainUsages'));
type Props = { editor: Editor } & DocPageDicType;

const AiMenu = ({ editor, t, lang }: Props) => {
  const { options, operations } = useAiOptions();
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const { data: track } = useUserTrackInfo();
  const { data: usage } = useMembershipInfo();
  const floatingMenuPos = useAIEditor((state) => state.floatingMenuPos);
  const updateCopilotMenu = useAIEditor((state) => state.updateCopilotMenu);
  const essay_prompt = useAIEditor((state) => state.essay_prompt);
  const promptRef = useRef<HTMLInputElement>(null);
  const tool = useRef<string | null>(null);
  const ref = useScrollIntoView();
  const elRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: ButtonTrack } = useButtonTrack();
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
    handleHumanize,
    session,
  } = useAiResponse(tool);

  const { replaceText, insertNext } = useEditorCommand(editor);

  const hasAiResult = aiResult.length > 0;

  const handleEditTools = async (tool: string) => {
    const toast = (await import('sonner')).toast;
    const selectedText = getSelectedText(editor);
    const words = selectedText.match(word_regex);
    if ((words?.length ?? 0) > 500) {
      return toast.warning('Selected text should not exceed 500 words');
    }
    if (!track?.ai_copilot_task) {
      await updateTrack({
        field: 'ai_copilot_task',
        data: true,
      });
      await ButtonTrack({ event: 'Onboarding task: editing tool' });
    }
    setCurrentResult((prev) => prev + 1);
    if (tool === 'humanize') {
      await handleHumanize({ text: selectedText });
      return;
    }
    await handleCopilot({
      tool,
      text: selectedText,
      writing_goal: essay_prompt,
    });
  };

  useEffect(() => {
    const handler = (e: { target: any }) => {
      if (
        !elRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) {
        updateCopilotMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [updateCopilotMenu]);

  useUnmount(() => {
    editor.chain().unsetHighlight().run();
  });

  const handleCustomPrompt = useCallback(async () => {
    const toast = (await import('sonner')).toast;
    const selectedText = getSelectedText(editor);
    const words = selectedText.match(word_regex);
    if ((words?.length ?? 0) > 500) {
      return toast.warning('Selected text should not exceed 500 words');
    }
    if (promptRef.current && !promptRef.current.value.trim())
      return toast.error('please enter a custom prompt');

    setCurrentResult((prev) => prev + 1);
    await handleAsk({
      instruction: promptRef.current?.value!,
      text: selectedText,
      writing_goal: essay_prompt,
      session_id: session,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, essay_prompt, session]);

  const handleOperation = (idx: number) => {
    handleEditorOperation(idx as OperationType);
  };

  const handleEditorOperation = async (operation: OperationType) => {
    const selectedText = getSelectedText(editor);
    switch (operation) {
      case OperationType.Replace:
        const { selection } = editor.state;
        replaceText(selection.from, selection.to, aiResult[currentResult]);
        break;
      case OperationType.Insert:
        insertNext(editor.state.selection.to, aiResult[currentResult]);
        break;
      case OperationType.Regenerate:
        if (!tool.current) return;
        setCurrentResult((prev) => prev + 1);
        const action =
          tool.current === 'humanize' ? handleHumanize : handleCopilot;
        await action({ text: selectedText, tool: tool.current });
        break;
      case OperationType.Close:
        updateCopilotMenu(false);
        break;
    }
    if (operation !== OperationType.Regenerate) {
      updateCopilotMenu(false);
    }
  };

  if (!floatingMenuPos) return null;
  return (
    <section
      ref={ref}
      style={{ top: `${floatingMenuPos.top - 54}px` }}
      className='absolute -left-12 z-40 flex w-full justify-center overflow-visible'
    >
      <div className='relative flex w-[600px] flex-col bg-transparent'>
        <div ref={elRef} className='flex flex-col'>
          {!generating ? (
            <>
              {hasAiResult && (
                <div className='flex min-h-12 w-full flex-col justify-center rounded-t border border-b-0 border-gray-200 bg-white p-2 shadow-lg'>
                  {showTyping ? (
                    <p className='small-regular px-2'>
                      <StreamText
                        toogleTyping={toogleTyping}
                        generatedResult={aiResult[currentResult]}
                      />
                    </p>
                  ) : (
                    <p className='small-regular px-2'>
                      {aiResult[currentResult]}
                    </p>
                  )}
                  {!showTyping && (
                    <div className='flex w-full items-center justify-end gap-x-0.5'>
                      <ChevronLeft
                        className='cursor-pointer text-neutral-400'
                        size={18}
                        onClick={() =>
                          setCurrentResult((prev) =>
                            prev === 0 ? 0 : prev - 1
                          )
                        }
                      />
                      <p className='small-regular text-neutral-400'>
                        {currentResult + 1} of {aiResult.length}
                      </p>
                      <ChevronRight
                        className='cursor-pointer text-neutral-400'
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
              )}
              <CustomPrompt ref={promptRef} submit={handleCustomPrompt} />
            </>
          ) : (
            <Loader />
          )}
          {usage?.subscription === 'basic' && <RemainUsages />}
        </div>
        {generating ? null : (
          <Surface ref={menuRef} className='w-[256px] rounded py-2' withBorder>
            {!hasAiResult
              ? options.map((item, index) => {
                  return (
                    <Fragment key={`option-${index}`}>
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
                      <h3 className='small-semibold px-2.5 text-neutral-400'>
                        {t.Copilot[item.format as keyof typeof t.Copilot]}
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
                              <p className='small-regular'>
                                {
                                  t.Copilot[
                                    option.name as keyof typeof t.Copilot
                                  ]
                                }
                              </p>
                            </div>
                            {option.submenu ? <ChevronRight size={18} /> : null}
                            {option.submenu && hoverItem === option.id && (
                              <Surface
                                style={{ top: `${option_idx * 40 + 50}px` }}
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
                                      {
                                        t.Copilot[
                                          subitem.name as keyof typeof t.Copilot
                                        ]
                                      }
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
                        <p className='small-regular group-hover:text-violet-500'>
                          {t.Copilot[item.name as keyof typeof t.Copilot]}
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

const Loader = () => {
  return (
    <div className='flex h-12 w-full items-center gap-x-2 rounded-t border border-gray-200 bg-white p-2 shadow-lg'>
      <Copilot size='24' />
      <p className='base-semibold text-violet-500'>
        Al is writing <LoadingDot label='' />
      </p>
    </div>
  );
};
