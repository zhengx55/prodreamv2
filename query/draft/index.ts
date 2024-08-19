import { revalidateDrafts } from '@/components/workbench/draft/server_actions/actions';
import { revalidateOutlines } from '@/components/workbench/outline/server_actions/actions';
import { PAGESIZE } from '@/constant/enum';
import { Draft } from '@/types/draft';
import { OutlineItem, OutlineRes } from '@/types/outline';
import { useAgent, useEditor } from '@/zustand/store';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Editor } from '@tiptap/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const getDraftSteam = async (draft_id: string, editor: Editor) => {
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

export const useCreateDraft = (closeModal: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editor = useEditor((state) => state.editor);
  const { push } = useRouter();
  const setEditorContentGenerating = useEditor(
    (state) => state.setEditorContentGenerating
  );

  const mutation = useMutation({
    mutationFn: async (params: { outline_id: string }) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}draft`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        }
      );

      const data = await res.json();
      return data.data.draft_id;
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
    onSuccess: async (data: string) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}draft/${data}/generation`,
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
      setIsSubmitting(false);
      closeModal();
      setEditorContentGenerating(true);
      while (true) {
        const { value, done } = await reader.read();
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
      await revalidateOutlines();
      setEditorContentGenerating(false);
      push(`/draft/${data}`);
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
  });
  return { ...mutation, isSubmitting };
};

export const useHandleDraftFromChat = () => {
  const { push } = useRouter();
  const setshowGenerateDraftModal = useAgent(
    (state) => state.setshowGenerateDraftModal
  );

  return useMutation({
    mutationFn: async (params: { outline_id: string }) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}draft`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        }
      );
      const data = await res.json();
      if (data.code !== 0) throw new Error(data.msg);
      return data.data;
    },
    onSuccess: async (data) => {
      const { draft_id } = data;
      setshowGenerateDraftModal(false);
      push(`/draft/${draft_id}`);
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error('Failed to create outline');
    },
  });
};

export const useGetDraftContent = (draft_id: string) => {
  return useQuery<Draft>({
    staleTime: 0,
    gcTime: 0,
    queryKey: ['getDraftContent', draft_id],
    queryFn: async () => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}draft/${draft_id}`,
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
    enabled: Boolean(draft_id),
  });
};

export const useSaveDraft = () => {
  return useMutation({
    mutationFn: async (params: {
      draft_id: string;
      title: string | null;
      content: string | null;
      html: string | null;
    }) => {
      const token = Cookies.get('token');
      await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}draft/${params.draft_id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        }
      );
    },
    onSuccess: async () => {
      revalidateDrafts();
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
