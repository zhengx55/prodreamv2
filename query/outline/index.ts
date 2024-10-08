import { revalidateOutlines } from '@/components/workbench/outline/server_actions/actions';
import { PAGESIZE } from '@/constant/enum';
import { MaterialListRes } from '@/types/brainstorm';
import { Prompt } from '@/types/outline';
import { useAgent, useEditor } from '@/zustand/store';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import type { Editor } from '@tiptap/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const useGetMaterials = (
  keyword: string,
  page: number,
  pageSize?: number,
  material_ids?: string[]
) => {
  return useQuery<MaterialListRes>({
    queryKey: ['getMaterials', keyword, page, pageSize, material_ids],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const token = Cookies.get('token');
      const queryParams = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize
          ? pageSize.toString()
          : PAGESIZE.MATERIAL_PAGE_SIZE.toString(),
        keyword,
      });
      if (material_ids)
        material_ids.forEach((id) => queryParams.append('material_ids', id));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}material?${queryParams.toString()}`,
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

export const useGetPrompts = () => {
  return useQuery<Prompt[]>({
    queryKey: ['getPrompts'],
    queryFn: async () => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}prompt?page=0&page_size=10`,
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

export const useGetRatedPrompts = (params: {
  prompt_type: string;
  material_ids: string[];
  shouldShow: boolean;
}) => {
  return useQuery<Prompt[]>({
    queryKey: ['getRatedPrompts', params.prompt_type, params.material_ids],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        prompt_type: params.prompt_type,
      });

      params.material_ids.forEach((id) =>
        queryParams.append('material_ids', id)
      );
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}prompt/recommend?${queryParams.toString()}`,
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
    enabled: Boolean(
      params.prompt_type && params.material_ids.length && params.shouldShow
    ),
  });
};

export const useDownloadOutline = () => {
  return useMutation({
    mutationFn: async (params: { outline_id: string; title: string }) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}essay/${params.outline_id}/outline/docx`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.blob();
      return data;
    },
    onSuccess: (data, variables) => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${variables.title}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error('Failed to download outline');
    },
  });
};

export const useHandleOutlineFromChat = () => {
  const { push } = useRouter();
  const setshowGenerateOutlineModal = useAgent(
    (state) => state.setshowGenerateOutlineModal
  );
  const setshowPolishOutlineModal = useAgent(
    (state) => state.setshowPolishOutlineModal
  );
  return useMutation({
    mutationFn: async (params: {
      title: string;
      material_ids: string[];
      prompt_id: string;
      connect_ideas?: string;
      original_outline?: string;
    }) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}outline`,
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
    onSuccess: async (data, variables) => {
      const { outline_id } = data;
      if (variables.original_outline) {
        setshowPolishOutlineModal(false);
      } else {
        setshowGenerateOutlineModal(false);
      }
      push(`/outline/${outline_id}`);
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error('Failed to create outline');
    },
  });
};

export const useCreateOutline = (closeModal: () => void) => {
  const { push } = useRouter();
  const mutation = useMutation({
    mutationFn: async (params: {
      title: string;
      material_ids: string[];
      prompt_id: string;
      connect_ideas?: string;
    }) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}outline`,
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
      return data.data;
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
    onSuccess: async (data, variables) => {
      const { outline_id } = data;
      closeModal();
      push(`/outline/${outline_id}`);
    },
  });

  return { ...mutation };
};

export const useGetOutlineContent = (outline_id: string) => {
  return useQuery({
    staleTime: 0,
    gcTime: 0,
    queryKey: ['getOutlineContent', outline_id],
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
    enabled: Boolean(outline_id),
  });
};

export const useSaveOutline = () => {
  const setIsEditorSaving = useEditor((state) => state.setIsEditorSaving);

  return useMutation({
    mutationFn: async (params: {
      outline_id: string;
      title: string | null;
      content: string | null;
      html: string | null;
    }) => {
      const token = Cookies.get('token');
      await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}outline/${params.outline_id}`,
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
    onMutate: () => {
      setIsEditorSaving(true);
    },
    onSuccess: async () => {
      revalidateOutlines();
      setIsEditorSaving(false);
    },
    onError: (error) => {
      console.error(error.message);
      setIsEditorSaving(false);
    },
  });
};

export const getOutlineStream = async (
  outline_id: string,
  editor: Editor,
  abort: AbortSignal
) => {
  try {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}outline/${outline_id}/generation`,
      {
        signal: abort,
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
    let outline_result = '';
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
            outline_result += parsedData;
            editor?.commands.setContent(
              `<h1>Untitled</h1> ${parse(outline_result)}`
            );
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};
