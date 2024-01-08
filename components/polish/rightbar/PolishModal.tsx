'use client';
import { Slider } from '@/components/root/SvgComponents';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { queryPolish, submitPolish } from '@/query/api';
import { IPolishParams, IPolishResultAData } from '@/query/type';
import useAIEditorStore from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import useObjectState from 'beautiful-react-hooks/useObjectState';
import escapeStringRegExp from 'escape-string-regexp';
import { ChevronRight } from 'lucide-react';
import { memo, useRef, useState } from 'react';
import { toast } from 'sonner';
import Spacer from '../../root/Spacer';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Separator } from '../../ui/separator';

const initialState = {
  polishMentod: 2,
  domains: -1,
  styles: -1,
  lengths: -1,
  customStyle: '',
  customLenght: '',
};

const initialStyles = ['Passionate', 'Entertaining', 'Professional'];
const initialDomains = ['Personal Statement', 'Email', 'Academic Paper'];
const initialPolishMethods = [
  'Whole Paragraph',
  'Paragraph by Paragraph',
  'Sentence by Sentence',
];

const PolishModal = () => {
  const [selected, setSelected] = useObjectState(initialState);
  const setIsPolishing = useAIEditorStore((state) => state.updateIsPolishing);
  const setChatEditMode = useAIEditorStore(
    (state) => state.updateIsChatEditMode
  );
  const setPolishResult = useAIEditorStore((state) => state.updatePolishResult);
  const setPolishResultB = useAIEditorStore(
    (state) => state.updatePolishResultWholeParagraph
  );
  const isPolishing = useAIEditorStore((state) => state.isPolishing);
  const [polishMentod] = useState(initialPolishMethods);
  const [domains] = useState(initialDomains);
  const [styles, setStyles] = useState(initialStyles);
  const [lengths] = useState(['Shorten to', 'Expand to']);
  const customStyleRef = useRef<HTMLInputElement>(null);
  const customLengthRef = useRef<HTMLInputElement>(null);
  const [addCustomStyle, setAddCustomStyle] = useState(false);
  const [addCustomLength, setAddCustomLength] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const reqTimer = useRef<NodeJS.Timeout | undefined>();
  const editor_instance = useAIEditorStore((state) => state.editor_instance);

  const reset = () => {
    setSelected(initialState);
    setStyles(initialStyles);
  };

  const selectPolishMethod = (value: number) => {
    setSelected({ polishMentod: value });
    if (value === 1) {
      if (selected.domains === 1) {
        setSelected({ domains: -1 });
      }
    }
    if (value === 1 || value === 2) {
      if (selected.lengths !== -1) {
        setSelected({ lengths: -1 });
        setAddCustomLength(false);
      }
    }
  };

  const selectDomain = (value: number) => {
    if (value === selected.domains) {
      setSelected({ domains: -1 });
      return;
    }
    setSelected({ domains: value });
  };

  const selectStyle = (value: number) => {
    if (value === selected.styles) {
      setSelected({ styles: -1 });
      return;
    }
    if (value > 2) {
      setSelected({ customStyle: styles[value], styles: value });
      return;
    }
    setSelected({ styles: value, customStyle: '' });
  };

  const selectLength = (value: number) => {
    if (value === selected.lengths) {
      setSelected({ lengths: -1 });
      setAddCustomLength(false);
      return;
    }
    setSelected({ lengths: value });
    setAddCustomLength(true);
  };

  const addNewCustomStyle = () => {
    if (!customStyleRef.current?.value) {
      toast.error('Custom style is required!');
      return;
    }
    if (customStyleRef.current) {
      setStyles((prev) => [...prev, customStyleRef.current!.value]);
      setAddCustomStyle(false);
    }
  };

  const { mutateAsync: polish } = useMutation({
    mutationFn: (params: IPolishParams) => submitPolish(params),
    onMutate: () => {
      setChatEditMode(false);
      setIsPolishing(true);
      // 清除其他功能的样式变化
      editor_instance?.chain().selectAll().unsetHighlight().run();
    },
    onSuccess(data) {
      reqTimer.current = setInterval(async () => {
        try {
          const res = await queryPolish({ task_id: data });
          if (res.status === 'doing') {
          }
          if (res.status === 'done') {
            setIsPolishing(false);
            if (typeof res.result === 'string') {
              setPolishResultB(res.result);
              setPolishResult([]);
            } else {
              setPolishResultB('');
              handleDecorateEassy(res.result);
              setPolishResult(res.result);
            }
            clearInterval(reqTimer.current);
          }
        } catch (error: any) {
          toast.error(error.message);
          clearInterval(reqTimer.current);
        }
      }, 2000);
    },
    onError: (err) => {
      setIsPolishing(false);
      toast.error(err.message);
    },
  });

  // 原文内容划线
  const handleDecorateEassy = (result: IPolishResultAData[]) => {
    if (!editor_instance) return null;
    result.forEach((item) => {
      const range_substring = editor_instance
        .getText()
        .substring(item.start, item.end);
      item.data.forEach((sentence) => {
        if ([2, 3].includes(sentence.status)) {
          if (!range_substring) return;
          let substring_regex: RegExp;
          if (/[^\w\s]+/g.test(sentence.sub_str)) {
            substring_regex = new RegExp(
              escapeStringRegExp(sentence.sub_str),
              'g'
            );
          } else {
            substring_regex = new RegExp(`\\b${sentence.sub_str}\\b`, 'g');
          }
          const originalIndex =
            range_substring.search(substring_regex) + item.start;
          if (originalIndex === -1) return;
          const originalLength = sentence.sub_str.length;
          editor_instance
            .chain()
            .setTextSelection({
              from: originalIndex! + 1,
              to: originalIndex! + originalLength + 1,
            })
            .setPolishUnderline()
            .run();
        }
      });
    });
  };

  const handlePolish = async () => {
    if (!editor_instance) return;
    const eassy_plain_text = editor_instance.getText({
      blockSeparator: '\n\n',
    });

    if (eassy_plain_text.trim() === '') {
      toast.error('No intent is detected');
      return;
    }
    const polish_params: IPolishParams = {
      text: eassy_plain_text.trim()!,
      granularity: selected.polishMentod,
      tone: selected.styles > 2 ? selected.customStyle : selected.styles + 1,
      scenario: selected.domains + 1,
      volume_control: selected.lengths + 1,
      volume_target:
        selected.lengths === -1 ? 0 : parseInt(selected.customLenght),
    };
    await polish(polish_params);
  };

  return (
    <Dialog open={showSetting} onOpenChange={setShowSetting}>
      <div className='flex flex-col gap-y-2 rounded-lg border border-shadow-border p-2'>
        <div className='flex shrink-0 flex-col rounded-lg bg-nav-selected p-2'>
          <h1 className='small-semibold'>Polishing Settings</h1>
          <p className='subtle-regular text-shadow'>
            {polishMentod[selected.polishMentod]}
          </p>
        </div>
        <div className='flex shrink-0 flex-col rounded-lg bg-nav-selected p-2'>
          <h1 className='small-semibold'>Domain</h1>
          <p className='subtle-regular text-shadow'>
            {domains[selected.domains] ?? 'General'}
          </p>
        </div>
        <DialogTrigger>
          <div className='flex-between cursor-pointer p-2'>
            <p className='subtle-regular'>Adjust settings</p>
            <ChevronRight size={14} className='text-shadow' />
          </div>
        </DialogTrigger>
      </div>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='gap-y-0 p-0 md:w-[640px] md:rounded-lg'
      >
        <DialogHeader>
          <DialogTitle asChild>
            <header className='flex items-start gap-x-4 p-0 px-8 pt-4'>
              <Slider />
              <div className='flex flex-col'>
                <p className='h3-bold'>AI Polish Settings</p>
                <p className='small-regular text-shadow'>
                  Customize settings to reach your polishing goal.
                </p>
              </div>
            </header>
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col'>
          <Spacer y='24' />
          <Separator orientation='horizontal' className='bg-shadow-border' />
          <Spacer y='24' />
          <div className='flex gap-x-8 px-8'>
            <h2 className='base-semibold w-20 shrink-0'>Polish method</h2>
            <div className='flex flex-wrap gap-2'>
              {polishMentod.map((item, index) => {
                const isActive = selected.polishMentod === index;
                return (
                  <div
                    onClick={() => selectPolishMethod(index)}
                    key={`polish-method-${index}`}
                    className={`${
                      isActive
                        ? 'small-semibold border-primary-200 bg-primary-50'
                        : 'small-regular border-shadow-border'
                    }  cursor-pointer rounded-lg border px-4 py-2`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <Spacer y='24' />
          <Separator orientation='horizontal' className='bg-shadow-border' />
          <Spacer y='24' />
          <div className='flex gap-x-8 px-8'>
            <h2 className='base-semibold w-20'>Domain</h2>
            <div className='flex flex-wrap gap-2'>
              {domains.map((item, index) => {
                const isActive = selected.domains === index;
                const isDisabled = selected.polishMentod === 1 && index === 1;
                return (
                  <div
                    onClick={() => selectDomain(index)}
                    key={`domains-method-${index}`}
                    className={`
                    ${isDisabled && 'pointer-events-none bg-disabled'}
                    ${
                      isActive
                        ? 'small-semibold border-primary-200 bg-primary-50'
                        : 'small-regular border-shadow-border'
                    }  cursor-pointer rounded-lg border px-4 py-2`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <Spacer y='24' />
          <Separator orientation='horizontal' className='bg-shadow-border' />
          <Spacer y='24' />
          <div className='flex gap-x-8 px-8'>
            <h2 className='base-semibold w-20 shrink-0'>Style</h2>
            <div className='flex flex-wrap gap-2'>
              {styles.map((item, index) => {
                const isActive = selected.styles === index;
                return (
                  <div
                    onClick={() => selectStyle(index)}
                    key={`styles-method-${index}`}
                    className={`${
                      isActive
                        ? 'small-semibold border-primary-200 bg-primary-50'
                        : 'small-regular border-shadow-border'
                    }  cursor-pointer rounded-lg border px-4 py-2`}
                  >
                    {item}
                  </div>
                );
              })}
              <Button
                onClick={() => setAddCustomStyle(true)}
                variant={'secondary'}
                className='border-none p-0'
              >
                + Add New Style
              </Button>
              {addCustomStyle ? (
                <div className='flex items-center gap-x-4 rounded-lg border border-shadow-border bg-nav-selected px-4 py-2'>
                  <h2 className='base-semibold'>Describe new style:</h2>
                  <div className='flex gap-x-2'>
                    <Input
                      ref={customStyleRef}
                      type='text'
                      name='custom-style'
                    />
                    <Button onClick={addNewCustomStyle}>Add</Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <Spacer y='24' />
          <Separator orientation='horizontal' className='bg-shadow-border' />
          <Spacer y='24' />
          <div className='flex gap-x-8 px-8'>
            <h2 className='base-semibold w-20'>Length</h2>
            <div className='flex flex-wrap gap-2'>
              {lengths.map((item, index) => {
                const isActive = selected.lengths === index;
                const isDisbaled =
                  selected.polishMentod === 1 || selected.polishMentod === 2;
                return (
                  <div
                    onClick={() => selectLength(index)}
                    key={`lenghts-method-${index}`}
                    className={`
                    ${isDisbaled && 'pointer-events-none bg-disabled'} 
                    ${
                      isActive
                        ? 'small-semibold border-primary-200 bg-primary-50'
                        : 'small-regular border-shadow-border'
                    }  cursor-pointer rounded-lg border px-4 py-2`}
                  >
                    {item}
                  </div>
                );
              })}
              {addCustomLength ? (
                <div className='flex items-center gap-x-4 rounded-lg border border-shadow-border bg-nav-selected px-4 py-2'>
                  <h2 className='base-semibold'>Expected length:</h2>
                  <Input
                    ref={customLengthRef}
                    type='number'
                    onChange={() => {
                      setSelected({
                        customLenght: customLengthRef.current?.value,
                      });
                    }}
                    min={50}
                    className='w-20'
                    step={50}
                    name='custom-length'
                  />
                </div>
              ) : null}
            </div>
          </div>
          <Spacer y='24' />
          <div className='flex justify-end gap-x-4 bg-primary-50 px-8 py-4'>
            <DialogClose asChild>
              <Button
                onClick={reset}
                variant={'secondary'}
                className='border-none'
              >
                Reset to Default
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  toast.success('Successfully save your polish paramters!');
                }}
              >
                Save
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
      <Spacer y='20' />
      <div className='flex gap-x-2'>
        <Button
          disabled={isPolishing}
          onClick={reset}
          variant={'outline'}
          className='w-1/2'
        >
          Reset
        </Button>
        <Button disabled={isPolishing} onClick={handlePolish} className='w-1/2'>
          Polish
        </Button>
      </div>
    </Dialog>
  );
};

export default memo(PolishModal);
