import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MonthDropdown from '@/components/ui/month-dropdown';
import { contributorAnimation } from '@/constant';
import { useCreateCustomCitation, useUpdateCitation } from '@/query/query';
import { IJournalCitation } from '@/types';
import { useCitation } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import { AnimatePresence, m } from 'framer-motion';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const JournalForm = ({
  type,
  data,
}: {
  type?: 'edit' | 'create';
  data?: IJournalCitation;
}) => {
  const { id } = useParams();
  const { mutateAsync: handleCreate } = useCreateCustomCitation();
  const { mutateAsync: handleUpdate } = useUpdateCitation();
  const t = useTranslations('Editor');

  const { register, handleSubmit, control, setValue, getValues } =
    useForm<IJournalCitation>({
      defaultValues: !data
        ? {
            journal_title: '',
            article_title: '',
            advanced_info: { volume: '', series: '', issue: '' },
            publish_date: { day: '', month: '', year: '' },
            doi: '',
            contributors: [
              {
                first_name: '',
                middle_name: '',
                last_name: '',
                role: 'author',
                suffix: '',
              },
            ],
          }
        : {
            contributors: data.contributors,
            journal_title: data.journal_title,
            article_title: data.article_title,
            advanced_info: data.advanced_info,
            publish_date: data.publish_date,
            doi: data.doi,
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

  const memoSetMonth = useCallback((value: string) => {
    setValue('publish_date.month', value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: IJournalCitation) => {
    if (type === 'edit') {
      if (!data) return;
      await handleUpdate({
        citation_type: 'Journal',
        data: {
          ...data,
          contributors: values.contributors,
          journal_title: values.journal_title,
          article_title: values.article_title,
          advanced_info: values.advanced_info,
          publish_date: values.publish_date,
          doi: values.doi,
        },
        id: data.id,
      });
      updateShowEditCitation(false);
    } else {
      await handleCreate({
        document_id: id as string,
        citation_type: 'Journal',
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
      <h1 className='base-semibold'>{t('CustomCitation.What_I_am_citing')}</h1>
      <Spacer y='16' />
      <label className='small-regular text-neutral-400' htmlFor='article_title'>
        {t('CustomCitation.Article_Title')}
      </label>
      <Input
        type='text'
        id='article_title'
        className='focus-visible:ring-0'
        {...register('article_title')}
      />
      <Spacer y='20' />
      <h1 className='base-semibold'>
        {t('CustomCitation.JournalMenu.Contributors')}
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
                  {t('CustomCitation.JournalMenu.First_Name')}
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
                  {t('CustomCitation.JournalMenu.Middle_Name')}
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
                  {t('CustomCitation.JournalMenu.Last_Name')}
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
          {t('CustomCitation.JournalMenu.Add_Contributor')}
        </p>
      </Button>
      <Spacer y='20' />
      <h1 className='base-semibold'>
        {t('CustomCitation.JournalMenu.Journal_publication_info')}
      </h1>
      <Spacer y='16' />
      <label className='small-regular text-neutral-400' htmlFor='journal_title'>
        {t('CustomCitation.JournalMenu.Journal_title')}
      </label>
      <Input
        type='text'
        id='journal_title'
        className='focus-visible:ring-0'
        {...register('journal_title')}
      />
      <Spacer y='16' />
      <h2 className='small-regular text-neutral-400'>
        {t('CustomCitation.JournalMenu.Advanced_info')}
      </h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            id='advanced_info.volum'
            placeholder={t('CustomCitation.JournalMenu.Volume')}
            className='focus-visible:ring-0'
            {...register('advanced_info.volume')}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='advanced_info.issue'
            placeholder={t('CustomCitation.JournalMenu.Issue')}
            type='text'
            className='focus-visible:ring-0'
            {...register('advanced_info.issue')}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='advanced_info.series'
            type='Series'
            placeholder={t('CustomCitation.JournalMenu.Year')}
            className='focus-visible:ring-0'
            {...register('advanced_info.series')}
          />
        </div>
      </div>
      <Spacer y='16' />
      <h2 className='small-regular text-neutral-400'>
        {t('CustomCitation.JournalMenu.Date_published')}
      </h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            id='publish_date.day'
            placeholder={t('CustomCitation.JournalMenu.Day')}
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
            placeholder={t('CustomCitation.JournalMenu.Year')}
            className='focus-visible:ring-0'
            {...register('publish_date.year')}
          />
        </div>
      </div>
      <Spacer y='16' />
      <h2 className='small-regular text-neutral-400'>
        {t('CustomCitation.JournalMenu.Pages')}
      </h2>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          <Input
            type='text'
            id='page_info.start'
            placeholder={t('CustomCitation.JournalMenu.Start')}
            className='focus-visible:ring-0'
            {...register('page_info.start')}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='page_info.end'
            placeholder={t('CustomCitation.JournalMenu.End')}
            type='text'
            className='focus-visible:ring-0'
            {...register('page_info.end')}
          />
        </div>
      </div>
      <Spacer y='16' />
      <label className='small-regular text-neutral-400' htmlFor='doi'>
        {t('CustomCitation.JournalMenu.DOI')}
      </label>
      <Input
        type='text'
        id='doi'
        className='focus-visible:ring-0'
        {...register('doi')}
      />
      <Spacer y='120' />
      <div className='absolute bottom-0 flex w-full justify-end gap-x-2 border-t border-gray-200 bg-white py-1.5'>
        <Button
          className='size-max rounded px-4 py-1'
          variant={'outline'}
          type='button'
          onClick={handleCancel}
        >
          {t('CustomCitation.Cancel')}
        </Button>
        <Button type='submit' className='size-max rounded px-4 py-1'>
          {t('CustomCitation..Save')}
        </Button>
      </div>
    </form>
  );
};
export default JournalForm;
