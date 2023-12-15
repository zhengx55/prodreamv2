'use client';
import React, { memo } from 'react';
import Spacer from '../root/Spacer';
import { PenLine } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import dynamic from 'next/dynamic';

const ReportSheet = dynamic(() => import('./ReportSheet'), { ssr: false });
const PolishModal = dynamic(() => import('./PolishModal'), { ssr: false });
const PlagReportSheet = dynamic(() => import('./PlagReportSheet'), {
  ssr: false,
});

const Rightbar = () => {
  const {
    essayRef,
    setChatEditMode,
    chatEditMode,
    setSelectText,
    setPolishResult,
    setPolishResultB,
  } = useAiEditiorContext();

  const toggleChatEditMode = () => {
    if (!chatEditMode) {
      setChatEditMode(true);
      setSelectText('');
      setPolishResult([]);
      setPolishResultB('');
      if (essayRef.current) {
        //清除划线样式等
        essayRef.current.innerHTML = essayRef.current.innerText;
      }
    } else {
      setChatEditMode(false);
    }
  };
  return (
    <div className='absolute right-0 top-0 hidden h-full flex-col rounded-md border-l border-shadow-border bg-white px-4 md:flex md:w-[240px]'>
      <Spacer y='24' />
      <h2 className='title-semibold text-black-100'>Essay Evaluation</h2>
      <Spacer y='12' />
      <ReportSheet />
      <Spacer y='24' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='24' />
      <h2 className='title-semibold text-black-100'>Chat Edit</h2>
      <p className='small-regular text-shadow'>AI writing polish</p>
      <Spacer y='12' />
      <Button
        variant={chatEditMode ? 'default' : 'ghost'}
        onClick={toggleChatEditMode}
        className='small-semibold border border-shadow-border'
      >
        <PenLine size={20} />
        Highlight to polish
      </Button>
      <Spacer y='24' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='24' />
      <h2 className='title-semibold text-black-100'>AI Polish</h2>
      <Spacer y='12' />
      <PolishModal />
      <Spacer y='24' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='24' />
      <h2 className='title-semibold text-black-100'>Check</h2>
      <Spacer y='12' />
      <PlagReportSheet />
    </div>
  );
};

export default memo(Rightbar);
