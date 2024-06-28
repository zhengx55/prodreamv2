import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { saveDoc } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useRef } from 'react';

type Props = { handleClose: () => Promise<void> };
const Edit = ({ handleClose }: Props) => {
  const { id } = useParams();
  const transEditor = useTranslations('Editor');
  const introduction = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync: start } = useMutation({
    mutationFn: (params: {
      id: string;
      use_intention: string;
      brief_description: string;
    }) => saveDoc(params),
    onSuccess: async () => {
      await handleClose();
    },
  });

  const handleStart = async () => {
    await start({
      id: id as string,
      use_intention: 'editing',
      brief_description: introduction.current?.value ?? '',
    });
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
          {transEditor('TitleEditModal.And_one_more_thing')}
          <br />
          <span className='font-[300] text-violet-500'>
            {transEditor('TitleEditModal.What_are_you_looking_for_today')}
          </span>
        </h1>
        <Button
          className='h-max w-max rounded border border-violet-500 px-10 py-1 text-violet-500'
          variant={'ghost'}
          role='button'
          onClick={handleClose}
        >
          {transEditor('TitleEditModal.Skip')}
        </Button>
      </div>
      <div className='flex-between gap-x-8'>
        <div className='flex h-[380px] w-1/3 cursor-pointer flex-col items-center justify-evenly rounded-2xl border border-gray-200 py-4 hover:bg-[#F8F9FC]'>
          <p className='title-semibold text-zinc-600'>
            {transEditor('TitleEditModal.Edit_essays')}
          </p>
          <div className='relative h-[250px] w-[90%] overflow-hidden'>
            <Image
              alt='start'
              src='/welcome/Edit.png'
              fill
              priority
              sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
            />
          </div>
        </div>
        <div className='flex h-full w-2/3 flex-col'>
          <p className='title-medium'>
            {transEditor('TitleEditModal.Brief_description_of_study')}
          </p>
          <Spacer y='10' />
          <Textarea
            id='idea'
            ref={introduction}
            className='small-regular'
            placeholder={transEditor(
              'TitleEditModal.Describe_your_research_briefly'
            )}
          />

          <Button
            role='button'
            onClick={handleStart}
            className='mt-auto w-max rounded-md bg-violet-500 px-20'
          >
            {transEditor('TitleEditModal.Start_Writing')}
          </Button>
        </div>
      </div>
    </m.div>
  );
};
export default Edit;
