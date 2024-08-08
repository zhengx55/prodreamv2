import { revalidateOutlines } from '@/components/workbench/outline/server_actions/actions';
import { PAGESIZE } from '@/constant/enum';
import { MaterialItem, MaterialListRes } from '@/types/brainstorm';
import { Prompt } from '@/types/outline';
import { useEditor } from '@/zustand/store';
import {
  keepPreviousData,
  useMutation,
  useQueries,
  useQuery,
} from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useGetMaterials = (keyword: string, page: number) => {
  return useQuery<MaterialListRes>({
    queryKey: ['getMaterials', keyword, page],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}material?page=${page}&page_size=${PAGESIZE.MATERIAL_MODAL_PAGE_SIZE}&keyword=${keyword}`,
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

export const useGetMaterialsByIds = (ids: string[]) => {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ['getMaterialById', id],
      queryFn: async () => {
        const token = Cookies.get('token');
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}material/${id}`,
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
    })),

    combine: (results) => {
      return {
        data: results.map((result) => result.data) as MaterialItem[],
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
      };
    },
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

export const useCreateOutline = (closeModal: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editor = useEditor((state) => state.editor);
  const { push } = useRouter();
  const setEditorContentGenerating = useEditor(
    (state) => state.setEditorContentGenerating
  );
  const handleStream = async (body: ReadableStream<Uint8Array>) => {
    try {
      const reader = body.pipeThrough(new TextDecoderStream()).getReader();
      const { parse } = await import('marked');
      let outline_result = '';
      let generated_outline_id = '';
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
              outline_result += parsedData;
              editor?.commands.setContent(
                `<h1>Untitled</h1> ${parse(outline_result)}`
              );
            }
          } else if (
            line.startsWith('data:') &&
            lines[index - 1]?.startsWith('event: outline_id')
          ) {
            generated_outline_id = line.slice(5).trim();
          }
        }
      }
      await revalidateOutlines();
      setEditorContentGenerating(false);
      push(`/outline/${generated_outline_id}`);
    } catch (error) {
      console.error(error);
    }
  };

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

      if (!res.ok) {
        throw new Error('An error occurred while sending the message');
      }

      const body = res.body;
      if (!body) {
        throw new Error('Response body is empty');
      }

      return body;
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
    onSuccess: handleStream,
    onMutate: () => {
      setIsSubmitting(true);
    },
  });

  return { ...mutation, isSubmitting };
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
    onSuccess: async () => {
      revalidateOutlines();
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
