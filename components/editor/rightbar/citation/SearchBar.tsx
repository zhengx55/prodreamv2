import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EditorDictType } from '@/types';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo, useState } from 'react';

type Props = {
  setKeyword: (value: string) => void;
  t: EditorDictType;
};
const SearchBar = ({ setKeyword, t }: Props) => {
  const trans = useTranslations('Editor');
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className='flex-between h-12 w-full rounded border border-gray-200 px-1.5'>
      <Input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.currentTarget.value);
        }}
        onKeyDown={(e) =>
          e.key === 'Enter' && searchTerm.trim() && setKeyword(searchTerm)
        }
        type='text'
        id='search-citation'
        placeholder={trans('Citation.search')}
        className='rounded border-none px-2 shadow-none outline-none focus-visible:ring-0'
      />

      <Button
        onClick={() => {
          if (searchTerm.trim()) setKeyword(searchTerm);
        }}
        className='h-max w-max rounded bg-violet-500 p-1.5'
      >
        <Search className='text-white' size={20} />
      </Button>
    </div>
  );
};
export default memo(SearchBar);
