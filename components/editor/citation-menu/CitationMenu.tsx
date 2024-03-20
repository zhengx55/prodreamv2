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
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { ArrowUpRightFromSquare, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

type Props = { editor: Editor };

const CitationMenu = ({ editor }: Props) => {
  const { floatingMenuPos, updateCitationMenu, updateRightbarTab } =
    useAIEditor((state) => ({ ...state }));
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

  useUnmount(() => {
    editor.chain().unsetHighlight().run();
  });

  useClickOutside(elRef, () => {
    updateCitationMenu(false);
  });

  const { data: ciationResult, isPending } = useQuery({
    queryFn: ({ signal }) => searchCitation(text, signal),
    queryKey: ['search-citation', text],
    enabled: !!text,
  });
  const { mutateAsync: handleCite } = useCiteToDoc();

  const handler = async (item: ICitation) => {
    const converted_data = ConvertCitationData(item, false);
    await handleCite({
      citation_data: converted_data,
      citation_type: 'Journal',
      document_id: id as string,
    });
  };

  if (!floatingMenuPos) return null;
  return (
    <section
      ref={ref}
      style={{ top: `${floatingMenuPos.top - 54}px` }}
      className='absolute -left-12 z-40 flex w-full justify-center overflow-visible '
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
                  key={v4()}
                  className='flex flex-col gap-y-2 bg-shadow-400 p-4'
                >
                  <h1 className='base-semibold'>{item.article_title}</h1>
                  <div className='small-regular flex flex-wrap items-center gap-x-2 text-doc-shadow'>
                    {item.authors?.map((author, idx) => (
                      <p key={`${index}-${idx}`}>
                        {author.first_name} {author.middle_name}
                        {author.last_name}
                      </p>
                    ))}
                    <p className='italic'>{item.area ? item.area[0] : ''}</p>
                    <p>{item.publish_date.year ?? ''}</p>
                  </div>
                  <div className='flex flex-col gap-y-2 rounded border border-gray-200 p-3'>
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
