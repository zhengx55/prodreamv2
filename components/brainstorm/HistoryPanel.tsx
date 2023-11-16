'use client';
import { useBrainStormHistoryById } from '@/query/query';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import Loading from '../root/CustomLoading';
import {
  addRandomToDuplicates,
  deepEqual,
  formatTimestamphh,
} from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/storehooks';
import {
  clearHistory,
  selectBrainStormHistory,
  setBrainstormHistoryHistory,
} from '@/store/reducers/brainstormSlice';
import { clearEssay } from '@/store/reducers/essaySlice';
import { memo } from 'react';
const HistoryPanel = ({
  handleTabChange,
}: {
  handleTabChange: (value: number) => void;
}) => {
  const path = usePathname();
  const dispatch = useAppDispatch();
  const currentBrainStormHistory = useAppSelector(selectBrainStormHistory);
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
      (result: Record<string, string>, key: string, index: number) => {
        console.log(key);
        result[key] = item.answers[index];
        return result;
      },
      {}
    );
    if (
      !deepEqual(currentBrainStormHistory.questionAnswerPair, mergedObject) ||
      currentBrainStormHistory.result !== item.result
    ) {
      // clear current output before fill in the history data
      dispatch(clearEssay());
      dispatch(
        setBrainstormHistoryHistory({
          template_id: item.template_id,
          result: item.result,
          questionAnswerPair: mergedObject,
        })
      );
      // handleTabChange(0);
    }
  };

  return (
    <motion.div
      key={'history'}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='mt-2 md:grid md:w-full md:grid-cols-2 md:gap-x-4 md:gap-y-4'
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
              <p className='small-regular text-left text-shadow'>
                {item.result.length > 200
                  ? `${item.result.slice(0, 200)}...`
                  : item.result}
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

const HistoryPanelCSR = dynamic(() => Promise.resolve(HistoryPanel), {
  ssr: false,
});

const MemoizedHistoryPanelCSR = memo(HistoryPanelCSR);
export default MemoizedHistoryPanelCSR;
