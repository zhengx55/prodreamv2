import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GenerateOptions } from '@/constant';
import { OutlineTooltip } from '@/constant/enum';
import { useMembershipInfo } from '@/query/query';
import useAiEditor, { useUserTask } from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronUp, FileText } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useCallback, useRef, useState } from 'react';
import GenerateSub from './GenerateSub';

const Tiplayout = dynamic(
  () => import('@/components/editor/guide/tips/Tiplayout')
);

const GenerateDropdown = dynamic(() => import('../dropdown/GenerateDropdown'));

export const Generate = () => {
  const [generateTab, setGenerateTab] = useState<number | string>(-1);
  const outline_step = useUserTask((state) => state.outline_step);
  const copilot_option = useRef<string | null>(null);
  const memoSetGeneratedTab = useCallback((value: string) => {
    setGenerateTab(value);
  }, []);
  const updateOutlineStep = useUserTask((state) => state.updateOutlineStep);
  const updatePaymentModal = useAiEditor((state) => state.updatePaymentModal);
  const { data: usage } = useMembershipInfo();
  const goBack = useCallback(() => {
    setGenerateTab(-1);
  }, []);

  return (
    <>
      <AnimatePresence mode='wait' initial={false}>
        {generateTab === -1 ? (
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            key='generate-panel'
            className='flex w-full flex-col overflow-hidden'
          >
            {GenerateOptions.map((item) => {
              if (item.submenu)
                return (
                  <DropdownMenu key={item.id}>
                    {outline_step === 2 ? (
                      <>
                        <Tiplayout
                          title={OutlineTooltip.TITLE}
                          content={OutlineTooltip.TEXT}
                          side='left'
                          buttonLabel='Next'
                          step={2}
                          totalSteps={3}
                          onClickCallback={() => {
                            updateOutlineStep(3);
                            setGenerateTab('Write Introduction');
                          }}
                        >
                          <DropdownMenuTrigger>
                            <div className='flex-between group cursor-pointer bg-doc-secondary px-2.5 py-3'>
                              <div className='flex items-center gap-x-3'>
                                <FileText
                                  className='text-doc-primary'
                                  size={20}
                                />
                                <p className='base-regular text-doc-primary'>
                                  {item.title}
                                </p>
                              </div>
                              <ChevronUp
                                className='text-doc-font transition-transform group-hover:text-doc-primary group-data-[state=open]:rotate-180'
                                size={20}
                              />
                            </div>
                          </DropdownMenuTrigger>
                        </Tiplayout>
                        <GenerateDropdown
                          onClick={memoSetGeneratedTab}
                          items={item.submenu}
                        />
                      </>
                    ) : (
                      <>
                        <DropdownMenuTrigger asChild>
                          <div className='flex-between group cursor-pointer px-2.5 py-3 hover:bg-doc-secondary'>
                            <div className='flex items-center gap-x-3'>
                              <FileText
                                className='text-doc-font group-hover:text-doc-primary'
                                size={20}
                              />
                              <p className='base-regular text-doc-font group-hover:text-doc-primary'>
                                {item.title}
                              </p>
                            </div>
                            <ChevronUp
                              className='text-doc-font transition-transform group-hover:text-doc-primary group-data-[state=open]:rotate-180'
                              size={20}
                            />
                          </div>
                        </DropdownMenuTrigger>
                        <GenerateDropdown
                          onClick={memoSetGeneratedTab}
                          items={item.submenu}
                        />
                      </>
                    )}
                  </DropdownMenu>
                );
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    copilot_option.current = item.label!;
                    setGenerateTab(item.title);
                  }}
                  className='flex-between group cursor-pointer px-2.5 py-3 hover:bg-doc-secondary'
                >
                  <div className='flex items-center gap-x-3'>
                    <FileText
                      className='text-doc-font group-hover:text-doc-primary'
                      size={20}
                    />
                    <p className='base-regular text-doc-font group-hover:text-doc-primary'>
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </m.div>
        ) : (
          <GenerateSub
            generateTab={generateTab as string}
            label={copilot_option.current}
            goBack={goBack}
          />
        )}
      </AnimatePresence>
      {usage?.subscription === 'basic' ? (
        <div className='mt-auto flex flex-col gap-y-0.5'>
          <div className='relative h-2 w-full rounded-xl bg-border-50'>
            {usage.free_times_detail.Generate === 0 ? (
              <span className='absolute inset-0 rounded-xl bg-red-400' />
            ) : (
              <span
                className='absolute inset-0 w-full rounded-xl bg-doc-primary'
                style={{
                  width: `${((5 - (usage?.free_times_detail.Generate ?? 0)) / 5) * 100}%`,
                }}
              />
            )}
          </div>
          <p className='small-regular w-max px-0 text-doc-font'>
            {usage?.free_times_detail.Generate}/5 weekly generate credits left;
            <Button
              role='dialog'
              onClick={() => {
                updatePaymentModal(true);
              }}
              variant={'ghost'}
              className='px-2'
            >
              Go unlimited
            </Button>
          </p>
        </div>
      ) : null}
    </>
  );
};

export default memo(Generate);
