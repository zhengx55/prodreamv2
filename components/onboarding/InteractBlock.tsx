'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { useOnboarding } from '@/zustand/store';
import Image from 'next/image';
import DOMPurify from 'dompurify';

const InteractBlock = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false);

  const transOnboarding = useTranslations('Onboarding');

  const name = useOnboarding((state) => state.name);
  const setName = useOnboarding((state) => state.setName);
  const currentQuestionIndex = useOnboarding(
    (state) => state.currentQuestionIndex
  );
  const setCurrentQuestionIndex = useOnboarding(
    (state) => state.setCurrentQuestionIndex
  );
  const questionTwoAnswers = useOnboarding((state) => state.questionTwoAnswers);
  const addQuestionTwoAnswer = useOnboarding(
    (state) => state.addQuestionTwoAnswer
  );
  const removeQuestionTwoAnswer = useOnboarding(
    (state) => state.removeQuestionTwoAnswer
  );
  const questionThreeAnswers = useOnboarding(
    (state) => state.questionThreeAnswers
  );
  const addQuestionThreeAnswer = useOnboarding(
    (state) => state.addQuestionThreeAnswer
  );
  const removeQuestionThreeAnswer = useOnboarding(
    (state) => state.removeQuestionThreeAnswer
  );

  const questions: { [key: number]: string } = {
    0: transOnboarding('Question_1'),
    1: transOnboarding('Question_2', {
      name: name,
    }),
    2: transOnboarding('Question_3', {
      education: questionTwoAnswers[0],
    }),
  };

  const questionTwoOptions = [
    transOnboarding('Question_2_Option_1'),
    transOnboarding('Question_2_Option_2'),
    transOnboarding('Question_2_Option_3'),
    transOnboarding('Question_2_Option_4'),
    transOnboarding('Question_2_Option_5'),
  ];

  const questionThreeOptions = [
    transOnboarding('Question_3_Option_1'),
    transOnboarding('Question_3_Option_2'),
    transOnboarding('Question_3_Option_3'),
    transOnboarding('Question_3_Option_4'),
    transOnboarding('Question_3_Option_5'),
    transOnboarding('Question_3_Option_6'),
    transOnboarding('Question_3_Option_7'),
    transOnboarding('Question_3_Option_8'),
    transOnboarding('Question_3_Option_9'),
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    if (sanitizedValue.length <= 50) {
      setInputValue(sanitizedValue);
      setIsError(false);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex === 2 && questionThreeAnswers.length > 0) {
      console.log('去下一个页面');
      return;
    }

    if (currentQuestionIndex === 0) {
      if (inputValue.trim() === '') {
        setIsError(true);
        return;
      } else {
        setName(inputValue);
      }
    } else if (currentQuestionIndex === 1 && questionTwoAnswers.length === 0) {
      return;
    } else if (
      currentQuestionIndex === 2 &&
      questionThreeAnswers.length === 0
    ) {
      return;
    }

    setInputValue('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const whenFocus = () => {
    setIsFocused(true);
    setIsError(false);
  };

  const handleOptionClick = (
    option: string,
    isMultiple: boolean,
    questionIndex: number
  ) => {
    // console.log('answer', questionIndex === 1 ? questionTwoAnswers : questionThreeAnswers, 'option', option, 'isMultiple', isMultiple);

    if (questionIndex === 1) {
      if (questionTwoAnswers.includes(option)) {
        removeQuestionTwoAnswer(option);
      } else {
        if (!isMultiple) {
          questionTwoAnswers.forEach((answer) =>
            removeQuestionTwoAnswer(answer)
          );
        }
        addQuestionTwoAnswer(option);
      }
    } else if (questionIndex === 2) {
      if (questionThreeAnswers.includes(option)) {
        removeQuestionThreeAnswer(option);
      } else {
        addQuestionThreeAnswer(option);
      }
    }
  };

  return (
    <div className='absolute bottom-14 z-10 mx-auto w-7/12 rounded-lg bg-white bg-opacity-70 p-12'>
      <p className='mb-6 text-center font-poppins text-2xl font-semibold leading-[36px] text-[var(--color-text-1,#272330)]'>
        {questions[currentQuestionIndex]}
      </p>
      <div className='mb-6 flex justify-center'>
        {currentQuestionIndex === 0 && (
          <>
            <div
              className={`relative w-1/3 rounded-lg ${isFocused ? 'shadow-white' : ''} ${isError ? 'shadow-error' : ''}`}
            >
              <Input
                type='text'
                id='area'
                placeholder={transOnboarding('Input_Placeholder')}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={whenFocus}
                onBlur={() => setIsFocused(false)}
                className='small-regular w-full focus-visible:shadow-white focus-visible:outline-none focus-visible:ring-0'
              />
            </div>
            <button
              className='ml-2 flex items-center justify-center gap-2 rounded-md border-4 border-white/20 bg-gradient-to-r from-[#6680FF] to-[#3D4D99] px-4 py-1 text-white'
              style={{
                boxShadow:
                  '0px 7px 17px -2px rgba(87, 84, 94, 0.12), 0px 11px 25px 4px rgba(87, 84, 94, 0.07)',
                backgroundClip: 'padding-box',
              }}
              onClick={handleNextClick}
            >
              {transOnboarding('Confirm')}
              <Image
                src='/onboarding/star.svg'
                alt='Star'
                width={25}
                height={24}
              />
            </button>
          </>
        )}
        {currentQuestionIndex === 1 && (
          <div className='relative flex flex-wrap gap-4'>
            {questionTwoOptions.map((option, index) => (
              <div
                key={index}
                className={`flex h-14 cursor-pointer items-center justify-start gap-2.5 rounded-lg bg-white px-6 py-1.5 hover:bg-white ${questionTwoAnswers.includes(option) ? 'bg-opacity-100' : ' bg-opacity-40'}`}
                onClick={() => handleOptionClick(option, false, 1)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
        {currentQuestionIndex === 2 && (
          <div className='relative flex flex-wrap gap-4'>
            {questionThreeOptions.map((option, index) => (
              <div
                key={index}
                className={`flex h-14 cursor-pointer items-center justify-start gap-2.5 rounded-lg bg-white px-6 py-1.5 hover:bg-white ${questionThreeAnswers.includes(option) ? 'bg-opacity-100' : ' bg-opacity-40'}`}
                onClick={() => handleOptionClick(option, true, 2)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      {currentQuestionIndex !== 0 && (
        <div className='flex items-center justify-end text-right'>
          <button
            className={`text-primary flex cursor-pointer items-center justify-start font-poppins text-2xl font-semibold leading-[36px] ${
              (currentQuestionIndex === 1 && questionTwoAnswers.length === 0) ||
              (currentQuestionIndex === 2 && questionThreeAnswers.length === 0)
                ? 'text-white/40'
                : 'text-white'
            }`}
            onClick={handleNextClick}
          >
            <span className='flex-grow'>{transOnboarding('Next')}</span>
            <ChevronRight size={24} className='ml-auto h-6 w-6' />
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractBlock;
