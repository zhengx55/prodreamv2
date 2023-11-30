'use client';
import { Button } from '../ui/button';
import { Trash2, Upload } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ChangeEvent, useCallback, useState } from 'react';
import { Input } from '../ui/input';
import { v4 } from 'uuid';
import { Textarea } from '../ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { generateActivityList } from '@/query/api';
import { IGenerateActListParams, Mode } from '@/query/type';
import { useToast } from '../ui/use-toast';
import Activityloader from './Activityloader';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/store/storehooks';
import { setActListState } from '@/store/reducers/activityListSlice';

const InputPanel = ({ fullScreen }: { fullScreen: boolean }) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [isGenerating, setIsGenerating] = useState(false);
  const [listOptions, setListOptions] = useState({
    uc: false,
    common: false,
    custom: false,
  });
  const [cutomWordCount, setCustomWordCount] = useState('0');
  const [descriptions, setDescriptions] = useState([
    {
      id: v4(),
      text: '',
      wordCount: 0,
    },
  ]);
  const { mutateAsync: generateActList } = useMutation({
    mutationFn: (params: IGenerateActListParams) =>
      generateActivityList(params),
    onSuccess: (data) => {
      setIsGenerating(false);
      toast({
        description: 'Activity list generated successfully!',
        variant: 'default',
      });
      dispatch(setActListState(data));
    },
    onError: () => {
      setIsGenerating(false);
      toast({
        description: 'Oops something went wrong',
        variant: 'destructive',
      });
    },
  });
  const toogleLoadingModal = useCallback(() => {
    setIsGenerating(false);
  }, []);

  const handleDescriptionChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    id: string
  ) => {
    const value = e.target.value;
    setDescriptions((prevDescriptions) =>
      prevDescriptions.map((description) =>
        description.id === id
          ? { ...description, text: value, wordCount: value.length }
          : description
      )
    );
  };
  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '150' || e.target.value === '350') {
      setCustomWordCount((parseInt(e.target.value) + 50).toString());
    } else if (parseInt(e.target.value) > 1250) {
      return;
    } else {
      setCustomWordCount(e.target.value);
    }
  };
  const handleCheckChange = (check: string | boolean, name: string) => {
    setListOptions((prev) => ({
      ...prev,
      [name]: check,
    }));
  };
  const handleAddNewDescription = () => {
    setDescriptions((prev) => [
      ...prev,
      {
        id: v4(),
        text: '',
        wordCount: 0,
      },
    ]);
  };
  const handleRemoveDescription = (id: string) => {
    const new_descriptions = descriptions.filter((item) => item.id !== id);
    setDescriptions(new_descriptions);
  };

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

  return (
    <motion.div
      initial={{ width: '50%', opacity: 1 }}
      animate={{ width: '50%', opacity: 1 }}
      exit={{ width: '0%', opacity: 0 }}
      className='custom-scrollbar flex min-h-full w-1/2 flex-col gap-y-4 overflow-y-auto pr-2'
    >
      {/* Dialogs here */}

      {isGenerating && (
        <Activityloader
          isGenerating={isGenerating}
          toogleLoadingModal={toogleLoadingModal}
        />
      )}

      {/* file upload */}
      <section className='flex w-full shrink-0 flex-col gap-y-2 rounded-xl bg-white p-6'>
        <h2 className='small-semibold'>
          Start by uploading a file with activity descriptions. We will
          automatically decode it for you.
        </h2>
        <p className='small-regular text-shadow'>
          We support docx, pdf file types.
        </p>
        <Button
          variant={'ghost'}
          className='mt-1 h-full border border-shadow-border py-3 leading-6 shadow-none'
        >
          <Upload />
          Upload
        </Button>
      </section>
      {/* activity description */}
      <section className='flex w-full shrink-0 flex-col gap-y-2 rounded-xl bg-white p-6'>
        <div className='flex-between'>
          <div className='flex gap-x-2'>
            <span className='h-6 w-2 rounded-[10px] bg-primary-200' />
            <p className='title-semibold'>Activity Descriptions</p>
          </div>
          <div className='flex gap-x-5'>
            <div
              onClick={handleAddNewDescription}
              className='small-semibold cursor-pointer text-primary-200 hover:underline'
            >
              + Add Activity
            </div>
          </div>
        </div>
        {descriptions.map((item, index) => (
          <div className='flex-between my-6 gap-x-4' key={item.id}>
            <p className='base-semibold self-start'>
              Activity&nbsp;{index + 1}
            </p>
            <div className='flex w-full flex-col gap-y-1'>
              <Textarea
                onChange={(e) => handleDescriptionChange(e, item.id)}
                value={item.text}
                className='h-[130px]'
              />
              <div className='flex-between'>
                <p className='subtle-regular text-shadow'>
                  {item.wordCount} / 1250 Characters
                </p>
                <div className='flex items-center gap-x-1'>
                  <Trash2 size={16} />
                  <p
                    onClick={() => handleRemoveDescription(item.id)}
                    className='small-medium cursor-pointer hover:underline'
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* activity options */}
      <section className='flex w-full shrink-0 flex-col gap-y-2 rounded-xl bg-white p-6'>
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
                value={cutomWordCount}
                onChange={handleLengthChange}
                type='number'
                step={50}
                className='w-20 py-1 pl-3 pr-1'
              />
            </div>
          )}
        </div>

        <Button onClick={handleGenerate} className='h-full py-3'>
          Generate
        </Button>
      </section>
    </motion.div>
  );
};

export default InputPanel;
