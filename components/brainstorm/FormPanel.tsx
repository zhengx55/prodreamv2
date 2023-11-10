'use client';
import { useBrainStormDetail, useQueryEssay } from '@/query/query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Loading from '../root/CustomLoading';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Switch } from '@/components/ui/switch';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { CheckCheck } from 'lucide-react';
import { TextOptimizeBar } from './TextOptimizeBar';
import {
  clearHistory,
  selectBrainStormHistory,
} from '../../store/reducers/brainstormSlice';
import { useAppDispatch, useAppSelector } from '@/store/storehooks';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { clearEssay, setEssay } from '@/store/reducers/essaySlice';

const FormPanel = ({
  submitPending,
  submitHandler,
}: {
  submitPending: boolean;
  submitHandler: UseMutateAsyncFunction<
    string,
    Error,
    {
      pro_mode: boolean;
      template_id: string;
      word_nums: number;
      texts: string[];
      types: string[];
    },
    unknown
  >;
}) => {
  const pathname = usePathname();
  const id = pathname.split('/')[pathname.split('/').length - 1];
  const { data: moduleData, isPending: isModuleLoading } =
    useBrainStormDetail(id);
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectBrainStormHistory);
  const [taskId, setTaskId] = useState('');
  const { refetch: essayRefetch, data: queryEssay } = useQueryEssay(taskId);
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<Record<string, boolean>>({});
  const [qualityMode, setQualityMode] = useState<0 | 1>(0);
  const testRef = useRef();

  useEffect(() => {
    const pollInterval = setInterval(() => {
      if (queryEssay?.status === 'doing') {
        essayRefetch();
      }
      if (queryEssay?.status === 'done') {
        clearInterval(pollInterval);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [essayRefetch, queryEssay?.status]);

  // queryEssay 返回时填充OutcomePanel
  useEffect(() => {
    if (queryEssay?.text) {
      dispatch(setEssay({ template_id: id, result: queryEssay.text }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, queryEssay?.text]);

  // 从History panel 点击填充表格
  useEffect(() => {
    if (Object.keys(history.questionAnswerPair).length === 0) return;
    if (Object.keys(history.questionAnswerPair).length !== 0) {
      setFormState(history.questionAnswerPair);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const handleFormStateChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormState((values) => ({ ...values, [name]: value }));
  };

  const handleCallbackFormStateChange = useCallback(
    (fileld: string, value: string) => {
      setFormState((prev) => ({ ...prev, [fileld]: value }));
    },
    []
  );

  const handleDisabledWhenFetchingdata = useCallback(
    (fileld: string, value: boolean) => {
      setFormStatus((prev) => ({ ...prev, [fileld]: value }));
    },
    []
  );

  const handleSubmit = async () => {
    dispatch(clearEssay());
    dispatch(clearHistory());
    const result = await submitHandler({
      pro_mode: qualityMode === 1,
      template_id: id,
      texts: Object.values(formState),
      types: Object.keys(formState),
      word_nums: 1000,
    });
    if (result) {
      setTaskId(result);
    }
  };

  const handleClearAll = () => {
    const clearedObjState = Object.fromEntries(
      Object.keys(formState).map((key) => [key, ''])
    );
    setFormState(clearedObjState);
  };

  if (!moduleData || isModuleLoading) {
    return <Loading />;
  }
  return (
    <div className='relative h-full overflow-y-hidden px-6 pb-2 pt-6'>
      <div className='custom-scrollbar relative h-[calc(100%_-_95px)] overflow-y-auto'>
        <div className='flex items-center'>
          <Link
            className='small-regular capitalize text-shadow hover:underline'
            href={'/writtingpal/brainstorm'}
          >
            {pathname.split('/')[2]}
          </Link>
          <p className='small-regular text-black-200'>
            &nbsp;/&nbsp;{moduleData.name}
          </p>
        </div>
        <button
          onClick={() => {
            dispatch(clearEssay());
          }}
        >
          clear
        </button>
        <div className='mt-4 flex flex-col gap-y-4 overflow-y-auto rounded-xl bg-white p-4 md:w-full'>
          <h1 className='h1-regular text-primary-200'>{moduleData.name}</h1>
          <p className=' base-regular text-shadow'>{moduleData.description}</p>
        </div>
        <div className='mt-4 flex flex-col gap-y-4 overflow-y-auto rounded-xl bg-white p-4 md:w-full'>
          <div className='flex-start gap-x-2'>
            <span className='h-6 w-2 rounded-[10px] bg-primary-200' />
            <p className='title-semibold'>Basic Settings</p>
          </div>
          <Separator orientation='horizontal' className='bg-shadow-border' />
          {/* Switch ------------------------------------------------------- */}
          <div className='flex gap-x-2'>
            <Label htmlFor='quality-mode' className='base-semibold flex-[0.3]'>
              High-Quality Mode
              <br />
              <p className='subtle-regular mt-2 text-shadow-100'>
                Generate higher-quality essays but may require more time. Please
                be patient
              </p>
            </Label>
            <div className='relative flex h-full flex-[0.7] items-center gap-x-2'>
              <p>off</p>
              <Switch
                checked={qualityMode === 1}
                onCheckedChange={() => {
                  qualityMode === 0 ? setQualityMode(1) : setQualityMode(0);
                }}
                id='quality-mode'
              />
              <p>on</p>
            </div>
          </div>

          {/* Personal Beta ------------------------------------------------------- */}
          <div className='flex gap-x-2 md:h-[140px]'>
            <Label htmlFor='personal' className='base-semibold flex-[0.3]'>
              Personality <span className=' text-primary-200'>(Beta)</span>
              <br />
              <p className='subtle-regular mt-2 text-shadow-100'>
                With just a few words, WritingPal can highlight your personality
                in the writing
              </p>
            </Label>
            <div className='relative h-full flex-[0.7]'>
              <Textarea
                name='personal'
                id='personal'
                className='h-full w-full pb-8'
                placeholder=''
                value={formState['personal'] ?? ''}
                onChange={handleFormStateChange}
              />
            </div>
          </div>
        </div>
        <div className='mt-4 flex flex-col gap-y-4 overflow-y-hidden rounded-xl bg-white p-4 md:w-full'>
          <div className='flex-start'>
            <span className='h-6 w-2 rounded-[10px] bg-primary-200' />
          </div>
          <Separator orientation='horizontal' className='bg-shadow-border' />
          {moduleData.modules[0].question.map((item) => {
            return (
              <div key={item.id} className='flex gap-x-2 md:h-[160px]'>
                <Label className='small-semibold flex-[0.3]' htmlFor={item.id}>
                  {item.optional === 0 && (
                    <span className='text-red-500'>*&nbsp;</span>
                  )}
                  {item.text}
                </Label>
                <div className='relative h-full flex-[0.7] rounded-lg border border-shadow-border'>
                  <Textarea
                    value={formState[item.id] ?? ''}
                    onChange={handleFormStateChange}
                    name={item.id}
                    id={item.id}
                    className='h-full w-full overflow-y-auto pb-12'
                    placeholder={item.example}
                    disabled={!!formStatus[item.id] || submitPending}
                  />
                  <TextOptimizeBar
                    value={formState[item.id] ?? ''}
                    onChangeHanlder={handleCallbackFormStateChange}
                    mode={qualityMode}
                    questionId={item.id}
                    setDisableHandler={handleDisabledWhenFetchingdata}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='flex-between mt-6 h-[70px] w-full gap-x-4 rounded-lg bg-white px-6 py-4 shadow-bar'>
        <div className='flex items-center gap-x-4'>
          <CheckCheck size={22} className='text-shadow-100' />
          <p className='small-regular text-shadow-100'>
            Remaining Count:6
            <span className='text-black-100'> No Points Needed</span>
          </p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Button variant={'secondary'} onClick={handleClearAll}>
            Clear
          </Button>
          <Button onClick={handleSubmit}>Generate</Button>
        </div>
      </div>
    </div>
  );
};

export default FormPanel;
