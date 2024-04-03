import { Button } from '@/components/ui/button';
import { useMembershipInfo } from '@/query/query';
import { IPlagiarismData } from '@/query/type';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { m } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const ReportPDF = dynamic(() => import('./ReportPDF'), { ssr: false });
const Unlock = dynamic(() => import('../Unlock'));

const Report = ({
  report,
  recheck,
  t,
}: {
  report: Omit<IPlagiarismData, 'status'>;
  recheck: () => Promise<void>;
  t: EditorDictType;
}) => {
  const editor = useAIEditor((state) => state.editor_instance);
  const { data: membership } = useMembershipInfo();

  return (
    <m.div
      key={'plagiarism-panel'}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className='flex flex-1 flex-col overflow-y-auto'
    >
      <div className='flex items-center gap-x-5'>
        <h1 className='text-[64px] italic text-violet-500'>
          {(report.scores * 100).toFixed(0)}%
        </h1>
        <div className='flex flex-col gap-y-2'>
          <p className='small-regular'>
            {report.scores * 100 > 0
              ? t.Plagiarism.Result
              : t.Plagiarism.Result_good}
          </p>
          <Button
            role='button'
            variant={'ghost'}
            className='h-max rounded border border-violet-500 px-4 py-1'
            onClick={recheck}
          >
            <RefreshCcw size={14} className='text-violet-500' />
            <p className='subtle-regular text-violet-500'>
              {t.Plagiarism.recheck}
            </p>
          </Button>
        </div>
      </div>
      {membership?.subscription === 'basic' ? (
        <Unlock
          text={'Unlock paraphrase suggestions with the Unlimited Plan'}
        />
      ) : (
        <ReportPDF pdf={report.pdf} />
      )}
    </m.div>
  );
};

export default memo(Report);
