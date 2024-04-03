import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
type Props = { pdf: string };
const ReportPDF = ({ pdf }: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  console.log('🚀 ~ onDocumentLoadSuccess ~ numPages:', numPages);
  return (
    <div className=' w-96'>
      <Document
        onLoadSuccess={onDocumentLoadSuccess}
        file={pdf}
        loading={<Loader2 className='animate-spin text-violet-500' />}
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
