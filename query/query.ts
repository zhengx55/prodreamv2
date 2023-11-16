import { useMutation, useQuery } from '@tanstack/react-query';
import {
  OptimizeAnswer,
  SubmitEssayWritting,
  fetchChatGuideQas,
  fetchFinalAs,
  getBrainstormDetails,
  getBrianstormHistoryById,
  queryEssayResult,
  sendChatMessage,
  userLogin,
} from './api';
import { AnswerRequestParam } from '@/types';

// ============================================================
// BRAINSOTRM QUERIES
// ============================================================
export const useBrainStormDetail = (template_id: string) => {
  return useQuery({
    queryKey: ['brainstormdetail', template_id],
    enabled: !!template_id,
    queryFn: () => getBrainstormDetails(template_id),
  });
};
export const useBrainStormHistoryById = (template_id: string) => {
  return useQuery({
    queryKey: ['brainsotrmhistory', template_id],
    enabled: !!template_id,
    queryFn: () => getBrianstormHistoryById(template_id),
  });
};

export const useAnswerOptimize = () => {
  return useMutation({
    mutationFn: ({
      question_id,
      answer,
      type,
    }: {
      question_id: string;
      answer: string;
      type: 0 | 1;
    }) => OptimizeAnswer(question_id, answer, type),
  });
};

export const useQueryEssay = (task_id: string) => {
  return useQuery({
    queryKey: ['query_essay', task_id],
    enabled: !!task_id,
    queryFn: () => queryEssayResult(task_id),
  });
};

export const useEssayWriting = () => {
  return useMutation({
    mutationFn: ({
      pro_mode,
      template_id,
      word_nums,
      texts,
      types,
    }: {
      pro_mode: boolean;
      template_id: string;
      word_nums: string;
      texts: string[];
      types: string[];
    }) => SubmitEssayWritting(pro_mode, template_id, word_nums, texts, types),
  });
};

// ----------------------------------------------------------------
// Chat
// ----------------------------------------------------------------
export const useChatGuideQas = (template_id: string) => {
  return useQuery({
    queryKey: ['get_chat_guide', template_id],
    queryFn: () => fetchChatGuideQas(template_id),
    enabled: !!template_id,
  });
};

export const useSendChat = () => {
  return useMutation({
    mutationFn: (params: AnswerRequestParam) => sendChatMessage(params),
  });
};

export const useGetFinalAnswer = () => {
  return useMutation({
    mutationFn: (session_id: string) => fetchFinalAs(session_id),
  });
};

// ============================================================
// Auth
// ============================================================
export const useLogin = () => {
  return useMutation({
    mutationFn: (param: { username: string; password: string }) =>
      userLogin(param),
  });
};
