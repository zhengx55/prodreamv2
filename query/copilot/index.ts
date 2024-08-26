import { highLightGrammar } from '@/lib/tiptap/utils';
import { useEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { JSONContent } from '@tiptap/core';
import { useCallback, useState } from 'react';
import {
  ask,
  batchHumanize,
  copilot,
  getDetectionResult,
  humanize,
  submitPolish,
} from '../api';
import { IDetectionResult, IGrammarResponse, IGrammarResult } from '../type';

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
  const [grammarResult, setGrammarResult] = useState<IGrammarResult[]>([]);
  const editor = useEditor((state) => state.editor);
  const setIsGrammarMode = useEditor((state) => state.setIsGrammarMode);

  const mutation = useMutation({
    mutationFn: async (params: { block: JSONContent[] }) =>
      submitPolish(params),
    onMutate: () => {
      setIsGrammarMode(true);
    },
    onSuccess: async (data: IGrammarResponse[]) => {
      let grammar_result: IGrammarResult[] = [];
      if (data.length === 0) {
        const toast = (await import('sonner')).toast;
        return toast.success('No grammar issues found!');
      }
      grammar_result = data.map((item) => {
        return {
          index: item.index,
          diff: item.diff
            .map((diffSection) => ({
              expand: false,
              data: diffSection,
            }))
            .filter((diffSection) =>
              diffSection.data.some((diffItem) => diffItem.status !== 0)
            ),
        };
      });
      // 将第一个suggestion 展开并划线
      const expand_head_array = [...grammar_result];
      expand_head_array[0].diff[0].expand = true;
      highLightGrammar(editor!, expand_head_array[0], 0);
      setGrammarResult(expand_head_array);
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
      setIsGrammarMode(false);
    },
  });

  const updateGrammarResult = useCallback((value: IGrammarResult[]) => {
    setGrammarResult(value);
  }, []);

  return {
    mutation,
    grammarResult,
    setGrammarResult: updateGrammarResult,
    editor,
  };
};
