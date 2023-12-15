'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { SetStateAction, memo } from 'react';
import { PresetIcons, PresetInstructions } from '@/constant';
import { IChatEditItem } from '@/types';
import { Button } from '../ui/button';
import { ChevronDown, RefreshCwIcon } from 'lucide-react';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import type { IPolishParams } from '@/query/type';

type Props = {
  idx: number;
  isExpand: boolean;
  item: IChatEditItem;
  polish: UseMutateAsyncFunction<any, Error, IPolishParams, void>;
  setPolishResult: (newItem: SetStateAction<IChatEditItem[]>) => void;
};

const ChatEditResItem = ({
  idx,
  isExpand,
  polish,
  setPolishResult,
  item,
}: Props) => {
  const { essayRef } = useAiEditiorContext();
  const handleInsert = (target: IChatEditItem) => {
    if (!essayRef.current) return;
    const eassyContent = essayRef.current.innerText;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const { endOffset, startOffset } = range;
      if (startOffset - endOffset === 0) {
        const updateEassyContent = `${eassyContent.slice(0, startOffset)}${
          target.result
        }${eassyContent.slice(startOffset)}`;
        essayRef.current.innerHTML = `${updateEassyContent}`;
      } else {
        const updateEassyContent = `${eassyContent.slice(0, startOffset)}${
          target.result
        }${eassyContent.slice(endOffset)}`;
        essayRef.current.innerHTML = `${updateEassyContent}`;
      }
    }

    // if both conditions are false, insert to the original text positions and replace the original text
  };

  const handleDismiss = (index: number) => {
    setPolishResult((prev) => {
      return prev.filter((_item, idx) => idx !== index);
    });
  };

  const handleRegenerate = async (item: IChatEditItem) => {
    await polish({ instruction: item.instruction, text: item.original });
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      layout='size'
      data-state={isExpand ? 'open' : 'close'}
      style={{
        height: isExpand ? 'auto' : '90px',
        boxShadow: isExpand
          ? '2px 2px 12px 4px rgba(82, 86, 90, 0.10)'
          : 'none',
      }}
      className='flex shrink-0 select-none flex-col gap-y-2 rounded-lg border px-4 py-2'
    >
      <div
        data-state={isExpand ? 'open' : 'close'}
        className='flex-between [&[data-state=open]>svg]:rotate-180'
      >
        <div className='flex items-center gap-x-2'>
          {PresetInstructions[item.instruction.toString()] ? (
            <Image
              alt={PresetInstructions[item.instruction.toString()]}
              width={24}
              height={24}
              className='h-4 w-4'
              src={PresetIcons[item.instruction.toString()]}
            />
          ) : null}
          <p className='subtle-regular text-shadow'>
            {PresetInstructions[item.instruction.toString()] ??
              item.instruction}
          </p>
        </div>
        <ChevronDown
          size={18}
          onClick={() =>
            setPolishResult((prev) => {
              return prev.map((el, el_index) =>
                el_index === idx ? { ...el, expand: !el.expand } : el
              );
            })
          }
          className='shrink-0 cursor-pointer text-shadow transition-transform duration-200'
        />
      </div>

      {isExpand && (
        <>
          <p className='small-regular'>{item.result}</p>
          <Button
            variant={'ghost'}
            className='subtle-regular flex h-max w-max cursor-pointer items-center gap-x-2 px-0 text-shadow'
            aria-label='regenerate'
            onClick={() => handleRegenerate(item)}
          >
            <RefreshCwIcon size={18} className='text-shadow' />
            Regenerate
          </Button>
          <div className='flex items-start gap-x-2'>
            <Button onClick={() => handleInsert(item)} className='rounded-md'>
              Insert
            </Button>
            <Button
              onClick={() => handleDismiss(idx)}
              variant={'ghost'}
              className='text-shadow'
            >
              Dismiss
            </Button>
          </div>
        </>
      )}
      {!isExpand && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.1 }}
          className='small-regular line-clamp-2'
        >
          {item.result}
        </motion.p>
      )}
    </motion.li>
  );
};

export default memo(ChatEditResItem);
