import { useMutation } from '@tanstack/react-query';
import { JSONContent } from '@tiptap/core';
import { batchHumanize, getDetectionResult } from '../api';
import { IDetectionResult } from '../type';

export const useAiDetection = (
  onSuccessCallback:
    | ((
        data: IDetectionResult,
        variables: {
          text: JSONContent[];
        },
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined
) => {
  return useMutation({
    mutationFn: async (params: { text: JSONContent[] }) =>
      getDetectionResult(params),
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
    onSuccess: onSuccessCallback,
  });
};

export const useBatchHumanize = (
  onSuccessCallback:
    | ((
        data: string[],
        variables: string[],
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined
) => {
  return useMutation({
    mutationFn: async (params: string[]) => batchHumanize(params),
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
    onSuccess: onSuccessCallback,
  });
};
