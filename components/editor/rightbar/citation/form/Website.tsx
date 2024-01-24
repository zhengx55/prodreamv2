import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MonthDropdown from '@/components/ui/month-dropdown';
import { contributorAnimation } from '@/constant';
import { useCreateCitation } from '@/query/query';
import { IWebsiteCitation } from '@/types';
import useAiEditor from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

type Props = {};

const WebsiteForm = (props: Props) => {
  const { id } = useParams();
  const { register, handleSubmit, control, setValue, getValues } =
    useForm<IWebsiteCitation>({
      defaultValues: {
        contributors: [
          {
            first_name: '',
            middle_name: '',
            last_name: '',
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
    setValue('access_date.month', value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: IWebsiteCitation) => {
    await handleCreate({
      document_id: id as string,
      citation_type: 'website',
      citation_data: data,
    });
  };

  const appendContributor = () => {
    append({
      first_name: '',
      last_name: '',
      middle_name: '',
    });
  };

  const removeContributor = (index: number) => {
    remove(index);
  };
  const { mutateAsync: handleCreate } = useCreateCitation();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
      <h1 className='base-semibold'>What I&apos;m citing</h1>
      <Spacer y='16' />
      <label htmlFor='article_title'>Article Title</label>
      <Input
        type='text'
        id='article_title'
        className='focus-visible:ring-0'
        {...register('article_title')}
      />
      <Spacer y='48' />
      <h1 className='base-semibold'>Contributors</h1>
      <AnimatePresence initial={false}>
        <div className='flex flex-col gap-y-2'>
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
      <Spacer y='48' />
      <h1 className='base-semibold'>Online publication info</h1>
      <Spacer y='16' />
      <label htmlFor='publisher'>Publisher</label>
      <Input
        type='text'
        id='publisher'
        className='focus-visible:ring-0'
        {...register('publisher')}
      />
      <Spacer y='16' />
      <label htmlFor='website_title'>Website Title</label>
      <Input
        type='text'
        id='website_title'
        className='focus-visible:ring-0'
        {...register('website_title')}
      />
      <Spacer y='16' />
      <label htmlFor='url'>Website URL</label>
      <Input
        type='text'
        id='url'
        className='focus-visible:ring-0'
        {...register('url')}
      />
      <Spacer y='16' />
      <h2>Date accessed</h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            id='access_date.day'
            placeholder='Day'
            className='focus-visible:ring-0'
            {...register('access_date.day')}
          />
        </div>
        <div className='flex flex-col'>
          <MonthDropdown
            setValue={memoSetMonth}
            value={getValues('access_date.month')!}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='access_date.year'
            type='text'
            placeholder='Year'
            className='focus-visible:ring-0'
            {...register('access_date.year')}
          />
        </div>
      </div>
      <Spacer y='48' />
      <h1 className='base-semibold'>More options</h1>
      <Spacer y='16' />
      <div className='flex w-full justify-end gap-x-2 border-t border-shadow-border py-3'>
        <Button
          className='rounded border border-doc-primary text-doc-primary'
          variant={'ghost'}
          type='button'
          onClick={() => {
            updateShowCreateCitation(false);
          }}
        >
          Cancel
        </Button>
        <Button type='submit' className='rounded bg-doc-primary'>
          Save
        </Button>
      </div>
    </form>
  );
};

export default WebsiteForm;
