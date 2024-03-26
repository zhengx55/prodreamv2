import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { ContinueTooltip, OutlineTooltipMain } from '@/constant/enum';
import { findFirstParagraph } from '@/lib/tiptap/utils';
import { copilot } from '@/query/api';
import { useMutateTrackInfo } from '@/query/query';
import { useAIEditor, useUserTask } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { posToDOMRect, type Editor } from '@tiptap/react';
import { m } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';

export const OutlineTip = memo(({ editor }: { editor: Editor }) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const updateOutlineStep = useUserTask((state) => state.updateOutlineStep);
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!editor) return;
      let first_paragraph_pos: number = 0;
      let first_paragraph_to: number = 0;
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'bulletList' && !first_paragraph_pos) {
          first_paragraph_pos = pos;
          first_paragraph_to = node.nodeSize + pos;
        }
      });
      editor
        .chain()
        .focus()
        .setTextSelection({ from: first_paragraph_pos, to: first_paragraph_to })
        .run();
      const coordinate = posToDOMRect(
        editor.view,
        first_paragraph_pos,
        first_paragraph_to
      );
      setPosition({
        left: coordinate.left - 340 + window.scrollX,
        top: coordinate.top,
      });
    }
  }, [editor]);
  return (
    <m.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      key={'outline'}
      style={{ top: position.top, left: position.left }}
      className='absolute z-20 w-[320px] rounded-lg bg-black p-3'
    >
      <span className='border-l-black-100 absolute -right-[8px] top-[calc(50%_-8px)] h-0 w-0 border-b-[8px] border-l-[8px] border-t-[8px] border-b-transparent border-t-transparent' />
      <h1 className='small-semibold text-white'>{OutlineTooltipMain.TITLE}</h1>
      <Spacer y='5' />
      <ul className='ml-5 list-disc marker:text-white'>
        <li className='subtle-regular text-white'>
          {OutlineTooltipMain.LIST1}
        </li>
        <li className='subtle-regular text-white'>
          {OutlineTooltipMain.LIST2}
        </li>
        <li className='subtle-regular text-white'>
          {OutlineTooltipMain.LIST3}
        </li>
      </ul>
      <Spacer y='15' />
      <div className='flex items-center justify-between'>
        <p className='subtle-regular text-white'>1/3</p>
        <Button
          onClick={() => {
            updateOutlineStep(2);
            updateRightbarTab(2);
            editor.chain().blur().setTextSelection(0).run();
          }}
          className='h-max w-max rounded bg-violet-500 px-5 py-1 capitalize'
          role='button'
        >
          Next
        </Button>
      </div>
    </m.div>
  );
});

export const ContinueTip = memo(({ editor }: { editor: Editor }) => {
  const [top, setTop] = useState<number | undefined>();
  const [left, setLeft] = useState<number | undefined>();
  const updateContinueStep = useUserTask((state) => state.updateContinueStep);
  const insertPos = useRef<number>(0);
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const { updateshowContinue, updateContinueRes, updateInsertPos } =
    useAIEditor((state) => ({
      ...state,
    }));

  const { mutateAsync: handleCopilot } = useMutation({
    mutationFn: (params: { text: string; pos: number; start: number }) =>
      copilot({ tool: 'continue_write_sentence', text: params.text }),
    onSuccess: async (data: ReadableStream, variables) => {
      let flag: boolean = false;
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      insertPos.current = variables.pos - 1;
      updateInsertPos(variables.pos);
      while (true) {
        const { value, done } = await reader.read();
        const lines = value?.split('\n');
        const dataLines = lines?.filter(
          (line, index) =>
            line.startsWith('data:') &&
            lines.at(index - 1)?.startsWith('event: data')
        );
        const eventData: string[] | undefined = dataLines?.map((line) =>
          JSON.parse(line.slice('data:'.length))
        );

        if (!flag && eventData?.at(0)?.trim() !== '') {
          flag = true;
          updateContinueRes(eventData?.join('') ?? '');
          insertPos.current += (eventData?.join('') ?? '').length;
          updateshowContinue(null);
          editor
            .chain()
            .focus()
            .insertContentAt(variables.pos, {
              type: 'ContinueResult',
            })
            .run();
        } else {
          updateContinueRes(eventData?.join('') ?? '');
          insertPos.current += (eventData?.join('') ?? '').length;
          if (done) {
            const coordinate = posToDOMRect(
              editor.view,
              variables.start,
              insertPos.current
            );
            const el_srcoll_top =
              editor.view.dom.parentElement?.parentElement?.scrollTop;
            setTop(coordinate.top + 50 + (el_srcoll_top ?? 0));
            setLeft(coordinate.left - 360 + window.scrollX);
            break;
          }
        }
      }
    },
  });

  useEffect(() => {
    async function continueWrite() {
      const first_paragraph = findFirstParagraph(editor);
      await handleCopilot({
        text: first_paragraph.content,
        pos: first_paragraph.pos + first_paragraph.size - 1,
        start: first_paragraph.pos,
      });
    }
    if (!editor) return;
    continueWrite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
  if (!top || !left) return null;
  return (
    <m.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, scale: 0 }}
      key={'outline'}
      style={{ top, left }}
      className='absolute z-20 w-[320px] rounded-lg bg-black p-3'
    >
      <h1 className='small-semibold text-white'>{ContinueTooltip.TITLE}</h1>
      <Spacer y='5' />
      <p className='text-[12px] leading-relaxed text-white'>
        {ContinueTooltip.TEXT}
      </p>
      <Spacer y='15' />
      <div className='flex items-center justify-between'>
        <Button
          onClick={async () => {
            editor.chain().blur().setTextSelection(0).run();
            updateContinueStep(0);
            await updateTrack({
              field: 'continue_tip_task',
              data: true,
            });
          }}
          className='h-max w-max rounded bg-violet-500 px-5 py-1 capitalize'
          role='button'
        >
          Got it
        </Button>
      </div>
    </m.div>
  );
});

OutlineTip.displayName = 'OutlineTip';
ContinueTip.displayName = 'ContineTip';
