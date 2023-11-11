import BackButton from '@/components/root/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';

export default function Page({}) {
  return (
    <main className='relative flex h-full w-full justify-center'>
      <BackButton />
      <div className='flex flex-col items-center'>
        <h1 className='h3-semibold mt-20 capitalize'>
          Hi there 👋🏻!
          <br /> Before we start brainstorming on your essay, please share the
          program you are applying to 😊
        </h1>
        <div className='title-light mt-14 h-[72px] w-[605px] bg-shadow-200 p-6'>
          What school are you planning to apply to?
        </div>
        <Input className='title-light mt-14 h-[72px] w-[605px] p-6' />
        <div className='title-light mt-14 h-[72px] w-[605px] bg-shadow-200 p-6'>
          What is the name of the program you want to apply to?
        </div>
        <Input className='title-light mt-14 h-[72px] w-[605px] p-6' />
        <Button size={'expand'} className='mt-14 self-end'>
          Next
        </Button>
      </div>
    </main>
  );
}
