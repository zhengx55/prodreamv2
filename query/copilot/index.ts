import { useMutation } from '@tanstack/react-query';
import { JSONContent } from '@tiptap/core';
import {
  ask,
  batchHumanize,
  copilot,
  getDetectionResult,
  humanize,
  submitPolish,
} from '../api';
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

export const useHandleCopilot = () => {
  return useMutation({
    mutationFn: async (params: { tool: string; text: string }) =>
      copilot(params),
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
};

export const useHandleHumenize = () => {
  return useMutation({
    mutationFn: async (params: { text: string }) => humanize(params),
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
};

export const useHandleConversitation = () => {
  return useMutation({
    mutationFn: async (params: {
      instruction: string;
      text: string;
      writing_goal?: string;
      session_id?: string;
    }) => ask(params),
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
};

export const useGrammarCheck = () => {
  return useMutation({
    mutationFn: async (params: { block: JSONContent[] }) =>
      submitPolish(params),
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
};
