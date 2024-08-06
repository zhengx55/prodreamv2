import { PAGESIZE } from '@/constant/enum';
import { getUserIdFromToken } from '@/lib/utils';
import { MaterialListRes } from '@/types/brainstorm/types';
import { Prompt } from '@/types/outline/types';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useState } from 'react';

export const useGetMaterials = (keyword: string, page: number) => {
  return useQuery<MaterialListRes>({
    queryKey: ['getMaterials', keyword, page],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const token = Cookies.get('token');
      const user_id = getUserIdFromToken(token!);
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

export const useCreateOutline = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleStream = async (body: ReadableStream<Uint8Array>) => {
    const reader = body.pipeThrough(new TextDecoderStream()).getReader();
    setIsSubmitting(false);
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const lines = value.split('\n');
      console.log(lines);
    }
  };

  const { mutateAsync, status } = useMutation({
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
        throw new Error('An error occurred while sending the message');
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
  return { mutateAsync, isSubmitting, status };
};
