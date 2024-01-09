'use client';
import React, { FC, Fragment, ReactNode } from 'react';

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
  const baseClassName = 'font-semibold';
  let className = '';
  let content: ReactNode | null = null;

  if (isNoChange) {
    className = 'text-black-400 ';
    content = <span className={className}>{sentence.sub_str}</span>;
  } else if (isAdd) {
    className = 'text-primary-200 ' + baseClassName;
    content = (
      <>
        {''}
        <span className={className}> {sentence.new_str} </span>
        {sentence.sub_str && (
          <span className='text-black-400'>{sentence.sub_str}</span>
        )}{' '}
      </>
    );
  } else if (isDelete) {
    className = 'text-red-500 line-through ' + baseClassName;
    content = (
      <>
        {' '}
        <span className={className}>{sentence.sub_str}</span>{' '}
      </>
    );
  } else if (isModify) {
    className = 'text-red-500 line-through ' + baseClassName;
    content = (
      <>
        {' '}
        <span className={className}>{sentence.sub_str}</span>{' '}
        <span className='font-semibold text-primary-200'>
          {sentence.new_str}
        </span>{' '}
      </>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default SentenceFragment;
