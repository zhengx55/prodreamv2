'use client';
import { PresetIcons, PresetInstructions } from '@/constant';
import type { IPolishParams } from '@/query/type';
import { IChatEditItem } from '@/types';
import useRootStore from '@/zustand/store';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronDown, RefreshCwIcon } from 'lucide-react';
import Image from 'next/image';
import { SetStateAction, memo } from 'react';
import { Button } from '../../ui/button';

type Props = {
  idx: number;
  isExpand: boolean;
  item: IChatEditItem;
  range: {
    from: number;
    to: number;
  } | null;
  polish: UseMutateAsyncFunction<any, Error, IPolishParams, void>;
  setPolishResult: (newItem: SetStateAction<IChatEditItem[]>) => void;
  resetRange: () => void;
};

const ChatEditResItem = ({
  idx,
  isExpand,
  polish,
  setPolishResult,
  range,
  item,
  resetRange,
}: Props) => {
  const editor_instance = useRootStore((state) => state.editor_instance);
  const handleInsert = (target: IChatEditItem) => {
    if (!editor_instance) return;
    if (range) {
      editor_instance
        .chain()
        .deleteRange({ from: range.from, to: range.to })
        .insertContentAt(range.from, target.result)
        .run();
      resetRange();
    } else {
      const { from } = editor_instance.state.selection;
      editor_instance.chain().insertContentAt(from, target.result).run();
      resetRange();
    }
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
