import Icon from '@/components/root/Icon';
import { Separator } from '@/components/ui/separator';
import { Surface } from '@/components/ui/surface';
import { word_regex } from '@/constant';
import { OperationType } from '@/constant/enum';
import useScrollIntoView from '@/hooks/useScrollIntoView';
import { getSelectedText } from '@/lib/tiptap/utils';
import {
  useHandleConversitation,
  useHandleCopilot,
  useHandleHumenize,
} from '@/query/copilot';
import { useEditor } from '@/zustand/store';
import type { Editor } from '@tiptap/react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Fragment,
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import StreamText from '../common/StreamText';
import CustomPrompt from './CustomPrompt';
import { useCopilotOptions } from './hooks/useCopilotOptions';
import { useEditorCommand } from './hooks/useEditorCommand';

type Props = { editor: Editor };

const CopilotMenu = ({ editor }: Props) => {
  const { options, operations } = useCopilotOptions();
  const floatingMenuPos = useEditor((state) => state.copilotPos);
  const setShowCopilot = useEditor((state) => state.setShowCopilot);
  const promptRef = useRef<HTMLInputElement>(null);
  const tool = useRef<string | null>(null);
  const ref = useScrollIntoView();
  const elRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [aiResult, setAiResult] = useState<string[]>([]);
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState(-1);
  const [session, setSession] = useState('');
  const { replaceText, insertNext } = useEditorCommand(editor);
  const hasAiResult = aiResult.length > 0;
  const { mutateAsync: handleCopilot, isPending: copilotLoading } =
    useHandleCopilot();
  const { mutateAsync: handleHumanize, isPending: humenizing } =
    useHandleHumenize();
  const { mutateAsync: handleAsk, isPending: coversationLoading } =
    useHandleConversitation();

  const generating = copilotLoading || humenizing || coversationLoading;
  const handleEditTools = async (tool: string) => {
    const toast = (await import('sonner')).toast;
    const selectedText = getSelectedText(editor);
    const words = selectedText.match(word_regex);
    if ((words?.length ?? 0) > 500) {
      return toast.warning('Selected text should not exceed 500 words');
    }
    setCurrentResult((prev) => prev + 1);
    if (tool === 'humanize') {
      await handleHumanize({ text: selectedText });
      return;
    }
    await handleCopilot({
      tool,
      text: selectedText,
    });
  };

  useEffect(() => {
    const handler = (e: { target: any }) => {
      if (
        !elRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) {
        setShowCopilot(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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
      session_id: session,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, session]);

  const handleOperation = (idx: number) => {
    handleEditorOperation(idx as OperationType);
  };

  const handleEditorOperation = async (operation: OperationType) => {
    const selectedText = getSelectedText(editor);
    switch (operation) {
      case OperationType.Replace:
        const { selection } = editor.state;
        replaceText(selection.from, selection.to, aiResult[currentResult]);
        setShowCopilot(false);
        break;
      case OperationType.Insert:
        insertNext(editor.state.selection.to, aiResult[currentResult]);
        setShowCopilot(false);
        break;
      case OperationType.Regenerate:
        if (!tool.current) return;
        setCurrentResult((prev) => prev + 1);
        const action =
          tool.current === 'humanize' ? handleHumanize : handleCopilot;
        await action({ text: selectedText, tool: tool.current });
        break;
      case OperationType.Close:
        setShowCopilot(false);
        break;
    }
  };

  if (!floatingMenuPos) return null;
  return (
    <motion.section
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      ref={ref}
      style={{ top: `${floatingMenuPos.top - 160}px` }}
      className='absolute left-0 flex w-full justify-center'
    >
      <div className='relative w-[600px] space-y-2 bg-transparent'>
        <div ref={elRef} className='flex flex-col'>
          {!generating ? (
            <>
              {hasAiResult && (
                <div className='flex min-h-12 w-full flex-col justify-center rounded-t border border-b-0 border-gray-200 bg-white p-2 shadow-lg'>
                  {generating ? (
                    <p className='small-regular px-2'>
                      <StreamText result={aiResult[currentResult]} />
                    </p>
                  ) : (
                    <p className='small-regular px-2'>
                      {aiResult[currentResult]}
                    </p>
                  )}
                  {!generating && (
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
              <CustomPrompt
                currentResult={currentResult}
                ref={promptRef}
                submit={handleCustomPrompt}
              />
            </>
          ) : (
            <Loader />
          )}
        </div>
        {generating ? null : (
          <div
            ref={menuRef}
            className='w-[225px] rounded border border-gray-200 bg-white p-2 shadow-lg'
          >
            {!hasAiResult
              ? options.map((item, index) => {
                  return (
                    <Fragment key={`option-${index}`}>
                      {index === 1 && (
                        <Separator
                          orientation='horizontal'
                          className='mt-2 bg-gray-300'
                        />
                      )}
                      <h3 className='my-1.5 text-xs text-neutral-400'>
                        {item.format}
                      </h3>
                      {item.options.map((option, option_idx) => {
                        return (
                          <div
                            className={` ${
                              hoverItem === option.id ? 'bg-gray-200' : ''
                            } group flex cursor-pointer items-center justify-between rounded px-1 py-1.5`}
                            key={option.id}
                            onPointerDown={(e) => e.preventDefault()}
                            onClick={() => {
                              !option.submenu && handleEditTools(option.label);
                            }}
                            onMouseEnter={() => setHoverItem(option.id)}
                            onMouseLeave={() => setHoverItem(null)}
                          >
                            <div className='flex items-center gap-x-2'>
                              {cloneElement(option.icon)}
                              <p className='small-regular text-zinc-600'>
                                {option.name}
                              </p>
                            </div>
                            {option.submenu ? <ChevronRight size={18} /> : null}
                            {option.submenu && hoverItem === option.id && (
                              <Surface
                                style={{ top: `${option_idx * 40 + 40}px` }}
                                withBorder
                                data-state={
                                  hoverItem === option.id ? 'open' : 'closed'
                                }
                                className='absolute left-[200px] rounded px-1 py-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
                              >
                                {option.submenu.map((subitem) => (
                                  <div
                                    onPointerDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                      handleEditTools(subitem.label);
                                    }}
                                    className='relative z-50 flex cursor-pointer items-center gap-x-2 rounded px-3 py-1 hover:bg-gray-200'
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
                    <Operation
                      key={item.id}
                      onMouseEnter={() => setHoverItem(item.id)}
                      onMouseLeave={() => setHoverItem(null)}
                      onClick={() => handleOperation(idx)}
                      item={item}
                      isTyping={generating}
                      isHover={hoverItem === item.id}
                    />
                  );
                })}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default CopilotMenu;

type OperationProps = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  isHover: boolean;
  isTyping: boolean;
  item: { id: string; name: string; icon: JSX.Element };
};
const Operation = ({
  onMouseEnter,
  onClick,
  isHover,
  onMouseLeave,
  isTyping,
  item,
}: OperationProps) => {
  return (
    <div
      className={` ${
        isHover ? 'bg-slate-100' : ''
      } ${isTyping && 'pointer-events-none'} group flex cursor-pointer items-center justify-between rounded px-2 py-1.5`}
      key={item.id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className='flex items-center gap-x-2'>
        {isHover
          ? cloneElement(item.icon, { color: '#774EBB' })
          : cloneElement(item.icon)}
        <p className='small-regular group-hover:text-violet-500'>{item.name}</p>
      </div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className='flex h-12 w-full items-center gap-x-2 rounded-t border border-gray-200 bg-white p-2 shadow-lg'>
      <Icon
        alt=''
        src='/editor/stars.svg'
        width={24}
        height={24}
        className='size-6'
      />
      <p className='base-semibold text-indigo-500'>Al is writing</p>
    </div>
  );
};
