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
import { useCreateCitation, useUpdateCitation } from '@/query/query';
import { IIntroductionCitation } from '@/types';
import { useCitation } from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
const IntroductionForm = ({
  type,
  data,
}: {
  type?: 'edit' | 'create';
  data?: IIntroductionCitation;
}) => {
  const { id } = useParams();
  const { mutateAsync: handleCreate } = useCreateCitation();
  const { mutateAsync: handleUpdate } = useUpdateCitation();

  const { register, handleSubmit, control, setValue } =
    useForm<IIntroductionCitation>({
      defaultValues: !data
        ? {
            special_section_type: 'introduction',
            book_title: '',
            section_title: '',
            contributors: [
              {
                first_name: '',
                middle_name: '',
                last_name: '',
                role: 'author',
              },
            ],
          }
        : {
            contributors: data.contributors,
            section_title: data.section_title,
            page_info: data.page_info,
            advanced_info: data.advanced_info,
            publication_info: data.publication_info,
            book_title: data.book_title,
            special_section_type: data.special_section_type,
          },
    });
  const updateShowCreateCitation = useCitation(
    (state) => state.updateShowCreateCitation
  );
  const updateShowEditCitation = useCitation(
    (state) => state.updateShowEditCitation
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contributors',
  });

  const handleCancel = () => {
    if (type === 'edit') {
      updateShowEditCitation(false);
    } else {
      updateShowCreateCitation(false);
    }
  };

  const onSubmit = async (values: IIntroductionCitation) => {
    if (type === 'edit') {
      if (!data) return;
      await handleUpdate({
        citation_type: 'Journal',
        data: {
          ...data,
          contributors: values.contributors,
          section_title: values.section_title,
          page_info: values.page_info,
          advanced_info: values.advanced_info,
          publication_info: values.publication_info,
          book_title: values.book_title,
          special_section_type: values.special_section_type,
        },
        id: data.id,
      });
      updateShowEditCitation(false);
    } else {
      await handleCreate({
        document_id: id as string,
        citation_type: 'BookSpecialSection',
        citation_data: values,
      });
      updateShowCreateCitation(false);
    }
  };

  const appendContributor = () => {
    append({
      first_name: '',
      middle_name: '',
      last_name: '',
      role: 'author',
      suffix: '',
    });
  };
  const removeContributor = (index: number) => {
    remove(index);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='h-full'>
      <h1 className='base-semibold'>What I&apos;m citing</h1>
      <Spacer y='16' />
      <label className='small-regular text-doc-font' htmlFor='section_title'>
        Introduction title
      </label>
      <Input
        type='text'
        id='section_title'
        className='focus-visible:ring-0'
        {...register('section_title')}
        aria-label='section_title'
      />
      <Spacer y='16' />
      <h2 className='small-regular text-doc-font'>Type</h2>
      <Select
        onValueChange={(value: string) => {
          setValue('special_section_type', value);
        }}
        defaultValue='introduction'
      >
        <SelectTrigger>
          <SelectValue className='rounded border border-gray-200 text-doc-shadow outline-none' />
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
      <Spacer y='20' />
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
                <label
                  className='small-regular text-doc-font'
                  htmlFor={`contributors.${index}.first_name`}
                >
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
                <label
                  className='small-regular text-doc-font'
                  htmlFor={`contributors.${index}.middle_name`}
                >
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
                <label
                  className='small-regular text-doc-font'
                  htmlFor={`contributors.${index}.last_name`}
                >
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
      <Spacer y='20' />
      <h1 className='base-semibold'>In print publication info</h1>
      <Spacer y='16' />
      <label className='small-regular text-doc-font' htmlFor='journal_title'>
        Source title
      </label>
      <Input
        type='text'
        id='journal_title'
        className='focus-visible:ring-0'
        {...register('book_title')}
        aria-label='journal_title'
      />
      <Spacer y='16' />
      <h2 className='small-regular text-doc-font'>Advanced info</h2>
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
      <h2 className='small-regular text-doc-font'>Publication info</h2>
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
      <h2 className='small-regular text-doc-font'>Pages</h2>
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
      <Spacer y='120' />
      <div className='absolute bottom-0 flex w-full justify-end gap-x-2 border-t border-gray-200 bg-white py-1.5'>
        <Button
          className='h-max rounded border border-doc-primary text-doc-primary'
          variant={'ghost'}
          type='button'
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button role='form' type='submit' className='rounded bg-doc-primary'>
          Save
        </Button>
      </div>
    </form>
  );
};
export default IntroductionForm;
