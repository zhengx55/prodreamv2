import Loading from '@/components/root/CustomLoading';
import { H1_regex, H2_regex } from '@/constant';
import { useMembershipInfo } from '@/hooks/useMemberShip';
import { findLastParagraph, findTitle } from '@/lib/tiptap/utils';
import { copilot, outline } from '@/query/api';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { memo, useCallback, useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { createGenerateOutlineSchema } from '@/lib/validation';
import { useEditorCommand } from '../../hooks/useEditorCommand';

const GenerateBtn = dynamic(() => import('./GenerateBtn'));
const OutlineBtn = dynamic(() => import('./OutlineBtn'));
const Result = dynamic(() => import('./Result'));

const OutlineTypes = ['general', 'argumentative', 'analytical', 'scientific'];
const GenerateTypes = [
  'Write Introduction',
  'Write Conclusion',
  'Generate Title',
];

type Props = { generateTab: string; label: string | null; t: EditorDictType };
const GenerateSub = ({ generateTab, label, t }: Props) => {
  const isOutline =
    typeof generateTab !== 'number' && OutlineTypes.includes(generateTab);
  const tAuth = useTranslations('Auth');
  const generateOutlineSchema = createGenerateOutlineSchema(tAuth);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');
  const editor = useAIEditor((state) => state.editor_instance);
  const setGenerateTab = useAIEditor((state) => state.updateGenerateTab);
  const { data: membership } = useMembershipInfo();
  const { insertGenerated, deleteRange } = useEditorCommand(editor!);

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
      if (membership?.subscription === 'basic')
        queryClient.invalidateQueries({ queryKey: ['membership'] });
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
    onSuccess: async (data: ReadableStream, variables) => {
      if (membership?.subscription === 'basic')
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
      await handleOutline({
        essay_type: generateTab === 'general' ? 'any' : (generateTab as string),
        idea,
        area,
      });
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
    if (isOutline) {
      const parse = (await import('marked')).parse;
      const { pos, size } = findTitle(editor);
      const outline = await parse(generatedResult);
      insertGenerated(pos + size, outline, 'start');
      return;
    } else {
      if (generateTab === GenerateTypes[0]) {
        const { pos, size } = findTitle(editor);
        insertGenerated(pos + size, generatedResult, 'start');
        return;
      } else if (generateTab === GenerateTypes[1]) {
        const { pos, size } = findLastParagraph(editor);
        insertGenerated(pos + size, generatedResult, 'end');
        return;
      } else {
        const { size } = findTitle(editor);
        deleteRange(1, size);
        insertGenerated(1, generatedResult, 'start');
      }
    }
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
    <div className='flex h-full w-full flex-col overflow-hidden'>
      <div className='flex flex-1 flex-col overflow-y-auto'>
        {!generatedResult && !isGenerating ? (
          isOutline ? (
            <OutlineBtn t={t} handleGenerate={handleGenerateOutline} />
          ) : (
            <GenerateBtn
              t={t}
              type={generateTab}
              handleGenerate={handleGenerate}
            />
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
    </div>
  );
};
export default memo(GenerateSub);
