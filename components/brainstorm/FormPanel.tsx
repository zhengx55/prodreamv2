'use client';
import Link from 'next/link';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Switch } from '@/components/ui/switch';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { CheckCheck } from 'lucide-react';
import { TextOptimizeBar } from './TextOptimizeBar';
import { useAppSelector } from '@/store/storehooks';
import { useMutation } from '@tanstack/react-query';
import type { IBrainStormSection, IBriansotrmReq, Module } from '@/query/type';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { selectUserId } from '@/store/reducers/userSlice';
import { useBrainStormContext } from '@/context/BrainStormProvider';
import { SubmitEssayWritting, queryEssayResult } from '@/query/api';

type InputProps = {
  value: string;
  disable: boolean;
};

const FormPanel = ({ templateData }: { templateData: IBrainStormSection }) => {
  const user_id = useAppSelector(selectUserId);
  const {
    setIsSubmiting,
    setSubmitError,
    historyData,
    setHistoryData,
    setStartTyping,
    setEassyResult,
    isSubmiting,
  } = useBrainStormContext();
  const [formData, setFormData] = useState<IBrainStormSection>(templateData);
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<Record<string, boolean>>({});
  const [qualityMode, setQualityMode] = useState<0 | 1>(0);
  const queryTimer = useRef<NodeJS.Timeout>();

  // 从History panel 点击填充表格
  /**
   * 当history中包含带有+号的key时表示某个form单元有multiple个
   * 需要找出所有带有➕的元素并将表格元素添加
   */
  useDeepCompareEffect(() => {
    if (Object.keys(historyData.questionAnswerPair).length === 0) return;
    if (Object.keys(historyData.questionAnswerPair).length !== 0) {
      if (!formData) return;
      let keysWithPlus = Object.keys(historyData.questionAnswerPair).filter(
        (key) => key.includes('+')
      );
      if (keysWithPlus.length > 0) {
        const keysOfMultiple = keysWithPlus[0].split('+')[0];
        const originalQuestion = formData.modules.find(
          (item) => item.question[0].id === keysOfMultiple
        );
        if (originalQuestion !== undefined) {
          let newQuestion = [...originalQuestion.question];
          const originalModuleId = originalQuestion?.id;
          keysWithPlus.forEach((item) => {
            newQuestion = [...newQuestion, { ...newQuestion[0], id: item }];
          });
          const updatedModules = formData.modules.map((module) => {
            if (module.id === originalModuleId) {
              return { ...module, question: newQuestion };
            }
            return module;
          });
          const updatedObj = { ...formData, modules: updatedModules };
          setFormData(updatedObj);
        }
      }
      setFormState(historyData.questionAnswerPair);
    }
  }, [historyData]);

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
  const handleModuleRemove = (item: Module) => {
    if (!formData) return;
    const temp_question = item.question;
    const indexToRemove = temp_question.findIndex((item) =>
      item.id.includes('+')
    );
    if (indexToRemove !== -1) {
      temp_question.splice(indexToRemove, 1);
    }

    const updatedModules = formData.modules.map((module) => {
      if (module.id === item.id) {
        const updatedQuestions = temp_question;
        return { ...module, question: updatedQuestions };
      }
      return module;
    });
    const updatedObj = { ...formData, modules: updatedModules };
    setFormData(updatedObj);
  };

  const handleModuleAdd = (item: Module) => {
    if (!formData) return;
    const original_question = item.question[0];
    // 假设可添加选项的问题原始长度为1
    const new_question = {
      ...original_question,
      id: `${original_question.id}+${Math.floor(Math.random() * 100)}`,
    };
    const updatedModules = formData.modules.map((module) => {
      if (module.id === item.id) {
        const updatedQuestions = [...module.question, new_question];
        return { ...module, question: updatedQuestions };
      }
      return module;
    });
    const updatedObj = { ...formData, modules: updatedModules };
    setFormData(updatedObj);
  };

  const { mutateAsync: handleBrainstorm } = useMutation({
    mutationFn: (params: IBriansotrmReq) => SubmitEssayWritting(params),
    onSuccess: (data) => {
      queryTimer.current = setInterval(async () => {
        const res = await queryEssayResult(data);
        setStartTyping(true);
        if (res.status === 'doing') {
          if (res.text !== '') {
            setEassyResult(res.text);
            setIsSubmiting(false);
          }
        }
        if (res.status === 'done') {
          clearInterval(queryTimer.current);
          setEassyResult(res.text);
          setIsSubmiting(false);
        }
      }, 2000);
    },
    onError: (err) => {
      setSubmitError(err.message);
      setIsSubmiting(false);
    },
    onMutate: () => {
      setIsSubmiting(true);
    },
  });

  const handleSubmit = async () => {
    const key_arrays = Object.keys(formState);
    const key_values = Object.values(formState);
    const filter_key_arrays = key_arrays.map((item) =>
      item.includes('+') ? item.split('+')[0] : item
    );
    setHistoryData({ template_id: '', result: '', questionAnswerPair: {} });
    await handleBrainstorm({
      pro_mode: qualityMode === 1,
      template_id: formData?.id,
      texts: key_values,
      types: filter_key_arrays,
      word_nums: '',
      user_id,
    });
  };

  const handleClearAll = () => {
    const clearedObjState = Object.fromEntries(
      Object.keys(formState).map((key) => [key, ''])
    );
    setFormState(clearedObjState);
  };

  return (
    <div className='relative h-full overflow-y-hidden px-6 pb-2 pt-6'>
      <div className='relative h-[calc(100%_-95px)] overflow-y-auto'>
        <div className='flex items-center'>
          <Link
            className='small-regular capitalize text-shadow hover:underline'
            href={'/writtingpal/brainstorm'}
          >
            Brainstorm
          </Link>
          <p className='small-regular text-black-200'>
            &nbsp;/&nbsp;{formData.name}
          </p>
        </div>
        <div className='mt-4 flex flex-col gap-y-4 overflow-y-auto rounded-xl bg-white p-4 md:w-full'>
          <h1 className='h1-regular text-primary-200'>{formData.name}</h1>
          <p className=' base-regular text-shadow'>{formData.description}</p>
        </div>
        <div className='mt-4 flex flex-col gap-y-4 overflow-y-auto rounded-xl bg-white p-4 md:w-full'>
          <div className='flex-start gap-x-2'>
            <span className='h-6 w-2 rounded-[10px] bg-primary-200' />
            <p className='title-semibold'>Basic Settings</p>
          </div>
          <Separator orientation='horizontal' className='bg-shadow-border' />
          {/* Switch ------------------------------------------------------- */}
          {formData.has_pro && (
            <div className='flex gap-x-2'>
              <Label
                htmlFor='quality-mode'
                className='base-semibold flex-[0.3]'
              >
                High-Quality Mode
                <br />
                <p className='subtle-regular mt-2 text-shadow-100'>
                  Generate higher-quality essays but may require more time.
                  Please be patient
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
          )}

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
        {formData.modules.map((item, index) => {
          const hasMultiple = item.multiple === 1;
          return (
            <div
              key={`${item.id}-${index}`}
              className='mt-4 flex flex-col gap-y-4 overflow-y-hidden rounded-xl bg-white p-4 md:w-full'
            >
              <div className='flex-between'>
                <div className='flex items-center gap-x-2'>
                  <span className='h-6 w-2 rounded-[10px] bg-primary-200' />
                  <p className='title-semibold'>{item.name ?? ''}</p>
                </div>
                {hasMultiple && (
                  <div className='flex gap-x-5'>
                    <div
                      onClick={() => handleModuleAdd(item)}
                      className='title-semibold cursor-pointer text-primary-200 hover:text-shadow-100'
                    >
                      +
                    </div>
                    {item.question.length > 1 && (
                      <div
                        onClick={() => handleModuleRemove(item)}
                        className='title-semibold cursor-pointer text-primary-200 hover:text-shadow-100'
                      >
                        -
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Separator
                orientation='horizontal'
                className='bg-shadow-border'
              />
              {item.question.map((item) => {
                return (
                  <div key={item.id} className='flex gap-x-2 md:min-h-[160px]'>
                    <Label className='small-semibold w-[30%]' htmlFor={item.id}>
                      {item.optional === 0 && (
                        <span className='text-red-500'>*&nbsp;</span>
                      )}
                      {item.text}
                    </Label>
                    <div className='relative w-[70%] rounded-lg border border-shadow-border'>
                      <Textarea
                        value={formState[item.id] ?? ''}
                        onChange={handleFormStateChange}
                        name={item.id}
                        id={item.id}
                        className='small-medium min-h-full w-full overflow-y-auto pb-12'
                        placeholder={item.example}
                        disabled={!!formStatus[item.id] || isSubmiting}
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
          );
        })}
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
