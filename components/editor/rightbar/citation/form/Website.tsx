import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MonthDropdown from '@/components/ui/month-dropdown';
import { contributorAnimation } from '@/constant';
import {
  useCreateCustomCitation,
  useUpdateCitation,
} from '@/query/citation/query';
import { IWebsiteCitation } from '@/types';
import { useCitation } from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const WebsiteForm = ({
  type,
  data,
}: {
  type?: 'edit' | 'create';
  data?: IWebsiteCitation;
}) => {
  const { id } = useParams();
  const tEditor = useTranslations('Editor');

  const { register, handleSubmit, control, setValue, getValues } =
    useForm<IWebsiteCitation>({
      defaultValues: !data
        ? {
            website_title: '',
            article_title: '',
            access_date: { day: '', month: '', year: '' },
            publisher: '',
            url: '',
            contributors: [
              {
                first_name: '',
                middle_name: '',
                last_name: '',
              },
            ],
          }
        : {
            contributors: data.contributors,
            website_title: data.website_title,
            article_title: data.article_title,
            publisher: data.publisher,
            access_date: data.access_date,
            url: data.url,
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

  const memoSetMonth = useCallback((value: string) => {
    setValue('access_date.month', value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: IWebsiteCitation) => {
    if (type === 'edit') {
      if (!data) return;
      await handleUpdate({
        citation_type: 'Journal',
        data: {
          ...data,
          contributors: values.contributors,
          website_title: values.website_title,
          article_title: values.article_title,
          publisher: values.publisher,
          access_date: values.access_date,
          url: values.url,
        },
        id: data.id,
      });
      updateShowEditCitation(false);
    } else {
      await handleCreate({
        document_id: id as string,
        citation_type: 'Website',
        citation_data: values,
      });
      updateShowCreateCitation(false);
    }
  };

  const handleCancel = () => {
    if (type === 'edit') {
      updateShowEditCitation(false);
    } else {
      updateShowCreateCitation(false);
    }
  };

  const appendContributor = () => {
    append({
      first_name: '',
      last_name: '',
      middle_name: '',
      suffix: '',
      role: '',
    });
  };

  const removeContributor = (index: number) => {
    remove(index);
  };
  const { mutateAsync: handleCreate } = useCreateCustomCitation();
  const { mutateAsync: handleUpdate } = useUpdateCitation();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='h-full'>
      <Spacer y='20' />
      <h1 className='base-semibold'>
        {tEditor('CustomCitation.What_I_am_citing')}
      </h1>
      <Spacer y='16' />
      <label
        className='small-regular text-neutral-4000'
        htmlFor='article_title'
      >
        {tEditor('CustomCitation.Article_Title')}
      </label>
      <Input
        type='text'
        id='article_title'
        className='focus-visible:ring-0'
        {...register('article_title')}
      />
      <Spacer y='20' />
      <h1 className='base-semibold'>
        {tEditor('CustomCitation.WebsiteMenu.Contributors')}
      </h1>
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
                  {tEditor('CustomCitation.WebsiteMenu.First_Name')}
                </label>
                <Input
                  id={`contributors.${index}.first_name`}
                  type='text'
                  className='focus-visible:ring-0'
                  {...register(`contributors.${index}.first_name`)}
                />
              </div>
              <div className='flex flex-col'>
                <label
                  className='small-regular text-neutral-400'
                  htmlFor={`contributors.${index}.middle_name`}
                >
                  {tEditor('CustomCitation.WebsiteMenu.Middle_Name')}
                </label>
                <Input
                  id={`contributors.${index}.middle_name`}
                  type='text'
                  className='focus-visible:ring-0'
                  {...register(`contributors.${index}.middle_name`)}
                />
              </div>
              <div className='flex flex-col'>
                <label
                  className='small-regular text-neutral-400'
                  htmlFor={`contributors.${index}.last_name`}
                >
                  {tEditor('CustomCitation.WebsiteMenu.Last_Name')}
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
        <PlusCircle className='fill-violet-500 text-white' size={22} />
        <p className='text-violet-500'>
          {tEditor('CustomCitation.WebsiteMenu.Add_Contributor')}
        </p>
      </Button>
      <Spacer y='20' />
      <h1 className='base-semibold'>
        {tEditor('CustomCitation.WebsiteMenu.Online_publication_info')}
      </h1>
      <Spacer y='16' />
      <label className='small-regular text-neutral-400' htmlFor='publisher'>
        {tEditor('CustomCitation.WebsiteMenu.Publisher')}
      </label>
      <Input
        type='text'
        id='publisher'
        className='focus-visible:ring-0'
        {...register('publisher')}
      />
      <Spacer y='16' />
      <label className='small-regular text-neutral-400' htmlFor='website_title'>
        {tEditor('CustomCitation.WebsiteMenu.Website_Title')}
      </label>
      <Input
        type='text'
        id='website_title'
        className='focus-visible:ring-0'
        {...register('website_title')}
      />
      <Spacer y='16' />
      <label className='small-regular text-neutral-400' htmlFor='url'>
        {tEditor('CustomCitation.WebsiteMenu.Website_URL')}
      </label>
      <Input
        type='text'
        id='url'
        className='focus-visible:ring-0'
        {...register('url')}
      />
      <Spacer y='16' />
      <h2 className='small-regular text-neutral-400'>
        {tEditor('CustomCitation.WebsiteMenu.Date_accessed')}
      </h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            id='access_date.day'
            placeholder={tEditor('CustomCitation.WebsiteMenu.Day')}
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
            placeholder={tEditor('CustomCitation.WebsiteMenu.Year')}
            className='focus-visible:ring-0'
            {...register('access_date.year')}
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

export default WebsiteForm;
