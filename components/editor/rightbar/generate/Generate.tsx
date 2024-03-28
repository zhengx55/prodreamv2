import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GenerateOptions } from '@/constant';
import { OutlineTooltip } from '@/constant/enum';
import { useMembershipInfo } from '@/query/query';
import { EditorDictType } from '@/types';
import useAIEditor, { useUserTask } from '@/zustand/store';
import { ChevronUp, FileText } from 'lucide-react';
import dynamic from 'next/dynamic';
import { forwardRef, memo, useRef } from 'react';

const GenerateSub = dynamic(() => import('./GenerateSub'));

const Tiplayout = dynamic(
  () => import('@/components/editor/guide/tips/Tiplayout')
);

const GenerateDropdown = dynamic(() => import('../dropdown/GenerateDropdown'));

export const Generate = ({ t }: { t: EditorDictType }) => {
  const generateTab = useAIEditor((state) => state.generateTab);
  const setGenerateTab = useAIEditor((state) => state.updateGenerateTab);
  const copilot_option = useRef<string | null>(null);
  const outline_step = useUserTask((state) => state.outline_step);
  const updateOutlineStep = useUserTask((state) => state.updateOutlineStep);
  const { data: usage } = useMembershipInfo();

  return (
    <>
      {generateTab === -1 ? (
        <div className='flex w-full flex-col overflow-hidden'>
          {GenerateOptions.map((item) => {
            if (item.submenu)
              return (
                <DropdownMenu key={item.id}>
                  {outline_step === 2 ? (
                    <Tiplayout
                      title={OutlineTooltip.TITLE}
                      content={OutlineTooltip.TEXT}
                      side='left'
                      buttonLabel='Next'
                      step={2}
                      totalSteps={3}
                      onClickCallback={() => {
                        updateOutlineStep(3);
                        copilot_option.current = 'write_introduction';
                        setGenerateTab('Write Introduction');
                      }}
                    >
                      <Submeu item={item} t={t} />
                    </Tiplayout>
                  ) : (
                    <Submeu item={item} t={t} />
                  )}
                </DropdownMenu>
              );
            return (
              <div
                key={item.id}
                id={item.id}
                onClick={() => {
                  copilot_option.current = item.label!;
                  setGenerateTab(item.title);
                }}
                className='flex-between group cursor-pointer px-2.5 py-3 hover:bg-slate-100'
              >
                <div className='flex items-center gap-x-3'>
                  <FileText
                    className='text-zinc-600 group-hover:text-violet-500'
                    size={20}
                  />
                  <p className='base-regular text-zinc-600 group-hover:text-violet-500'>
                    {t.Generate[item.title as keyof typeof t.Generate] as any}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <GenerateSub
          t={t}
          generateTab={generateTab as string}
          label={copilot_option.current}
        />
      )}
      {usage?.subscription === 'basic' ? <Unlock /> : null}
    </>
  );
};

const Unlock = () => {
  const { data: usage } = useMembershipInfo();
  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);

  return (
    <div className='mt-auto flex flex-col gap-y-0.5'>
      <div className='relative h-2 w-full rounded-xl bg-gray-200'>
        {usage?.free_times_detail.Generate === 0 ? (
          <span className='absolute inset-0 rounded-xl bg-red-400' />
        ) : (
          <span
            className='absolute inset-0 w-full rounded-xl bg-violet-500'
            style={{
              width: `${((5 - (usage?.free_times_detail.Generate ?? 0)) / 5) * 100}%`,
            }}
          />
        )}
      </div>
      <p className='small-regular w-max px-0 text-zinc-600'>
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
  );
};

const Submeu = forwardRef<HTMLDivElement, { item: any; t: EditorDictType }>(
  ({ item, t }, ref) => {
    return (
      <>
        <DropdownMenuTrigger asChild>
          <div
            ref={ref}
            className='flex-between group cursor-pointer px-2.5 py-3 hover:bg-slate-100'
          >
            <div className='flex items-center gap-x-3'>
              <FileText
                className='text-zinc-600 group-hover:text-violet-500'
                size={20}
              />
              <p className='base-regular text-zinc-600 group-hover:text-violet-500'>
                {t.Generate[item.title as keyof typeof t.Generate] as any}
              </p>
            </div>
            <ChevronUp
              className='text-zinc-600 transition-transform group-hover:text-violet-500 group-data-[state=open]:rotate-180'
              size={20}
            />
          </div>
        </DropdownMenuTrigger>
        <GenerateDropdown t={t} items={item.submenu} />
      </>
    );
  }
);
Submeu.displayName = 'Submeu';

export default memo(Generate);
