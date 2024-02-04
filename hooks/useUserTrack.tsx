import { getUserInfo } from '@/query/api';
import { useUserTask } from '@/zustand/store';
import { useEffect, useState } from 'react';

export const useUserTrack = () => {
  const [isFetching, setIsFetching] = useState(false);
  const updateShowGuidence = useUserTask((state) => state.updateShowGuidence);
  const updateShowTask = useUserTask((state) => state.updateShowTask);
  const updateCompletion = useUserTask((state) => state.updateCompletion);

  useEffect(() => {
    async function getUserTrack() {
      try {
        setIsFetching(true);
        const user_track = await getUserInfo();
        if (!user_track) {
          updateShowGuidence(true);
          updateShowTask(true);
        } else {
          if (!user_track.guidence) {
            updateShowGuidence(true);
          }
          if (!user_track.tasks) updateShowTask(true);
          if (user_track.continue_writing_task)
            await updateCompletion('continue_writing', true);
          if (user_track.ai_copilot_task)
            await updateCompletion('ai_copilot', true);
          if (user_track.generate_tool_task)
            await updateCompletion('generate_tool', true);
          if (user_track.citation_task)
            await updateCompletion('citation', true);
        }
      } catch (error) {
      } finally {
        setIsFetching(false);
      }
    }
    getUserTrack();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isFetching };
};
