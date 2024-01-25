import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { contributorAnimation } from '@/constant';
import { useCreateCitation } from '@/query/query';
import { IIntroductionCitation } from '@/types';
import useAiEditor from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
const IntroductionForm = () => {
  const { id } = useParams();
  const { mutateAsync: handleCreate } = useCreateCitation();
  const { register, handleSubmit, control, setValue } =
    useForm<IIntroductionCitation>({
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
  const onSubmit = async (data: IIntroductionCitation) => {
    await handleCreate({
      document_id: id as string,
      citation_type: 'booke_special_section',
      citation_data: data,
    });
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
      <label htmlFor='section_title'>Introduction title</label>
      <Input
        type='text'
        id='section_title'
        className='focus-visible:ring-0'
        {...register('section_title')}
        aria-label='section_title'
      />
      <Spacer y='16' />
      <h2>Type</h2>
      <Select
        onValueChange={(value: string) => {
          setValue('special_section_type', value);
        }}
        defaultValue='introduction'
      >
        <SelectTrigger>
          <SelectValue className='rounded border border-shadow-border text-doc-shadow outline-none' />
        </SelectTrigger>
        <SelectContent className='rounded bg-white'>
          <SelectItem
            value='introduction'
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            Introduction
          </SelectItem>
          <SelectItem
            value='foreword'
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            Foreword
          </SelectItem>
          <SelectItem
            value='preface'
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            Preface
          </SelectItem>
          <SelectItem
            value='afterword'
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            Afterword
          </SelectItem>
        </SelectContent>
      </Select>
      <Spacer y='48' />
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
                  aria-label={`contributors.${index}.first_name`}
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
                  aria-label={`contributors.${index}.middle_name`}
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
                  aria-label={`contributors.${index}.last_name`}
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
      <h1 className='base-semibold'>In print publication info</h1>
      <Spacer y='16' />
      <label htmlFor='journal_title'>Source title</label>
      <Input
        type='text'
        id='journal_title'
        className='focus-visible:ring-0'
        {...register('book_title')}
        aria-label='journal_title'
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
            {...register('advanced_info.vol')}
            aria-label='advanced_info.vol'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='advanced_info.issue'
            placeholder='Edition'
            type='text'
            className='focus-visible:ring-0'
            {...register('advanced_info.edition')}
            aria-label='advanced_info.edition'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='advanced_info.series'
            type='Series'
            placeholder='Series'
            className='focus-visible:ring-0'
            {...register('advanced_info.series')}
            aria-label='advanced_info.series'
          />
        </div>
      </div>
      <Spacer y='16' />
      <h2>Publication info</h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder='Publisher'
            className='focus-visible:ring-0'
            {...register('publication_info.publisher')}
            aria-label='publication_info.publisher'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder='City'
            className='focus-visible:ring-0'
            {...register('publication_info.city')}
            aria-label='publication_info.city'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder='State'
            className='focus-visible:ring-0'
            {...register('publication_info.state')}
            aria-label='publication_info.state'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder='Year'
            className='focus-visible:ring-0'
            {...register('publication_info.publish_year')}
            aria-label='publication_info.publish_year'
          />
        </div>
      </div>
      <Spacer y='16' />
      <h2>Pages</h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder='Start'
            className='focus-visible:ring-0'
            {...register('page_info.start')}
            aria-label='page_info.start'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            placeholder='End'
            type='text'
            className='focus-visible:ring-0'
            {...register('page_info.end')}
            aria-label='page_info.end'
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
export default IntroductionForm;
