import PageViewTrack from '@/components/root/PageViewTrack';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { sample_continue, sample_outline } from '@/constant';
import { outline } from '@/query/api';
import { useButtonTrack, useMutateTrackInfo } from '@/query/query';
import { EdtitorDictType } from '@/types';
import { useUserTask } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { type Editor } from '@tiptap/react';
import { AnimatePresence, m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { parse } from 'marked';
import { useEffect, useRef, useState } from 'react';

const Guidance = ({ editor, t }: { editor: Editor; t: EdtitorDictType }) => {
  const [check, setCheck] = useState(-1);
  const ideaRef = useRef<HTMLTextAreaElement | null>(null);
  const draftRef = useRef<HTMLTextAreaElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const resultString = useRef<string>('');
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const updateOutlineStep = useUserTask((state) => state.updateOutlineStep);
  const updateShowTaskDialog = useUserTask(
    (state) => state.updateShowTaskDialog
  );
  const { mutateAsync: ButtonTrack } = useButtonTrack();

  const close = async () => {
    await updateTrack({
      field: 'guidence',
      data: true,
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (check === 2) {
      timer = setTimeout(() => {
        handleExplore();
      }, 500);
    }
    return () => {
      timer && clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  const { mutateAsync: handleStart } = useMutation({
    mutationFn: (params: { idea: string; area: string; essay_type: string }) =>
      outline(params),
    onMutate: () => {
      setIsGenerating(true);
    },
    onSuccess: async (data: ReadableStream) => {
      setIsGenerating(false);
      close();
      await ButtonTrack({ event: 'start with generated outlie' });
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          await ButtonTrack({ event: 'generate outline complete' });
          break;
        }
        handleStreamData(value);
      }
      if (resultString.current !== '') {
        const parse_result = parse(resultString.current, { async: false });
        editor.commands.insertContentAt(
          editor.state.doc.content?.size ?? 2,
          parse_result,
          {
            parseOptions: {
              preserveWhitespace: true,
            },
          }
        );
        resultString.current = '';
        updateOutlineStep(1);
      }
    },
    onError: async (error) => {
      setIsGenerating(false);
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });

  const handleStreamData = async (value: string | undefined) => {
    if (!value) return;
    const lines = value.split('\n');
    const dataLines = lines.filter(
      (line, index) =>
        line.startsWith('data:') &&
        lines.at(index - 1)?.startsWith('event: data')
    );
    const eventData = dataLines.map((line) => {
      let parsed: string = JSON.parse(line.slice('data:'.length));
      if (/^([^#]*#){1}[^#]*$/.test(parsed)) {
        parsed = parsed.replaceAll('#', '##');
      } else if (/^[^#]*##([^#]|$)/.test(parsed)) {
        parsed = parsed.replaceAll('##', '###');
      }
      return parsed;
    });
    eventData.forEach((word: string) => {
      resultString.current += word;
      if (word.includes('\n\n')) {
        const parse_result = parse(resultString.current, { async: false });
        editor.commands.insertContentAt(
          editor.state.doc.content?.size ?? 2,
          parse_result,
          {
            parseOptions: {
              preserveWhitespace: true,
            },
          }
        );
        resultString.current = '';
      }
    });
  };

  const handleGenerate = async () => {
    if (ideaRef.current && ideaRef.current.value) {
      await handleStart({
        idea: ideaRef.current?.value as string,
        essay_type: 'any',
        area: '',
      });
    } else {
      const toast = (await import('sonner')).toast;
      toast.warning('Please enter a brief description');
    }
  };

  const handleDraft = async () => {
    if (!draftRef.current?.value) {
      const toast = (await import('sonner')).toast;
      return toast.warning('Please enter a draft content');
    }
    editor.commands.insertContent(draftRef.current.value, {
      updateSelection: true,
    });
    updateShowTaskDialog();
    await ButtonTrack({ event: 'start with draft' });
    await ButtonTrack({ event: 'start from draft complete' });
    await close();
  };

  const handleExplore = async () => {
    updateShowTaskDialog();
    await ButtonTrack({ event: 'just exploring' });
    editor.commands.setContent(sample_continue, true);
    await ButtonTrack({ event: 'just exploring complete' });
    await close();
  };

  const handleClickSample = async () => {
    if (!ideaRef.current) return;
    await ButtonTrack({ event: 'start with sample outline' });
    editor.commands.setContent(sample_outline, true);
    ideaRef.current.value = 'Importance of religion in East Asian culture';
    setTimeout(async () => {
      updateOutlineStep(1);
      await close();
    }, 1500);
    await ButtonTrack({ event: 'generate outline complete' });
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key='guidance'
      transition={{ duration: 1, type: 'spring', stiffness: 100, damping: 20 }}
      className='absolute z-[9999] h-full w-full bg-white font-inter'
    >
      <PageViewTrack no_route_event='Aha moment select' />
      <div className='mx-auto flex w-[700px] flex-col'>
        <Spacer y='24' />
        <h1 className='text-[28px] font-semibold leading-normal'>
          {t.Onboard.question}
        </h1>
        <Spacer y='24' />
        <ul className='flex flex-col gap-y-6 self-start'>
          <li className='inline-flex items-center gap-x-2'>
            <Checkbox
              checked={check === 0}
              onCheckedChange={() => setCheck(0)}
              id='have-draft'
            />
            <label
              htmlFor='have-draft'
              className={`text-sm font-medium leading-none ${check === 0 ? 'text-violet-500' : 'text-neutral-400'}`}
            >
              {t.Onboard.Option1.Title}
            </label>
          </li>
          <li className='inline-flex items-center gap-x-2'>
            <Checkbox
              checked={check === 1}
              onCheckedChange={() => {
                setCheck(1);
              }}
              id='start-outline'
            />
            <label
              htmlFor='start-outline'
              className={`text-sm font-medium leading-none ${check === 1 ? 'text-violet-500' : 'text-neutral-400'}`}
            >
              {t.Onboard.Option2.Title}
            </label>
          </li>
          <li className='inline-flex items-center gap-x-2'>
            <Checkbox
              checked={check === 2}
              onCheckedChange={() => {
                setCheck(2);
              }}
              id='just-exploring'
            />
            <label
              htmlFor='just-exploring'
              className={`text-sm font-medium leading-none ${check === 2 ? 'text-violet-500' : 'text-neutral-400'}`}
            >
              {t.Onboard.Option3.Title}
            </label>
          </li>
        </ul>
        <Spacer y='32' />
        <AnimatePresence mode='wait'>
          {check === 0 ? (
            <m.div
              key={'terms-1'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className='flex flex-col gap-y-4'
            >
              <h2 className='text-[28px] font-semibold leading-normal'>
                {t.Onboard.Option1.Subtitle}
              </h2>
              <Textarea
                className='h-24 rounded shadow-lg'
                name='outline-description'
                ref={draftRef}
                placeholder={t.Onboard.Option1.PlaceHolder}
              />
              <Button
                role='button'
                onClick={handleDraft}
                className='rounded'
                id='guidence-generate'
              >
                {t.Utility.Enter}
              </Button>
            </m.div>
          ) : check === 1 ? (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className='flex flex-col gap-y-4'
              key={'terms-2'}
            >
              <h2 className='text-[28px] font-semibold leading-normal'>
                {t.Onboard.Option2.Subtitle}
              </h2>
              <p className='base-semibold'>{t.Onboard.Option2.Question}</p>
              <Textarea
                className='h-24 rounded shadow-lg'
                name='outline-description'
                ref={ideaRef}
                placeholder={t.Onboard.Option2.PlaceHolder}
              />
              <div className='flex gap-x-2'>
                <Button
                  role='button'
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className='w-max rounded bg-violet-500'
                  id='guidence-generate'
                >
                  {t.Utility.Generate}
                  {isGenerating && (
                    <Loader2 size={18} className='animate-spin text-white' />
                  )}
                </Button>
                <Button
                  role='button'
                  variant={'ghost'}
                  className=''
                  disabled={isGenerating}
                  onClick={handleClickSample}
                >
                  {t.Onboard.Option2.Sample}
                </Button>
              </div>
            </m.div>
          ) : check === 2 ? (
            <m.p
              key={'terms-3'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className='text-[28px] font-semibold leading-normal'
            >
              {t.Onboard.Option3.Subtitle}
            </m.p>
          ) : null}
        </AnimatePresence>
      </div>
    </m.div>
  );
};
export default Guidance;
