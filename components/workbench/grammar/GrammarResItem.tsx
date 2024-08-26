'use client';
import { FC, Fragment, ReactNode } from 'react';

interface Sentence {
  sub_str: string;
  new_str: string;
}

interface SentenceProps {
  sentence: Sentence;
  isNoChange: boolean;
  isAdd: boolean;
  isDelete: boolean;
  isModify: boolean;
}

const Item: FC<SentenceProps> = ({
  sentence,
  isNoChange,
  isAdd,
  isDelete,
  isModify,
}) => {
  let className = '';
  let content: ReactNode | null = null;

  if (isNoChange) {
    className = 'text-black';
    content = <span className={className}>{sentence.sub_str}</span>;
  } else if (isAdd) {
    className = 'text-indigo-500 small-regular';
    content = <span className={className}>{sentence.new_str}</span>;
  } else if (isDelete) {
    className = 'text-red-500 line-through small-regular';
    content = <span className={className}>{sentence.sub_str}</span>;
  } else if (isModify) {
    content = (
      <Fragment>
        <span className='small-regular text-red-500 line-through'>
          {sentence.sub_str}
        </span>
        <span className='small-regular text-indigo-500'>
          {sentence.new_str}
        </span>
      </Fragment>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default Item;
