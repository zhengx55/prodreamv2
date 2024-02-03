import LazyMotionProvider from '@/components/root/LazyMotionProvider';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GenerateOptions } from '@/constant';
import { OutlineTooltip } from '@/constant/enum';
import { useUserTask } from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronUp, FileText } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useCallback, useRef, useState } from 'react';
import GenerateSub from './GenerateSub';

const Tiplayout = dynamic(
  () => import('@/components/polish/guide/tips/Tiplayout')
);

const GenerateDropdown = dynamic(() => import('../dropdown/GenerateDropdown'));

export const Generate = () => {
  const [generateTab, setGenerateTab] = useState<number | string>(-1);
  const task_step = useUserTask((state) => state.task_step);
  const copilot_option = useRef<string | null>(null);
  const memoSetGeneratedTab = useCallback((value: string) => {
    setGenerateTab(value);
  }, []);

  const goBack = useCallback(() => {
    setGenerateTab(-1);
  }, []);

  return (
    <LazyMotionProvider>
      <AnimatePresence mode='wait' initial={false}>
        {generateTab === -1 ? (
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            key='generate-panel'
            className='flex w-full flex-col overflow-hidden'
          >
            {GenerateOptions.map((item, index) => {
              if (item.submenu)
                return task_step === 2 ? (
                  <DropdownMenu key={item.id}>
                    <Tiplayout
                      title={OutlineTooltip.TITLE}
                      content={OutlineTooltip.TEXT}
                      side='left'
                      buttonLabel='Got it!'
                    >
                      <DropdownMenuTrigger>
                        <div className='flex-between group cursor-pointer bg-doc-secondary px-2.5 py-3'>
                          <div className='flex items-center gap-x-3'>
                            <FileText className='text-doc-primary' size={20} />
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
                  </DropdownMenu>
                ) : (
                  <DropdownMenu key={item.id}>
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
    </LazyMotionProvider>
  );
};

export default memo(Generate);
