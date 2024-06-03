import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contributorAnimation } from '@/constant';
import { useCreateCustomCitation, useUpdateCitation } from '@/query/query';
import { IBookCitation } from '@/types';
import { useCitation } from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const WholeBook = ({
  type,
  data,
}: {
  type?: 'edit' | 'create';
  data?: IBookCitation;
}) => {
  const { id } = useParams();
  const trans = useTranslations('Editor');
  const { mutateAsync: handleCreate } = useCreateCustomCitation();
  const { mutateAsync: handleUpdate } = useUpdateCitation();

  const { register, handleSubmit, control } = useForm<IBookCitation>({
    defaultValues: !data
      ? {
          book_title: '',
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
          advanced_info: data.advanced_info,
          publication_info: data.publication_info,
          book_title: data.book_title,
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

  const onSubmit = async (values: IBookCitation) => {
    if (type === 'edit') {
      if (!data) return;
      await handleUpdate({
        citation_type: 'WholeBook',
        data: {
          ...data,
          contributors: values.contributors,
          advanced_info: values.advanced_info,
          publication_info: values.publication_info,
          book_title: values.book_title,
        },
        id: data.id,
      });
      updateShowEditCitation(false);
    } else {
      await handleCreate({
        document_id: id as string,
        citation_type: 'WholeBook',
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

  const handleCancel = () => {
    if (type === 'edit') {
      updateShowEditCitation(false);
    } else {
      updateShowCreateCitation(false);
    }
  };

  const removeContributor = (index: number) => {
    remove(index);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='h-full'>
      <Spacer y='20' />
      <h1 className='base-semibold'>{trans("CustomCitation.BookMenu.Contributors")}</h1>
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
                <label
                  className='small-regular text-neutral-400'
                  htmlFor={`contributors.${index}.first_name`}
                >
                  {trans("CustomCitation.BookMenu.First_Name")}
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
                  className='small-regular text-neutral-400'
                  htmlFor={`contributors.${index}.middle_name`}
                >
                  {trans("CustomCitation.BookMenu.Middle_Name")}
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
                  className='small-regular text-neutral-400'
                  htmlFor={`contributors.${index}.last_name`}
                >
                  {trans("CustomCitation.BookMenu.Last_Name")}
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
        <PlusCircle className='fill-violet-500 text-white' size={22} />
        <p className='text-violet-500'>
          {trans("CustomCitation.BookMenu.Add_Contributor")}
        </p>
      </Button>
      <Spacer y='20' />
      <h1 className='base-semibold'>
        {trans("CustomCitation.BookMenu.In_print_publication_info")}
      </h1>
      <Spacer y='16' />
      <label className='small-regular text-neutral-400' htmlFor='Source title'>
        {trans("CustomCitation.BookMenu.Source_title")}
      </label>
      <Input
        type='text'
        id='Source title'
        className='focus-visible:ring-0'
        {...register('book_title')}
        aria-label='book_title'
      />
      <Spacer y='16' />
      <h2 className='small-regular text-neutral-400'>
        {trans("CustomCitation.BookMenu.Advanced_info")}
      </h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            className='focus-visible:ring-0'
            placeholder={trans("CustomCitation.BookMenu.Volume")}
            {...register('advanced_info.vol')}
            aria-label='advanced_info.vol'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            className='focus-visible:ring-0'
            placeholder={trans("CustomCitation.BookMenu.Total_vols")}
            {...register('advanced_info.total_vol')}
            aria-label='advanced_info.total_vol'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder={trans("CustomCitation.BookMenu.Edition")}
            className='focus-visible:ring-0'
            {...register('advanced_info.edition')}
            aria-label='advanced_info.edition'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder={trans("CustomCitation.BookMenu.Series")}
            className='focus-visible:ring-0'
            {...register('advanced_info.series')}
            aria-label='advanced_info.series'
          />
        </div>
      </div>
      <Spacer y='16' />
      <h2 className='small-regular text-neutral-400'>
        {trans("CustomCitation.BookMenu.Publication_info")}
      </h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder={trans("CustomCitation.BookMenu.Publisher")}
            className='focus-visible:ring-0'
            {...register('publication_info.publisher')}
            aria-label='publication_info.publisher'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder={trans("CustomCitation.BookMenu.City")}
            className='focus-visible:ring-0'
            {...register('publication_info.city')}
            aria-label='publication_info.city'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder={trans("CustomCitation.BookMenu.State")}
            className='focus-visible:ring-0'
            {...register('publication_info.state')}
            aria-label='publication_info.state'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder={trans("CustomCitation.BookMenu.Year")}
            className='focus-visible:ring-0'
            {...register('publication_info.publish_year')}
            aria-label='publication_info.publish_year'
          />
        </div>
      </div>
      <Spacer y='120' />
      <div className='absolute bottom-0 flex w-full justify-end gap-x-2 border-t border-gray-200 bg-white py-1.5'>
        <Button
          className='size-max rounded px-4 py-1'
          variant={'outline'}
          role='button'
          type='button'
          onClick={handleCancel}
        >
          {trans("CustomCitation.Cancel")}
        </Button>
        <Button type='submit' className='size-max rounded px-4 py-1'>
          {trans("CustomCitation.Save")}
        </Button>
      </div>
    </form>
  );
};
export default memo(WholeBook);
