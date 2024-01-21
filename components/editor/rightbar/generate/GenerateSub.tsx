import Loading from '@/components/root/CustomLoading';
import { copilot, outline } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { m } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { useEditorCommand } from '../../hooks/useEditorCommand';
import GenerateBtn from './GenerateBtn';
import OutlineBtn from './OutlineBtn';
import Result from './Result';

const OutlineTypes = ['argumentative', 'analytical', 'scientific'];

type Props = { generateTab: string; goBack: () => void; label: string | null };
const GenerateSub = ({ generateTab, goBack, label }: Props) => {
  const isOutline =
    typeof generateTab !== 'number' && OutlineTypes.includes(generateTab);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');
  const editor = useAIEditor((state) => state.editor_instance);
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
        handleStreamData(value);
        if (done) break;
      }
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
      setIsGenerating(false);
    },
  });

  const { mutateAsync: handleOutline } = useMutation({
    mutationFn: (params: { essay_type: string; idea: string; area: string }) =>
      outline(params),
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
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
      setIsGenerating(false);
    },
  });

  const handleStreamData = (value: string | undefined) => {
    if (!value) return;
    isGenerating && setIsGenerating(false);
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
  const handleGenerate = useCallback(async () => {
    const text = editor?.getText();
    const tool = label;
    await handleCopilot({ text: text!, tool: tool! });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const handleGenerateOutline = useCallback(
    async (idea: string, area: string) => {
      await handleOutline({ essay_type: generateTab as string, idea, area });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [generateTab]
  );

  const handleDismiss = useCallback(() => {
    setGeneratedResult('');
    goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInsert = useCallback(async () => {
    if (!editor) return;
    const { selection } = editor.state;
    const { from, to } = selection;
    if (isOutline) {
      const parse = (await import('marked')).parse;
      console.log(parse(generatedResult));
    }
    insertAtPostion(from, to, generatedResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, generatedResult]);
  return (
    <m.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className='flex h-full w-full flex-col overflow-hidden'
      key='generate-detail'
    >
      <div
        onClick={goBack}
        className='flex cursor-pointer items-center gap-x-2 hover:underline'
      >
        <ChevronLeft size={20} className='text-doc-font' />
        <p className='base-regular capitalize text-doc-font'>{generateTab}</p>
      </div>
      <div className='flex flex-1 flex-col overflow-y-auto'>
        {!generatedResult && !isGenerating ? (
          isOutline ? (
            <OutlineBtn handleGenerate={handleGenerateOutline} />
          ) : (
            <GenerateBtn handleGenerate={handleGenerate} />
          )
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
  );
};
export default memo(GenerateSub);
