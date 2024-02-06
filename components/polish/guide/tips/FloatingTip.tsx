import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { ContinueTooltip, OutlineTooltipMain } from '@/constant/enum';
import { findFirstParagraph } from '@/lib/tiptap/utils';
import { copilot } from '@/query/api';
import { useAIEditor, useUserTask } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { posToDOMRect, type Editor } from '@tiptap/react';
import { m } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';

export const OutlineTip = memo(({ editor }: { editor: Editor }) => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const updateOutlineStep = useUserTask((state) => state.updateOutlineStep);
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  useEffect(() => {
    if (!editor) return;
    let first_paragraph_pos: number = 0;
    let first_paragraph_to: number = 0;
    editor.state.doc.descendants((node, pos) => {
      if (
        node.type.name === 'paragraph' &&
        node.textContent.trim() !== '' &&
        !first_paragraph_pos
      ) {
        first_paragraph_pos = pos;
        first_paragraph_to = node.nodeSize + pos;
      }
    });
    const coordinate = posToDOMRect(
      editor.view,
      first_paragraph_pos,
      first_paragraph_to
    );
    setTop(coordinate.top);
    setLeft(coordinate.left - 360);
  }, [editor]);
  return (
    <m.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      key={'outline'}
      style={{ top, left }}
      className='absolute z-20 w-[320px] rounded-lg bg-black-100 p-3'
    >
      <span className='absolute -right-[8px] top-[calc(50%_-8px)] h-0 w-0 border-b-[8px] border-l-[8px] border-t-[8px] border-b-transparent border-l-black-100 border-t-transparent' />
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
      <div className='flex justify-end'>
        <Button
          onClick={() => {
            updateOutlineStep(2);
            updateRightbarTab(2);
          }}
          className='h-max w-max rounded bg-doc-primary px-5 py-1 capitalize'
          role='button'
        >
          Got it!
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

  const { mutateAsync: handleCopilot } = useMutation({
    mutationFn: (params: { text: string; pos: number; start: number }) =>
      copilot({ tool: 'continue_write_sentence', text: params.text }),
    onSuccess: async (data: ReadableStream, variables) => {
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      insertPos.current = variables.pos - 1;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        handleStreamData(value, variables.pos);
      }
      const coordinate = posToDOMRect(
        editor.view,
        variables.start,
        insertPos.current
      );
      setTop(coordinate.top);
      setLeft(coordinate.left - 360);
    },
  });

  const handleStreamData = (value: string | undefined, start: number) => {
    if (!value) return;
    const lines = value.split('\n');
    const dataLines = lines.filter(
      (line, index) =>
        line.startsWith('data:') &&
        lines.at(index - 1)?.startsWith('event: data')
    );
    const eventData = dataLines.map((line) =>
      JSON.parse(line.slice('data:'.length))
    );
    let result = '';
    eventData.forEach((word) => {
      result += word;
    });
    if (!result.startsWith(' ')) result = ` ${result}`;
    editor
      .chain()
      .insertContentAt(insertPos.current, result)
      .setTextSelection({
        from: start,
        to: result.length + insertPos.current,
      })
      .run();
    insertPos.current += result.length;
  };

  useEffect(() => {
    async function continueWrite() {
      const first_paragraph = findFirstParagraph(editor);
      await handleCopilot({
        text: first_paragraph.content,
        pos: first_paragraph.pos + first_paragraph.size,
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
      className='absolute z-20 w-[320px] rounded-lg bg-black-100 p-3'
    >
      <span className='absolute -right-[8px] top-[calc(50%_-8px)] h-0 w-0 border-b-[8px] border-l-[8px] border-t-[8px] border-b-transparent border-l-black-100 border-t-transparent' />
      <h1 className='small-semibold text-white'>{ContinueTooltip.TITLE}</h1>
      <Spacer y='5' />
      <p className='subtle-regular text-white'>{ContinueTooltip.TEXT}</p>
      <Spacer y='15' />
      <div className='flex justify-end'>
        <Button
          onClick={() => {
            updateContinueStep(0);
          }}
          className='h-max w-max rounded bg-doc-primary px-5 py-1 capitalize'
          role='button'
        >
          Got it!
        </Button>
      </div>
    </m.div>
  );
});

OutlineTip.displayName = 'OutlineTip';
ContinueTip.displayName = 'ContineTip';
