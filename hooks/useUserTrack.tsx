import { getUserInfo } from '@/query/api';
import { useUserTask } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useUserTrack = () => {
  const updateShowGuidence = useUserTask((state) => state.updateShowGuidence);
  const updateShowTask = useUserTask((state) => state.updateShowTask);
  const updateCompletion = useUserTask((state) => state.updateCompletion);
  const {
    data: user_track,
    isFetching: isUserInfoFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['user_track'],
    queryFn: () => getUserInfo(),
  });
  useEffect(() => {
    if (isSuccess) {
      if (!user_track) {
        updateShowGuidence(true);
        updateShowTask(true);
      } else {
        if (!user_track.guidence) updateShowGuidence(true);
        if (!user_track.task) updateShowTask(true);
        if (user_track.continue_writing_task)
          updateCompletion('continue_writing', true);
        if (user_track.ai_copilot_task) updateCompletion('ai_copilot', true);
        if (user_track.generate_tool_task)
          updateCompletion('generate_tool', true);
        if (user_track.citation_task) updateCompletion('citation', true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  return { isUserInfoFetching };
};
