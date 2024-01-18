import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { Synonym } from '@/components/root/SvgComponents';
import useClickOutside from '@/hooks/useClickOutside';
import { synonym } from '@/query/api';
import useAiEditor from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { Editor } from '@tiptap/react';
import { Info } from 'lucide-react';
import { memo, useRef } from 'react';

type Props = { editor: Editor };
export const SynonymMenu = memo(({ editor }: Props) => {
  const updateSynonymMenu = useAiEditor((state) => state.updateSynonymMenu);
  const copilotRect = useAiEditor((state) => state.copilotRect);
  const copilotRectX = useAiEditor((state) => state.copilotRectX);
  const selectedText = useAiEditor((state) => state.selectedText);

  const {
    data: synoymwords,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['synonym', selectedText],
    queryFn: () => synonym({ word: selectedText }),
    enabled: !!selectedText,
  });

  const elRef = useRef<HTMLDivElement>(null);
  useClickOutside(elRef, () => {
    updateSynonymMenu(false);
  });

  const handleReplace = (word: string) => {
    const { selection } = editor.state;
    const { from, to } = selection;
    editor
      .chain()
      .deleteRange({ from, to })
      .insertContentAt(from, word)
      .setTextSelection({ from, to: word.length + from })
      .run();
    updateSynonymMenu(false);
  };

  if (!copilotRect || !copilotRectX) return null;
  return (
    <section
      style={{ top: `${copilotRect - 54}px`, left: `${copilotRectX}px` }}
      className='w-[450px absolute flex justify-center overflow-visible '
    >
      <div ref={elRef} className='relative flex flex-col bg-transparent'>
        <div className='flex h-60 w-full flex-col gap-x-2 rounded-t border border-shadow-border bg-white p-4 shadow-lg'>
          <div className='flex items-center gap-x-2'>
            <Synonym size='24' />
            <h1 className='base-semibold'>
              Synonyms for &quot;{selectedText}&quot;
            </h1>
          </div>
          <Spacer y='14' />
          <div className='flex items-center gap-x-1'>
            <Info size={10} className='text-shadow' />
            <p className='tiny-medium text-shadow'>
              Synonyms are ranked by how often they occur inpublished science
              literature.
            </p>
          </div>

          {isPending ? (
            <Loading />
          ) : isError ? (
            <div className='flex-center flex-1 text-red-400'>
              Opps something went wrong!
            </div>
          ) : (
            <div className='flex flex-col overflow-y-auto'>
              <Spacer y='10' />
              {synoymwords.map((item, index) => (
                <div
                  onClick={() => handleReplace(item)}
                  className='group flex w-full cursor-pointer px-2 py-2 hover:bg-doc-secondary'
                  key={`synonym-${index}`}
                >
                  <p className='small-semibold text-doc-font group-hover:text-doc-primary'>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

SynonymMenu.displayName = 'SynonymMenu';
