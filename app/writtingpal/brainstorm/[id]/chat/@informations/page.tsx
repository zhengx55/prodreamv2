'use client';
import BackButton from '@/components/root/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
import { FormAnswer, FormQuestion } from '@/types';
import { motion } from 'framer-motion';
import { ChangeEvent, useState } from 'react';

export default function Page({}) {
  const { questions, setFormAnswers, updateCurrentRoute } =
    useChatNavigatorContext();
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
      const schoolQasId = questions.form_question[0].question_id;
      const programQasId = questions.form_question[1].question_id;
      const formAnswer: FormAnswer[] = [
        { answer: value.school, question_id: schoolQasId },
        {
          answer: value.program,
          question_id: programQasId,
        },
      ];
      setFormAnswers(formAnswer);
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
      className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col items-center overflow-y-auto px-10 pt-[120px] md:px-0'
    >
      <div className='flex max-w-3xl flex-col items-center'>
        <h1 className='h3-bold capitalize'>
          Hi there 👋🏻!
          <br /> Before we start brainstorming on your essay, please share the
          program you are applying to 😊
        </h1>
        <div className='base-semibold mt-20 self-start rounded-xl'>
          What school are you planning to apply to?
        </div>
        <div className='relative mt-8 h-14 w-full'>
          {errors.school && (
            <p className='absolute -top-7 text-sm text-red-500'>
              {errors.school}
            </p>
          )}
          <Input
            name='school'
            value={value.school}
            onChange={handleValueChange}
            className={`base-medium h-full w-full ${
              errors.school && 'border-red-400'
            }`}
          />
        </div>

        <div className='base-semibold mt-10 self-start rounded-xl'>
          What is the name of the program you want to apply to?
        </div>
        <div className='relative mt-8 h-14 w-full'>
          {errors.program && (
            <p className='absolute -top-7 text-sm text-red-500'>
              {errors.program}
            </p>
          )}
          <Input
            name='program'
            value={value.program}
            onChange={handleValueChange}
            className={`base-medium h-full w-full ${
              errors.program && 'border-red-400'
            }`}
          />
        </div>
        <div className='flex-between mt-20 w-full'>
          <BackButton onBack={() => updateCurrentRoute('startup')} />
          <Button size={'expand'} onClick={handleNextPage} className='self-end'>
            Next
          </Button>
        </div>
      </div>
    </motion.main>
  );
}
