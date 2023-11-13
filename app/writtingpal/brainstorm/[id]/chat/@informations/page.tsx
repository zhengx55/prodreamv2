'use client';
import BackButton from '@/components/root/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
import { motion } from 'framer-motion';
import { ChangeEvent, useState } from 'react';

export default function Page({}) {
  const { updateCurrentRoute } = useChatNavigatorContext();
  const [errors, setErrors] = useState({
    school: '',
    program: '',
  });
  const [value, setValue] = useState({
    school: '',
    program: '',
  });
  const handleNextPage = () => {
    !value.school
      ? setErrors((prev) => ({ ...prev, school: 'School is not provided' }))
      : setErrors((prev) => ({ ...prev, school: '' }));

    !value.program
      ? setErrors((prev) => ({ ...prev, program: 'Program is not provided' }))
      : setErrors((prev) => ({ ...prev, program: '' }));

    if (!value.school || !value.program) {
      return;
    } else {
      updateCurrentRoute('introductions');
    }
  };
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.main
      key={'informations'}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col items-center overflow-y-auto px-10 pt-20 md:px-0'
    >
      <BackButton onBack={() => updateCurrentRoute('startup')} />
      <div className='flex max-w-3xl flex-col items-center'>
        <h1 className='h3-semibold mt-10 capitalize'>
          Hi there 👋🏻!
          <br /> Before we start brainstorming on your essay, please share the
          program you are applying to 😊
        </h1>
        <div className='title-light mt-14 h-[72px] w-[605px] rounded-xl bg-shadow-200 p-6'>
          What school are you planning to apply to?
        </div>
        <div className='relative mt-14 h-[72px] w-[605px]'>
          {errors.school && (
            <p className='absolute -top-7 text-sm text-red-500'>
              {errors.school}
            </p>
          )}
          <Input
            name='school'
            value={value.school}
            onChange={handleValueChange}
            className={`title-light h-full w-full p-6 ${
              errors.school && 'border-red-400'
            }`}
          />
        </div>

        <div className='title-light mt-14 h-[72px] w-[605px] rounded-xl bg-shadow-200 p-6'>
          What is the name of the program you want to apply to?
        </div>
        <div className='relative mt-14 h-[72px] w-[605px]'>
          {errors.program && (
            <p className='absolute -top-7 text-sm text-red-500'>
              {errors.program}
            </p>
          )}
          <Input
            name='program'
            value={value.program}
            onChange={handleValueChange}
            className={`title-light h-full w-full p-6 ${
              errors.program && 'border-red-400'
            }`}
          />
        </div>

        <Button
          size={'expand'}
          onClick={handleNextPage}
          className='mt-14 self-end'
        >
          Next
        </Button>
      </div>
    </motion.main>
  );
}
