'use client';
import { memo, useMemo, useState } from 'react';

type Props = { show: boolean; toggleShow: () => void };

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { useInstitutionOptions } from '@/query/query';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const OptionsMenu = ({ show, toggleShow }: Props) => {
  const [category, setCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const {
    data: rateOptions,
    isPending: isOptionsPending,
    isError: isOptionsError,
  } = useInstitutionOptions();

  const categories = useMemo(() => {
    if (isOptionsError) {
      return [];
    } else {
      return rateOptions?.map((option) => option.title);
    }
  }, [isOptionsError, rateOptions]);

  const prompts = useMemo(() => {
    if (category) {
      return rateOptions?.find((option) => option.title === category)?.prompts;
    } else {
      return [];
    }
  }, [category, rateOptions]);

  if (isOptionsPending) {
    return (
      <div className='flex-center absolute -left-[450px] top-10 h-[300px] w-[430px] shrink-0 rounded-lg border border-shadow-border bg-white'>
        <Loader2 className='animate-spin' />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className='absolute -left-[450px] top-10 min-h-[300px] w-[430px] shrink-0 rounded-lg border border-shadow-border bg-white px-4 py-4'
    >
      <h2 className='title-semibold'>Select Essay Prompt</h2>
      <Spacer y='14' />
      <p className='base-regular'>What kind of essay are you reviewing?</p>
      <Spacer y='14' />
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className='w-[300px]'>
          <SelectValue placeholder='Select essay type' />
        </SelectTrigger>
        <SelectContent className='bg-white '>
          {categories?.map((category) => {
            return (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Spacer y='14' />
      <p className='base-regular'>Select essay prompt</p>
      <Spacer y='14' />
      <Select value={prompt} onValueChange={setPrompt}>
        <SelectTrigger className='w-[300px]'>
          <SelectValue placeholder='Select essay prompt' />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          {prompts?.map((prompt) => {
            return (
              <SelectItem key={prompt.id} value={prompt.title}>
                {prompt.title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Spacer y='14' />

      <div className='flex justify-end gap-x-2'>
        <Button onClick={() => toggleShow()} variant={'ghost'}>
          Cancel
        </Button>
        <Button>Done</Button>
      </div>
    </motion.div>
  );
};

export default memo(OptionsMenu);
