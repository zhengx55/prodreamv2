import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { outline } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

type Props = { handleClose: () => Promise<void> };
const Start = ({ handleClose }: Props) => {
  const [selection, setSelection] = useState(false);
  const [idea, setIdea] = useState('');
  const {} = useMutation({
    mutationFn: () => outline({ idea, area: '', essay_type: 'argumentative' }),
    onSuccess: () => {},
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
  const handleStartWritting = async () => {
    if (!selection) {
      handleClose();
      return;
    }
    const toast = (await import('sonner')).toast;
    if (!idea) {
      toast.error('Please fill in the idea');
      return;
    }
  };
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='flex flex-1 flex-col gap-y-16'
      key={'board-writing'}
    >
      <div className='flex-between'>
        <h1 className='h2-semibold'>
          And one more thing...
          <br />
          <span className='font-[300] text-doc-primary'>
            What are you looking for today?
          </span>
        </h1>
        <Button
          className='h-max w-max rounded border border-doc-primary px-10 py-1 text-doc-primary'
          variant={'ghost'}
          onClick={handleClose}
        >
          Skip
        </Button>
      </div>
      <div className='flex-between gap-x-4'>
        <div className='flex h-[380px] w-1/3 cursor-pointer flex-col items-center justify-evenly rounded-2xl border border-shadow-border py-4 hover:bg-[#F8F9FC]'>
          <p className='title-semibold text-doc-shadow'>
            Start writing an essay
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
            Brief description of what you are writing{' '}
          </p>
          <Spacer y='10' />
          <Textarea
            id='idea'
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className='small-regular'
            placeholder='Describe your research topic or essay prompt. Adding more information can greatly increase the quality of our generations :)'
          />
          <Spacer y='20' />
          <div className='flex items-center gap-x-4'>
            <p className='title-medium'>Generate outline</p>
            <Spacer y='10' />
            <div className='flex gap-x-2'>
              <Toggle
                pressed={selection}
                onPressedChange={(pressed) => {
                  pressed ? setSelection(true) : setSelection(false);
                }}
              >
                YES
              </Toggle>
              <Toggle
                pressed={!selection}
                onPressedChange={(pressed) => {
                  pressed ? setSelection(false) : setSelection(true);
                }}
              >
                NO
              </Toggle>
            </div>
          </div>
          <Button
            role='button'
            onClick={handleStartWritting}
            className='mt-auto w-max rounded-md bg-doc-primary px-20'
          >
            Start Writting
          </Button>
        </div>
      </div>
    </m.div>
  );
};
export default Start;
