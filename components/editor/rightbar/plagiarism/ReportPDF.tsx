import Spacer from '@/components/root/Spacer';
import { useMembershipInfo } from '@/query/query';
import { EditorDictType } from '@/types';
import { Loader2, RefreshCcw } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
type Props = { pdf: string; t: EditorDictType };
const ReportPDF = ({ pdf, t }: Props) => {
  const { data: membership } = useMembershipInfo();
  return (
    <div className='flex flex-col'>
      <h2 className='small-medium inline-flex items-center gap-x-2'>
        {t.Plagiarism.Report}
        <RefreshCcw className='text-violet-500' size={14} />
      </h2>
      <Spacer y='32' />
      <Document
        file={pdf}
        loading={
          <div className='flex-center flex-1'>
            <Loader2 className='animate-spin text-violet-500' />
          </div>
        }
      >
        <Page
          width={388}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          pageNumber={1}
        />
      </Document>
    </div>
  );
};
export default ReportPDF;
