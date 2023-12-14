import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import React, { ChangeEvent, memo } from 'react';

type IDescriptionItem = {
  id: string;
  text: string;
  wordCount: number;
};

type Props = {
  descriptions: IDescriptionItem[];
  handleAddNewDescription: () => void;
  handleRemoveDescription: (id: string) => void;
  handleDescriptionChange: (
    e: ChangeEvent<HTMLTextAreaElement>,
    id: string
  ) => void;
};

const Description = ({
  descriptions,
  handleAddNewDescription,
  handleDescriptionChange,
  handleRemoveDescription,
}: Props) => {
  return (
    <section className='flex w-full shrink-0 flex-col gap-y-2 rounded-xl bg-white p-6'>
      <div className='flex-between'>
        <div className='flex gap-x-2'>
          <span className='h-6 w-2 rounded-[10px] bg-primary-200' />
          <p className='title-semibold'>Activity Descriptions</p>
        </div>
        <div className='flex gap-x-5'>
          <div
            onClick={handleAddNewDescription}
            className='small-semibold cursor-pointer text-primary-200 hover:underline'
          >
            + Add Activity
          </div>
        </div>
      </div>
      {descriptions.map((item, index) => (
        <div className='flex-between my-6 gap-x-4' key={item.id}>
          <p className='base-semibold self-start'>Activity&nbsp;{index + 1}</p>
          <div className='flex w-full flex-col gap-y-1'>
            <Textarea
              name='activity-description'
              onChange={(e) => handleDescriptionChange(e, item.id)}
              value={item.text}
              className='h-[130px] text-regular'
            />
            <div className='flex-between'>
              <p className='subtle-regular text-shadow'>
                {item.wordCount} / 1250 Characters
              </p>
              <div className='flex items-center gap-x-1'>
                <Trash2 size={16} />
                <p
                  onClick={() => handleRemoveDescription(item.id)}
                  className='small-medium cursor-pointer hover:underline'
                >
                  Delete
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default memo(Description);
