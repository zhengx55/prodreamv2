import { useMembershipInfo } from '@/query/query';
import useAIEditor, { useCitation } from '@/zustand/store';
import { memo, useMemo, useRef } from 'react';
import Spacer from '../root/Spacer';
import { Copy } from '../root/SvgComponents';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import APAReference from './reference/APA';
import MLAReference from './reference/MLA';

const Reference = () => {
  const citation_type = useCitation((state) => state.citationStyle);
  const inTextCitation = useCitation((state) => state.inTextCitation);
  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);
  const { data: usage } = useMembershipInfo();
  const referenceListRef = useRef<HTMLOListElement>(null);
  const updateCitationStyle = useCitation((state) => state.updateCitationStyle);
  const sort_array = useMemo(() => {
    return inTextCitation.sort((a, b) => {
      const lastNameA = (
        a.data.contributors?.[0]?.last_name || ''
      ).toLowerCase();
      const lastNameB = (
        b.data.contributors?.[0]?.last_name || ''
      ).toLowerCase();

      if (lastNameA && lastNameB) {
        if (lastNameA < lastNameB) {
          return -1;
        }
        if (lastNameA > lastNameB) {
          return 1;
        }
      } else if (lastNameA) {
        return -1;
      } else if (lastNameB) {
        return 1;
      }

      return 0;
    });
  }, [inTextCitation]);

  const copyHtml = async () => {
    const htmlNode = referenceListRef.current;
    navigator.clipboard.writeText(htmlNode?.innerText ?? '');
    const { toast } = await import('sonner');
    toast.success('Copied to clipboard');
  };
  if (inTextCitation.length === 0) return null;
  return (
    <div className='mx-auto flex w-[700px] select-none flex-col'>
      <div className='flex-between'>
        <h3 className='text-xl font-[600]'>References</h3>
        <div className='flex gap-x-4'>
          {usage?.subscription === 'basic' ? (
            <p className='subtle-regular inline-flex items-center gap-x-2 text-doc-font'>
              Upgrade to unlimted to export citations
              <Button
                role='button'
                variant={'ghost'}
                className='subtle-regular h-max px-0 py-0'
                onClick={() => updatePaymentModal(true)}
              >
                Go unlimited
              </Button>
            </p>
          ) : (
            <Button
              role='button'
              onClick={copyHtml}
              className='h-max px-2.5 py-1'
            >
              <Copy size='18' color='white' />
            </Button>
          )}
          <Select onValueChange={(value) => updateCitationStyle(value)}>
            <SelectTrigger className='h-max w-20 gap-x-2 rounded border-doc-primary px-2 py-0.5 text-doc-primary'>
              <SelectValue placeholder='MLA' />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value='MLA'>MLA</SelectItem>
              <SelectItem value='APA'>APA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Spacer y='20' />
      <ol className={`pl-8`} ref={referenceListRef}>
        {citation_type === 'MLA'
          ? sort_array.map((item, index) => (
              <li
                key={`reference-${index}`}
                className='my-4 text-left -indent-4 font-serif leading-[150%] first:mt-0'
              >
                <MLAReference citation={item as any} />
              </li>
            ))
          : citation_type === 'APA'
            ? sort_array.map((item, index) => (
                <li
                  key={`reference-${index}`}
                  className='my-4 text-left -indent-4 font-serif leading-[150%] first:mt-0'
                >
                  <APAReference citation={item as any} />
                </li>
              ))
            : null}
      </ol>
    </div>
  );
};
export default memo(Reference);
