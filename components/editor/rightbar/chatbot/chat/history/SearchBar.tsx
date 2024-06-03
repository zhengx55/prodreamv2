import { Input } from '@/components/ui/input';
import { EditorDictType } from '@/types';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

type Props = {
  t: EditorDictType;
  query: string;
  updateQuery: (value: string) => void;
};
const SearchBar = ({ query, t, updateQuery }: Props) => {
  const trans = useTranslations('Editor');

  return (
    <div className='flex-between relative'>
      <Search className='absolute left-2 top-2 text-zinc-600' size={18} />
      <Input
        type='text'
        value={query}
        onChange={({ currentTarget }) => {
          updateQuery(currentTarget.value);
        }}
        id='chathistory-search'
        aria-label={trans('ChatHistory.Search')}
        placeholder={trans('ChatHistory.Search')}
        className='h-9 w-80 py-2 pl-8 pr-2'
      />
    </div>
  );
};
export default memo(SearchBar);
