'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { EvaluationsTitle } from '@/constant';
import { downloadReport, essayAssess } from '@/query/api';
import { IEssayAssessData, IEssayAssessRequest } from '@/query/type';
import useAIEditorStore from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { memo, useState } from 'react';
import { toast } from 'sonner';
import LoadingDot from '../../root/LoadingDot';
import Spacer from '../../root/Spacer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

const ReportSheet = () => {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluateResult, setEvaluateResult] = useState<IEssayAssessData>();
  const editor_instance = useAIEditorStore((state) => state.editor_instance);
  const isEvaluationOpen = useAIEditorStore((state) => state.isEvaluationOpen);
  const setIsEvaluationOpen = useAIEditorStore(
    (state) => state.updateIsEvaluationOpen
  );
  const { mutateAsync: evaluation } = useMutation({
    mutationFn: (params: IEssayAssessRequest) => essayAssess(params),
    onSuccess: (data) => {
      setEvaluateResult(data);
      setIsEvaluating(false);
      toast.success('Eassy evaluation finished!');
    },
    onMutate: () => {
      setIsEvaluating(true);
      if (evaluateResult) {
        setEvaluateResult(undefined);
      }
      if (isEvaluationOpen) {
        setIsEvaluationOpen(false);
      }
    },
    onError: (err) => {
      setIsEvaluating(false);
      toast.error(err.message);
    },
  });

  const handleDownloadReport = async () => {
    try {
      if (!evaluateResult) return;
      const res = await downloadReport(evaluateResult?.id);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      let d = new Date();
      a.download = `report${d.getTime()}.pdf`;
      a.click();
      URL.revokeObjectURL(a.href);
      a.remove();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEvaluate = async () => {
    if (!editor_instance) return;
    const eassy_plain_text = editor_instance.getText({
      blockSeparator: '\n\n',
    });
    const essayContent = eassy_plain_text.trim();
    if (essayContent === '') {
      toast.error('No content detected');
      return;
    }
    await evaluation({
      text: essayContent,
    });
  };

  return (
    <Sheet open={isEvaluationOpen} onOpenChange={setIsEvaluationOpen}>
      <div className='flex flex-col gap-y-3 rounded-xl bg-card p-4'>
        {evaluateResult ? (
          <>
            <p className='text-center text-white'>Your essay is:</p>
            <h2 className='h2-bold text-center text-white'>
              {evaluateResult.score}
            </h2>
          </>
        ) : (
          <Image
            alt='rated'
            src={!isEvaluating ? '/rated.png' : '/rating.gif'}
            className='h-[54px] w-[54px] self-center rounded-full'
            width={1000}
            height={1000}
            priority
          />
        )}
        {evaluateResult ? (
          <SheetTrigger asChild>
            <Button variant={'white'} className='small-semibold justify-center'>
              View Details
            </Button>
          </SheetTrigger>
        ) : (
          <Button
            onClick={handleEvaluate}
            variant={'white'}
            disabled={isEvaluating}
            className='small-semibold justify-center'
          >
            {isEvaluating ? <LoadingDot label='Rating' /> : 'Get Rated'}
          </Button>
        )}
      </div>
      <SheetContent className='flex flex-col overflow-y-auto px-4 py-6'>
        <div className='flex gap-x-4'>
          <div className='flex flex-col'>
            <h2 className='title-semibold'>
              Your overall essay score is&nbsp;
              <span className='text-primary-200'>{evaluateResult?.score}</span>
            </h2>
            <Spacer y='22' />
            <Button
              onClick={handleEvaluate}
              className='title-semibold self-start bg-card px-4'
            >
              Re-evaluate
            </Button>
          </div>
        </div>
        <Spacer y='24' />
        <div className='flex gap-x-2'>
          <div className='h-20 w-20 shrink-0 overflow-hidden rounded-full bg-blue-100 px-3 pt-2'>
            <Image
              alt='max'
              src='/max.png'
              width={1000}
              height={1000}
              className='h-auto w-full'
            />
          </div>
          <div className='flex flex-col gap-y-2 rounded-2xl bg-blue-50 px-4 py-2'>
            <h2 className='title-semibold text-primary-200'>Max</h2>
            <p className='small-regular'>{evaluateResult?.head}</p>
          </div>
        </div>
        <Spacer y='24' />
        <Accordion type='multiple'>
          {evaluateResult?.detail.map((item, index) => (
            <AccordionItem
              key={`report-acc${index}`}
              value={`report-acc${index}`}
            >
              <AccordionTrigger className='px-4'>
                <span className='base-semibold'>
                  {EvaluationsTitle[index]}:&nbsp;
                  <span className='text-primary-200'>{item.level}</span>
                </span>
              </AccordionTrigger>
              <Separator
                orientation='horizontal'
                className='ml-[2.5%] w-[95%] bg-shadow-border'
              />
              <AccordionContent className='border-l border-primary-200 bg-white px-4 pt-4 '>
                <article
                  dangerouslySetInnerHTML={{ __html: item.comment.evaluation }}
                />
                <Spacer y='24' />
                <h2 className='text-primary-200'>Improvement Suggestions</h2>
                <article
                  dangerouslySetInnerHTML={{ __html: item.comment.suggestion }}
                />
                <Spacer y='24' />
                <h2 className='text-primary-200'>Improvement Examples</h2>
                <article
                  dangerouslySetInnerHTML={{ __html: item.comment.example }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Spacer y='24' />
        <div className='flex w-full justify-end'>
          <Button onClick={handleDownloadReport}>Download Report</Button>
        </div>
        <Spacer y='64' />
        <div className='flex-center gap-x-6'>
          <Image
            className='h-[60px] w-[60px] cursor-pointer hover:opacity-50'
            src='/thumbUp.svg'
            width={60}
            height={60}
            alt='thumbup'
          />
          <Image
            className='w-[60px h-[60px] cursor-pointer hover:opacity-50'
            src='/thumbDown.svg'
            width={60}
            height={60}
            alt='thumbdown'
          />
        </div>
        <Spacer y='24' />
        <p className='base-regular text-center text-shadow-100'>
          How would you rate the overall quality of this report?
        </p>
      </SheetContent>
    </Sheet>
  );
};

export default memo(ReportSheet);
