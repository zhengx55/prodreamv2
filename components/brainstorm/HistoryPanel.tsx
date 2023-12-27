'use client';
import {
  addRandomToDuplicates,
  deepEqual,
  formatTimestamphh,
} from '@/lib/utils';
import { IBrainstormHistory } from '@/query/type';
import { InputProps } from '@/types';
import useRootStore from '@/zustand/store';
import { m } from 'framer-motion';
import { memo } from 'react';
const HistoryPanel = ({
  handleTabChange,
  data,
}: {
  handleTabChange: (value: number) => void;
  data: IBrainstormHistory;
}) => {
  const historyData = useRootStore((state) => state.bshistoryData);
  const setHistoryData = useRootStore((state) => state.updatebsHistoryData);
  const handleSelectHistory = (item: {
    template_id: string;
    create_time: string;
    question_ids: string[];
    answers: string[];
    result: string;
    word_num: string;
  }) => {
    const filtered_array = addRandomToDuplicates(item.question_ids);
    const mergedObject = filtered_array.reduce(
      (result: Record<string, InputProps>, key: string, index: number) => {
        result[key] = { value: item.answers[index], disable: false };
        return result;
      },
      {}
    );
    if (
      !deepEqual(historyData.questionAnswerPair, mergedObject) ||
      historyData.result !== item.result
    ) {
      // clear current output before fill in the history data
      setHistoryData({
        template_id: item.template_id,
        result: item.result,
        questionAnswerPair: mergedObject,
      });
      handleTabChange(0);
    }
  };

  return (
    <m.div
      key={'history'}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='grid w-full grid-cols-2 gap-x-4 gap-y-4'
    >
      {/* Card */}
      {data.data.map((item, index) => {
        return (
          <div
            onClick={() => handleSelectHistory(item)}
            key={`history-${item.template_id}-${index}`}
            className='flex cursor-pointer flex-col justify-between rounded-lg bg-white p-4 hover:border hover:border-primary-200 md:h-[200px] md:w-[full]'
          >
            <p className='small-regular line-clamp-6 text-left text-shadow'>
              {item.result}
            </p>
            <p className='small-regular text-primary-200'>
              {formatTimestamphh(item.create_time)}
            </p>
          </div>
        );
      })}
    </m.div>
  );
};

const MemoizedHistoryPanel = memo(HistoryPanel);
export default MemoizedHistoryPanel;
