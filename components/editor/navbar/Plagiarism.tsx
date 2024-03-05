import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { plagiarismCheck, plagiarismQuery } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { Loader2, ShieldCheck } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';

const Plagiarism = () => {
  const editor = useAIEditor((state) => state.editor_instance);
  const {
    togglePlagiarism,
    updatePlagiarismResult,
    plagiarismReCheck,
    updatePlagiarismRecheck,
    plagiarismResult,
  } = useAIEditor((state) => ({
    ...state,
  }));
  const [isGenerating, setIsGenerating] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const { mutateAsync: plagiarism } = useMutation({
    mutationFn: (params: string) => plagiarismCheck(params),
    onMutate: () => {
      setIsGenerating(true);
      updatePlagiarismRecheck(false);
    },
    onSuccess: (data) => {
      timer.current = setInterval(async () => {
        const res = await plagiarismQuery(data);
        if (res.status === 'done') {
          setIsGenerating(false);
          updatePlagiarismResult({ scores: res.scores, spans: res.spans });
          togglePlagiarism();
          clearInterval(timer.current!);
        }
      }, 5000);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });

  useUnmount(() => {
    timer.current && clearInterval(timer.current);
  });

  const handlePlagiarismCheck = async () => {
    if (!editor) return;
    if (!editor.getText()) {
      const toast = (await import('sonner')).toast;
      toast.error('Please write something to check plagiarism');
      return;
    }
    await plagiarism(editor?.getText());
  };

  useEffect(() => {
    if (plagiarismReCheck) {
      handlePlagiarismCheck();
      updatePlagiarismResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plagiarismReCheck]);

  return Boolean(plagiarismResult) ? (
    <Button
      role='button'
      onClick={() => togglePlagiarism()}
      className='h-max rounded border border-doc-primary bg-transparent px-2 py-1 text-black-400 hover:bg-doc-secondary hover:text-doc-primary'
    >
      <ShieldCheck size={18} className='text-doc-primary' />
      <p className='small-regular text-doc-primary'>Plagiarism Report</p>
    </Button>
  ) : isGenerating ? (
    <Tooltip
      tooltipContent='May take up to 5 minutes, thank you for waiting'
      side='bottom'
    >
      <Button
        role='button'
        disabled
        className='h-max rounded border border-doc-primary bg-transparent px-2 py-1 text-black-400 hover:transform-none disabled:pointer-events-auto'
      >
        <Loader2 className='animate-spin text-doc-primary' size={18} />
        <p className='small-regular text-doc-primary'>Plagiarism Check</p>
      </Button>
    </Tooltip>
  ) : (
    <Button
      role='button'
      onClick={handlePlagiarismCheck}
      className='h-max rounded border border-doc-primary bg-transparent px-2 py-1 text-black-400 hover:bg-doc-secondary hover:text-doc-primary'
    >
      <ShieldCheck size={18} className='text-doc-primary' />
      <p className='small-regular text-doc-primary'>Plagiarism Check</p>
    </Button>
  );
};
export default memo(Plagiarism);
