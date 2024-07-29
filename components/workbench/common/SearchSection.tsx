'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { memo } from 'react';

const SearchSection = () => {
  const { replace } = useRouter();
  const pathName = usePathname();
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();
    if (e.target.value) {
      params.set('query', e.target.value);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className='flex items-center gap-x-2'>
      <div className='flex w-64 items-center rounded-lg border px-2.5'>
        <Search color='#726fe7' size={16} />
        <Input
          type='search'
          onChange={handleQueryChange}
          name='search_materials'
          className='h-10 border-none pl-2 pr-0 focus-visible:ring-0'
          placeholder='Search materials'
        />
      </div>
      <Button className='size-max rounded-lg px-4 py-2' role='button'>
        <PlusCircle size={24} />
        Add Material
      </Button>
    </div>
  );
};

export default memo(SearchSection);
