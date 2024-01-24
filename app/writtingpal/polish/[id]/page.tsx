'use client';
import DocNavbar from '@/components/editor/navbar';
import EssayPanel from '@/components/polish/EssayPanel';
import { getCitations, getDocDetail } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import useDeepCompareEffect from 'use-deep-compare-effect';

export default function Page({ params }: { params: { id: string } }) {
  const {
    data: document_content,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['document_item', params.id],
    queryFn: () => getDocDetail(params.id),
  });
  const updateInTextCitation = useAIEditor(
    (state) => state.updateInTextCitation
  );
  const updateInDocCitation = useAIEditor((state) => state.updateInDocCitation);

  useDeepCompareEffect(() => {
    async function fetchInText(id_array: string[]) {
      const data = await getCitations({ citation_ids: id_array });
      updateInTextCitation(data);
    }
    async function fetchInDoc(id_array: string[]) {
      const data = await getCitations({ citation_ids: id_array });
      updateInDocCitation(data);
    }
    if (document_content) {
      const { in_text_citation, citation_candidates } = document_content;
      if (in_text_citation.length > 0) {
        fetchInText(document_content.in_text_citation);
      }
      if (citation_candidates.length > 0) {
        fetchInDoc(document_content.citation_candidates);
      }
    }
  }, [document_content]);

  return (
    <main className='relative flex h-full w-full flex-col justify-center'>
      <DocNavbar title={document_content ? document_content.title : ''} />
      <EssayPanel
        isFetching={isFetching}
        isError={isError}
        document_content={document_content}
      />
    </main>
  );
}
