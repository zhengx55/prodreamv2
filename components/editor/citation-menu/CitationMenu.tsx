import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Surface } from '@/components/ui/surface';
import useClickOutside from '@/hooks/useClickOutside';
import { searchCitation } from '@/query/api';
import useRootStore, { useAIEditor } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { Editor } from '@tiptap/react';
import { ArrowUpRightFromSquare, Plus } from 'lucide-react';
import { memo, useRef } from 'react';

type Props = { editor: Editor };

export const CitationMenu = memo(({ editor }: Props) => {
  const copilotRect = useRootStore((state) => state.copilotRect);
  const selectedText = useAIEditor((state) => state.selectedText);
  const updateCitationMenu = useRootStore((state) => state.updateCitationMenu);
  const elRef = useRef<HTMLDivElement>(null);

  const {
    data: ciationResult,
    isPending,
    isError,
  } = useQuery({
    queryFn: ({ signal }) => searchCitation(selectedText, signal),
    queryKey: ['search-citation', selectedText],
  });

  useClickOutside(elRef, () => {
    updateCitationMenu(false);
  });

  if (!copilotRect) return null;
  return (
    <section
      style={{ top: `${copilotRect - 54}px` }}
      className='absolute -left-20 flex w-full justify-center overflow-visible '
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
                    <p className='italic'>{item.area ? item.area[0] : null}</p>
                    <p>{item.publish_date.year ?? ''}</p>
                  </div>
                  <div className='flex flex-col gap-y-2 rounded border border-shadow-border p-3'>
                    <p className='small-regular line-clamp-3'>
                      {item.abstract ?? ''}
                    </p>
                  </div>
                  <div className='flex gap-x-2'>
                    <Button className='rounded bg-doc-primary'>
                      <Plus size={20} />
                      Add citation
                    </Button>
                    <Button
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
            <p className='small-regular inline-flex cursor-pointer gap-x-1 text-doc-primary hover:underline'>
              <Book />
              Add custom citation
            </p>
          </div>
        </Surface>
      </div>
    </section>
  );
});

CitationMenu.displayName = 'CitationMenu';
