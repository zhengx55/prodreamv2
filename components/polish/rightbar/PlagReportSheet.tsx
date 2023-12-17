'use client';
const TEST = {
  status: 'done',
  scores: 0.031,
  spans: [[2009, 2075]],
};
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { memo, useRef, useState } from 'react';
import { Button } from '../../ui/button';
import Spacer from '../../root/Spacer';
import { useMutation } from '@tanstack/react-query';
import { plagiarismCheck, plagiarismQuery } from '@/query/api';
import { IPlagiarismData } from '@/query/type';
import { useToast } from '../../ui/use-toast';
import LoadingDot from '../../root/LoadingDot';
import { Loader2 } from 'lucide-react';
import useAIEditorStore from '@/zustand/store';

const PlagReportSheet = () => {
  const { toast } = useToast();
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluateResult, setEvaluateResult] = useState<IPlagiarismData>();
  const setIsPlagiarism = useAIEditorStore(
    (store) => store.updateIsPlagiarismOpen
  );
  const reqTimer = useRef<NodeJS.Timeout | undefined>();
  const handleOpen = (status: boolean) => {
    setIsPlagiarism(status);
  };

  const { mutateAsync: check } = useMutation({
    mutationFn: (params: string) => plagiarismCheck(params),
    onSuccess: (data) => {
      reqTimer.current = setInterval(async () => {
        try {
          const res = await plagiarismQuery(data);
          if (res.status === 'doing') {
            //
          }
          if (res.status === 'done') {
            setIsEvaluating(false);
            setEvaluateResult(res);
            clearInterval(reqTimer.current);
            toast({
              description: 'Plagiarism check finished!',
              variant: 'default',
            });
          }
        } catch (error: any) {
          setIsEvaluating(false);
          toast({
            description: error.message,
            variant: 'destructive',
          });
          clearInterval(reqTimer.current);
        }
      }, 15000);
    },
    onMutate: () => {
      setIsEvaluating(true);
    },
    onError: (err) => {
      setIsEvaluating(false);
      toast({
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  return (
    <Sheet onOpenChange={handleOpen}>
      {evaluateResult ? (
        <SheetTrigger asChild>
          <Button variant={'white'} className='small-semibold justify-center'>
            View Details
          </Button>
        </SheetTrigger>
      ) : isEvaluating ? (
        <Button className='small-semibold' disabled>
          <Loader2 className='animate-spin' size={18} />
          <LoadingDot label='Checking' />
        </Button>
      ) : (
        <Button
          variant={'ghost'}
          className='small-semibold border border-shadow-border'
          // onClick={async () => {
          //   const essayContent = essayRef.current.innerText.trim();
          //   if (essayContent === '') {
          //     toast({
          //       description: 'No content detected',
          //       variant: 'destructive',
          //     });
          //     return;
          //   }
          //   await check(essayRef.current?.innerText);
          // }}
        >
          Plagiarism Check
        </Button>
      )}

      <SheetContent className='flex flex-col overflow-y-auto px-4 py-6'></SheetContent>
    </Sheet>
  );
};

export default memo(PlagReportSheet);
