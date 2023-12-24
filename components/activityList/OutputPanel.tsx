'use client';
import { useActListContext } from '@/context/ActListProvider';
import { deepEqual } from '@/lib/utils';
import { updateUserInfo } from '@/query/api';
import { selectUsage, setSingleUsage } from '@/store/reducers/usageSlice';
import { selectUserEmail } from '@/store/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/storehooks';
import { IUsage } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, Variants, m } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { DoubleArrow, DoubleArrowLeft } from '../root/SvgComponents';
import TutCard from '../root/TutCard';
import ActivityCard from './ActivityCard';

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
    <m.div
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
            <DoubleArrow />
            <p>Exit full screen & view prompts</p>
          </span>
        ) : (
          <span
            onClick={() => setFullScreen(!fullScreen)}
            className='small-regular flex w-max cursor-pointer items-center gap-x-2 rounded-sm bg-primary-50 px-2 py-1 text-primary-200'
          >
            <DoubleArrowLeft />
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
            <m.ul
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
            </m.ul>
          ) : selected === 'Common Applications' ? (
            <m.ul
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
            </m.ul>
          ) : (
            <m.ul
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
            </m.ul>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
};

export default OutputPanel;
