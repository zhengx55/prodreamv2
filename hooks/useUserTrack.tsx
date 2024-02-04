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
    async function getUserTrack() {
      if (!user_track) {
        updateShowGuidence(true);
        updateShowTask(true);
      } else {
        if (!user_track.guidence) {
          console.log(user_track);
          updateShowGuidence(true);
        }
        if (!user_track.tasks) updateShowTask(true);
        if (user_track.continue_writing_task)
          await updateCompletion('continue_writing', true);
        if (user_track.ai_copilot_task)
          await updateCompletion('ai_copilot', true);
        if (user_track.generate_tool_task)
          await updateCompletion('generate_tool', true);
        if (user_track.citation_task) await updateCompletion('citation', true);
      }
    }
    if (isSuccess) {
      getUserTrack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  return { isUserInfoFetching };
};
