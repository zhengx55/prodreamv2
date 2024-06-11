import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { TabsContent } from '@/components/ui/tabs';
import { useCitation } from '@/zustand/store';
import { useMemo, useRef, useState } from 'react';

const EditIntext = () => {
  const transError = useTranslations('Error');
  const transCustomCitation = useTranslations('CustomCitation');
  const transEditor = useTranslations('Editor');

  const updateShowEditCitation = useCitation(
    (state) => state.updateShowEditCitation
  );
  const currentInline = useCitation((state) => state.currentInline);
  const [pageCheck, setPageCheck] = useState(
    currentInline?.node.attrs.show_page
  );
  const [yearCheck, setYearCheck] = useState(
    currentInline?.node.attrs.show_year
  );
  const [authorCheck, setAuthorCeck] = useState(
    currentInline?.node.attrs.show_author
  );
  const pageRef = useRef<HTMLInputElement>(null);
  const inTextCitation = useCitation((state) => state.inTextCitation);
  const current_citation = useMemo(() => {
    const foundCitation = inTextCitation.find(
      (item) => item.data.id === currentInline?.node.attrs.citation_id
    );
    return foundCitation ? foundCitation.data : null;
  }, [inTextCitation, currentInline]);

  const handleSave = async () => {
    currentInline?.updateAttributes({
      show_author: authorCheck,
    });

    currentInline?.updateAttributes({
      show_year: yearCheck,
    });

    if (pageCheck) {
      if (!pageRef.current?.value) {
        const { toast } = await import('sonner');
        const toastInfo = transError('Please_enter_a_page_number');
        return toast.error(toastInfo);
      }
      currentInline?.updateAttributes({
        show_page: true,
        page_number: pageRef.current?.value,
      });
    } else {
      currentInline?.updateAttributes({
        show_page: false,
        page_number: '',
      });
    }
    updateShowEditCitation(false);
  };
  const contributors = current_citation?.contributors;
  const contributorsLength = contributors?.length;

  const renderContributors = () => {
    if (!contributors)
      return <span>{transEditor('EditIntext.No_authors_founded')}</span>;
    if (contributorsLength === 2) {
      return (
        <span>
          {contributors[0]?.last_name}&nbsp;,&nbsp;{contributors[1]?.last_name},
        </span>
      );
    } else if (contributorsLength === 1) {
      return <span>{contributors[0]?.last_name},</span>;
    } else if (contributorsLength && contributorsLength > 2) {
      return <span>{contributors[0]?.last_name} et al.,</span>;
    } else {
      return null;
    }
  };

  const title =
    current_citation?.article_title || current_citation?.book_title || '';
  return (
    <TabsContent value='in-text'>
      <div className='flex flex-col rounded border border-gray-200 p-4'>
        <h1 className='font-medium'>{title}</h1>
        <Spacer y='10' />
        <ul className='flex flex-col gap-y-3'>
          <li className='inline-flex items-center gap-x-2'>
            <Checkbox
              checked={authorCheck}
              onCheckedChange={(e: boolean) => setAuthorCeck(e)}
              className='h-4 w-4 rounded-full border-violet-500'
              id='autors'
            />
            <label className='subtle-regular text-neutral-400' htmlFor='autors'>
              {transEditor('EditIntext.Authors')}
            </label>
            <span className='subtle-regular flex-center rounded bg-violet-500/20 px-2 py-0.5 text-violet-500'>
              {renderContributors()}
            </span>
          </li>
          <li className='inline-flex items-center gap-x-2'>
            <Checkbox
              checked={yearCheck}
              onCheckedChange={(e: boolean) => setYearCheck(e)}
              className='h-4 w-4 rounded-full border-violet-500'
              id='year'
            />
            <label className='subtle-regular text-neutral-400' htmlFor='year'>
              {transEditor('EditIntext.Year')}
            </label>
            <span className='subtle-regular flex-center rounded bg-violet-500/20 px-2 py-0.5 text-violet-500'>
              {current_citation?.publish_date?.year}
            </span>
          </li>

          <li className='inline-flex items-center gap-x-2'>
            <Checkbox
              checked={pageCheck}
              onCheckedChange={(e: boolean) => setPageCheck(e)}
              className='h-4 w-4 rounded-full border-violet-500'
              id='pages'
            />
            <label className='subtle-regular text-neutral-400' htmlFor='pages'>
              {transEditor('EditIntext.Page_number')}
            </label>
            <Input
              ref={pageRef}
              defaultValue={currentInline?.node.attrs.page_number}
              className={`${pageCheck ? 'bg-violet-500/20 text-violet-500' : 'bg-[#F1F2FA] text-neutral-400'} subtle-regular h-max w-40 rounded px-2 py-1 placeholder:text-neutral-400/20 placeholder:line-through`}
              placeholder='(e.g. 35 or 35-37)'
              type='text'
              id='pages'
            />
          </li>
        </ul>
      </div>
      <div className='absolute bottom-0 flex w-full justify-end gap-x-2 border-t border-gray-200 bg-white py-1.5'>
        <Button
          className='size-max rounded px-4 py-1'
          variant={'outline'}
          type='button'
          onClick={() => {
            updateShowEditCitation(false);
          }}
        >
          {transCustomCitation('Cancel')}
        </Button>
        <Button
          onClick={handleSave}
          type='button'
          role='button'
          className='h-max rounded'
        >
          {transCustomCitation('Save')}
        </Button>
      </div>
    </TabsContent>
  );
};
export default EditIntext;
