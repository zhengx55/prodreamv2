import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { outline, saveDoc } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';

type Props = { handleClose: () => Promise<void> };
const Start = ({ handleClose }: Props) => {
  const editor = useAIEditor((state) => state.editor_instance);
  const { id } = useParams();
  const tEditor = useTranslations('Editor');
  const tError = useTranslations('Error');
  const [selection, setSelection] = useState<number | null>(null);
  const [essayType, setEssayType] = useState<number | null>(null);
  const [isGenrating, setIsGenerating] = useState(false);
  const ideaRef = useRef<HTMLTextAreaElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: handleStart } = useMutation({
    mutationFn: (params: { idea: string; area: string; essay_type: string }) =>
      outline(params),
    onMutate: () => {
      setIsGenerating(true);
    },
    onSuccess: async (data: ReadableStream) => {
      await saveDoc({
        id: id as string,
        brief_description: ideaRef.current?.value,
        use_intention: 'start_editing',
      });
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      let result = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        result += handleStreamData(value);
      }
      setIsGenerating(false);
      await handleClose();
      const parse = (await import('marked')).parse;
      result = await parse(result);
      editor?.chain().insertContent(result).run();
    },
    onError: async (error) => {
      setIsGenerating(false);
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });

  const handleStreamData = (value: string | undefined) => {
    let result = '';
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
    eventData.forEach((word) => {
      result += word;
    });
    return result;
  };

  const handleStartWritting = async () => {
    if (selection === null) {
      await saveDoc({ id: id as string, use_intention: 'start_editing' });
      await handleClose();
      return;
    }
    if (!ideaRef.current?.value) {
      const toast = (await import('sonner')).toast;
      const toastInfo = tError('Please_fill_in_the_idea');
      toast.error(toastInfo);
      return;
    }
    await handleStart({
      idea: ideaRef.current?.value,
      area: areaRef.current?.value as string,
      essay_type:
        essayType === 0
          ? 'argumentative'
          : essayType === 1
            ? 'analytical'
            : 'scientific',
    });
  };
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='relative flex flex-1 flex-col gap-y-16'
      key={'board-writing'}
    >
      {isGenrating && (
        <div className='flex-center absolute inset-0 z-50 flex-1 bg-white/80 backdrop-blur-sm'>
          <Loader2 className='animate-spin text-violet-500' />
        </div>
      )}
      <div className='flex-between'>
        <h1 className='h2-semibold'>
          {tEditor('StartModal.And_one_more_thing')}
          <br />
          <span className='font-[300] text-violet-500'>
            {tEditor('StartModal.What_are_you_looking_for_today')}
          </span>
        </h1>
        <Button
          className='h-max w-max rounded border border-violet-500 px-10 py-1 text-violet-500'
          variant={'ghost'}
          onClick={handleClose}
        >
          {tEditor('StartModal.Skip')}
        </Button>
      </div>
      <div className='flex-between gap-x-4'>
        <div className='flex h-[380px] w-1/3 cursor-pointer flex-col items-center justify-evenly rounded-2xl border border-gray-200 py-4 hover:bg-[#F8F9FC]'>
          <p className='title-semibold text-zinc-600'>
            {tEditor('StartModal.Start_writing_an_essay')}
          </p>
          <div className='relative h-[250px] w-[90%] overflow-hidden'>
            <Image
              alt='start'
              src='/welcome/Start.png'
              sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
              fill
            />
          </div>
        </div>
        <div className='flex h-full w-2/3 flex-col'>
          <p className='title-medium'>
            {tEditor('StartModal.Brief_description_of_what_you_are_writing')}
          </p>
          <Spacer y='10' />
          <Textarea
            id='idea'
            ref={ideaRef}
            className='small-regular'
            placeholder={tEditor(
              'StartModal.Describe_your_research_topic_or_essay_prompt'
            )}
          />
          <Spacer y='20' />
          <div className='flex items-center gap-x-4'>
            <p className='title-medium'>
              {tEditor('StartModal.Generate_outline')}
            </p>
            <Spacer y='10' />
            <div className='flex gap-x-2'>
              <Toggle
                pressed={selection === 0}
                onPressedChange={(pressed) => {
                  pressed ? setSelection(0) : setSelection(null);
                }}
              >
                {tEditor('StartModal.YES')}
              </Toggle>
              <Toggle
                pressed={selection === 1}
                onPressedChange={(pressed) => {
                  pressed ? setSelection(1) : setSelection(null);
                }}
              >
                {tEditor('StartModal.NO')}
              </Toggle>
            </div>
          </div>
          <AnimatePresence>
            {selection === 0 && (
              <m.div
                initial={{
                  y: -10,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -10,
                  opacity: 0,
                }}
                className='flex flex-col'
              >
                <Spacer y='10' />
                <h2 className='title-medium'>
                  {tEditor('StartModal.Field_of_study')}
                </h2>
                <Spacer y='5' />
                <Input
                  type='text'
                  id='area'
                  placeholder={tEditor('StartModal.E_G_Natural_History')}
                  className='small-regular'
                  ref={areaRef}
                />
                <Spacer y='20' />

                <div className='flex items-center gap-x-2'>
                  <h2 className='title-medium'>
                    {tEditor('StartModal.Essay_Type')}
                  </h2>
                  <Spacer y='10' />
                  <div className='flex gap-x-2'>
                    <Toggle
                      pressed={essayType === 0}
                      onPressedChange={(pressed) => {
                        pressed ? setEssayType(0) : setEssayType(null);
                      }}
                    >
                      {tEditor('StartModal.Argumentative')}
                    </Toggle>
                    <Toggle
                      pressed={essayType === 1}
                      onPressedChange={(pressed) => {
                        pressed ? setEssayType(1) : setEssayType(null);
                      }}
                    >
                      {tEditor('StartModal.Analytical')}
                    </Toggle>
                    <Toggle
                      pressed={essayType === 2}
                      onPressedChange={(pressed) => {
                        pressed ? setEssayType(2) : setEssayType(null);
                      }}
                    >
                      {tEditor('StartModal.Scientific')}
                    </Toggle>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>

          <Button
            role='button'
            onClick={handleStartWritting}
            className='mt-auto w-max rounded-md bg-violet-500 px-20'
          >
            {tEditor('StartModal.Start_Writing')}
          </Button>
        </div>
      </div>
    </m.div>
  );
};
export default Start;
