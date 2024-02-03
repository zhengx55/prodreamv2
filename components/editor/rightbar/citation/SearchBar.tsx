import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CitationTooltip } from '@/constant/enum';
import { useUserTask } from '@/zustand/store';
import { Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useRef } from 'react';

const Tiplayout = dynamic(
  () => import('@/components/polish/guide/tips/Tiplayout')
);

type Props = {
  setKeyword: (value: string) => void;
};
const SearchBar = ({ setKeyword }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const citation_tooltip_step = useUserTask((state) => state.citation_step);
  const updateCitationStep = useUserTask((state) => state.updateCitationStep);
  return (
    <div className='flex-between h-12 w-full rounded border border-shadow-border px-1.5'>
      {citation_tooltip_step === 1 ? (
        <Tiplayout
          title={CitationTooltip.STEP1_TITLE}
          content={CitationTooltip.STEP1_TEXT}
          step={citation_tooltip_step}
          side='left'
          totalSteps={4}
          buttonLabel='next'
          onClickCallback={() => {
            updateCitationStep();
            setKeyword(CitationTooltip.KEY_WORD);
          }}
        >
          <Input
            ref={ref}
            type='text'
            id='search-citation'
            placeholder='Search publications ...'
            className='rounded border-none px-2 shadow-none outline-none focus-visible:ring-0'
          />
        </Tiplayout>
      ) : (
        <Input
          ref={ref}
          type='text'
          id='search-citation'
          placeholder='Search publications ...'
          className='rounded border-none px-2 shadow-none outline-none focus-visible:ring-0'
        />
      )}
      <Button
        onClick={() => ref.current?.value && setKeyword(ref.current.value)}
        className='h-max w-max rounded bg-doc-primary p-1.5'
      >
        <Search className='text-white' size={20} />
      </Button>
    </div>
  );
};
export default memo(SearchBar);
