"use client"
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { useOnboarding } from '@/zustand/store';



const InteractBlock = () => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isError, setIsError] = useState(false);

    const transOnboarding = useTranslations('Onboarding');

    const name = useOnboarding((state) => state.name);
    const setName = useOnboarding((state) => state.setName);
    const currentQuestionIndex = useOnboarding((state) => state.currentQuestionIndex);
    const setCurrentQuestionIndex = useOnboarding((state) => state.setCurrentQuestionIndex);
    const addAnswer = useOnboarding((state) => state.addAnswer);
    const removeAnswer = useOnboarding((state) => state.removeAnswer);
    const answers = useOnboarding((state) => state.answers);

    const questions: { [key: number]: string } = {
        0: transOnboarding('Question_1'),
        1: transOnboarding('Question_2', {
            name: name
        }),
        2: transOnboarding('Question_3', {
            education: 'Education'
        }),
    }

    const questionTwoOptions = [
        transOnboarding('Question_2_Option_1'),
        transOnboarding('Question_2_Option_2'),
        transOnboarding('Question_2_Option_3'),
        transOnboarding('Question_2_Option_4'),
        transOnboarding('Question_2_Option_5')
    ]

    const questionThreeOptions = [
        transOnboarding('Question_3_Option_1'),
        transOnboarding('Question_3_Option_2'),
        transOnboarding('Question_3_Option_3'),
        transOnboarding('Question_3_Option_4'),
        transOnboarding('Question_3_Option_5'),
        transOnboarding('Question_3_Option_6'),
        transOnboarding('Question_3_Option_7'),
        transOnboarding('Question_3_Option_8'),
        transOnboarding('Question_3_Option_9')
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 50) {
            setInputValue(e.target.value);
            setIsError(false);
        }
    };

    const handleNextClick = () => {
        console.log('currentQuestionIndex', currentQuestionIndex);

        if (currentQuestionIndex === 2) {
            console.log('answers', answers);
            console.log('去下一个页面');
            return;
        }

        if (inputValue.trim() === '' && currentQuestionIndex === 0) {
            setIsError(true);
        } else {
            if (currentQuestionIndex === 0) {
                setName(inputValue);
            }
            setInputValue('');
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const whenFocus = () => {
        setIsFocused(true)
        setIsError(false);
    }

    const handleOptionClick = (option: string, isMultiple: boolean) => {
        console.log('answer', answers, 'option', option, 'isMultiple', isMultiple);

        if (answers.includes(option)) {
            removeAnswer(option);
        } else {
            if (!isMultiple) {
                // Remove all other answers for single choice question
                answers.forEach(answer => removeAnswer(answer));
            }
            addAnswer(option);
        }
    };

    return (
        <div className='absolute bottom-14 w-7/12 mx-auto bg-white bg-opacity-70 rounded-lg p-12 z-10'>
            <p className='text-center text-[var(--color-text-1,#272330)] font-poppins text-2xl font-semibold leading-[36px] mb-6'>
                {questions[currentQuestionIndex]}
            </p>
            <div className='flex justify-center mb-6'>
                {
                    currentQuestionIndex === 0 && (
                        <div className={`relative rounded-lg w-1/2 ${isFocused ? 'shadow-white' : ''} ${isError ? 'shadow-error' : ''}`}>
                            <Input
                                type='text'
                                id='area'
                                placeholder={transOnboarding('Input_Placeholder')}
                                value={inputValue}
                                onChange={handleInputChange}
                                onFocus={whenFocus}
                                onBlur={() => setIsFocused(false)}
                                className='small-regular w-full focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-white'
                            />
                        </div>
                    )
                }
                {
                    currentQuestionIndex === 1 && (
                        <div className='relative flex flex-wrap gap-4'>
                            {questionTwoOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-start rounded-lg bg-white bg-opacity-40 h-14 px-6 py-1.5 gap-2.5 cursor-pointer hover:bg-white ${answers.includes(option) ? 'bg-opacity-100' : ''}`}
                                    onClick={() => handleOptionClick(option, false)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )
                }
                {
                    currentQuestionIndex === 2 && (
                        <div className='relative flex flex-wrap gap-4'>
                            {questionThreeOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-start rounded-lg bg-white bg-opacity-40 h-14 px-6 py-1.5 gap-2.5 cursor-pointer hover:bg-white ${answers.includes(option) ? 'bg-opacity-100' : ''}`}
                                    onClick={() => handleOptionClick(option, true)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
            <div className="text-right flex items-center justify-end">
                <button
                    className='text-primary cursor-pointer text-white font-poppins text-2xl font-semibold leading-[36px] flex items-center justify-start'
                    onClick={handleNextClick}
                >
                    <span className='flex-grow'>Next</span>
                    <ChevronRight size={24} className='ml-auto h-6 w-6' />
                </button>
            </div>
        </div>
    )
}

export default InteractBlock;
