import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sample_search_citation } from '@/constant';
import { CitationTooltip } from '@/constant/enum';
import { ICitation } from '@/query/type';
import { useCitation, useUserTask } from '@/zustand/store';
import { Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';

const Tiplayout = dynamic(
  () => import('@/components/editor/guide/tips/Tiplayout')
);

type Props = {
  setKeyword: (value: string) => void;
  setResult: (value: ICitation[]) => void;
};
const SearchBar = ({ setKeyword, setResult }: Props) => {
  const citation_tooltip_step = useUserTask((state) => state.citation_step);
  const setShowMine = useCitation((state) => state.updateShowMineCitation);
  const updateCitationStep = useUserTask((state) => state.updateCitationStep);
  const [searchTerm, setSearchTerm] = useState('');
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
            setSearchTerm(CitationTooltip.KEY_WORD);
            setResult(sample_search_citation as any);
          }}
        >
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            type='text'
            id='search-citation'
            placeholder='Search publications ...'
            className='rounded border-none px-2 shadow-none outline-none focus-visible:ring-0'
          />
        </Tiplayout>
      ) : (
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          onKeyDown={(e) =>
            e.key === 'Enter' && searchTerm.trim() && setKeyword(searchTerm)
          }
          type='text'
          id='search-citation'
          placeholder='Search publications ...'
          className='rounded border-none px-2 shadow-none outline-none focus-visible:ring-0'
        />
      )}
      <Button
        onClick={() => {
          if (searchTerm) setKeyword(searchTerm);
          setShowMine(false);
        }}
        className='h-max w-max rounded bg-doc-primary p-1.5'
      >
        <Search className='text-white' size={20} />
      </Button>
    </div>
  );
};
export default memo(SearchBar);
