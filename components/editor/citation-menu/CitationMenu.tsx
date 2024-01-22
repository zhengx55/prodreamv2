import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Surface } from '@/components/ui/surface';
import useClickOutside from '@/hooks/useClickOutside';
import { searchCitation } from '@/query/api';
import useRootStore, { useAIEditor } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { Editor } from '@tiptap/react';
import { ArrowUpRightFromSquare, Plus, Search } from 'lucide-react';
import { ChangeEvent, memo, useRef, useState } from 'react';

type Props = { editor: Editor };

export const CitationMenu = memo(({ editor }: Props) => {
  const copilotRect = useRootStore((state) => state.copilotRect);
  const selectedText = useAIEditor((state) => state.selectedText);
  const updateCitationMenu = useRootStore((state) => state.updateCitationMenu);
  const [keyword, setKeyword] = useState('');
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

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
  };

  if (!copilotRect) return null;
  return (
    <section
      style={{ top: `${copilotRect - 54}px` }}
      className='absolute -left-20 flex w-full justify-center overflow-visible '
    >
      <div ref={elRef} className='relative flex flex-col bg-transparent'>
        <div className='flex-between h-11 w-[600px] gap-x-2 rounded-t border border-shadow-border bg-white p-2 shadow-lg'>
          <Search className='text-primary-doc' size={20} />
          <Input
            type='text'
            value={keyword}
            autoFocus
            onChange={handleKeywordChange}
            id='citiation-search'
            className='small-regular h-full border-none px-0 py-0 shadow-none focus-visible:right-0 focus-visible:ring-0'
            placeholder='enter your text...'
          />
        </div>
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
            ciationResult?.map((item) => {
              return (
                <div
                  key={item.article_title}
                  className='flex flex-col gap-y-3 bg-shadow-400 p-4'
                >
                  <h1 className='base-semibold'>{item.article_title}</h1>
                  <div className='base-regular flex items-center flex-wrap gap-x-2 text-doc-shadow'>
                    {item.authors.map((author) => (
                      <p key={author.first_name}>
                        {author.first_name} {author.middle_name}
                        {author.last_name}
                      </p>
                    ))}
                    <p className='italic'>{item.area ? item.area[0] : null}</p>
                    <p>{item.publish_date.year ?? ''}</p>
                  </div>
                  <div className='flex flex-col gap-y-2 rounded border border-shadow-border p-3'>
                    <p className='small-regular line-clamp-2'>
                      {item.abstract ?? ''}
                    </p>
                    <Button
                      className='h-max w-max p-0 text-doc-primary'
                      variant={'link'}
                    >
                      See more
                    </Button>
                  </div>
                  <div className='flex gap-x-2'>
                    <Button className='rounded bg-doc-primary'>
                      <Plus size={20} />
                      Add citation
                    </Button>
                    <Button
                      className='rounded border-doc-primary text-doc-primary'
                      variant={'secondary'}
                    >
                      <ArrowUpRightFromSquare size={20} /> View in new tab
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </Surface>
      </div>
    </section>
  );
});

CitationMenu.displayName = 'CitationMenu';
