'use client';
import { useBrainStormHistoryById } from '@/query/query';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Loading from '../root/CustomLoading';
import {
  addRandomToDuplicates,
  deepEqual,
  formatTimestamphh,
} from '@/lib/utils';
import { memo } from 'react';
import { useBrainStormContext } from '@/context/BrainStormProvider';
import { InputProps } from '@/types';
const HistoryPanel = ({
  handleTabChange,
}: {
  handleTabChange: (value: number) => void;
}) => {
  const path = usePathname();
  const { historyData, setHistoryData } = useBrainStormContext();
  const id = path.split('/')[path.split('/').length - 1];
  const { isPending, data, isError } = useBrainStormHistoryById(id);
  if (isPending) {
    return <Loading />;
  }
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
    <motion.div
      key={'history'}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='md:grid md:w-full md:grid-cols-2 md:gap-x-4 md:gap-y-4'
    >
      {/* Card */}
      {!isPending &&
        data?.data?.map((item, index) => {
          return (
            <div
              onClick={() => handleSelectHistory(item)}
              key={`history-${item.template_id}-${index}`}
              className='flex cursor-pointer flex-col justify-between rounded-lg bg-white p-5 hover:border hover:border-primary-200 md:h-[200px] md:w-[full]'
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
    </motion.div>
  );
};

const MemoizedHistoryPanel = memo(HistoryPanel);
export default MemoizedHistoryPanel;
