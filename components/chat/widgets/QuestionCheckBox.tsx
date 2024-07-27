import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import QuestionBtn from './QuestionBtn';

interface Option {
  id: string;
  label: string;
}

interface QuestionCheckBoxProps {
  options: Option[];
  onConfirm: (selectedOptions: string[]) => void;
}

const QuestionCheckBox: React.FC<QuestionCheckBoxProps> = ({
  options,
  onConfirm,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id)
        ? prev.filter((optionId) => optionId !== id)
        : [...prev, id]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedOptions);
  };

  return (
    <div className='flex flex-col gap-2'>
      {options.map((option) => (
        <label
          key={option.id}
          className={`flex cursor-pointer items-center gap-2 self-stretch rounded-[10px] border px-4 py-[10px]
                    ${
                      selectedOptions.includes(option.id)
                        ? 'border-[#7270E8] bg-[#F4F4FF] text-[#7270E8]'
                        : 'border-transparent bg-white text-[#57545E]'
                    }
                    transition-all duration-200 ease-in-out hover:border-transparent hover:bg-[#F4F4FF] hover:text-[#7270E8]`}
        >
          <Checkbox
            id={option.id}
            checked={selectedOptions.includes(option.id)}
            onCheckedChange={() => toggleOption(option.id)}
            className='border-[#57545E] data-[state=checked]:border-[#7270E8] data-[state=checked]:bg-[#7270E8]'
          />
          <span className='truncate font-poppins text-sm font-normal leading-6'>
            {option.label}
          </span>
        </label>
      ))}
      <div className='flex justify-end'>
        <QuestionBtn
          onClick={handleConfirm}
          disabled={selectedOptions.length === 0}
          className='mt-[10px] w-[120px] rounded-lg'
        >
          Confirm
        </QuestionBtn>
      </div>
    </div>
  );
};

export default QuestionCheckBox;
