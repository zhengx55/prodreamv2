'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { memo, ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
  children?: ReactNode;
};
const SearchSection = ({ searchParams, children }: Props) => {
  const { replace } = useRouter();
  const debounced = useDebouncedCallback((value) => {
    const params = new URLSearchParams();
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }, 100);
  const pathName = usePathname();

  return (
    <div className='flex items-center gap-x-2'>
      <div className='flex w-64 items-center rounded-lg border px-2.5'>
        <Search color='#726fe7' size={16} />
        <Input
          type='search'
          onChange={(e) => debounced(e.target.value)}
          name='search_materials'
          className='h-10 border-none pl-2 pr-0 focus-visible:ring-0'
          placeholder='Search...'
          defaultValue={searchParams.query ?? ''}
        />
      </div>
      {children}
    </div>
  );
};

export default memo(SearchSection);
