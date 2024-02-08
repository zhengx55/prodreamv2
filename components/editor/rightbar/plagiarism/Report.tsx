import { Button } from '@/components/ui/button';
import useAiEditor from '@/zustand/store';
import { m } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';

const Report = () => {
  const plagReport = useAiEditor((state) => state.plagiarismResult);
  const updatePlagiarismRecheck = useAiEditor(
    (state) => state.updatePlagiarismRecheck
  );
  const togglePlagiarism = useAiEditor((state) => state.togglePlagiarism);
  if (!plagReport) return null;
  return (
    <m.aside
      key={'plagiarism-panel'}
      initial={{ width: 400 }}
      animate={{
        width: 400,
      }}
      exit={{
        width: 0,
      }}
      transition={{ duration: 0.2 }}
      className='flex h-full shrink-0 flex-col border-l border-shadow-border px-4 py-5'
    >
      <div className='flex items-center gap-x-5'>
        <h1 className='text-[64px] italic text-doc-primary'>
          {(plagReport.scores * 100).toFixed(0)}%
        </h1>
        <div className='flex flex-col gap-y-2'>
          <p className='small-regular'>
            {plagReport.scores * 100 > 25 ? 'May be plagiarized' : 'Acceptable'}
          </p>
          <Button
            role='button'
            variant={'ghost'}
            className='h-max rounded border border-doc-primary px-4 py-1'
            onClick={() => {
              updatePlagiarismRecheck(true);
              togglePlagiarism();
            }}
          >
            <RefreshCcw size={14} className='text-doc-primary' />
            <p className='subtle-regular text-doc-primary'>Re-check</p>
          </Button>
        </div>
      </div>
    </m.aside>
  );
};
export default Report;
