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
import { useTranslations } from 'next-intl';
import WholeBook from './WholeBook';

const Introduction = dynamic(() => import('./Introduction'));
const Chapter = dynamic(() => import('./Chapter'));

const BookForm = () => {
  const trans = useTranslations('Editor');
  const [bookType, setBookType] = useState<
    'The whole book' | 'Chapter or section' | 'Preface of introduction'
  >('The whole book');
  return (
    <div className='flex flex-1 flex-col overflow-y-auto'>
      <Spacer y='20' />
      <h1 className='base-semibold'>
        {trans('CustomCitation.BookMenu.Book_Type')}
      </h1>
      <Spacer y='16' />
      <Select onValueChange={setBookType as any} defaultValue='The whole book'>
        <SelectTrigger>
          <SelectValue className='rounded border border-gray-200 text-zinc-600 outline-none' />
        </SelectTrigger>
        <SelectContent className='rounded bg-white'>
          <SelectItem
            value={trans('CustomCitation.BookMenu.The_whole_book')}
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            {trans('CustomCitation.BookMenu.The_whole_book')}
          </SelectItem>
          <SelectItem
            value={trans('CustomCitation.BookMenu.Chapter_or_section')}
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            {trans('CustomCitation.BookMenu.Chapter_or_section')}
          </SelectItem>
          <SelectItem
            value={trans('CustomCitation.BookMenu.Preface_of_introduction')}
            className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
          >
            {trans('CustomCitation.BookMenu.Preface_of_introduction')}
          </SelectItem>
        </SelectContent>
      </Select>
      <Spacer y='16' />
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
