'use client';
import { HelpCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { TutTabs } from '@/constant';
import ActivityListTut from './ActivityListTut';
const TutorialSheet = () => {
  const [tutTabs, setTutTabs] = useState(0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='flex-center absolute bottom-5 right-5 z-50 h-11 w-11 cursor-pointer rounded-full bg-primary-50 text-primary-200 transition-transform hover:scale-110'>
          <HelpCircle size={22} />
        </div>
      </SheetTrigger>
      <SheetContent className='flex flex-col px-4 py-6'>
        <SheetHeader>
          <SheetTitle className='px-4'>Tutorial</SheetTitle>
          <div className='mt-4 flex items-center'>
            {TutTabs.map((item, index) => (
              <div
                onClick={() => setTutTabs(index)}
                key={item.id}
                className={`${
                  tutTabs === index
                    ? 'border-b-2 border-black-100 font-semibold'
                    : 'font-regular border-b border-shadow-border'
                } flex cursor-pointer justify-center px-4 py-2 text-[16px]`}
              >
                {item.title}
              </div>
            ))}
          </div>
          {tutTabs === 0 ? null : tutTabs === 1 ? null : tutTabs ===
            2 ? null : (
            <ActivityListTut />
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TutorialSheet;
