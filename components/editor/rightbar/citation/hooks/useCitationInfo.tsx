import { getCitations } from '@/query/api';
import { IDocDetail } from '@/query/type';
import { ICitationData, ICitationType } from '@/types';
import { useAIEditor, useCitation } from '@/zustand/store';
import { useEffect } from 'react';

export const useCitationInfo = (document_content: IDocDetail | undefined) => {
  const updateInTextCitation = useCitation(
    (state) => state.updateInTextCitation
  );
  const updateInDocCitation = useCitation((state) => state.updateInDocCitation);
  const updateTitle = useAIEditor((state) => state.updateTitle);
  const updateEssayPrompt = useAIEditor((state) => state.updateEssayPrompt);

  useEffect(() => {
    async function fetchInText(id_array: string[]) {
      const data = await getCitations({ citation_ids: id_array });
      const parsed: { type: ICitationType; data: ICitationData }[] = [];
      data.map((item: any) => {
        const { type, ...data } = item;
        parsed.push({ type, data });
      });
      updateInTextCitation(parsed, id_array);
    }
    async function fetchInDoc(id_array: string[]) {
      const data = await getCitations({ citation_ids: id_array });
      const parsed: { type: ICitationType; data: ICitationData }[] = [];
      data.map((item: any) => {
        const { type, ...data } = item;
        parsed.push({ type, data });
      });
      updateInDocCitation(parsed, id_array);
    }
    if (document_content) {
      const {
        in_text_citations,
        citation_candidates,
        title,
        brief_description,
      } = document_content;
      updateTitle(title);
      updateEssayPrompt(brief_description ?? '');
      if (in_text_citations.length > 0) {
        fetchInText(document_content.in_text_citations);
      } else {
        updateInTextCitation([], []);
      }
      if (citation_candidates.length > 0) {
        fetchInDoc(document_content.citation_candidates);
      } else {
        updateInDocCitation([], []);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document_content]);
};
