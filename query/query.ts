import { useMutation, useQuery } from '@tanstack/react-query';
import {
  OptimizeAnswer,
  getBrainstormDetails,
  getBrianstormHistoryById,
} from './api';

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
