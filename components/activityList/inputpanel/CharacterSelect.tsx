import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useActListContext } from '@/context/ActListProvider';
import clearCachesByServerAction from '@/lib/revalidate';
import { generateActivityList } from '@/query/api';
import { IGenerateActListParams, Mode } from '@/query/type';
import { useMutation } from '@tanstack/react-query';
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
  const { toast } = useToast();
  const [listOptions, setListOptions] = useState({
    uc: false,
    common: false,
    custom: false,
  });
  const [cutomWordCount, setCustomWordCount] = useState('50');
  const { setGeneratedData, setHistoryData, historyData } = useActListContext();
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
      toast({
        description: 'Activity list generated successfully!',
        variant: 'default',
      });
      setHistoryData({});
      setGeneratedData(data);
      clearCachesByServerAction('/writtingpal/activityList/history');
    },
    onError: () => {
      setIsGenerating(false);
      toast({
        description: 'Oops something went wrong',
        variant: 'destructive',
      });
    },
  });

  const handleGenerate = async () => {
    const texts: string[] = [];
    const lengths: number[] = [];
    descriptions.map((item) => {
      texts.push(item.text);
    });
    if (texts.length === 1 && texts[0] === '') {
      toast({
        description: 'please fill in you activity description',
        variant: 'destructive',
      });
      return;
    }
    if (listOptions.custom && parseInt(cutomWordCount) === 0) {
      toast({
        description: 'custome character limit can not be 0',
        variant: 'destructive',
      });
      return;
    }
    listOptions.uc && lengths.push(150);
    listOptions.common && lengths.push(350);
    listOptions.custom && lengths.push(parseInt(cutomWordCount));
    if (lengths.length === 0) {
      toast({
        description: 'select at lease  one activity list type',
        variant: 'destructive',
      });
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
  return (
    <section className='relative flex w-full shrink-0 flex-col gap-y-2 overflow-visible rounded-xl bg-white p-6'>
      <TutCard
        className='bottom-[80px] left-[calc(50%_-95px)] w-[190px]'
        title='Click here to generate!'
        button='Okay!'
        arrowPosition='bottom'
        buttonClassName='w-full'
      />
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
