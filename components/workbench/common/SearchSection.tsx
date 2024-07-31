'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { memo } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  showButton?: boolean;
  searchParams: { [key: string]: string | string[] | undefined };
};
const SearchSection = ({ showButton, searchParams }: Props) => {
  const { replace } = useRouter();
  const debounced = useDebouncedCallback((value) => {
    const params = new URLSearchParams();
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }, 200);
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
          placeholder='Search materials'
          defaultValue={searchParams.query ?? ''}
        />
      </div>
      {showButton && (
        <Link passHref href={`brainstorming/create`}>
          <Button className='size-max rounded-lg px-4 py-2' role='button'>
            <PlusCircle size={24} />
            Add Material
          </Button>
        </Link>
      )}
    </div>
  );
};

export default memo(SearchSection);
