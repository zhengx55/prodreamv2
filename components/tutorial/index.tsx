'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TutTabs } from '@/constant';
import { HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ActivityListTut from './ActivityListTut';
const TutorialSheet = () => {
  const path = usePathname();
  const currnetRoute = path.split('/')[2];
  const [tutTabs, setTutTabs] = useState(0);

  useEffect(() => {
    if (currnetRoute === 'polish') {
      setTutTabs(0);
    } else if (currnetRoute === 'brainstorm') {
      setTutTabs(1);
    } else {
      setTutTabs(2);
    }
  }, [currnetRoute]);
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
          <div className='mt-4 flex items-center gap-x-2'>
            {TutTabs.map((item, index) => (
              <div
                onClick={() => setTutTabs(index)}
                key={item.id}
                className={`${
                  tutTabs === index
                    ? 'border-2 border-primary-200 bg-primary-50'
                    : 'border border-shadow-border'
                } base-semibold flex w-36 cursor-pointer flex-col justify-center gap-y-2 rounded-lg p-2 text-[16px]`}
              >
                <div
                  style={{ backgroundColor: item.bg }}
                  className='flex-center h-full w-full shrink-0 overflow-hidden py-2'
                >
                  <Image
                    alt={item.title}
                    src={item.image}
                    width={1000}
                    height={1000}
                    className='h-[60px] w-[60px]'
                  />
                </div>

                {item.title}
              </div>
            ))}
          </div>
          {tutTabs === 0 ? null : tutTabs === 1 ? null : <ActivityListTut />}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TutorialSheet;
