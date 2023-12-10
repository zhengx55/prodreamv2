import { useMutation, useQuery } from '@tanstack/react-query';
import {
  OptimizeAnswer,
  SubmitEssayWritting,
  fetchChatGuideQas,
  fetchChatHistory,
  fetchFinalAs,
  fetchSessionHistory,
  getBrainstormDetails,
  getBrianstormHistoryById,
  getInstitutionOptions,
  queryEssayResult,
  queryPolish,
  refreshUserSession,
  sendChatMessage,
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

// ----------------------------------------------------------------
// Chat With Max
// ----------------------------------------------------------------
export const useGetChatHistory = () => {
  return useQuery({
    queryKey: ['chat_history'],
    queryFn: fetchChatHistory,
  });
};

export const useGetSessionHistory = (session_id: string) => {
  return useQuery({
    queryKey: ['current_session_history', session_id],
    enabled: !!session_id,
    queryFn: () => fetchSessionHistory(session_id),
  });
};

// ----------------------------------------------------------------
// Refresh
// ----------------------------------------------------------------

export const useRefreshSession = () => {
  return useQuery({
    queryKey: ['refresh_session'],
    queryFn: () => refreshUserSession(),
  });
};

// ----------------------------------------------------------------
// AI Editors
// ----------------------------------------------------------------
export const useInstitutionOptions = () => {
  return useQuery({
    queryKey: ['fetch_rate_options'],
    queryFn: () => getInstitutionOptions(),
  });
};
