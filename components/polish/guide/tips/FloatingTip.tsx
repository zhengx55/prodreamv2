import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { useAIEditor, useUserTask } from '@/zustand/store';
import { posToDOMRect, type Editor } from '@tiptap/react';
import { m } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingTip = ({ editor }: { editor: Editor }) => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const updateOutlineStep = useUserTask((state) => state.updateOutlineStep);
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  const outline_step = useUserTask((state) => state.outline_step);
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
      animate={{ opacity: 1, scale: 1, transition: { delay: 1.5 } }}
      exit={{ opacity: 0, scale: 0 }}
      style={{ top, left }}
      className='absolute z-20 w-[320px] rounded-lg bg-black-100 p-3'
    >
      <span className='absolute -right-[8px] top-[calc(50%_-8px)] h-0 w-0 border-b-[8px] border-l-[8px] border-t-[8px] border-b-transparent border-l-black-100 border-t-transparent' />
      <h1 className='small-semibold text-white'>
        Organized, practical, concise outline to help you get started ✨!
      </h1>
      <Spacer y='5' />
      <ul className='ml-5 list-disc marker:text-white'>
        <li className='subtle-regular text-white'>
          Guidance on how to structure the paragraph.
        </li>
        <li className='subtle-regular text-white'>
          Actionable steps to start writing.
        </li>
        <li className='subtle-regular text-white'>
          Sample thesis statement to reference.
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
};
export default FloatingTip;
