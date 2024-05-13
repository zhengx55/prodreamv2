import { getUserInfo, updateUserInfo } from '@/query/api';
import { UserTrackData } from '@/query/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUserTrackInfo = () => {
  return useQuery({
    queryKey: ['user_track_info'],
    queryFn: () => getUserInfo(),
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useMutateTrackInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { field: keyof UserTrackData; data: any }) =>
      updateUserInfo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user_track_info'],
      });
    },
  });
};
