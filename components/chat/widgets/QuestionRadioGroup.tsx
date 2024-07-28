import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import QuestionBtn from './QuestionBtn';

interface Option {
  id: string;
  label: string;
}

interface QuestionRadioGroupProps {
  options: Option[];
  onConfirm: (selectedOption: string) => void;
}

const QuestionRadioGroup: React.FC<QuestionRadioGroupProps> = ({
  options,
  onConfirm,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedOption) {
      onConfirm(selectedOption);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <RadioGroup
        onValueChange={setSelectedOption}
        value={selectedOption || undefined}
      >
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex cursor-pointer items-center gap-2 self-stretch rounded-[10px] border px-4 py-[10px]
                        ${
                          selectedOption === option.id
                            ? 'border-[#7270E8] bg-[#F4F4FF] text-[#7270E8]'
                            : 'border-transparent bg-white text-[#57545E]'
                        }
                        transition-all duration-200 ease-in-out hover:border-transparent hover:bg-[#F4F4FF] hover:text-[#7270E8]`}
          >
            <RadioGroupItem
              value={option.id}
              id={option.id}
              className='border-[#57545E] text-[#7270E8]'
            />
            <span className='truncate font-poppins text-sm font-normal leading-6'>
              {option.label}
            </span>
          </label>
        ))}
      </RadioGroup>
      <div className='flex justify-end'>
        <QuestionBtn
          onClick={handleConfirm}
          disabled={!selectedOption}
          className='mt-[10px] w-[120px] rounded-lg'
        >
          Confirm
        </QuestionBtn>
      </div>
    </div>
  );
};

export default QuestionRadioGroup;
