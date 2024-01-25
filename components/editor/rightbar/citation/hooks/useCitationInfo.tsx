import { getCitations } from '@/query/api';
import { IDocDetail } from '@/query/type';
import { useAIEditor } from '@/zustand/store';
import { useEffect } from 'react';

export const useCitationInfo = (document_content: IDocDetail | undefined) => {
  const updateInTextCitation = useAIEditor(
    (state) => state.updateInTextCitation
  );
  const updateInDocCitation = useAIEditor((state) => state.updateInDocCitation);
  const updateInDocCitationIds = useAIEditor(
    (state) => state.updateInDocCitationIds
  );
  const updateInTextCitationIds = useAIEditor(
    (state) => state.updateInTextCitationIds
  );

  useEffect(() => {
    async function fetchInText(id_array: string[]) {
      const data = await getCitations({ citation_ids: id_array });
      updateInTextCitation(data);
    }
    async function fetchInDoc(id_array: string[]) {
      const data = await getCitations({ citation_ids: id_array });
      updateInDocCitation(data);
    }
    // if (document_content) {
    //   const { in_text_citations, citation_candidates } = document_content;
    //   if (in_text_citations.length > 0) {
    //     updateInTextCitationIds(document_content.in_text_citations);
    //     fetchInText(document_content.in_text_citations);
    //   }
    //   if (citation_candidates.length > 0) {
    //     updateInDocCitationIds(document_content.citation_candidates);
    //     fetchInDoc(document_content.citation_candidates);
    //   }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document_content]);
};
