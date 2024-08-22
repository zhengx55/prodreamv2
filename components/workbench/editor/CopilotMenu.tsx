import Icon from '@/components/root/Icon';
import { Separator } from '@/components/ui/separator';
import { Surface } from '@/components/ui/surface';
import { word_regex } from '@/constant';
import { OperationType } from '@/constant/enum';
import useScrollIntoView from '@/hooks/useScrollIntoView';
import { getSelectedText } from '@/lib/tiptap/utils';
import { useEditor } from '@/zustand/store';
import type { Editor } from '@tiptap/react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Fragment, cloneElement, useCallback, useEffect, useRef } from 'react';
import { ReactTyped } from 'react-typed';
import CustomPrompt from './CustomPrompt';
import useCopilot from './hooks/useCopilot';
import { useCopilotOptions } from './hooks/useCopilotOptions';
import { useEditorCommand } from './hooks/useEditorCommand';

type Props = { editor: Editor };
type ResultDisplayProps = {
  aiResult: string[];
  currentResult: number;
  nextResult: () => void;
  prevResult: () => void;
};

type OptionItemProps = {
  option: any;
  hoverItem: string | null;
  setHoverItem: (id: string | null) => void;
  handleEditTools: (tool: string) => void;
  option_idx: number;
};

type SubmenuProps = {
  submenu: Array<{ id: string; label: string; name: string }>;
  hoverItem: string | null;
  option: {
    id: string;
    label: string;
    name: string;
    icon: JSX.Element;
    submenu?: Array<{ id: string; label: string; name: string }>;
  };
  setHoverItem: (id: string | null) => void;
  handleEditTools: (tool: string) => void;
  option_idx: number;
};

type OperationItemProps = {
  item: {
    id: string;
    name: string;
    icon: JSX.Element;
  };
  onClick: () => void;
  isHover: boolean;
  setHoverItem: (id: string | null) => void;
};

