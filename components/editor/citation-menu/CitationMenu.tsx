import Loading from '@/components/root/CustomLoading';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Surface } from '@/components/ui/surface';
import useScrollIntoView from '@/hooks/useScrollIntoView';
import { getSelectedText } from '@/lib/tiptap/utils';
import { searchCitation } from '@/query/api';
import { useCiteToDoc } from '@/query/query';
import { ICitation } from '@/query/type';
import { useAIEditor, useCitation } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { Editor } from '@tiptap/react';
import { m } from 'framer-motion';
import { ArrowUpRightFromSquare, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo, useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

type Props = { editor: Editor };

const CitationMenu = ({ editor }: Props) => {
  const floatingMenuPos = useAIEditor((state) => state.floatingMenuPos);
  const updateCitationMenu = useAIEditor((state) => state.updateCitationMenu);
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  const { id } = useParams();
  const [text, setText] = useState('');
  const updateShowCreateCitation = useCitation(
    (state) => state.updateShowCreateCitation
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollRef = useScrollIntoView();
  useClickAway(menuRef, () => {
    editor.chain().unsetHighlight().run();
    updateCitationMenu(false);
  });

  useEffect(() => {
    const text = getSelectedText(editor).trim();
    setText(text);
    return () => {
      editor.chain().unsetHighlight().run();
    };
  }, [editor]);
  const { data: ciationResult, isPending } = useQuery({
    queryFn: ({ signal }) => searchCitation(text, signal),
    queryKey: ['search-citation-indoc', text],
    enabled: !!text,
  });

  const { mutateAsync: handleCite } = useCiteToDoc();

  const handler = async (item: ICitation) => {
    editor.chain().unsetHighlight().run();
    await handleCite({
      document_id: id as string,
      url: item.pdf_url,
      citation_id: item.citation_id,
      snippet: item.snippet,
      citation_count: item.citation_count,
      in_text_pos: 0,
    });
    updateCitationMenu(false);
  };

  if (!floatingMenuPos) return null;
  return (
    <m.section
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      ref={scrollRef}
      style={{ top: `${floatingMenuPos.top - 54}px` }}
      className='absolute -left-12 z-40 flex w-full justify-center'
    >
      <div ref={menuRef} className='relative flex flex-col bg-transparent'>
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
                  <p className='small-regular inline-flex flex-wrap items-center gap-x-2 text-zinc-600'>
                    {item.publication}
                    <em>{item.area ? item.area[0] : ''}</em>
                    <span>{item.publish_date.year ?? ''}</span>
                  </p>
                  <div className='flex flex-col gap-y-2 rounded border border-gray-200 p-3'>
                    <p className='small-regular line-clamp-3'>
                      {item.snippet ?? 'No detail description available...'}
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
    </m.section>
  );
};

export default memo(CitationMenu);
