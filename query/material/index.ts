import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useState } from 'react';
export const useGetMaterialSuggestion = (
  defaultContent: string | undefined
) => {
  const [content, setContent] = useState(defaultContent || '');
  const contentLenght = content.trim().split(/\s+/).filter(Boolean).length;

  const mutation = useMutation({
    mutationFn: async (params: {
      prompt_id: string;
      material_content: string;
    }) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}material/suggestion`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        }
      );
      const body = res.body;
      if (!res.ok || !body) throw new Error('Opps something went wrong');
      return body;
    },
    onSuccess: async (body) => {
      setContent('');
      const reader = body.pipeThrough(new TextDecoderStream()).getReader();
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
              setContent((prev) => prev + parsedData.replace(/\*+/g, ''));
            }
          }
        }
      }
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error('Failed to get material suggestion');
    },
  });
  return { mutation, content, contentLenght, setContent };
};
