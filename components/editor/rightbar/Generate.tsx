import Loading from '@/components/root/CustomLoading';
import LazyMotionProvider from '@/components/root/LazyMotionProvider';
import Spacer from '@/components/root/Spacer';
import { GenerateFill } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GenerateOptions } from '@/constant';
import { copilot } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import {
  AlertTriangle,
  ChevronLeft,
  ChevronUp,
  FileText,
  Frown,
  RotateCw,
  Smile,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEditorCommand } from '../hooks/useEditorCommand';
import Warn from './Warn';
const Typed = dynamic(() => import('react-typed'), { ssr: false });

export const Generate = memo(() => {
  const [generateTab, setGenerateTab] = useState<number | string>(-1);
  const [outlineSubmenu, setOutlineSubmenu] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');
  const editor = useAIEditor((state) => state.editor_instance);
  const copilot_option = useRef<string | null>(null);
  const { insertAtPostion } = useEditorCommand(editor!);

  const { mutateAsync: handleCopilot } = useMutation({
    mutationFn: (params: { tool: string; text: string }) => copilot(params),
    onMutate: () => {
      setIsGenerating(true);
      if (generatedResult) setGeneratedResult('');
    },
    onSuccess: async (data: ReadableStream) => {
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        handleStreamData(value);
      }
    },
    onSettled: () => {
      setIsGenerating(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
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
    setGeneratedResult((prev) => (prev += result));
  };

  const handleGenerate = async () => {
    const text = editor?.getText();
    const tool = copilot_option.current;
    await handleCopilot({ text: text!, tool: tool! });
  };

  const handleDismiss = () => {
    setGeneratedResult('');
    setGenerateTab(-1);
  };

  const handleInsert = () => {
    if (!editor) return;
    const { selection } = editor.state;
    const { from, to } = selection;
    insertAtPostion(from, to, generatedResult);
  };

  return (
    <LazyMotionProvider>
      <AnimatePresence mode='wait' initial={false}>
        {generateTab === -1 && (
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            key='generate-panel'
            className='flex w-full flex-col overflow-hidden'
          >
            {GenerateOptions.map((item, index) => {
              if (item.submenu)
                return (
                  <DropdownMenu key={item.id}>
                    <DropdownMenuTrigger asChild>
                      <div className='flex-between group cursor-pointer px-2.5 py-3 hover:bg-doc-secondary'>
                        <div className='flex items-center gap-x-3'>
                          <FileText
                            className='text-doc-font group-hover:text-doc-primary'
                            size={20}
                          />
                          <p className='base-regular text-doc-font group-hover:text-doc-primary'>
                            {item.title}
                          </p>
                        </div>
                        <ChevronUp
                          className='text-doc-font group-hover:text-doc-primary group-data-[state=open]:rotate-180'
                          size={20}
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-[350px] rounded'>
                      {item.submenu.map((subItem) => (
                        <div
                          className='group cursor-pointer px-2.5 py-2 hover:bg-doc-secondary'
                          key={subItem.id}
                        >
                          {subItem.label}
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    copilot_option.current = item.label!;
                    setGenerateTab(item.title);
                  }}
                  className='flex-between group cursor-pointer px-2.5 py-3 hover:bg-doc-secondary'
                >
                  <div className='flex items-center gap-x-3'>
                    <FileText
                      className='text-doc-font group-hover:text-doc-primary'
                      size={20}
                    />
                    <p className='base-regular text-doc-font group-hover:text-doc-primary'>
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </m.div>
        )}
        {generateTab !== -1 && (
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className='flex h-full w-full flex-col overflow-hidden'
            key='generate-detail'
          >
            <div
              onClick={() => {
                setGenerateTab(-1);
                setGeneratedResult('');
              }}
              className='flex cursor-pointer items-center gap-x-3 px-2 hover:underline'
            >
              <ChevronLeft size={20} className='text-doc-font' />
              <p className='base-regular text-doc-font'>{generateTab}</p>
            </div>
            <div className='flex flex-1 flex-col overflow-y-auto'>
              {!generatedResult && !isGenerating ? (
                <div className='flex flex-col'>
                  <Spacer y='30' />
                  <Warn />
                  <Button
                    onClick={handleGenerate}
                    className='h-max w-max self-center rounded-full bg-doc-primary px-8 py-1 '
                  >
                    <GenerateFill fill='#fff' size='20' />
                    Generate
                  </Button>
                </div>
              ) : !isGenerating ? (
                <div className='mt-4 flex w-full flex-col rounded-t border border-shadow-border pt-3'>
                  <Typed
                    strings={[generatedResult]}
                    className='small-regular px-3 text-doc-font'
                    typeSpeed={5}
                  />
                  <Spacer y='24' />
                  <div className='flex-between px-4'>
                    <RotateCw
                      onClick={handleGenerate}
                      size={20}
                      className='cursor-pointer text-doc-font hover:opacity-50'
                    />
                    <div className='flex gap-x-2'>
                      <Button
                        variant={'outline'}
                        className='h-max w-max rounded px-6 py-1'
                        onClick={handleDismiss}
                      >
                        Dismiss
                      </Button>
                      <Button
                        variant={'outline'}
                        onClick={handleInsert}
                        className='h-max w-max rounded border-doc-primary px-6 py-1 text-doc-primary'
                      >
                        Insert
                      </Button>
                    </div>
                  </div>
                  <Spacer y='12' />
                  <div className='flex-between h-7 w-full rounded-b bg-border-50 px-2 py-1'>
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
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotionProvider>
  );
});

Generate.displayName = 'Generate';
