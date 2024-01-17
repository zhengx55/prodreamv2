import Spacer from '@/components/root/Spacer';
import { Synonym } from '@/components/root/SvgComponents';
import useClickOutside from '@/hooks/useClickOutside';
import useAiEditor from '@/zustand/store';
import { Editor } from '@tiptap/react';
import { Info } from 'lucide-react';
import { memo, useRef } from 'react';

type Props = { editor: Editor };
export const SynonymMenu = memo(({ editor }: Props) => {
  const updateSynonymMenu = useAiEditor((state) => state.updateSynonymMenu);
  const copilotRect = useAiEditor((state) => state.copilotRect);
  const copilotRectX = useAiEditor((state) => state.copilotRectX);
  const selectedText = useAiEditor((state) => state.selectedText);

  const elRef = useRef<HTMLDivElement>(null);
  useClickOutside(elRef, () => {
    updateSynonymMenu(false);
  });
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
        </div>
      </div>
    </section>
  );
});

SynonymMenu.displayName = 'SynonymMenu';