const CopilotMenu = ({ editor }: Props) => {
  const { options, operations } = useCopilotOptions();
  const {
    handleCopilot,
    handleAsk,
    handleHumanize,
    aiResult,
    currentResult,
    session,
    hasResult,
    hoverItem,
    setHoverItem,
    nextResult,
    prevResult,
    isWaiting,
    tool,
  } = useCopilot();
  const { replaceText, insertNext } = useEditorCommand(editor);
  const floatingMenuPos = useEditor((state) => state.copilotPos);
  const setShowCopilot = useEditor((state) => state.setShowCopilot);

  const promptRef = useRef<HTMLInputElement>(null);
  const elRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ref = useScrollIntoView();

  const handleEditTools = async (tool: string) => {
    const toast = (await import('sonner')).toast;
    const selectedText = getSelectedText(editor);
    const words = selectedText.match(word_regex);
    if ((words?.length ?? 0) > 500) {
      return toast.warning('Selected text should not exceed 500 words');
    }
    if (tool === 'humanize') {
      handleHumanize({ text: selectedText });
    } else {
      handleCopilot({ text: selectedText, tool });
    }
  };

  const handleCustomPrompt = useCallback(async () => {
    const toast = (await import('sonner')).toast;
    const selectedText = getSelectedText(editor);
    const words = selectedText.match(word_regex);
    if ((words?.length ?? 0) > 500) {
      return toast.warning('Selected text should not exceed 500 words');
    }
    if (promptRef.current && !promptRef.current.value.trim()) {
      return toast.error('Please enter a custom prompt');
    }
    handleAsk({
      instruction: promptRef.current?.value!,
      text: selectedText,
      session_id: session,
    });
  }, [editor, session, handleAsk]);

  const handleEditorOperation = useCallback(
    async (operation: OperationType) => {
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
          if (tool.current) {
            if (tool.current === 'humanize') {
              handleHumanize({ text: selectedText });
            } else {
              handleCopilot({ text: selectedText, tool: tool.current });
            }
          }
          break;
        case OperationType.Close:
          setShowCopilot(false);
          break;
      }
    },
    [
      editor,
      aiResult,
      currentResult,
      tool,
      handleCopilot,
      handleHumanize,
      replaceText,
      insertNext,
      setShowCopilot,
    ]
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !elRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setShowCopilot(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!floatingMenuPos) return null;
  return (
    <motion.section
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      ref={ref}
      style={{ top: `${floatingMenuPos.top - 200}px` }}
      className='absolute left-0 flex w-full justify-center'
    >
      <div className='relative w-[600px] space-y-2 bg-transparent'>
        <div ref={elRef} className='flex flex-col'>
          {!isWaiting ? (
            <div className='space-y-1'>
              {hasResult && (
                <ResultDisplay
                  aiResult={aiResult}
                  currentResult={currentResult}
                  nextResult={nextResult}
                  prevResult={prevResult}
                />
              )}
              <CustomPrompt
                currentResult={currentResult}
                ref={promptRef}
                submit={handleCustomPrompt}
              />
            </div>
          ) : (
            <Loader />
          )}
        </div>
        {!isWaiting && (
          <div
            ref={menuRef}
            className='w-[225px] rounded border border-gray-200 bg-white p-2 shadow-lg'
          >
            {!hasResult
              ? options.map((item, index) => (
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
                    {item.options.map((option, idx) => (
                      <OptionItem
                        key={option.id}
                        option={option}
                        setHoverItem={setHoverItem}
                        hoverItem={hoverItem}
                        handleEditTools={handleEditTools}
                        option_idx={idx}
                      />
                    ))}
                  </Fragment>
                ))
              : operations.map((item, idx) => (
                  <OperationItem
                    key={item.id}
                    item={item}
                    onClick={() => handleEditorOperation(idx as OperationType)}
                    isHover={hoverItem === item.id}
                    setHoverItem={setHoverItem}
                  />
                ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default CopilotMenu;

const OptionItem = ({
  option,
  hoverItem,
  setHoverItem,
  handleEditTools,
  option_idx,
}: OptionItemProps) => (
  <div
    className={` ${
      hoverItem === option.id ? 'bg-gray-200' : ''
    } group flex cursor-pointer items-center justify-between rounded px-1 py-1.5`}
    onPointerDown={(e) => e.preventDefault()}
    onClick={() => !option.submenu && handleEditTools(option.label)}
    onMouseEnter={() => setHoverItem(option.id)}
    onMouseLeave={() => setHoverItem(null)}
  >
    <div className='flex items-center gap-x-2'>
      {cloneElement(option.icon)}
      <p className='small-regular text-zinc-600'>{option.name}</p>
    </div>
    {option.submenu && (
      <Submenu
        submenu={option.submenu}
        hoverItem={hoverItem}
        option={option}
        setHoverItem={setHoverItem}
        handleEditTools={handleEditTools}
        option_idx={option_idx}
      />
    )}
  </div>
);

const Submenu = ({
  submenu,
  hoverItem,
  option,
  setHoverItem,
  handleEditTools,
  option_idx,
}: SubmenuProps) => (
  <>
    <ChevronRight size={18} />
    {hoverItem === option.id && (
      <Surface
        style={{ top: `${option_idx * 40 + 30}px` }}
        withBorder
        data-state={hoverItem === option.id ? 'open' : 'closed'}
        className='absolute left-[220px] rounded px-1 py-2'
      >
        {submenu.map((subitem) => (
          <div
            key={subitem.id}
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => handleEditTools(subitem.label)}
            className='relative z-50 flex cursor-pointer items-center gap-x-2 rounded px-3 py-1 hover:bg-gray-200'
          >
            <p className='small-regular'>{subitem.name}</p>
          </div>
        ))}
      </Surface>
    )}
  </>
);

const OperationItem = ({
  item,
  onClick,
  isHover,
  setHoverItem,
}: OperationItemProps) => (
  <div
    className={` ${
      isHover ? 'bg-slate-100' : ''
    } group flex cursor-pointer items-center justify-between rounded px-2 py-1.5`}
    onMouseEnter={() => setHoverItem(item.id)}
    onMouseLeave={() => setHoverItem(null)}
    onClick={onClick}
  >
    <div className='flex items-center gap-x-2'>
      {cloneElement(item.icon)}
      <p className='small-regular group-hover:text-indigo-500'>{item.name}</p>
    </div>
  </div>
);

const Loader = () => {
  return (
    <div className='flex h-11 w-full items-center gap-x-2 rounded-lg border border-indigo-500 bg-white p-2 shadow-lg'>
      <Icon
        alt=''
        src='/editor/copilot.svg'
        width={24}
        height={24}
        className='size-4'
      />
      <ReactTyped
        strings={['AI is writing...']}
        typeSpeed={30}
        backSpeed={30}
        backDelay={200}
        loop
        className='small-regular text-indigo-500'
      />
    </div>
  );
};

const ResultDisplay = ({
  aiResult,
  currentResult,
  nextResult,
  prevResult,
}: ResultDisplayProps) => (
  <div className='flex min-h-12 w-full flex-col justify-center rounded-lg border border-indigo-500 bg-white p-2 shadow'>
    <p className='small-regular px-2'>{aiResult[currentResult]}</p>
    <div className='flex w-full items-center justify-end gap-x-0.5'>
      <ChevronLeft
        className='cursor-pointer text-neutral-400'
        size={18}
        onClick={prevResult}
      />
      <p className='small-regular text-neutral-400'>
        {currentResult + 1} of {aiResult.length}
      </p>
      <ChevronRight
        className='cursor-pointer text-neutral-400'
        size={18}
        onClick={nextResult}
      />
    </div>
  </div>
);
