import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { ChangeEvent, FC, ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  label?: string;
  children?: ReactNode;
}

const ModalSearch: FC<SearchBarProps> = ({
  query,
  setQuery,
  label,
  children,
}) => {
  const debounced = useDebouncedCallback((value: string) => {
    setQuery(value);
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounced(e.target.value);
  };

  return (
    <div className='flex-between w-full'>
      {children}
      {label && <h2 className='text-xl font-medium'>{label}</h2>}
      <div className='relative flex w-72 items-center rounded-lg border border-zinc-200 px-2.5'>
        <SearchIcon size={18} color='#726fe7' />
        <Input
          type='search'
          name='search'
          defaultValue={query}
          placeholder='Search ...'
          className='border-none focus-visible:ring-0'
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ModalSearch;
