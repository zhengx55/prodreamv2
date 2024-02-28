import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Surface } from '@/components/ui/surface';
import useClickOutside from '@/hooks/useClickOutside';
import useScrollIntoView from '@/hooks/useScrollIntoView';
import { getSelectedText } from '@/lib/tiptap/utils';
import { ConvertCitationData } from '@/lib/utils';
import { searchCitation } from '@/query/api';
import { useCiteToDoc } from '@/query/query';
import { ICitation } from '@/query/type';
import { useAIEditor, useCitation } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { Editor } from '@tiptap/react';
import { ArrowUpRightFromSquare, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo, useEffect, useRef, useState } from 'react';

type Props = { editor: Editor };

const CitationMenu = ({ editor }: Props) => {
  const copilotRect = useAIEditor((state) => state.copilotRect);
  const updateCitationMenu = useAIEditor((state) => state.updateCitationMenu);
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  const updateShowCreateCitation = useCitation(
    (state) => state.updateShowCreateCitation
  );

  const elRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const ref = useScrollIntoView();
  const [text, setText] = useState('');

  useEffect(() => {
    const selectedText = getSelectedText(editor);
    selectedText.trim() && setText(selectedText);
  }, [editor]);

  const { data: ciationResult, isPending } = useQuery({
    queryFn: ({ signal }) => searchCitation(text, signal),
    queryKey: ['search-citation', text],
    enabled: !!text,
  });
  const { mutateAsync: handleCite } = useCiteToDoc();

  const handler = async (item: ICitation) => {
    const converted_data = ConvertCitationData(item);
    await handleCite({
      citation_data: converted_data,
      citation_type: 'Journal',
      document_id: id as string,
    });
  };

  useClickOutside(elRef, () => {
    updateCitationMenu(false);
  });

  if (!copilotRect) return null;
  return (
    <section
      ref={ref}
      style={{ top: `${copilotRect - 54}px` }}
      className='absolute -left-12 flex w-full justify-center overflow-visible '
    >
      <div ref={elRef} className='relative flex flex-col bg-transparent'>
        <Spacer y='5' />
        <Surface
          className='relative flex h-72 w-[600px] flex-col gap-y-2 overflow-y-auto !rounded py-2'
          withBorder
        >
          <div className='flex-between px-2'>
            <p className='base-regular text-doc-shadow'>Search Results</p>
          </div>
          {isPending ? (
            <Loading />
          ) : (
            ciationResult?.map((item, index) => {
              return (
                <div
                  key={item.article_title}
                  className='flex flex-col gap-y-3 bg-shadow-400 p-4'
                >
                  <h1 className='base-semibold'>{item.article_title}</h1>
                  <div className='small-regular flex flex-wrap items-center gap-x-2 text-doc-shadow'>
                    {item.authors.map((author, idx) => (
                      <p key={`${index}-${idx}`}>
                        {author.first_name} {author.middle_name}
                        {author.last_name}
                      </p>
                    ))}
                    <p className='italic'>{item.area ? item.area[0] : ''}</p>
                    <p>{item.publish_date.year ?? ''}</p>
                  </div>
                  <div className='flex flex-col gap-y-2 rounded border border-shadow-border p-3'>
                    <p className='small-regular line-clamp-3'>
                      {item.abstract ?? ''}
                    </p>
                  </div>
                  <div className='flex gap-x-2'>
                    <Button
                      onClick={() => handler(item)}
                      role='button'
                      className='rounded bg-doc-primary'
                    >
                      <Plus size={20} />
                      Add citation
                    </Button>
                    <Button
                      disabled={!Boolean(item.pdf_url)}
                      role='link'
                      className='rounded border-doc-primary text-doc-primary'
                      variant={'secondary'}
                      onClick={() => {
                        if (item.pdf_url) {
                          window.open(item.pdf_url, '_blank');
                        }
                      }}
                    >
                      <ArrowUpRightFromSquare size={20} /> View in new tab
                    </Button>
                  </div>
                </div>
              );
            })
          )}
          <div className='flex-center h-11 w-full gap-x-2'>
            <p className='small-regular'>Not finding what you want?</p>
            <Button
              role='button'
              onClick={() => {
                updateRightbarTab(1);
                updateShowCreateCitation(true);
              }}
              variant={'ghost'}
              className='small-regular gap-x-1 px-0 text-doc-primary hover:underline'
            >
              <Book />
              Add custom citation
            </Button>
          </div>
        </Surface>
      </div>
    </section>
  );
};

export default memo(CitationMenu);
