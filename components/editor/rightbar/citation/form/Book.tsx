import Spacer from '@/components/root/Spacer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import WholeBook from './WholeBook';

const Introduction = dynamic(() => import('./Introduction'));
const Chapter = dynamic(() => import('./Chapter'));

const BookForm = () => {
  const [bookType, setBookType] = useState<
    'The whole book' | 'Chapter or section' | 'Preface of introduction'
  >('The whole book');
  return (
    <div className='flex flex-1 flex-col'>
      <Spacer y='16' />
      <h1 className='base-semibold'>Book Type</h1>
      <Spacer y='16' />
      <Select onValueChange={setBookType as any} defaultValue='The whole book'>
        <SelectTrigger>
          <SelectValue className='rounded border border-shadow-border text-doc-shadow outline-none' />
        </SelectTrigger>
        <SelectContent className='rounded bg-white'>
          <SelectItem
            value='The whole book'
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            The whole book
          </SelectItem>
          <SelectItem
            value='Chapter or section'
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            Chapter or section
          </SelectItem>
          <SelectItem
            value='Preface of introduction'
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            Preface of introduction
          </SelectItem>
        </SelectContent>
      </Select>
      {bookType === 'The whole book' ? (
        <WholeBook />
      ) : bookType === 'Chapter or section' ? (
        <Chapter />
      ) : (
        <Introduction />
      )}
    </div>
  );
};

export default BookForm;
