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
import { useAIEditor } from '@/zustand/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Editor } from '@tiptap/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = { editor: Editor };
const Trigger = ({ editor }: Props) => {
  const showContinue = useAIEditor((state) => state.showContinue);
  const updateContinueRes = useAIEditor((state) => state.updateContinueRes);
  const [generating, setGenerating] = useState(false);
  const queryClient = useQueryClient();
  const updateshowContinue = useAIEditor((state) => state.updateshowContinue);
  const updateInsertPos = useAIEditor((state) => state.updateInsertPos);
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      event.preventDefault();
      if ((event.metaKey || event.ctrlKey) && event.key === '/') {
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
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      updateshowContinue(null);
      setGenerating(false);
      editor.commands.insertContent({
        type: 'ContinueResult',
      });
      while (true) {
        const { value, done } = await reader.read();
        handleStreamData(value);
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

  const handleStreamData = (value: string | undefined) => {
    const lines = value?.split('\n');
    const dataLines = lines?.filter(
      (line, index) =>
        line.startsWith('data:') &&
        lines.at(index - 1)?.startsWith('event: data')
    );
    const eventData = dataLines?.map((line) =>
      JSON.parse(line.slice('data:'.length))
    );
    let result = '';
    eventData?.forEach((word) => {
      result += word;
    });
    updateContinueRes(result);
  };

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
      //   onKeyDown={handleKeydown}
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
              <span className='rounded bg-doc-primary'>
                <Continue />
              </span>
            </TooltipTrigger>
            <TooltipContent className='py-2'>
              <p>Continue Writing</p>
              <Spacer y='5' />
              <p className='text-[#939393]'>
                cmd/ctrl + &quot;/&quot; for shortcut
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span className='rounded bg-doc-primary'>
          <Loader2 size={18} className='animate-spin text-white' />
        </span>
      )}
    </Button>
  );
};
export default Trigger;
