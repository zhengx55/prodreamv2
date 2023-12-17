'use client';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import React, { Dispatch, SetStateAction, useState } from 'react';
import ActivityCard from './ActivityCard';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { deepEqual } from '@/lib/utils';
import { useActListContext } from '@/context/ActListProvider';
import TutCard from '../root/TutCard';
import { useMutation } from '@tanstack/react-query';
import { IUsage } from '@/types';
import { updateUserInfo } from '@/query/api';
import { useAppDispatch, useAppSelector } from '@/store/storehooks';
import { selectUsage, setSingleUsage } from '@/store/reducers/usageSlice';
import { selectUserEmail } from '@/store/reducers/userSlice';

const OutputPanel = ({
  fullScreen,
  setFullScreen,
}: {
  fullScreen: boolean;
  setFullScreen: Dispatch<SetStateAction<boolean>>;
}) => {
  const fullScreenVariants: Variants = {
    full: { width: '100%' },
    half: { width: '50%' },
  };
  const [selected, setSelected] = useState('');
  const [tabs, setTabs] = useState<string[]>([]);
  const { generatedData, historyData, showEditTut, setShowEditTut } =
    useActListContext();
  const [content, setContent] = useState<typeof generatedData>({});
  const email = useAppSelector(selectUserEmail);
  const usage = useAppSelector(selectUsage);
  const hasGeneratedData = Object.keys(generatedData).length > 0;
  const hasHistoryData = Object.keys(historyData).length > 0;
  const dispatch = useAppDispatch();

  useDeepCompareEffect(() => {
    if (hasGeneratedData) {
      setContent(generatedData);
    } else if (hasHistoryData) {
      setContent(historyData);
    }
    const data_tabs = Object.keys(
      hasGeneratedData ? generatedData : historyData
    ).map((item) => {
      if (item === '150') {
        return 'UC Applications';
      } else if (item === '350') {
        return 'Common Applications';
      } else {
        return `${item} Character Limit`;
      }
    });
    if (!deepEqual(data_tabs, tabs)) {
      setTabs(data_tabs);
      setSelected(data_tabs[0]);
    }
  }, [generatedData, historyData]);

  const { mutateAsync: updateUsage } = useMutation({
    mutationFn: (args: { email: string; params: IUsage }) =>
      updateUserInfo(args.email, args.params),
    onSuccess: () => {
      dispatch(setSingleUsage('first_activity_list_edit'));
      setShowEditTut(false);
    },
    onError: () => {
      dispatch(setSingleUsage('first_activity_list_edit'));
      setShowEditTut(false);
    },
  });

  const handleCloseTutEdit = async () => {
    await updateUsage({
      email,
      params: { ...usage, first_activity_list_edit: false },
    });
  };

  if (
    Object.keys(historyData).length === 0 &&
    Object.keys(generatedData).length == 0
  )
    return (
      <div className='flex min-h-full w-1/2 pl-2'>
        <div className='h-full w-full rounded-lg bg-white'></div>
      </div>
    );
  return (
    <motion.div
      initial={false}
      variants={fullScreenVariants}
      animate={fullScreen ? 'full' : 'half'}
      className={`flex h-full flex-col gap-y-4 ${fullScreen ? 'pl-0' : 'pl-2'}`}
    >
      <div className='relative flex h-max min-h-full w-full flex-col overflow-y-auto rounded-lg bg-white p-4'>
        <AnimatePresence>
          {showEditTut && (
            <TutCard
              className='right-0 top-[80px] w-[210px]'
              title='Edit outputs here'
              info='Power Up to boost writing quality. Fit Character Limit to reduce characters'
              button='Got it!'
              arrowPosition='bottom'
              onClickHandler={handleCloseTutEdit}
            />
          )}
        </AnimatePresence>

        {fullScreen ? (
          <span
            onClick={() => setFullScreen(!fullScreen)}
            className='small-regular flex w-max cursor-pointer items-center gap-x-2 rounded-sm bg-primary-50 px-2 py-1 text-primary-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='17'
              viewBox='0 0 16 17'
              fill='none'
            >
              <path
                d='M3.34293 2.37671C3.37627 2.20938 3.46093 2.04073 3.61359 1.93873C3.91959 1.73473 4.34759 1.82005 4.55159 2.12671L8.55159 8.12606C8.70025 8.35006 8.70025 8.65273 8.55159 8.87606L4.55159 14.8767C4.34759 15.1827 3.9196 15.268 3.61426 15.064C3.30826 14.86 3.22293 14.4327 3.42627 14.1267L7.17626 8.50138L3.42627 2.87671C3.32427 2.72338 3.3096 2.54338 3.34293 2.37671ZM7.34293 2.37606C7.37626 2.2094 7.46092 2.04073 7.61359 1.93873C7.91959 1.73473 8.34759 1.82006 8.55159 2.12606L12.5516 8.12606C12.7003 8.35006 12.7003 8.65273 12.5516 8.87606L8.55159 14.8761C8.34759 15.1827 7.91959 15.268 7.61426 15.064C7.30826 14.86 7.22293 14.4327 7.42626 14.1261L11.1763 8.50138L7.42626 2.87606C7.32426 2.7234 7.3096 2.5434 7.34293 2.37606Z'
                fill='#9C2CF3'
              />
            </svg>
            <p>Exit full screen & view prompts</p>
          </span>
        ) : (
          <span
            onClick={() => setFullScreen(!fullScreen)}
            className='small-regular flex w-max cursor-pointer items-center gap-x-2 rounded-sm bg-primary-50 px-2 py-1 text-primary-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='17'
              viewBox='0 0 16 17'
              fill='none'
            >
              <path
                d='M12.6571 2.37671C12.6237 2.20938 12.5391 2.04073 12.3864 1.93873C12.0804 1.73473 11.6524 1.82005 11.4484 2.12671L7.44841 8.12606C7.29975 8.35006 7.29975 8.65273 7.44841 8.87606L11.4484 14.8767C11.6524 15.1827 12.0804 15.268 12.3857 15.064C12.6917 14.86 12.7771 14.4327 12.5737 14.1267L8.82374 8.50138L12.5737 2.87671C12.6757 2.72338 12.6904 2.54338 12.6571 2.37671ZM8.65707 2.37606C8.62374 2.2094 8.53908 2.04073 8.38641 1.93873C8.08041 1.73473 7.65241 1.82006 7.44841 2.12606L3.44841 8.12606C3.29975 8.35006 3.29975 8.65273 3.44841 8.87606L7.44841 14.8761C7.65241 15.1827 8.08041 15.268 8.38574 15.064C8.69174 14.86 8.77707 14.4327 8.57374 14.1261L4.82374 8.50138L8.57374 2.87606C8.67574 2.7234 8.6904 2.5434 8.65707 2.37606Z'
                fill='#9C2CF3'
              />
            </svg>
            <p>View in full screen</p>
          </span>
        )}
        <nav className='mt-7 flex w-full'>
          {tabs.map((item) => {
            return (
              <span
                onClick={() => setSelected(item)}
                key={item}
                className={`${
                  tabs.length === 1
                    ? 'w-full'
                    : tabs.length === 2
                      ? 'w-1/2'
                      : 'w-1/3'
                } ${
                  selected === item
                    ? 'border-primary-200'
                    : 'border-shadow-border'
                } flex-center small-semibold cursor-pointer border-b  pb-2`}
              >
                {item}
              </span>
            );
          })}
        </nav>
        <AnimatePresence mode='wait' initial={false}>
          {selected === 'UC Applications' ? (
            <motion.ul
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              key='UC Applications'
              className='mt-6 flex w-full flex-col gap-y-4'
            >
              {content[150].activities.map((activity, index) => {
                return (
                  <ActivityCard
                    type={'150'}
                    dataType={hasGeneratedData ? 'generated' : 'history'}
                    index={index + 1}
                    data={activity}
                    key={activity.id}
                  />
                );
              })}
            </motion.ul>
          ) : selected === 'Common Applications' ? (
            <motion.ul
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              key='Common Applications'
              className='mt-6 flex w-full flex-col gap-y-4'
            >
              {content[350].activities.map((activity, index) => {
                return (
                  <ActivityCard
                    type={'350'}
                    index={index + 1}
                    dataType={hasGeneratedData ? 'generated' : 'history'}
                    data={activity}
                    key={activity.id}
                  />
                );
              })}
            </motion.ul>
          ) : (
            <motion.ul
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              key='Custom character limit'
              className='mt-6 flex w-full flex-col gap-y-4'
            >
              {content[
                Object.keys(content).filter(
                  (item) => !['150', '350'].includes(item)
                )[0]
              ]?.activities.map((activity, index) => {
                return (
                  <ActivityCard
                    type={
                      Object.keys(content).filter(
                        (item) => !['150', '350'].includes(item)
                      )[0]
                    }
                    dataType={hasGeneratedData ? 'generated' : 'history'}
                    index={index + 1}
                    data={activity}
                    key={activity.id}
                  />
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OutputPanel;
