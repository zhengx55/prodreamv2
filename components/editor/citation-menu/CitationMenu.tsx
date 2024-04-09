import Loading from '@/components/root/CustomLoading';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Surface } from '@/components/ui/surface';
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
import { useClickAway, useUnmount } from 'react-use';

type Props = { editor: Editor };

const CitationMenu = ({ editor }: Props) => {
  const { floatingMenuPos, updateCitationMenu, updateRightbarTab } =
    useAIEditor((state) => ({ ...state }));
  const { id } = useParams();
  const [text, setText] = useState('');
  const updateShowCreateCitation = useCitation(
    (state) => state.updateShowCreateCitation
  );
  const elRef = useRef<HTMLDivElement>(null);
  const ref = useScrollIntoView();
  useClickAway(elRef, () => {
    editor.chain().unsetHighlight().run();
    updateCitationMenu(false);
  });

  useEffect(() => {
    const selectedText = getSelectedText(editor);
    selectedText.trim() && setText(selectedText);
  }, [editor]);

  useUnmount(() => {
    editor.chain().unsetHighlight().run();
  });

  const { data: ciationResult, isPending } = useQuery({
    queryFn: ({ signal }) => searchCitation(text, signal),
    queryKey: ['search-citation-indoc', text],
    enabled: !!text,
  });

  const { mutateAsync: handleCite } = useCiteToDoc();

  const handler = async (item: ICitation) => {
    const converted_data = ConvertCitationData(item, false);
    editor.chain().unsetHighlight().run();
    await handleCite({
      citation_data: converted_data,
      citation_type: 'Journal',
      document_id: id as string,
    });
    updateCitationMenu(false);
  };

  if (!floatingMenuPos) return null;
  return (
    <section
      ref={ref}
      style={{ top: `${floatingMenuPos.top - 54}px` }}
      className='absolute -left-12 z-40 flex w-full justify-center'
    >
      <div ref={elRef} className='relative flex flex-col bg-transparent'>
        <Surface
          className='relative flex h-72 w-[600px] flex-col gap-y-2 overflow-y-auto !rounded py-2'
          withBorder
        >
          <div className='flex-between px-2'>
            <p className='base-medium text-zinc-600'>Search Results</p>
          </div>
          {isPending ? (
            <Loading />
          ) : (
            ciationResult?.map((item, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col gap-y-2 bg-shadow-400 px-4 py-1.5'
                >
                  <h1 className='base-semibold'>{item.article_title}</h1>
                  <div className='small-regular flex flex-wrap items-center gap-x-2 text-zinc-600'>
                    {item.contributors?.map((author, a_idx) => (
                      <p key={`author-${a_idx}`}>
                        {author.first_name} {author.middle_name}
                        {author.last_name}
                      </p>
                    ))}
                    <p className='italic'>{item.area ? item.area[0] : ''}</p>
                    <p>{item.publish_date.year ?? ''}</p>
                  </div>
                  <div className='flex flex-col gap-y-2 rounded border border-gray-200 p-3'>
                    <p className='small-regular line-clamp-3'>
                      {item.abstract ?? 'No detail description available...'}
                    </p>
                  </div>
                  <div className='flex gap-x-2'>
                    <Button
                      onClick={() => handler(item)}
                      role='button'
                      className='rounded bg-violet-500'
                    >
                      <Plus size={20} />
                      Add citation
                    </Button>
                    <Button
                      disabled={!Boolean(item.pdf_url)}
                      role='link'
                      className='rounded border-violet-500 text-violet-500'
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
                updateRightbarTab(3);
                updateShowCreateCitation(true);
              }}
              variant={'ghost'}
              className='small-regular gap-x-1 px-0 text-violet-500 hover:underline'
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
