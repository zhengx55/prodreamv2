import Spacer from '@/components/root/Spacer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { startup_task, task_gif } from '@/constant';
import { copilot } from '@/query/api';
import useAiEditor, { useUserTask } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { type Editor } from '@tiptap/react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { memo, useRef, useState } from 'react';
import { toast } from 'sonner';

type Props = { editor: Editor };

const Task = ({ editor }: Props) => {
  const [step, setStep] = useState(0);
  const citation_check = useUserTask((state) => state.citation);
  const copilot_check = useUserTask((state) => state.ai_copilot);
  const continue_writing_check = useUserTask((state) => state.continue_writing);
  const generate_tool_check = useUserTask((state) => state.generate_tool);
  const updateRightbarTab = useAiEditor((state) => state.updateRightbarTab);
  const updateTaskStep = useUserTask((state) => state.updateTaskStep);
  const updateCitationStep = useUserTask((state) => state.updateCitationStep);
  const insertPos = useRef<number>(0);
  const findFistParagraph = () => {
    let first_paragraph = {
      hasContent: false,
      pos: 0,
      content: '',
      size: 0,
    };
    editor.state.doc.descendants((node, pos) => {
      if (
        node.type.name === 'paragraph' &&
        node.textContent.trim() !== '' &&
        first_paragraph.hasContent === false
      ) {
        first_paragraph = {
          pos,
          hasContent: true,
          content: node.textContent,
          size: node.nodeSize,
        };
      }
    });
    return first_paragraph;
  };

  const { mutateAsync: handleCopilot } = useMutation({
    mutationFn: (params: { text: string; pos: number }) =>
      copilot({ tool: 'continue_write_sentence', text: params.text }),
    onSuccess: async (data: ReadableStream, variables) => {
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      insertPos.current = variables.pos - 1;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        handleStreamData(value);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleStreamData = (value: string | undefined) => {
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
        from: insertPos.current,
        to: result.length + insertPos.current,
      })
      .setColor('rgb(134 82 219)')
      .setTextSelection(0)
      .unsetColor()
      .run();
    insertPos.current += result.length;
  };

  const selectHandler = async (index: number) => {
    if (index === 0 || index === 1) {
      const title = editor.getJSON().content?.at(0)?.content?.at(0)?.text;
      const content = editor.getText();
      if (content.trim() === title?.trim()) {
        toast.info('please write some content and try again');
        return;
      }
      const first_paragraph = findFistParagraph();
      if (index === 0) {
        editor.commands.setNodeSelection(first_paragraph.pos);
        updateTaskStep(0);
      } else {
        await handleCopilot({
          text: first_paragraph.content,
          pos: first_paragraph.pos + first_paragraph.size,
        });
        updateTaskStep(1);
      }
    }
    if (index === 2) {
      updateRightbarTab(2);
      updateTaskStep(2);
    }
    if (index === 3) {
      updateRightbarTab(1);
      updateTaskStep(3);
      updateCitationStep();
    }
  };

  return (
    <>
      <Accordion defaultValue='item-1' type='single' collapsible>
        <AccordionItem className='mx-auto w-[700px] rounded-md' value='item-1'>
          <AccordionTrigger className='flex-between bg-doc-primary px-5 data-[state=closed]:rounded-lg data-[state=open]:rounded-t-lg'>
            <p className='base-semibold text-white'>
              Explore our powerful features!
            </p>
            <ChevronDown className='h-8 w-12 shrink-0 rounded bg-white text-doc-primary transition-transform duration-200' />
          </AccordionTrigger>
          <AccordionContent className='relative flex h-[200px] rounded-b-lg bg-doc-primary px-5'>
            <Image
              alt='task'
              src='/task/Task.png'
              width={100}
              height={100}
              className='absolute bottom-0 left-[calc(50%_-80px)] z-10 h-24 w-24'
            />
            <Image
              alt='task'
              src='/task/Task_corner.png'
              width={220}
              height={120}
              className='h-30 absolute bottom-0 left-0 z-0 w-52'
            />
            <ul className='flex w-1/2 flex-col gap-y-2'>
              {startup_task.map((task, index) => {
                return (
                  <li
                    onClick={() => setStep(index)}
                    key={index}
                    className={`flex-center group z-10 flex w-max cursor-pointer gap-x-2.5 rounded-full px-3 py-1.5 hover:bg-[#ECEDFF] ${step === index ? 'bg-[#ECEDFF]' : 'bg-white'}`}
                  >
                    <Checkbox
                      disabled
                      checked={
                        index === 0
                          ? copilot_check
                          : index === 1
                            ? continue_writing_check
                            : index === 2
                              ? generate_tool_check
                              : citation_check
                      }
                      id={task.label}
                      className='h-4 w-4 rounded-full border-doc-primary'
                    />
                    <label
                      htmlFor={task.label}
                      className={`${step === index ? 'text-doc-primary' : ''} subtle-regular group-hover:cursor-pointer`}
                    >
                      {task.label}
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className='relative h-full w-1/2 overflow-hidden rounded-lg'>
              <Button
                variant={'ghost'}
                className='absolute bottom-2 left-2 z-10 h-max w-max border border-doc-primary p-1 text-doc-primary'
                onClick={() => selectHandler(step)}
              >
                Show me
              </Button>
              <Image
                alt='task-showcase'
                src={task_gif[step === -1 ? 0 : step].src}
                fill
                priority
                className='z-0'
                sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Spacer y='20' />
    </>
  );
};
export default memo(Task);
