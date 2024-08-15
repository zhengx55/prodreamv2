import Spacer from '@/components/root/Spacer';
import { Checkbox } from '@/components/ui/checkbox';
import { memo } from 'react';
import Markdown from 'react-markdown';

type Props = {
  id: string;
  title: string;
  content: string;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  isMarkdown?: boolean;
  unselectable?: boolean;
};

const ModalOptionsCard = ({
  id,
  title,
  content,
  isSelected,
  onSelect,
  isMarkdown,
  unselectable,
}: Props) => {
  return (
    <div
      key={id}
      role='button'
      onClick={() => {
        if (onSelect) {
          onSelect(id);
        }
      }}
      className={`${isSelected ? 'border-indigo-500' : 'border-zinc-200'} flex h-[138px] w-full cursor-pointer flex-col rounded-lg border bg-white px-4 py-2.5 hover:opacity-70`}
    >
      <div className='flex-between'>
        <h3 className='base-semibold line-clamp-1 max-w-[60%] text-zinc-800'>
          {title}
        </h3>
        {!unselectable && (
          <Checkbox name={title} checked={isSelected} className='rounded' />
        )}
      </div>
      <Spacer y='8' />
      {isMarkdown ? (
        <Markdown className='prose prose-sm line-clamp-4 text-zinc-600 prose-p:my-1 prose-ol:my-1 prose-ul:my-1'>
          {content}
        </Markdown>
      ) : (
        <p className='line-clamp-4 text-sm leading-normal text-zinc-600'>
          {content}
        </p>
      )}
    </div>
  );
};

export default memo(ModalOptionsCard);
