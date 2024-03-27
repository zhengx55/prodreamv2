import { getCitations, getDocDetail } from '@/query/api';
import { IDocDetail } from '@/query/type';
import { ICitationData, ICitationType } from '@/types';
import { useAIEditor, useCitation } from '@/zustand/store';
import { useEffect, useState } from 'react';

export const useCitationInfo = (id: string) => {
  const updateInTextCitation = useCitation(
    (state) => state.updateInTextCitation
  );
  const updateInDocCitation = useCitation((state) => state.updateInDocCitation);
  const updateTitle = useAIEditor((state) => state.updateTitle);
  const updateEssayPrompt = useAIEditor((state) => state.updateEssayPrompt);
  const [essayContent, setEssayContent] = useState<IDocDetail>();
  const [loading, setLoading] = useState<boolean>(false); // Added loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocument(id: string) {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const data = await getDocDetail(id);
        const {
          in_text_citations,
          citation_candidates,
          title,
          brief_description,
        } = data;
        updateTitle(title);
        updateEssayPrompt(brief_description ?? '');
        if (in_text_citations.length > 0) {
          fetchInText(data.in_text_citations);
        } else {
          updateInTextCitation([], []);
        }
        if (citation_candidates.length > 0) {
          fetchInDoc(data.citation_candidates);
        } else {
          updateInDocCitation([], []);
        }
        setEssayContent(data);
      } catch (e) {
        setError('An error occurred while fetching the document details.'); // Set error on catch
      } finally {
        setLoading(false); // End loading
      }
    }
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
    fetchDocument(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return { essayContent, loading, error };
};
