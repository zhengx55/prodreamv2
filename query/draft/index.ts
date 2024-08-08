import { PAGESIZE } from '@/constant/enum';
import { OutlineItem, OutlineRes } from '@/types/outline';
import { useEditor } from '@/zustand/store';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const useGetDraftStream = (
  draft_id: string,
  shouldTriggerDraftStream: boolean
) => {
  const editor = useEditor((state) => state.editor);
  const setEditorContentGenerating = useEditor(
    (state) => state.setEditorContentGenerating
  );
  return useQuery({
    queryKey: ['getDraftStream', draft_id],
    queryFn: async () => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}draft/${draft_id}/generation`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const body = res.body;
      if (!body) return;
      const reader = body.pipeThrough(new TextDecoderStream()).getReader();
      const { parse } = await import('marked');
      let draft_result = '';
      editor?.commands.clearContent();
      setEditorContentGenerating(true);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = value.split('\n');
        for (const [index, line] of lines.entries()) {
          if (
            line.startsWith('data:') &&
            lines[index - 1]?.startsWith('event: data')
          ) {
            const data = line.slice(5).trim();
            if (data) {
              const parsedData = JSON.parse(data);
              draft_result += parsedData;
              editor?.commands.setContent(
                `<h1>Untitled</h1> ${parse(draft_result)}`
              );
            }
          }
        }
      }
      setEditorContentGenerating(false);
      return null;
    },
    enabled: shouldTriggerDraftStream,
  });
};

export const useGetDraftOutline = (outline_id: string) => {
  return useQuery<OutlineItem>({
    queryKey: ['getDraftOutline', outline_id],
    queryFn: async () => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}outline/${outline_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data.data;
    },
    staleTime: Infinity,
  });
};

export const useGetOutlines = (keyword: string, page: number) => {
  return useQuery<OutlineRes>({
    queryKey: ['getOutlines', keyword, page],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}outline?page=${page}&page_size=${PAGESIZE.MATERIAL_MODAL_PAGE_SIZE}&keyword=${keyword}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data.data;
    },
    staleTime: Infinity,
  });
};
