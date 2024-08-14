import { PdfResult } from '@/types';
import { useRightbar } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { plagiarismCheck, plagiarismQuery } from '../api';

export const usePlagiarismDetection = (
  processPdfContent: (pdfUrl: string | null) => Promise<PdfResult>
) => {
  const updatePlagiarismLoading = useRightbar(
    (state) => state.updatePlagiarismLoading
  );
  const updatePlagiarismProgress = useRightbar(
    (state) => state.updatePlagiarismProgress
  );
  const incrementPlagiarismProgress = useRightbar(
    (state) => state.incrementPlagiarismProgress
  );
  const updatePlagiarismResult = useRightbar(
    (state) => state.updatePlagiarismResult
  );
  const startPlagiarismTimer = useRightbar(
    (state) => state.startPlagiarismTimer
  );
  const stopPlagiarismTimer = useRightbar((state) => state.stopPlagiarismTimer);

  const handlePlagiarismSuccess = async (data: string) => {
    incrementPlagiarismProgress(10);
    let timer = setInterval(async () => {
      try {
        const res = await plagiarismQuery(data);
        incrementPlagiarismProgress(2);

        if (res.status === 'done') {
          const updates = await processPdfContent(res.pdf);
          updates.prob = res.scores;
          updatePlagiarismResult(updates);
          updatePlagiarismProgress(100);
          stopPlagiarismTimer();
          updatePlagiarismLoading(false);
          clearInterval(timer);
        }
      } catch (error) {
        clearInterval(timer);
        handlePlagiarismError(error);
      }
    }, 5000);
    startPlagiarismTimer(timer);
  };

  const handlePlagiarismError = (error: any) => {
    import('sonner').then(({ toast }) => toast.error(error.message));
    console.error(error.message);
    stopPlagiarismTimer();
    updatePlagiarismLoading(false);
  };

  return useMutation({
    mutationFn: plagiarismCheck,
    onMutate: () => {
      updatePlagiarismLoading(true);
      updatePlagiarismProgress(0);
    },
    onSuccess: handlePlagiarismSuccess,
    onError: handlePlagiarismError,
  });
};
