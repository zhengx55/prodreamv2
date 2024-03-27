import Spacer from '@/components/root/Spacer';
import { Continue } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { copilot } from '@/query/api';
import { useMembershipInfo } from '@/query/query';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Editor } from '@tiptap/react';
import { Loader2 } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

type Props = { editor: Editor; t: EditorDictType };
const Trigger = ({ editor, t }: Props) => {
  const {
    showContinue,
    updateContinueRes,
    updateshowContinue,
    updateInsertPos,
  } = useAIEditor((state) => ({ ...state }));
  const [generating, setGenerating] = useState(false);
  const queryClient = useQueryClient();
  const { data: usage } = useMembershipInfo();

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === '/') {
        event.preventDefault();
        await handleContinueWritting();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutateAsync: handleContinue } = useMutation({
    mutationFn: (params: { tool: string; text: string }) => copilot(params),
    onMutate: () => {
      setGenerating(true);
    },
    onSuccess: async (data: ReadableStream) => {
      let flag: boolean = false;
      if (usage?.subscription === 'basic')
        queryClient.invalidateQueries({ queryKey: ['membership'] });
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        const lines = value?.split('\n');
        const dataLines = lines?.filter(
          (line, index) =>
            line.startsWith('data:') &&
            lines.at(index - 1)?.startsWith('event: data')
        );
        let result = '';
        const eventData: string[] | undefined = dataLines?.map((line) =>
          JSON.parse(line.slice('data:'.length))
        );

        if (!flag && eventData?.at(0)?.trim() !== '') {
          flag = true;
          eventData?.forEach((word) => {
            result += word;
          });
          updateContinueRes(result);
          updateshowContinue(null);
          setGenerating(false);
          editor
            .chain()
            .focus()
            .insertContent({
              type: 'ContinueResult',
            })
            .run();
        } else {
          eventData?.forEach((word) => {
            result += word;
          });
          updateContinueRes(result);
        }
        if (done) {
          break;
        }
      }
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
      setGenerating(false);
    },
  });

  const handleContinueWritting = async () => {
    const text_before = editor.state.selection.$head.parent.textContent;
    const { anchor } = editor.state.selection;
    updateInsertPos(anchor);
    await handleContinue({
      tool: 'continue_write_sentence',
      text: text_before,
    });
  };

  return (
    <Button
      role='button'
      onClick={handleContinueWritting}
      disabled={generating}
      style={{
        top: `${showContinue?.top}px`,
        left: `${showContinue?.left}px`,
      }}
      className='absolute z-50 h-6 w-6 cursor-pointer rounded bg-white px-0 shadow-[0px_2px_4px_0px_#DEE0EF]'
    >
      {!generating ? (
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <span className='rounded bg-violet-500'>
                <Continue />
              </span>
            </TooltipTrigger>
            <TooltipContent className='py-2'>
              <p>{t.Continue.title}</p>
              <Spacer y='5' />
              <p className='text-[#939393]'>{t.Continue.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span className='rounded bg-violet-500'>
          <Loader2 size={18} className='animate-spin text-white' />
        </span>
      )}
    </Button>
  );
};
export default memo(Trigger);
