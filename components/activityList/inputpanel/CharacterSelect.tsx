import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useActListContext } from '@/context/ActListProvider';
import clearCachesByServerAction from '@/lib/revalidate';
import { generateActivityList, updateUserInfo } from '@/query/api';
import { IGenerateActListParams, Mode } from '@/query/type';
import { selectUsage, setSingleUsage } from '@/store/reducers/usageSlice';
import { selectUserEmail } from '@/store/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/storehooks';
import type { IUsage } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { ChangeEvent, memo, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
const TutCard = dynamic(() => import('../../root/TutCard'), { ssr: false });

type IDescriptionItem = {
  id: string;
  text: string;
  wordCount: number;
};
type Props = {
  descriptions: IDescriptionItem[];
  isDecoding: boolean;
  setIsGenerating: (value: boolean) => void;
};

const CharacterSelect = ({
  descriptions,
  isDecoding,
  setIsGenerating,
}: Props) => {
  const dispatch = useAppDispatch();
  const usage = useAppSelector(selectUsage);
  const email = useAppSelector(selectUserEmail);
  const [listOptions, setListOptions] = useState({
    uc: false,
    common: false,
    custom: false,
  });
  const [cutomWordCount, setCustomWordCount] = useState('50');
  const {
    setGeneratedData,
    showGenerateTut,
    setShowEditTut,
    setHistoryData,
    historyData,
  } = useActListContext();
  const hasHistoryData = Object.keys(historyData).length > 0;

  useDeepCompareEffect(() => {
    if (hasHistoryData) {
      const keys = Object.keys(historyData);
      keys.forEach((key) => {
        if (key === '150') {
          setListOptions((prev) => ({ ...prev, uc: true }));
        } else if (key === '350') {
          setListOptions((prev) => ({ ...prev, common: true }));
        } else {
          setListOptions((prev) => ({ ...prev, custom: true }));
          setCustomWordCount(key);
        }
      });
    }
  }, [historyData]);

  const handleCheckChange = (check: string | boolean, name: string) => {
    setListOptions((prev) => ({
      ...prev,
      [name]: check,
    }));
  };

  const { mutateAsync: generateActList } = useMutation({
    mutationFn: (params: IGenerateActListParams) =>
      generateActivityList(params),
    onSuccess: (data) => {
      setIsGenerating(false);
      toast.success('Activity list generated successfully!');
      setHistoryData({});
      setGeneratedData(data);
      if (
        (Object.keys(usage).length > 0 && usage.first_activity_list_edit) ||
        usage.first_activity_list_edit === undefined
      ) {
        setShowEditTut(true);
      }
      clearCachesByServerAction('/writtingpal/activityList/history');
    },
    onError: () => {
      setIsGenerating(false);
      toast.error('Oops something went wrong');
    },
  });

  const handleGenerate = async () => {
    const texts: string[] = [];
    const lengths: number[] = [];
    descriptions.map((item) => {
      texts.push(item.text);
    });
    if (texts.length === 1 && texts[0] === '') {
      toast.error('please fill in you activity description');
      return;
    }
    if (listOptions.custom && parseInt(cutomWordCount) === 0) {
      toast.error('custome character limit can not be 0');
      return;
    }
    listOptions.uc && lengths.push(150);
    listOptions.common && lengths.push(350);
    listOptions.custom && lengths.push(parseInt(cutomWordCount));
    if (lengths.length === 0) {
      toast.error('select at lease  one activity list type');
      return;
    }
    const params: IGenerateActListParams = {
      mode: Mode.Generate,
      texts,
      lengths,
      power_up: false,
    };
    setIsGenerating(true);
    await generateActList(params);
  };

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '150' || e.target.value === '350') {
      if (parseInt(cutomWordCount) > parseInt(e.target.value)) {
        setCustomWordCount((parseInt(e.target.value) - 50).toString());
      } else {
        setCustomWordCount((parseInt(e.target.value) + 50).toString());
      }
    } else {
      setCustomWordCount(e.target.value);
    }
  };

  const { mutateAsync: updateUsage } = useMutation({
    mutationFn: (args: { email: string; params: IUsage }) =>
      updateUserInfo(args.email, args.params),
    onSuccess: () => {
      dispatch(setSingleUsage('first_activity_list_generate'));
    },
    onError: () => {
      dispatch(setSingleUsage('first_activity_list_generate'));
    },
  });

  const handleCloseTutGenerate = async () => {
    await updateUsage({
      email,
      params: { ...usage, first_activity_list_upload: false },
    });
  };

  return (
    <section className='relative flex w-full shrink-0 flex-col gap-y-2 overflow-visible rounded-xl bg-white p-6'>
      <AnimatePresence>
        {showGenerateTut && (
          <TutCard
            className='bottom-[80px] left-[calc(50%_-95px)] w-[190px]'
            title='Click here to generate!'
            button='Okay!'
            arrowPosition='bottom'
            buttonClassName='w-full'
            onClickHandler={handleCloseTutGenerate}
          />
        )}
      </AnimatePresence>
      <h2 className='base-semibold'>Which activity list are you filling?</h2>
      <p className='small-regular text-shadow'>
        We will help you reduce to the required character limit and power up
        your wording.
      </p>
      <div className='my-4 flex flex-col gap-y-4'>
        <div className='flex items-center gap-x-2'>
          <Checkbox
            checked={listOptions.uc}
            onCheckedChange={(check) => handleCheckChange(check, 'uc')}
            name='uc'
            id='terms1'
          />
          <label htmlFor='terms1' className='small-regular'>
            UC Applications
          </label>
        </div>
        <div className='flex items-center gap-x-2'>
          <Checkbox
            checked={listOptions.common}
            onCheckedChange={(check) => handleCheckChange(check, 'common')}
            name='common'
            id='terms2'
          />
          <label htmlFor='terms2' className='small-regular'>
            Common Applications
          </label>
        </div>
        <div className='flex items-center gap-x-2'>
          <Checkbox
            checked={listOptions.custom}
            onCheckedChange={(check) => handleCheckChange(check, 'custom')}
            name='custom'
            id='terms3'
          />
          <label htmlFor='terms3' className='small-regular'>
            Customize Character Limit
          </label>
        </div>
        {listOptions.custom && (
          <div className='ml-5 flex w-max items-center gap-x-4 rounded-lg border border-shadow-border bg-shadow-50 px-4 py-2'>
            <h2 className='small-semibold'>Expected length:</h2>
            <Input
              min={50}
              max={1250}
              value={cutomWordCount}
              onChange={handleLengthChange}
              type='number'
              step={50}
              className='w-20 py-1 pl-3 pr-1'
            />
          </div>
        )}
      </div>
      <Button
        id='act-tut-02'
        disabled={isDecoding}
        variant={'ghost'}
        onClick={handleGenerate}
        className='h-full border border-shadow-border py-3'
      >
        Generate
      </Button>
    </section>
  );
};

export default memo(CharacterSelect);
