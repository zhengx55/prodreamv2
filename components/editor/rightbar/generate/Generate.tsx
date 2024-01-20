import Loading from '@/components/root/CustomLoading';
import LazyMotionProvider from '@/components/root/LazyMotionProvider';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GenerateOptions } from '@/constant';
import { copilot } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronLeft, ChevronUp, FileText } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEditorCommand } from '../../hooks/useEditorCommand';
import GenerateBtn from './GenerateBtn';
import Result from './Result';

const Warn = dynamic(() => import('./Warn'));
const GenerateDropdown = dynamic(() => import('../dropdown/GenerateDropdown'));
const Typed = dynamic(() => import('react-typed'), { ssr: false });

export const Generate = memo(() => {
  const [generateTab, setGenerateTab] = useState<number | string>(-1);
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

  const memoSetGeneratedTab = useCallback((value: string) => {
    setGenerateTab(value);
  }, []);

  const handleGenerate = useCallback(async () => {
    const text = editor?.getText();
    const tool = copilot_option.current;
    await handleCopilot({ text: text!, tool: tool! });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const handleDismiss = useCallback(() => {
    setGeneratedResult('');
    setGenerateTab(-1);
  }, []);

  const handleInsert = useCallback(() => {
    if (!editor) return;
    const { selection } = editor.state;
    const { from, to } = selection;
    insertAtPostion(from, to, generatedResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, generatedResult]);

  return (
    <LazyMotionProvider>
      <AnimatePresence mode='wait' initial={false}>
        {generateTab === -1 ? (
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
                          className='text-doc-font transition-transform group-hover:text-doc-primary group-data-[state=open]:rotate-180'
                          size={20}
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <GenerateDropdown items={item.submenu} />
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
        ) : (
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
                <GenerateBtn handleGenerate={handleGenerate} />
              ) : !isGenerating ? (
                <Result
                  handleDismiss={handleDismiss}
                  handleGenerate={handleGenerate}
                  handleInsert={handleInsert}
                  generatedResult={generatedResult}
                />
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
