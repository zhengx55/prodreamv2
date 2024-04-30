import {
  useButtonTrack,
  useGetReference,
  useMembershipInfo,
} from '@/query/query';
import { ReferenceType } from '@/query/type';
import useAIEditor, { useCitation } from '@/zustand/store';
import { Loader2 } from 'lucide-react';
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

const Reference = () => {
  const citationStyle = useCitation((state) => state.citationStyle);
  const inTextCitation = useCitation((state) => state.inTextCitation);
  const updateCitationStyle = useCitation((state) => state.updateCitationStyle);
  const { mutateAsync: buttonTrack } = useButtonTrack();
  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);
  const { data: usage } = useMembershipInfo();
  const referenceListRef = useRef<HTMLOListElement>(null);
  const sort_array = useMemo(() => {
    if (citationStyle !== 'ieee') {
      return inTextCitation.sort((a, b) => {
        const lastNameA =
          a.data.contributors?.[0]?.last_name?.toLowerCase() || '';
        const lastNameB =
          b.data.contributors?.[0]?.last_name?.toLowerCase() || '';

        return lastNameA.localeCompare(lastNameB);
      });
    }
    return inTextCitation;
  }, [citationStyle, inTextCitation]);

  const bibtext_ids = useMemo(() => {
    let bibtext_array = [];
    for (let i = 0; i < sort_array.length; i++) {
      bibtext_array.push(sort_array[i].data.bibtex);
    }
    return bibtext_array;
  }, [sort_array]);

  const {
    data: reference_data,
    isPending,
    isError,
  } = useGetReference({
    type: citationStyle,
    bibtex: bibtext_ids,
  });

  const copyHtml = async () => {
    const htmlNode = referenceListRef.current;
    navigator.clipboard.writeText(htmlNode?.innerText ?? '');
    const { toast } = await import('sonner');
    toast.success('Copied to clipboard');
  };

  if (inTextCitation.length === 0) return null;
  return (
    <div className='mx-auto flex w-[700px] select-none flex-col pb-[10vh]'>
      <div className='flex-between'>
        <h3 className='text-xl font-[600]'>References</h3>
        <div className='flex gap-x-4'>
          {usage?.subscription === 'basic' ? (
            <p className='subtle-regular inline-flex items-center gap-x-2 text-neutral-400'>
              Upgrade to unlimted to export citations
              <Button
                role='button'
                variant={'ghost'}
                className='subtle-regular h-max px-0 py-0'
                onClick={async () => {
                  await buttonTrack({
                    event: 'open payment at reference list',
                  });
                  updatePaymentModal(true);
                }}
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
          <Select
            value={citationStyle}
            onValueChange={(value) =>
              updateCitationStyle(value as ReferenceType)
            }
          >
            <SelectTrigger className='w-30 h-max gap-x-2 rounded border-violet-500 px-2 py-0.5 text-violet-500'>
              <SelectValue placeholder={citationStyle.toLocaleUpperCase()} />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value='mla'>MLA</SelectItem>
              <SelectItem value='apa'>APA</SelectItem>
              <SelectItem value='ieee'>IEEE</SelectItem>
              <SelectItem value='chicago'>Chicago</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Spacer y='20' />
      {isPending ? (
        <div className='flex-center'>
          <Loader2 className='animate-spin text-violet-500' />
        </div>
      ) : isError ? null : (
        <ol className={`pl-4`} ref={referenceListRef}>
          {reference_data.map((item, index) => (
            <li
              dangerouslySetInnerHTML={{ __html: item }}
              key={`reference-${index}`}
              className='my-4 text-left -indent-4 font-serif leading-[150%] first:mt-0'
            />
          ))}
        </ol>
      )}
    </div>
  );
};
export default memo(Reference);
