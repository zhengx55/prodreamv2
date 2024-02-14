import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MonthDropdown from '@/components/ui/month-dropdown';
import { contributorAnimation } from '@/constant';
import { useCreateCitation } from '@/query/query';
import { IJournalCitation } from '@/types';
import useAiEditor from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const JournalForm = () => {
  const { id } = useParams();
  const { mutateAsync: handleCreate } = useCreateCitation();
  const { register, handleSubmit, control, setValue, getValues } =
    useForm<IJournalCitation>({
      defaultValues: {
        contributors: [
          {
            first_name: '',
            middle_name: '',
            last_name: '',
            role: 'author',
            suffix: '',
          },
        ],
      },
    });
  const updateShowCreateCitation = useAiEditor(
    (state) => state.updateShowCreateCitation
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contributors',
  });

  const memoSetMonth = useCallback((value: string) => {
    setValue('publish_date.month', value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: IJournalCitation) => {
    await handleCreate({
      document_id: id as string,
      citation_type: 'Journal',
      citation_data: data,
    });
    updateShowCreateCitation(false);
  };

  const appendContributor = () => {
    append({
      first_name: '',
      middle_name: '',
      last_name: '',
      role: '',
      suffix: '',
    });
  };

  const removeContributor = (index: number) => {
    remove(index);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='h-full'>
      <Spacer y='20' />
      <h1 className='base-semibold'>What I&apos;m citing</h1>
      <Spacer y='16' />
      <label htmlFor='article_title'>Article Title</label>
      <Input
        type='text'
        id='article_title'
        className='focus-visible:ring-0'
        {...register('article_title')}
      />
      <Spacer y='30' />
      <h1 className='base-semibold'>Contributors</h1>
      <AnimatePresence initial={false}>
        <div className='flex flex-col gap-y-2 '>
          {fields.map((contributor, index) => (
            <m.div
              key={contributor.id}
              className='flex items-center gap-x-2 first:mt-4'
              initial='initial'
              animate='animate'
              exit='exit'
              variants={contributorAnimation}
            >
              <div className='flex flex-col'>
                <label htmlFor={`contributors.${index}.first_name`}>
                  First Name
                </label>
                <Input
                  id={`contributors.${index}.first_name`}
                  type='text'
                  className='focus-visible:ring-0'
                  {...register(`contributors.${index}.first_name`)}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor={`contributors.${index}.middle_name`}>
                  MI/ Middle
                </label>
                <Input
                  id={`contributors.${index}.middle_name`}
                  type='text'
                  className='focus-visible:ring-0'
                  {...register(`contributors.${index}.middle_name`)}
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor={`contributors.${index}.last_name`}>
                  Last Name
                </label>
                <Input
                  id={`contributors.${index}.last_name`}
                  type='text'
                  className='focus-visible:ring-0'
                  {...register(`contributors.${index}.last_name`)}
                />
              </div>
              <Button
                type='button'
                className='self-end bg-shadow-border px-2 hover:bg-red-400'
                onClick={() => removeContributor(index)}
              >
                <Trash2 size={16} />
              </Button>
            </m.div>
          ))}
        </div>
      </AnimatePresence>
      <Spacer y='10' />
      <Button
        variant={'ghost'}
        className='gap-x-1 px-0'
        type='button'
        onClick={appendContributor}
      >
        <PlusCircle className='fill-doc-primary text-white' size={22} />
        <p className='text-doc-primary'> Add Contributor</p>
      </Button>
      <Spacer y='30' />
      <h1 className='base-semibold'>Journal publication info</h1>
      <Spacer y='16' />
      <label htmlFor='journal_title'>Journal title</label>
      <Input
        type='text'
        id='journal_title'
        className='focus-visible:ring-0'
        {...register('journal_title')}
      />
      <Spacer y='16' />
      <h2>Advanced info</h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            id='advanced_info.volum'
            placeholder='Volume'
            className='focus-visible:ring-0'
            {...register('advanced_info.volume')}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='advanced_info.issue'
            placeholder='Issue'
            type='text'
            className='focus-visible:ring-0'
            {...register('advanced_info.issue')}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='advanced_info.series'
            type='Series'
            placeholder='Year'
            className='focus-visible:ring-0'
            {...register('advanced_info.series')}
          />
        </div>
      </div>
      <Spacer y='16' />
      <h2>Date published</h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            id='publish_date.day'
            placeholder='Day'
            className='focus-visible:ring-0'
            {...register('publish_date.day')}
          />
        </div>
        <div className='flex flex-col'>
          <MonthDropdown
            setValue={memoSetMonth}
            value={getValues('publish_date.month')!}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='publish_date.year'
            type='text'
            placeholder='Year'
            className='focus-visible:ring-0'
            {...register('publish_date.year')}
          />
        </div>
      </div>
      <Spacer y='16' />
      <h2>Pages</h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            id='page_info.start'
            placeholder='Start'
            className='focus-visible:ring-0'
            {...register('page_info.start')}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='page_info.end'
            placeholder='End'
            type='text'
            className='focus-visible:ring-0'
            {...register('page_info.end')}
          />
        </div>
      </div>
      <Spacer y='16' />
      <label htmlFor='doi'>DOI</label>
      <Input
        type='text'
        id='doi'
        className='focus-visible:ring-0'
        {...register('doi')}
      />
      <Spacer y='120' />
      <div className='absolute bottom-0 flex w-full justify-end gap-x-2 border-t border-shadow-border bg-white py-1.5'>
        <Button
          className='h-max rounded border border-doc-primary text-doc-primary'
          variant={'ghost'}
          type='button'
          onClick={() => {
            updateShowCreateCitation(false);
          }}
        >
          Cancel
        </Button>
        <Button className='rounded bg-doc-primary'>Save</Button>
      </div>
    </form>
  );
};
export default JournalForm;
