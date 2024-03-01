import Loading from '@/components/root/CustomLoading';
import { H1_regex, H2_regex } from '@/constant';
import { copilot, outline } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { m } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { memo, useCallback, useRef, useState } from 'react';
import { z } from 'zod';
import { generateOutlineSchema } from '../../../../lib/validation';
import { useEditorCommand } from '../../hooks/useEditorCommand';
import GenerateBtn from './GenerateBtn';
import OutlineBtn from './OutlineBtn';
import Result from './Result';

const OutlineTypes = ['argumentative', 'analytical', 'scientific'];

type Props = { generateTab: string; label: string | null };
const GenerateSub = ({ generateTab, label }: Props) => {
  const isOutline =
    typeof generateTab !== 'number' && OutlineTypes.includes(generateTab);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');
  const editor = useAIEditor((state) => state.editor_instance);
  const setGenerateTab = useAIEditor((state) => state.updateGenerateTab);

  const { insertAtPostion } = useEditorCommand(editor!);
  const outLineInfo = useRef<z.infer<typeof generateOutlineSchema> | null>(
    null
  );
  const queryClient = useQueryClient();
  const { mutateAsync: handleCopilot } = useMutation({
    mutationFn: (params: { tool: string; text: string }) => copilot(params),
    onMutate: () => {
      setIsGenerating(true);
      if (generatedResult) setGeneratedResult('');
    },
    onSuccess: async (data: ReadableStream) => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        console.log('🚀 ~ onSuccess: ~ value:', value);
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
    onSuccess: async (data: ReadableStream, variables) => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      outLineInfo.current = { idea: variables.idea, area: variables.area };
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
    const lines = value.split('\n');
    let dataLines = [];
    for (let i = 0; i < lines.length; i++) {
      if (
        lines[i].startsWith('data:') &&
        lines[i - 1]?.startsWith('event: data')
      ) {
        dataLines.push(lines[i]);
      }
    }
    let eventData: string[] = [];
    if (OutlineTypes.includes(generateTab)) {
      eventData = dataLines.map((line) => {
        let parsed: string = JSON.parse(line.slice('data:'.length));
        if (H1_regex.test(parsed)) {
          parsed = parsed.replaceAll('#', '##');
        } else if (H2_regex.test(parsed)) {
          parsed = parsed.replaceAll('##', '###');
        }
        return parsed;
      });
    } else {
      eventData = dataLines.map((line) => {
        return JSON.parse(line.slice('data:'.length));
      });
    }

    setGeneratedResult((prev) => (prev += eventData.join('')));
  };
  useUpdateEffect(() => {
    if (generatedResult) {
      setIsGenerating(false);
    }
  }, [generatedResult]);

  const handleGenerate = useCallback(async () => {
    const text = editor?.getText();
    const tool = label ?? 'write_introduction';
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
    setGenerateTab(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInsert = useCallback(async () => {
    if (!editor) return;
    const { selection } = editor.state;
    const { from, to } = selection;
    if (isOutline) {
      const parse = (await import('marked')).parse;
      const outline = await parse(generatedResult);
      insertAtPostion(from, to, outline);
      return;
    }
    insertAtPostion(from, to, generatedResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, generatedResult]);

  const hanldeRegenerate = useCallback(async () => {
    if (isOutline) {
      if (!outLineInfo.current) return;
      await handleGenerateOutline(
        outLineInfo.current?.idea,
        outLineInfo.current?.area
      );
    } else {
      await handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOutline]);

  return (
    <m.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className='flex h-full w-full flex-col overflow-hidden'
      key='generate-detail'
    >
      <div
        onClick={() => setGenerateTab(-1)}
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
            <GenerateBtn type={generateTab} handleGenerate={handleGenerate} />
          )
        ) : !isGenerating ? (
          <Result
            handleDismiss={handleDismiss}
            handleGenerate={hanldeRegenerate}
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
