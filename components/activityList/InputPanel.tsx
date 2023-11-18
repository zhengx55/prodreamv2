'use client';
import { Check } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const InputPanel = () => {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <div className='h-full min-h-[750px] w-1/2 md:p-4'>
      <div className='flex h-full min-h-[700px] w-full flex-col rounded-xl border border-border-50 bg-white p-4'>
        <h1 className='h3-bold text-primary-200'>
          Create a successful Activity List with one click
        </h1>
        {/* chips */}
        <div className='mt-3 flex items-center gap-x-3'>
          <Badge className='bg-[#FFFBD6]'>Meet Character Limit </Badge>
          <Badge className='bg-[#EBFFE4]'>Use Stronger Verbs</Badge>
          <Badge className='bg-[#EBF8FF]'>Demonstrate abilities</Badge>
        </div>
        <h3 className='title-semibold mt-14'>
          Paste your activity description here
        </h3>
        <Textarea
          className='mt-3 h-72 resize-none'
          placeholder='Eg: A comfortable dress made of yarn that has a cotton surface and an airy polyester core. Cotton provides a durable yet lightweight feel and is machine washable...'
        />
        <h3 className='title-semibold mt-14'>
          Select character limit(s) you would like to shorten to
        </h3>
        <div className='mt-4 flex w-full gap-x-2'>
          {[100, 150, 250, 350].map((item, index) => {
            const isSelected = selected.includes(item);
            return (
              <div
                onClick={() => {
                  if (!isSelected) setSelected((prev) => [...prev, item]);
                  else {
                    const newArray = selected.filter((el) => el !== item);
                    setSelected(newArray);
                  }
                }}
                className={`${
                  isSelected && 'bg-primary-200 text-white'
                } flex-center cursor-pointer gap-x-2 rounded-md border border-shadow-border px-10 py-3 font-bold text-shadow transition-transform hover:-translate-y-1`}
                key={`character-limits-${index}`}
              >
                <Check
                  size={20}
                  className={`${isSelected && 'text-white'} text-shadow`}
                />
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
