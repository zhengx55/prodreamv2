'use client';
import BackButton from '@/components/root/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';

export default function Page({}) {
  const { updateCurrentRoute } = useChatNavigatorContext();
  return (
    <main className='w-ful relative flex h-full flex-col items-center justify-center overflow-y-auto'>
      <BackButton />
      <div className='flex max-w-3xl flex-col items-center pt-10'>
        <h1 className='h3-semibold mt-10 capitalize'>
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
        <Button
          size={'expand'}
          onClick={() => updateCurrentRoute('introductions')}
          className='mt-14 self-end'
        >
          Next
        </Button>
      </div>
    </main>
  );
}
