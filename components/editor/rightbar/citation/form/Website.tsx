import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contributorAnimation } from '@/constant';
import { IWebsiteCitation } from '@/types';
import useAiEditor from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';

type Props = {};

const WebsiteForm = (props: Props) => {
  const { register, handleSubmit, control } = useForm<IWebsiteCitation>();
  const updateShowCreateCitation = useAiEditor(
    (state) => state.updateShowCreateCitation
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contributors',
  });

  const onSubmit = (data: IWebsiteCitation) => {
    console.log(data);
  };

  const appendContributor = () => {
    append({});
  };

  const removeContributor = (index: number) => {
    remove(index);
  };

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
      <Spacer y='16' />
      <AnimatePresence>
        <div className='flex flex-col gap-y-2'>
          {fields.map((contributor, index) => (
            <m.div
              key={contributor.id}
              className='flex items-center gap-x-2'
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
      <button type='button' onClick={appendContributor}>
        Add Contributor
      </button>
      <Spacer y='48' />
      <h1 className='base-semibold'>Online publication info</h1>
      <Spacer y='16' />
      <label htmlFor='document_id'>Document ID</label>
      <Input
        type='text'
        id='document_id'
        className='focus-visible:ring-0'
        {...register('document_id')}
      />
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
      <h2>Date accessed</h2>
      <Spacer y='16' />
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <label htmlFor='access_date.day'>Day</label>
          <Input
            type='text'
            id='access_date.day'
            className='focus-visible:ring-0'
            {...register('access_date.day')}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='access_date.month'>Month</label>
          <Input
            id='access_date.month'
            type='text'
            className='focus-visible:ring-0'
            {...register('access_date.month')}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='access_date.year'>Year</label>
          <Input
            id='access_date.year'
            type='text'
            className='focus-visible:ring-0'
            {...register('access_date.year')}
          />
        </div>
      </div>
      <Spacer y='48' />
      <h1 className='base-semibold'>More options</h1>
      <Spacer y='16' />
      <div className='flex w-full justify-end gap-x-2 border-t border-shadow-border py-2'>
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
        <Button className='rounded bg-doc-primary'>Save</Button>
      </div>
    </form>
  );
};

export default WebsiteForm;
