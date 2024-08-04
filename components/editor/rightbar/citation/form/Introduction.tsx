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
import {
  useCreateCustomCitation,
  useUpdateCitation,
} from '@/query/citation/query';
import { IIntroductionCitation } from '@/types';
import { useCitation } from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
  const { mutateAsync: handleCreate } = useCreateCustomCitation();
  const { mutateAsync: handleUpdate } = useUpdateCitation();
  const tEditor = useTranslations('Editor');

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
      <h1 className='base-semibold'>
        {tEditor('CustomCitation.What_I_am_citing')}
      </h1>
      <Spacer y='16' />
      <label className='small-regular text-neutral-400' htmlFor='section_title'>
        {tEditor('CustomCitation.IntroductionMenu.Introduction_title')}
      </label>
      <Input
        type='text'
        id='section_title'
        className='focus-visible:ring-0'
        {...register('section_title')}
        aria-label='section_title'
      />
      <Spacer y='16' />
      <h2 className='small-regular text-neutral-4000'>
        {tEditor('CustomCitation.IntroductionMenu.Type')}
      </h2>
      <Select
        onValueChange={(value: string) => {
          setValue('special_section_type', value);
        }}
        defaultValue='introduction'
      >
        <SelectTrigger>
          <SelectValue className='rounded border border-gray-200 text-zinc-600 outline-none' />
        </SelectTrigger>
        <SelectContent className='rounded bg-white'>
          <SelectItem
            value='introduction'
            className='flex cursor-pointer gap-x-2 text-neutral-400 hover:bg-shadow-50'
          >
            {tEditor('CustomCitation.IntroductionMenu.Introduction')}
          </SelectItem>
          <SelectItem
            value='foreword'
            className='flex cursor-pointer gap-x-2 text-neutral-400 hover:bg-shadow-50'
          >
            {tEditor('CustomCitation.IntroductionMenu.Foreword')}
          </SelectItem>
          <SelectItem
            value='preface'
            className='flex cursor-pointer gap-x-2 text-neutral-400 hover:bg-shadow-50'
          >
            {tEditor('CustomCitation.IntroductionMenu.Preface')}
          </SelectItem>
          <SelectItem
            value='afterword'
            className='flex cursor-pointer gap-x-2 text-neutral-400 hover:bg-shadow-50'
          >
            {tEditor('CustomCitation.IntroductionMenu.Afterword')}
          </SelectItem>
        </SelectContent>
      </Select>
      <Spacer y='20' />
      <h1 className='base-semibold'>
        {tEditor('CustomCitation.IntroductionMenu.Contributors')}
      </h1>
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
                  className='small-regular text-neutral-400'
                  htmlFor={`contributors.${index}.first_name`}
                >
                  {tEditor('CustomCitation.IntroductionMenu.First_Name')}
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
                  {tEditor('CustomCitation.IntroductionMenu.Middle_Name')}
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
                  {tEditor('CustomCitation.IntroductionMenu.Last_Name')}
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
                className='self-end bg-gray-300 px-2 hover:bg-red-400'
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
          {tEditor('CustomCitation.IntroductionMenu.Add_Contributor')}
        </p>
      </Button>
      <Spacer y='20' />
      <h1 className='base-semibold'>
        {tEditor('CustomCitation.IntroductionMenu.In_print_publication_info')}
      </h1>
      <Spacer y='16' />
      <label className='small-regular text-neutral-400' htmlFor='journal_title'>
        {tEditor('CustomCitation.IntroductionMenu.Source_title')}
      </label>
      <Input
        type='text'
        id='journal_title'
        className='focus-visible:ring-0'
        {...register('book_title')}
        aria-label='journal_title'
      />
      <Spacer y='16' />
      <h2 className='small-regular text-neutral-400'>
        {tEditor('CustomCitation.IntroductionMenu.Advanced_info')}
      </h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            id='advanced_info.volum'
            placeholder={tEditor('CustomCitation.IntroductionMenu.Volume')}
            className='focus-visible:ring-0'
            {...register('advanced_info.vol')}
            aria-label='advanced_info.vol'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='advanced_info.issue'
            placeholder={tEditor('CustomCitation.IntroductionMenu.Edition')}
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
            placeholder={tEditor('CustomCitation.IntroductionMenu.Series')}
            className='focus-visible:ring-0'
            {...register('advanced_info.series')}
            aria-label='advanced_info.series'
          />
        </div>
      </div>
      <Spacer y='16' />
      <h2 className='small-regular text-neutral-400'>
        {tEditor('CustomCitation.IntroductionMenu.Publication_info')}
      </h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder={tEditor('CustomCitation.IntroductionMenu.Publisher')}
            className='focus-visible:ring-0'
            {...register('publication_info.publisher')}
            aria-label='publication_info.publisher'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder={tEditor('CustomCitation.IntroductionMenu.City')}
            className='focus-visible:ring-0'
            {...register('publication_info.city')}
            aria-label='publication_info.city'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder={tEditor('CustomCitation.IntroductionMenu.State')}
            className='focus-visible:ring-0'
            {...register('publication_info.state')}
            aria-label='publication_info.state'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder={tEditor('CustomCitation.IntroductionMenu.Year')}
            className='focus-visible:ring-0'
            {...register('publication_info.publish_year')}
            aria-label='publication_info.publish_year'
          />
        </div>
      </div>
      <Spacer y='16' />
      <h2 className='small-regular text-neutral-400'>
        {tEditor('CustomCitation.IntroductionMenu.Pages')}
      </h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder={tEditor('CustomCitation.IntroductionMenu.Start')}
            className='focus-visible:ring-0'
            {...register('page_info.start')}
            aria-label='page_info.start'
          />
        </div>
        <div className='flex flex-col'>
          <Input
            placeholder={tEditor('CustomCitation.IntroductionMenu.End')}
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
          className='size-max rounded px-4 py-1'
          variant={'outline'}
          type='button'
          onClick={handleCancel}
        >
          {tEditor('CustomCitation.Cancel')}
        </Button>
        <Button type='submit' className='size-max rounded px-4 py-1'>
          {tEditor('CustomCitation.Save')}
        </Button>
      </div>
    </form>
  );
};
export default IntroductionForm;
