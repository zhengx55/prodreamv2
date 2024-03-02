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

const SentenceFragment: FC<SentenceProps> = ({
  sentence,
  isNoChange,
  isAdd,
  isDelete,
  isModify,
}) => {
  let className = '';
  let content: ReactNode | null = null;

  if (isNoChange) {
    className = 'text-black-400';
    content = <span className={className}>{sentence.sub_str}</span>;
  } else if (isAdd) {
    className = 'text-doc-primary small-semibold';
    content = <span className={className}>{sentence.new_str}</span>;
  } else if (isDelete) {
    className = 'text-red-500 line-through small-semibold';
    content = <span className={className}>{sentence.sub_str}</span>;
  } else if (isModify) {
    className = 'text-red-500 line-through small-semibold';
    content = (
      <Fragment>
        <span className='small-semibold text-doc-primary'>
          {sentence.sub_str}
        </span>
        <span className='small-semibold text-red-500'>{sentence.new_str}</span>
      </Fragment>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default SentenceFragment;
