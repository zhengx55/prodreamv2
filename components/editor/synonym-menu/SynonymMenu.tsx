import Loading from '@/components/root/CustomLoading';
import Spacer from '@/components/root/Spacer';
import { Synonym } from '@/components/root/SvgComponents';
import useScrollIntoView from '@/hooks/useScrollIntoView';
import { getSelectedText } from '@/lib/tiptap/utils';
import { synonym } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { Editor } from '@tiptap/react';
import { Info } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { useClickAway, useUnmount } from 'react-use';
import { useEditorCommand } from '../hooks/useEditorCommand';

type Props = { editor: Editor };
export const SynonymMenu = memo(({ editor }: Props) => {
  const updateSynonymMenu = useAIEditor((state) => state.updateSynonymMenu);
  const floatingMenuPos = useAIEditor((state) => state.floatingMenuPos);
  const [text, setText] = useState('');

  useEffect(() => {
    const selectedText = getSelectedText(editor);
    selectedText.trim() && setText(selectedText);
  }, [editor]);

  const { replaceText } = useEditorCommand(editor);

  useUnmount(() => {
    editor.chain().unsetHighlight().run();
  });

  const {
    data: synoymwords,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['synonym', text],
    queryFn: () => synonym({ word: text }),
    enabled: !!text,
  });

  const elRef = useRef<HTMLDivElement>(null);
  useClickAway(elRef, () => {
    updateSynonymMenu(false);
  });
  const ref = useScrollIntoView();

  const handleReplace = (word: string) => {
    const { selection } = editor.state;
    const { from, to } = selection;
    replaceText(from, to, word);
    updateSynonymMenu(false);
  };

  if (!floatingMenuPos) return null;
  return (
    <section
      ref={ref}
      style={{
        top: `${floatingMenuPos.top - 44}px`,
        left: `${floatingMenuPos.left - 300}px`,
      }}
      className='absolute z-40 flex w-[450px] justify-center'
    >
      <div ref={elRef} className='relative flex flex-col bg-transparent'>
        <div className='flex h-60 w-full flex-col gap-x-2 rounded-t border border-gray-200 bg-white p-4 shadow-lg'>
          <div className='flex items-center gap-x-2'>
            <Synonym size='24' />
            <h1 className='base-semibold'>Synonyms for &quot;{text}&quot;</h1>
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
                  className='group flex w-full cursor-pointer px-2 py-2 hover:bg-slate-100'
                  key={`synonym-${index}`}
                >
                  <p className='small-semibold text-neutral-400 group-hover:text-violet-500'>
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
